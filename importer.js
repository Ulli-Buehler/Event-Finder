import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

console.time("Import Dauer");

function log(text) {
  console.log("➡️ " + text);
}

const configText = fs.readFileSync("config.js", "utf8");
eval(configText);

const CONFIG = globalThis.IMPORT_CONFIG;

if (!CONFIG) {
  throw new Error("IMPORT_CONFIG wurde nicht gefunden");
}

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-dettingen-unter-teck-qqc371901ch50hi80i";

const HOME = [48.6468, 9.4538];

const KNOWN_COORDS = {
  "Dettingen unter Teck": [48.6167, 9.45],
  "Dettingen Teck": [48.6167, 9.45],
  "Kirchheim unter Teck": [48.6468, 9.4538],
  "Kirchheim": [48.6468, 9.4538],
  "Eislingen": [48.6955, 9.7063],
  "Eislingen/Fils": [48.6955, 9.7063],
  "Rechberghausen": [48.7303, 9.6436],
  "Göppingen": [48.7054, 9.6512],
  "Nürtingen": [48.6259, 9.3420],
  "Esslingen": [48.7433, 9.3201],
  "Esslingen am Neckar": [48.7433, 9.3201],
  "Plochingen": [48.7107, 9.4196],
  "Wendlingen am Neckar": [48.6712, 9.3763],
  "Wernau": [48.6932, 9.4152],
  "Weilheim an der Teck": [48.6156, 9.5375],
  "Owen": [48.5862, 9.4491],
  "Bad Boll": [48.6374, 9.6150],
  "Uhingen": [48.7040, 9.5862],
  "Ebersbach an der Fils": [48.7167, 9.5333]
};

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function isWantedEvent(text) {
  const t = text.toLowerCase();
  return (
    t.includes("markt") ||
    t.includes("märkte") ||
    t.includes("fest") ||
    t.includes("stadtfest") ||
    t.includes("dorffest") ||
    t.includes("frühlingsmarkt") ||
    t.includes("flohmarkt")
  );
}

function findKnownPlace(text) {
  for (const place of Object.keys(KNOWN_COORDS)) {
    if (text.includes(place)) {
      return place;
    }
  }
  return null;
}

async function geocode(place) {
  if (KNOWN_COORDS[place]) return KNOWN_COORDS[place];

  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
    encodeURIComponent(place + ", Baden-Württemberg, Deutschland");

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Event-Finder-App"
    }
  });

  const data = await res.json();

  if (!data.length) return null;

  return [Number(data[0].lat), Number(data[0].lon)];
}

async function run() {
  log("Importer gestartet");
  log("Ort: " + CONFIG.place);
  log("Import-Radius: " + CONFIG.radiusKm + " km");
  log("Quelle: " + SOURCE_URL);

  const res = await fetch(SOURCE_URL);

  if (!res.ok) {
    throw new Error("Quelle konnte nicht geladen werden: " + res.status);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const lines = $("body")
    .text()
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  log("Zeilen gefunden: " + lines.length);

  const events = [];
  const seen = new Set();

  for (let i = 0; i < lines.length; i++) {
    if (!/\d{2}\.\d{2}\.\d{4}/.test(lines[i])) continue;

    const block = lines.slice(Math.max(0, i - 6), i + 2).join(" ");
    if (!isWantedEvent(block)) continue;

    const dateLine = lines[i];
    const title = lines[i - 2] || lines[i - 1] || "Veranstaltung";
    const place = findKnownPlace(block);

    if (!place) {
      log("⚠️ Ort nicht erkannt: " + block);
      continue;
    }

    const coords = await geocode(place);

    if (!coords) {
      log("⚠️ Keine Koordinaten für: " + place);
      continue;
    }

    const distance = distanceKm(HOME[0], HOME[1], coords[0], coords[1]);

    if (distance > CONFIG.radiusKm) {
      log("⚠️ Zu weit weg: " + place + " " + distance + " km");
      continue;
    }

    const key = title + "|" + place + "|" + dateLine;
    if (seen.has(key)) continue;
    seen.add(key);

    events.push({
      title,
      place,
      date: "Sonntag",
      description: dateLine,
      distance: distance + " km",
      lat: coords[0],
      lng: coords[1]
    });

    log("✅ Event übernommen: " + title + " / " + place);
  }

  log("Events gefunden: " + events.length);

  if (events.length === 0) {
    throw new Error("Keine Events gefunden — events.js wird nicht überschrieben");
  }

  const fileContent =
`const EVENTS = ${JSON.stringify(events, null, 2)};`;

  fs.writeFileSync("events.js", fileContent);

  log("events.js geschrieben");
  log("Import erfolgreich");
}

run()
  .catch(err => {
    console.error("❌ IMPORTER FEHLER:");
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.timeEnd("Import Dauer");
  });