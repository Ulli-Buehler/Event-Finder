import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-heute/";

const KNOWN_COORDS = {
  "Kirchheim unter Teck": [48.6468, 9.4538],
  "Nürtingen": [48.6259, 9.3420],
  "Esslingen": [48.7433, 9.3201],
  "Stuttgart": [48.7758, 9.1829],
  "Ludwigsburg": [48.8941, 9.1955],
  "Tübingen": [48.5216, 9.0576],
  "Karlsruhe": [49.0069, 8.4037],
  "Heilbronn": [49.1427, 9.2109],
  "Baden-Baden": [48.7606, 8.2398],
  "Sinsheim": [49.2529, 8.8787],
  "Östringen": [49.2191, 8.7119]
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

const HOME = [48.6468, 9.4538];

async function run() {
  const res = await fetch(SOURCE_URL);
  const html = await res.text();
  const $ = cheerio.load(html);

  const text = $("body").text();
  const lines = text
    .split("\\n")
    .map(l => l.trim())
    .filter(Boolean);

  const events = [];

  for (let i = 0; i < lines.length; i++) {
    const dateMatch = lines[i].match(/\\d{2}\\.\\d{2}\\.\\d{4}/);

    if (!dateMatch) continue;

    const time = lines[i];
    const locationLine = lines[i - 1] || "";
    const title = lines[i - 2] || "";

    if (!locationLine.includes("|")) continue;

    const parts = locationLine.split("|");
    const category = parts[0].trim();
    const place = parts[1].trim();

    const coords = KNOWN_COORDS[place];
    if (!coords) continue;

    const distance = distanceKm(HOME[0], HOME[1], coords[0], coords[1]);

    if (distance > 50) continue;

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

  const output =
`const EVENTS = ${JSON.stringify(events, null, 2)};
`;

  fs.writeFileSync("events.js", output);

  console.log("events.js geschrieben:", events.length, "Events");
}

run();