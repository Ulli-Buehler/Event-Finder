import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

console.time("Import Dauer");

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-heute/";

const HOME = [48.6468, 9.4538];

const KNOWN_COORDS = {
  "Kirchheim unter Teck": [48.6468, 9.4538],
  "Nürtingen": [48.6259, 9.3420],
  "Esslingen": [48.7433, 9.3201],
  "Stuttgart": [48.7758, 9.1829],
  "Ludwigsburg": [48.8941, 9.1955],
  "Tübingen": [48.5216, 9.0576],
  "Heilbronn": [49.1427, 9.2109]
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

  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

async function run() {
  try {
    log("Importer gestartet");
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

    log("Text Länge: " + bodyText.length + " Zeichen");

    const lines = bodyText
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    log("Zeilen gefunden: " + lines.length);

    console.log("🔍 Erste 30 Zeilen:");
    lines.slice(0, 30).forEach((line, i) => {
      console.log(i + ": " + line);
    });

    const events = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const hasDate = /\d{2}\.\d{2}\.\d{4}/.test(line);

      if (!hasDate) continue;

      const title = lines[i - 2] || "";
      const locationLine = lines[i - 1] || "";
      const time = line;

      console.log("📌 Kandidat:");
      console.log("Titel:", title);
      console.log("Ort/Kategorie:", locationLine);
      console.log("Zeit:", time);

      if (!locationLine.includes("|")) {
        console.log("⚠️ Übersprungen: kein Orttrenner |");
        continue;
      }

      const parts = locationLine.split("|");
      const category = parts[0].trim();
      const place = parts[1].trim();

      if (!KNOWN_COORDS[place]) {
        console.log("⚠️ Ort nicht bekannt:", place);
        continue;
      }

      const coords = KNOWN_COORDS[place];

      const distance = distanceKm(
        HOME[0],
        HOME[1],
        coords[0],
        coords[1]
      );

      if (distance > 50) {
        console.log("⚠️ Zu weit weg:", place, distance + " km");
        continue;
      }

      events.push({
        title,
        place,
        distance: distance + " km",
        lat: coords[0],
        lng: coords[1],
        description: category + " · " + time,
        date: "Sonntag"
      });
    }

    log("Events im Radius gefunden: " + events.length);

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