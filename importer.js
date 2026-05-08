import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_FILE = "./src/data/events.js";
const MISSING_GEO_FILE = "./src/data/missing-geo-events.json";

function saveEvents(events) {
  fs.mkdirSync("./src/data", { recursive: true });

  fs.writeFileSync(
    OUTPUT_FILE,
    `const EVENTS = ${JSON.stringify(events, null, 2)};\n`,
    "utf8"
  );
}

function saveMissingGeo(events) {
  fs.mkdirSync("./src/data", { recursive: true });
  fs.writeFileSync(MISSING_GEO_FILE, JSON.stringify(events, null, 2), "utf8");
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function isBadTitle(title) {
  const t = normalizeText(title).toLowerCase();

  if (!t || t.length < 4) return true;

  return [
    "zurück",
    "vor",
    "heute",
    "nächster tag",
    "buchen",
    "link",
    "..mehr",
    "key anmelden",
    "home startseite",
    "gear einstellungen",
    "search suche",
    "map karte"
  ].includes(t);
}

function extractLocation(line) {
  const cleaned = normalizeText(line)
    .replace(/^.*?\bpin\s+/i, "")
    .replace(/\s+favoriten.*$/i, "")
    .replace(/\s+X.*$/i, "")
    .replace(/,\s*\d+,\d+\s*km.*$/i, "")
    .replace(/,\s*\d+\s*km.*$/i, "");

  const parts = cleaned
    .split(",")
    .map(p => p.trim())
    .filter(Boolean);

  return {
    venue: parts[0] || "",
    city: parts.length > 1 ? parts[parts.length - 1] : ""
  };
}

function extractDate(line, fallbackDate = "") {
  const date =
    line.match(/([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2}(?:\.\d{2})?)/)?.[1] ||
    line.match(/\bmorgen\b/i)?.[0] ||
    fallbackDate ||
    "";

  const time = line.match(/(\d{1,2}:\d{2})\s*Uhr/i)?.[1] || "";

  return [date, time ? `${time} Uhr` : ""].filter(Boolean).join(" · ");
}

function buildAddress(event) {
  let venue = event.venue || "";
  const city = event.city || "";

  venue = venue.replace(/\(.*?\)/g, "").trim();
  venue = venue.replace(/\s+/g, " ");

  if (venue && city) return `${venue}, ${city}, Deutschland`;
  if (city) return `${city}, Deutschland`;

  return "";
}

async function geocode(address) {
  if (!address) return { lat: null, lng: null };

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: address,
        format: "json",
        limit: 1
      });

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Event-Finder"
      }
    });

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon)
      };
    }
  } catch {
    console.log("⚠️ Geocoding Fehler:", address);
  }

  return { lat: null, lng: null };
}

function eventKey(event) {
  return [
    event.title,
    event.date,
    event.venue,
    event.city
  ]
    .map(v => normalizeText(v).toLowerCase())
    .join("|");
}

function parseEventsFromText(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const events = [];
  let currentSectionDate = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const sectionDate = line.match(
      /\/\s*([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2}\.\d{2})/
    );

    if (sectionDate) {
      currentSectionDate = sectionDate[1];
      continue;
    }

    const isLocationLine =
      /\bpin\b/i.test(line) &&
      /\d{1,2}:\d{2}\s*Uhr/i.test(line);

    if (!isLocationLine) continue;

    const location = extractLocation(line);
    const date = extractDate(line, currentSectionDate);

    if (!location.venue || !date) continue;

    let title = "";
    let description = "";

    for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
      const candidate = normalizeText(lines[j]);

      if (
        isBadTitle(candidate) ||
        /\bpin\b/i.test(candidate) ||
        /\d{1,2}:\d{2}\s*Uhr/i.test(candidate) ||
        /^tags\s+/i.test(candidate)
      ) {
        continue;
      }

      if (!title) {
        title = candidate;
      } else {
        description = candidate;
        break;
      }
    }

    if (isBadTitle(title)) continue;

    events.push({
      title,
      city: location.city,
      venue: location.venue,
      street: "",
      zip: "",
      date,
      description,
      image: "",
      url: SOURCE_URL,
      source: SOURCE_URL
    });
  }

  const unique = [];
  const seen = new Set();

  for (const event of events) {
    const key = eventKey(event);
    if (seen.has(key)) continue;

    seen.add(key);
    unique.push(event);
  }

  return unique;
}

async function scrapeEvents() {
  console.log("🌍", SOURCE_URL);

  const response = await fetch(SOURCE_URL);
  const html = await response.text();

  const $ = cheerio.load(html);
  const bodyText = $("body").text();

  return parseEventsFromText(bodyText);
}

async function run() {
  const scrapedEvents = await scrapeEvents();

  console.log(`🔎 ${scrapedEvents.length} Events auf Quelle gefunden`);

  const finalEvents = [];
  const missingGeoEvents = [];

  let id = 1;

  for (const event of scrapedEvents) {
    const address = buildAddress(event);
    const geo = await geocode(address);

    const finalEvent = {
      ...event,
      id: `event-${id++}`,
      address,
      lat: geo.lat,
      lng: geo.lng
    };

    if (finalEvent.lat === null || finalEvent.lng === null) {
      missingGeoEvents.push(finalEvent);
    }

    finalEvents.push(finalEvent);

    console.log(`📍 ${finalEvent.title} ${finalEvent.lat} ${finalEvent.lng}`);

    await new Promise(resolve => setTimeout(resolve, 1100));
  }

  if (finalEvents.length === 0) {
    console.log("❌ Abbruch: Keine Events gefunden.");
    console.log("events.js wird NICHT überschrieben.");
    return;
  }

  saveEvents(finalEvents);
  saveMissingGeo(missingGeoEvents);

  console.log(`⚠️ ${missingGeoEvents.length} Events ohne Geokoordinaten`);
  console.log(`✅ ${finalEvents.length} Events gespeichert`);
  console.log("✅ src/data/events.js korrekt als const EVENTS geschrieben");
}

run();