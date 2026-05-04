import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

function log(text) {
  console.log("➡️ " + text);
}

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-dettingen-unter-teck-qqc371901ch50hi80i";

const DEFAULT_COORDS = [48.6167, 9.45];

const ALLOWED_CATEGORIES = ["Feste", "Märkte"];

function clean(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function badTitle(title) {
  const t = title.toLowerCase();

  return (
    t.includes("veranstaltungen baden") ||
    t.includes("premium-werbeplatz") ||
    t.includes("cookie") ||
    t.includes("javascript") ||
    t.includes("function") ||
    t.length < 4
  );
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

  const lines = $("body")
    .text()
    .split("\n")
    .map(clean)
    .filter(Boolean);

  log("Zeilen gefunden: " + lines.length);

  const events = [];
  const seen = new Set();

  for (let i = 0; i < lines.length; i++) {
    const category = lines[i];

    if (!ALLOWED_CATEGORIES.includes(category)) continue;

    const title = clean(lines[i + 1]);
    const dateText = clean(lines[i + 2]);
    const description = clean(lines[i + 3]);

    if (badTitle(title)) continue;
    if (!/\d{2}\.\d{2}\.\d{4}/.test(dateText)) continue;

    const key = title + "|" + dateText;
    if (seen.has(key)) continue;
    seen.add(key);

    events.push({
      title,
      place: "Dettingen unter Teck",
      date: dateText,
      description: description || category,
      lat: DEFAULT_COORDS[0],
      lng: DEFAULT_COORDS[1]
    });

    log("✅ Event übernommen: " + title + " / " + dateText);
  }

  log("Events gefunden: " + events.length);

  if (events.length === 0) {
    throw new Error("Keine echten Events gefunden — events.js bleibt unverändert");
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