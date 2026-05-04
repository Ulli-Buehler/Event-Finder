import { chromium } from "playwright";
import fs from "fs";

const URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen+Teck&umkreis=30&region=&von=2026-05-10&bis=2026-05-10";

function log(text) {
  console.log("➡️ " + text);
}

async function run() {
  log("Playwright Import gestartet");
  log("Quelle: " + URL);

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  const text = await page.locator("body").innerText();

  await browser.close();

  log("Textlänge: " + text.length);

  const lines = text
    .split("\n")
    .map(x => x.trim())
    .filter(Boolean);

  log("Zeilen gefunden: " + lines.length);

  const events = [];
  const seen = new Set();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!/\d{2}\.\d{2}\.\d{4}/.test(line)) continue;

    const title = lines[i - 2] || "";
    const meta = lines[i - 1] || "";

    if (!title || title.length < 4) continue;

    const key = title + "|" + line;

    if (seen.has(key)) continue;
    seen.add(key);

    events.push({
      title,
      place: "Dettingen Teck",
      date: line,
      description: meta,
      lat: 48.6167,
      lng: 9.45
    });

    log("✅ Event gefunden: " + title + " / " + line);
  }

  log("Events gefunden: " + events.length);

  if (events.length === 0) {
    throw new Error("Keine Events gefunden — events.js bleibt unverändert");
  }

  fs.writeFileSync(
    "events.js",
    `const EVENTS = ${JSON.stringify(events, null, 2)};`
  );

  log("events.js geschrieben");
}

run().catch(err => {
  console.error("❌ IMPORTER FEHLER:");
  console.error(err);
  process.exit(1);
});