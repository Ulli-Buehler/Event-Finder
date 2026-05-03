import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

console.time("Import Dauer");

const CONFIG_TEXT = fs.readFileSync("config.js", "utf8");

function readConfigValue(name, fallback) {
  const match = CONFIG_TEXT.match(new RegExp(name + ":\\s*\"([^\"]+)\""));
  return match ? match[1] : fallback;
}

function readConfigNumber(name, fallback) {
  const match = CONFIG_TEXT.match(new RegExp(name + ":\\s*(\\d+)"));
  return match ? Number(match[1]) : fallback;
}

const IMPORT_PLACE = readConfigValue("place", "Dettingen Teck");
const IMPORT_RADIUS = readConfigNumber("radiusKm", 50);

const HOME = [48.6468, 9.4538];

const PLACE_SLUG = "dettingen-unter-teck";
const PLACE_ID = "371901";

const SOURCE_URL =
  `https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-${PLACE_SLUG}-qqc${PLACE_ID}ch${IMPORT_RADIUS}hi80i`;

const ALLOWED_CATEGORIES = [
  "Märkte",
  "Feste"
];

const KNOWN_COORDS = {
  "Dettingen unter Teck": [48.6167, 9.45],
  "Kirchheim unter Teck": [48.6468, 9.4538],
  "Nürtingen": [48.6259, 9.3420],
  "Esslingen am Neckar": [48.7433, 9.3201],
  "Esslingen": [48.7433, 9.3201],
  "Stuttgart": [48.7758, 9.1829],
  "Ludwigsburg": [48.8941, 9.1955],
  "Tübingen": [48.5216, 9.0576],
  "Heilbronn": [49.1427, 9.2109],
  "Eislingen/Fils": [48.6955, 9.7063],
  "Eislingen": [48.6955, 9.7063],
  "Rechberghausen": [48.7303, 9.6436],
  "Göppingen": [48.7054, 9.6512],
  "Geislingen an der Steige": [48.6217, 9.8306],
  "Bad Boll": [48.6374, 9.6150],
  "Lichtenwald": [48.7475, 9.4781],
  "Wendlingen am Neckar": [48.6712, 9.3763],
  "Plochingen": [48.7107, 9.4196],
  "Wernau": [48.6932, 9.4152],
  "Weilheim an der Teck": [48.6156, 9.5375],
  "Owen": [48.5862, 9.4491],
  "Lenningen": [48.5507, 9.4707],
  "Bissingen an der Teck": [48.5991, 9.4912],
  "Holzmaden": [48.6337, 9.5154],
  "Notzingen": [48.6705, 9.4562],
  "Ebersbach an der Fils": [48.7167, 9.5333],
  "Uhingen": [48.7040, 9.5862],
  "Schorndorf": [48.8054, 9.5272]
};

function log(msg) {
  console.log("➡️ " + msg);
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return Math.round(
    R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

function normalizePlace(place) {
  return place
    .replace(/\s+/g, " ")
    .replace("Dettingen Teck", "Dettingen unter Teck")
    .trim();
}

function isAllowedCategory(category) {
  return ALLOWED_CATEGORIES.some(c =>
    category.toLowerCase().includes(c.toLowerCase())
  );
}

function getNextSundayText() {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? 0 : 7 - day;

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diff);

  return sunday.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}

async function run() {
  try {
    log("Importer gestartet");
    log("Import-Ort: " + IMPORT_PLACE);
    log("Import-Radius: " + IMPORT_RADIUS + " km");
    log("Quelle: " + SOURCE_URL);

    const res = await fetch(SOURCE_URL);
    log("HTTP Status: " + res.status);

    if (!res.ok) {
      throw new Error("Website konnte nicht geladen werden");
    }

    const html = await res.text();
    log("HTML Länge: " + html.length + " Zeichen");

    const $ = cheerio.load(html);
    const bodyText = $("body").text();

    const lines = bodyText
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    log("Zeilen gefunden: " + lines.length);

    const events = [];
    const seen = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const hasDate = /\d{2}\.\d{2}\.\d{4}/.test(line);
      if (!hasDate) continue;

      const title = lines[i - 2] || "";
      const categoryLine = lines[i - 1] || "";
      const time = line;

      let category = categoryLine;
      let place = "";

      if (categoryLine.includes("|")) {
        const parts = categoryLine.split("|");
        category = parts[0].trim();
        place = parts[1].trim();
      } else {
        place = lines[i - 3] || "";
      }

      place = normalizePlace(place);

      console.log("📌 Kandidat:");
      console.log("Titel:", title);
      console.log("Kategorie:", category);
      console.log("Ort:", place);
      console.log("Zeit:", time);

      if (!isAllowedCategory(category)) {
        console.log("⚠️ Kategorie übersprungen:", category);
        continue;
      }

      const coords = KNOWN_COORDS[place];

      if (!coords) {
        console.log("⚠️ Ort nicht bekannt:", place);
        continue;
      }

      const distance = distanceKm(
        HOME[0],
        HOME[1],
        coords[0],
        coords[1]
      );

      if (distance > IMPORT_RADIUS) {
        console.log("⚠️ Zu weit weg:", place, distance + " km");
        continue;
      }

      const key = title + "|" + place + "|" + time;
      if (seen.has(key)) continue;
      seen.add(key);

      events.push({
        title,
        place,
        distance: distance + " km",
        lat: coords[0],
        lng: coords[1],
        description: category + " · " + time,
        date: getNextSundayText()
      });
    }

    log("Events im Import-Radius gefunden: " + events.length);

    const output =
`const EVENTS = ${JSON.stringify(events, null, 2)};
`;

    fs.writeFileSync("events.js", output);

    log("events.js wurde geschrieben");
    log("Importer fertig ✅");

  } catch (err) {
    console.error("❌ IMPORTER FEHLER:");
    console.error(err);
    process.exit(1);
  }
}

run().finally(() => {
  console.timeEnd("Import Dauer");
});