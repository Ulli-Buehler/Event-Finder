import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 60;
const CLICK_WAIT_MS = 50;
const PAUSE_MS = 0;

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(line => line === "calendar");

  if (startIndex === -1) return [];

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex &&
      line.includes("Zum Kalender zufügen")
  );

  return lines
    .slice(
      Math.max(0, startIndex - 1),
      endIndex === -1 ? startIndex + 30 : endIndex
    )
    .filter(Boolean);
}

function extractFields(detailLines) {
  const title = normalizeText(detailLines[0] || "");

  const dateIndex = detailLines.findIndex(
    line => line === "calendar"
  );

  const pinIndex = detailLines.findIndex(
    line => line === "pin"
  );

  const tagsIndex = detailLines.findIndex(
    line => line === "tags"
  );

  const date =
    dateIndex >= 0
      ? normalizeText(detailLines[dateIndex + 1] || "")
      : "";

  const location =
    pinIndex >= 0
      ? normalizeText(detailLines[pinIndex + 1] || "")
      : "";

  const tags =
    tagsIndex >= 0
      ? normalizeText(detailLines[tagsIndex + 1] || "")
      : "";

  return {
    title,
    date,
    location,
    tags
  };
}

function makeKey(event) {
  return `${event.title}|${event.date}|${event.location}`
    .toLowerCase()
    .trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  const listText = normalizeText(
    await card.innerText()
  );

  await card.click({
    timeout: 10000
  });

  await page.waitForTimeout(CLICK_WAIT_MS);

  const lines = await page.evaluate(() => {
    return (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
  });

  const detailLines = extractDetailBlock(lines);

  const fields = extractFields(detailLines);

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
  console.log("🔎 Debug Detail Importer V7");
  console.log("Ziel: schneller Import-Test");
  console.log(`Max Events: ${MAX_EVENTS}`);
  console.log(
    `Click-Wartezeit: ${CLICK_WAIT_MS} ms`
  );
  console.log(
    `Pause zwischen Events: ${PAUSE_MS} ms`
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

  const total = Math.min(count, MAX_EVENTS);

  console.log(
    `Gefundene .termin.inline Container: ${count}`
  );

  console.log(`Teste Container: ${total}`);
  console.log("");

  const seen = new Set();
  const problems = [];

  let ok = 0;
  let duplicates = 0;
  let unique = 0;

  const loopStartedAt = Date.now();

  for (let i = 0; i < total; i++) {
    try {
      const event = await readEvent(page, i);

      const key = makeKey(event);

      const duplicate = seen.has(key);

      if (event.ok) ok++;

      if (duplicate) {
        duplicates++;
      }

      if (!duplicate && event.ok) {
        unique++;
      }

      seen.add(key);

      console.log(
        `${String(i + 1).padStart(2, "0")}. ${
          event.ok ? "OK" : "FEHLER"
        }${duplicate ? " | DOPPELT" : ""} | ${
          event.title
        } | ${event.date} | ${event.location}`
      );

      if (!event.ok) {
        problems.push(
          `#${i + 1}: unvollständige Daten`
        );

        console.log(
          "   Liste:",
          event.listText.slice(0, 180)
        );

        console.log(
          "   Detail:",
          event.detailLines
            .slice(0, 8)
            .join(" | ")
        );
      }
    } catch (error) {
      problems.push(
        `#${i + 1}: ${error.message}`
      );

      console.log(
        `${String(i + 1).padStart(2, "0")}. FEHLER | ${
          error.message
        }`
      );
    }

    if (PAUSE_MS > 0) {
      await sleep(PAUSE_MS);
    }
  }

  const loopSeconds = (
    (Date.now() - loopStartedAt) /
    1000
  ).toFixed(1);

  const totalSeconds = (
    (Date.now() - totalStartedAt) /
    1000
  ).toFixed(1);

  console.log("");
  console.log(
    "========== ZUSAMMENFASSUNG =========="
  );

  console.log(`Container getestet: ${total}`);
  console.log(`OK: ${ok}`);
  console.log(`Fehler: ${problems.length}`);
  console.log(`Dubletten: ${duplicates}`);
  console.log(`Eindeutige Events: ${unique}`);
  console.log(`Loop-Dauer: ${loopSeconds}s`);

  console.log(
    `Gesamt-Dauer inkl. Laden: ${totalSeconds}s`
  );

  if (problems.length > 0) {
    console.log("");
    console.log("Probleme:");

    problems.forEach(problem => {
      console.log(`- ${problem}`);
    });
  }

  await browser.close();

  console.log("");
  console.log("✅ Debug-Test V7 beendet.");
}

run();