import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

function log(text) {
  console.log("➡️ " + text);
}

const SOURCES = [
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen+Teck&umkreis=30&region=&von=2026-05-10&bis=2026-05-10",
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/feste/?post_type=event&ort=Dettingen+Teck&umkreis=30&region=&von=2026-05-10&bis=2026-05-10"
];

const COORDS = {
  "Dettingen unter Teck": [48.6167, 9.45],
  "Dettingen Teck": [48.6167, 9.45],
  "Kirchheim unter Teck": [48.6468, 9.4538],
  "Kirchheim": [48.6468, 9.4538],
  "Nürtingen": [48.6259, 9.3420],
  "Frickenhausen": [48.5935, 9.3608],
  "Weilheim an der Teck": [48.6156, 9.5375],
  "Eislingen": [48.6955, 9.7063],
  "Eislingen/Fils": [48.6955, 9.7063],
  "Göppingen": [48.7054, 9.6512],
  "Rechberghausen": [48.7303, 9.6436],
  "Plochingen": [48.7107, 9.4196],
  "Wendlingen am Neckar": [48.6712, 9.3763],
  "Esslingen": [48.7433, 9.3201],
  "Esslingen am Neckar": [48.7433, 9.3201],
  "Tübingen": [48.5216, 9.0576],
  "Reutlingen": [48.4914, 9.2043],
  "Ludwigsburg": [48.8941, 9.1955],
  "Stuttgart": [48.7758, 9.1829]
};

function clean(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function isDate(text) {
  return /\d{2}\.\d{2}\.\d{4}/.test(text);
}

function isCategory(text) {
  return text === "Märkte" || text === "Feste";
}

function badTitle(title) {
  const t = title.toLowerCase();
  return (
    t.includes("veranstaltungen baden") ||
    t.includes("premium-werbeplatz") ||
    t.includes("newsletter") ||
    t.includes("cookie") ||
    t.includes("suche") ||
    t.length < 4
  );
}

function coordsFor(place) {
  return COORDS[place] || null;
}

async function loadSource(url) {
  log("Quelle lade: " + url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Quelle nicht erreichbar: " + res.status);

  const html = await res.text();
  const $ = cheerio.load(html);

  $("script, style, noscript, svg").remove();

  return $("body")
    .text()
    .split("\n")
    .map(clean)
    .filter(Boolean);
}

async function run() {
  const events = [];
  const seen = new Set();

  for (const source of SOURCES) {
    const lines = await loadSource(source);
    log("Zeilen gefunden: " + lines.length);

    for (let i = 0; i < lines.length - 3; i++) {
      const category = lines[i];

      if (!isCategory(category)) continue;

      const title = lines[i + 1];
      const locationLine = lines[i + 2];
      const dateText = lines[i + 3];

      if (badTitle(title)) continue;
      if (!locationLine.includes("|")) continue;
      if (!isDate(dateText)) continue;

      const place = clean(locationLine.split("|").pop());
      const coords = coordsFor(place);

      if (!coords) {
        log("⚠️ Ort ohne Koordinaten übersprungen: " + place);
        continue;
      }

      const key = title + "|" + place + "|" + dateText;
      if (seen.has(key)) continue;
      seen.add(key);

      events.push({
        title,
        place,
        date: dateText,
        description: category + " · " + dateText,
        lat: coords[0],
        lng: coords[1]
      });

      log("✅ Event übernommen: " + title + " / " + place);
    }
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