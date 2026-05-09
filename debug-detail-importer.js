import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 60;

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(
    line => line === "calendar"
  );

  if (startIndex === -1) return [];

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex &&
      line.includes("Zum Kalender zufügen")
  );

  return lines
    .slice(
      Math.max(0, startIndex - 1),
      endIndex === -1
        ? startIndex + 30
        : endIndex
    )
    .filter(Boolean);
}

function extractFields(detailLines) {
  const title = normalizeText(
    detailLines[0] || ""
  );

  const dateIndex = detailLines.findIndex(
    line => line === "calendar"
  );

  const pinIndex = detailLines.findIndex(
    line => line === "pin"
  );

  const date =
    dateIndex >= 0
      ? normalizeText(
          detailLines[dateIndex + 1] || ""
        )
      : "";

  const location =
    pinIndex >= 0
      ? normalizeText(
          detailLines[pinIndex + 1] || ""
        )
      : "";

  return {
    title,
    date,
    location
  };
}

function makeKey(event) {
  return `${event.title}|${event.date}|${event.location}`
    .toLowerCase()
    .trim();
}

async function waitForDetailChange(
  page,
  oldSnapshot
) {
  await page.waitForFunction(
    previous => {
      const text = document.body.innerText || "";

      return (
        text.includes("calendar") &&
        text !== previous
      );
    },
    oldSnapshot,
    {
      timeout: 5000
    }
  );
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");

  const card = cards.nth(index);

  const listText = normalizeText(
    await card.innerText()
  );

  const oldSnapshot = await page.evaluate(
    () => document.body.innerText || ""
  );

  await card.click({
    timeout: 10000
  });

  await waitForDetailChange(
    page,
    oldSnapshot
  );

  const lines = await page.evaluate(() => {
    return (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
  });

  const detailLines =
    extractDetailBlock(lines);

  const fields =
    extractFields(detailLines);

  return {
    ok: Boolean(
      fields.title &&
        fields.date &&
        fields.location
    ),
    listText,
    detailLines,
    ...fields
  };
}

async function run() {
  console.log(
    "🔎 Debug Detail Importer V8"
  );

  console.log(
    "Ziel: Event-basiertes Warten statt Timeout"
  );

  console.log(
    `Max Events: ${MAX_EVENTS}`
  );

  console.log("");

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",

    viewport: {
      width: 390,
      height: 844,
      isMobile: true
    }
  });

  const totalStartedAt = Date.now();

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  const count = await page
    .locator(".termin.inline")
    .count();

  const total = Math.min(
    count,
    MAX_EVENTS
  );

  console.log(
    `Gefundene Container: ${count}`
  );

  console.log(
    `Teste Events: ${total}`
  );

  console.log("");

  const seen = new Set();

  let ok = 0;
  let duplicates = 0;
  let errors = 0;

  const loopStartedAt = Date.now();

  for (let i = 0; i < total; i++) {
    try {
      const event = await readEvent(
        page,
        i
      );

      const key = makeKey(event);

      const duplicate =
        seen.has(key);

      seen.add(key);

      if (duplicate) duplicates++;

      if (event.ok) {
        ok++;
      } else {
        errors++;
      }

      console.log(
        `${String(i + 1).padStart(
          2,
          "0"
        )}. ${
          event.ok ? "OK" : "FEHLER"
        }${duplicate ? " | DOPPELT" : ""} | ${
          event.title
        } | ${event.date} | ${
          event.location
        }`
      );
    } catch (error) {
      errors++;

      console.log(
        `${String(i + 1).padStart(
          2,
          "0"
        )}. FEHLER | ${
          error.message
        }`
      );
    }
  }

  const seconds = (
    (Date.now() - loopStartedAt) /
    1000
  ).toFixed(1);

  console.log("");

  console.log(
    "========== ZUSAMMENFASSUNG =========="
  );

  console.log(`Events: ${total}`);

  console.log(`OK: ${ok}`);

  console.log(`Fehler: ${errors}`);

  console.log(`Dubletten: ${duplicates}`);

  console.log(
    `Eindeutige Events: ${seen.size}`
  );

  console.log(`Loop-Dauer: ${seconds}s`);

  console.log(
    `Gesamt-Dauer: ${(
      (Date.now() - totalStartedAt) /
      1000
    ).toFixed(1)}s`
  );

  await browser.close();

  console.log("");

  console.log(
    "✅ Debug-Test V8 beendet."
  );
}

run();