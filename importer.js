import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

function log(text) {
  console.log("➡️ " + text);
}

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-dettingen-unter-teck-qqc371901ch50hi80i";

const DEFAULT_COORDS = [48.6167, 9.45];

const BAD_WORDS = [
  "auto-generated",
  "cookie",
  "javascript",
  "veranstaltungen baden-württemberg veranstaltungen",
  "premium-werbeplatz",
  "supporttests",
  "sessionstorage",
  "uint32array",
  "function"
];

function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

function looksBad(text) {
  const t = text.toLowerCase();

  return BAD_WORDS.some(w => t.includes(w));
}

async function run() {
  log("Importer gestartet");

  const res = await fetch(SOURCE_URL);

  if (!res.ok) {
    throw new Error("Quelle nicht erreichbar");
  }

  const html = await res.text();

  const $ = cheerio.load(html);

  $("script").remove();
  $("style").remove();
  $("noscript").remove();
  $("svg").remove();

  const text = cleanText($("body").text());

  const parts = text
    .split("|")
    .map(x => cleanText(x))
    .filter(Boolean);

  const events = [];
  const seen = new Set();

  for (let i = 0; i < parts.length - 2; i++) {
    const title = parts[i];
    const dateText = parts[i + 1];

    if (looksBad(title)) continue;

    if (title.length < 6) continue;

    if (!/\d{2}\.\d{2}\.\d{4}/.test(dateText)) continue;

    const key = title + dateText;

    if (seen.has(key)) continue;

    seen.add(key);

    events.push({
      title,
      place: "Dettingen unter Teck",
      date: dateText,
      description: title,
      lat: DEFAULT_COORDS[0],
      lng: DEFAULT_COORDS[1]
    });

    log("✅ Event: " + title);
  }

  log("Events gefunden: " + events.length);

  if (events.length === 0) {
    throw new Error("Keine Events gefunden");
  }

  fs.writeFileSync(
    "events.js",
    `const EVENTS = ${JSON.stringify(events, null, 2)};`
  );

  log("events.js geschrieben");
}

run().catch(err => {
  console.error("❌ FEHLER:");
  console.error(err);
  process.exit(1);
});