import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

function log(text) {
  console.log("➡️ " + text);
}

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-dettingen-unter-teck-qqc371901ch50hi80i";

const DEFAULT_COORDS = [48.6167, 9.45];

const ALLOWED_CATEGORIES = ["Märkte", "Feste"];

function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/auto-generated.*$/i, "")
    .trim();
}

async function run() {
  log("Echter Import gestartet");
  log("Quelle: " + SOURCE_URL);

  const res = await fetch(SOURCE_URL);
  if (!res.ok) {
    throw new Error("Quelle nicht erreichbar: " + res.status);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  $("script, style, noscript, svg").remove();

  const text = cleanText($("body").text());

  const parts = text
    .split("|")
    .map(x => cleanText(x))
    .filter(Boolean);

  const events = [];
  const seen = new Set();

  for (let i = 0; i < parts.length; i++) {
    const category = parts[i];

    if (!ALLOWED_CATEGORIES.includes(category)) continue;

    const title = parts[i + 1] || "";
    const dateText = parts[i + 2] || "";

    if (!title) continue;
    if (!/\d{2}\.\d{2}\.\d{4}/.test(dateText)) continue;

    const key = title + "|" + dateText;
    if (seen.has(key)) continue;
    seen.add(key);

    events.push({
      title,
      place: "Dettingen unter Teck",
      date: dateText,
      description: category + " · " + dateText,
      lat: DEFAULT_COORDS[0],
      lng: DEFAULT_COORDS[1]
    });

    log("✅ Event übernommen: " + title + " / " + dateText);
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