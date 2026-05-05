import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/?post_type=event&kategorie=&ort=&region=&von=&bis=";

const GEO_CACHE_FILE = "./geo-cache.json";

let geoCache = {};

if (fs.existsSync(GEO_CACHE_FILE)) {
  geoCache = JSON.parse(fs.readFileSync(GEO_CACHE_FILE, "utf8"));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseEvent(raw, title) {
  const lines = raw
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let place = "Unbekannt";
  let dateText = "";
  let timeText = "";

  for (const line of lines) {
    if (line.includes("|")) {
      const parts = line.split("|").map(p => p.trim());
      if (parts.length >= 2) {
        place = parts[1];
      }
    }

    if (/\d{2}\.\d{2}\.\d{4}/.test(line)) {
      if (line.includes(",")) {
        const parts = line.split(",");
        dateText = parts[0].trim();
        timeText = parts.slice(1).join(",").trim();
      } else {
        dateText = line.trim();
      }
      break;
    }
  }

  const { dateStart, dateEnd } = parseDateRange(dateText);

  return {
    title,
    place,
    date: monthLabel(dateStart),
    dateStart,
    dateEnd,
    dateText,
    timeText,
    description: raw
  };
}

function parseDateRange(dateText) {
  if (!dateText) {
    return { dateStart: null, dateEnd: null };
  }

  if (dateText.includes(" - ")) {
    const parts = dateText.split(" - ");
    return {
      dateStart: toIsoDate(parts[0]),
      dateEnd: toIsoDate(parts[1])
    };
  }

  const single = toIsoDate(dateText);

  return {
    dateStart: single,
    dateEnd: single
  };
}

function toIsoDate(text) {
  const m = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!m) return null;

  return `${m[3]}-${m[2]}-${m[1]}`;
}

function monthLabel(date) {
  if (!date) return "";

  const month = date.split("-")[1];

  const map = {
    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AUG",
    "09": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DEC"
  };

  return map[month] || "";
}

async function geocode(place) {
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

  await sleep(1200);

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

console.log("➡️ Import gestartet");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const EVENTS = [];

for (let pageNum = 1; pageNum <= 11; pageNum++) {
  const url =
    pageNum === 1
      ? START_URL
      : `https://www.veranstaltung-baden-wuerttemberg.de/page/${pageNum}/?post_type=event&kategorie=&ort=&region=&von=&bis=`;

  console.log("➡️ Lade:", url);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await page.waitForTimeout(2000);

  const rawEvents = await page.evaluate(() => {
    const items = [];
    const cards = document.querySelectorAll("article");

    cards.forEach(card => {
      const title =
        card.querySelector("h2, h3")?.innerText?.trim() || "";

      if (!title) return;

      const raw = card.innerText.trim();

      items.push({ title, raw });
    });

    return items;
  });

  console.log(`➡️ Seite ${pageNum}: ${rawEvents.length} Events`);

  for (const item of rawEvents) {
    const parsed = parseEvent(item.raw, item.title);
    const coords = await geocode(parsed.place);

    if (!coords) continue;

    EVENTS.push({
      ...parsed,
      lat: coords.lat,
      lng: coords.lng
    });
  }
}

await browser.close();

const output =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

fs.writeFileSync("./events.js", output);
fs.writeFileSync("./events-preview.js", output);

console.log("➡️ Gesamt:", EVENTS.length);
console.log("➡️ events.js und events-preview.js geschrieben");