import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region";

const GEO_CACHE_FILE = "./geo-cache.json";
const EVENTS_FILE = "./events.js";

console.log("➡️ Import gestartet");

let geoCache = {};

if (fs.existsSync(GEO_CACHE_FILE)) {
  geoCache = JSON.parse(fs.readFileSync(GEO_CACHE_FILE, "utf8"));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractPlace(text) {
  const cleaned = text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const match = cleaned.match(/Märkte\s*\|\s*([^|0-9]+)/);

  if (match && match[1]) {
    return match[1].trim();
  }

  return "Unbekannt";
}

function extractDate(text) {
  const monthMatch = text.match(
    /\b(JAN|FEB|MÄR|APR|MAY|JUN|JUL|AUG|SEP|OCT|OKT|NOV|DEZ)\b/i
  );

  return monthMatch ? monthMatch[1].toUpperCase() : "";
}

async function geocodePlace(place) {
  if (!place || place === "Unbekannt") return null;

  if (geoCache[place]) {
    return geoCache[place];
  }

  console.log("🌍 Geocode:", place);

  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
    encodeURIComponent(place + ", Baden-Württemberg, Deutschland");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Event-Finder/1.0"
    }
  });

  const data = await response.json();

  await sleep(1100);

  if (!data || !data[0]) {
    console.log("⚠️ Keine Koordinaten:", place);
    return null;
  }

  const coords = {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon)
  };

  geoCache[place] = coords;

  fs.writeFileSync(GEO_CACHE_FILE, JSON.stringify(geoCache, null, 2));

  return coords;
}

const browser = await chromium.launch({
  headless: true
});

const page = await browser.newPage();

const EVENTS = [];

for (let pageNum = 1; pageNum <= 11; pageNum++) {
  const url =
    pageNum === 1
      ? START_URL
      : `https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/page/${pageNum}/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region`;

  console.log("➡️ Lade:", url);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  const rawEvents = await page.evaluate(() => {
    const items = [];
    const cards = document.querySelectorAll("article");

    cards.forEach(card => {
      const title =
        card.querySelector("h2, h3")?.innerText?.trim() || "";

      if (!title) return;

      items.push({
        title,
        raw: card.innerText.trim()
      });
    });

    return items;
  });

  console.log(`➡️ Seite ${pageNum}: ${rawEvents.length} Events`);

  for (const event of rawEvents) {
    const place = extractPlace(event.raw);
    const coords = await geocodePlace(place);

    if (!coords) continue;

    EVENTS.push({
      title: event.title,
      place,
      date: extractDate(event.raw),
      description: event.raw,
      lat: coords.lat,
      lng: coords.lng
    });
  }
}

await browser.close();

console.log(`➡️ Gesamt: ${EVENTS.length}`);

const output =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

fs.writeFileSync(EVENTS_FILE, output);

console.log("➡️ events.js geschrieben");