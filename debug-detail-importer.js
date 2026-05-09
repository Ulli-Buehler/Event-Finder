import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const EVENTS_PER_RUN = 10;
const RUNS = 3;
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
    (line, index) => index > startIndex && line.includes("Zum Kalender zufügen")
  );

  return lines
    .slice(Math.max(0, startIndex - 1), endIndex === -1 ? startIndex + 30 : endIndex)
    .filter(Boolean);
}

function extractFields(detailLines) {
  const title = normalizeText(detailLines[0] || "");

  const dateIndex = detailLines.findIndex(line => line === "calendar");
  const pinIndex = detailLines.findIndex(line => line === "pin");
  const tagsIndex = detailLines.findIndex(line => line === "tags");

  const date = dateIndex >= 0 ? normalizeText(detailLines[dateIndex + 1] || "") : "";
  const location = pinIndex >= 0 ? normalizeText(detailLines[pinIndex + 1] || "") : "";
  const tags = tagsIndex >= 0 ? normalizeText(detailLines[tagsIndex + 1] || "") : "";

  return { title, date, location, tags };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  const listText = normalizeText(await card.innerText());

  await card.click({ timeout: 10000 });
  await page.waitForTimeout(250);

  const lines = await page.evaluate(() => {
    return (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
  });

  const detailLines = extractDetailBlock(lines);
  const fields = extractFields(detailLines);

  return {
    ok: Boolean(fields.title && fields.date && fields.location),
    listText,
    detailLines,
    ...fields
  };
}

async function run() {
  console.log("🔎 Debug Detail Importer V6");
  console.log("Ziel: 0-ms-Stabilität mit unterschiedlichen Events");
  console.log(`Runs: ${RUNS}`);
  console.log(`Events pro Run: ${EVENTS_PER_RUN}`);
  console.log(`Pause: ${PAUSE_MS} ms`);
  console.log("");

  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      isMobile: true
    }
  });

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(4000);

  const count = await page.locator(".termin.inline").count();
  console.log(`Gefundene .termin.inline Container: ${count}`);
  console.log("");

  const problems = [];
  const seenTitles = new Set();

  const startedAt = Date.now();

  for (let runIndex = 0; runIndex < RUNS; runIndex++) {
    const start = runIndex * EVENTS_PER_RUN;
    const end = Math.min(start + EVENTS_PER_RUN, count);

    console.log("==================================");
    console.log(`Durchlauf ${runIndex + 1}: Events ${start + 1}-${end}`);
    console.log("==================================");

    for (let i = start; i < end; i++) {
      try {
        const event = await readEvent(page, i);

        const duplicate = seenTitles.has(`${event.title}|${event.date}|${event.location}`);
        seenTitles.add(`${event.title}|${event.date}|${event.location}`);

        const status = event.ok ? "OK" : "FEHLER";
        const dupText = duplicate ? " | DOPPELT" : "";

        console.log(
          `${String(i + 1).padStart(2, "0")}. ${status}${dupText} | ${event.title} | ${event.date} | ${event.location}`
        );

        if (!event.ok) {
          problems.push(`#${i + 1}: unvollständig`);
          console.log("   Liste:", event.listText.slice(0, 180));
          console.log("   Detail:", event.detailLines.slice(0, 8).join(" | "));
        }
      } catch (error) {
        problems.push(`#${i + 1}: ${error.message}`);
        console.log(`${String(i + 1).padStart(2, "0")}. FEHLER | ${error.message}`);
      }

      if (PAUSE_MS > 0) await sleep(PAUSE_MS);
    }

    console.log("");
  }

  const durationSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log("========== ZUSAMMENFASSUNG ==========");
  console.log(`Getestete Events: ${Math.min(EVENTS_PER_RUN * RUNS, count)}`);
  console.log(`Eindeutige Detaildaten: ${seenTitles.size}`);
  console.log(`Fehler: ${problems.length}`);
  console.log(`Dauer ohne Initial-Load: ${durationSeconds}s`);

  if (problems.length > 0) {
    console.log("Probleme:");
    problems.forEach(problem => console.log(`- ${problem}`));
  }

  await browser.close();

  console.log("✅ Debug-Test V6 beendet.");
}

run();