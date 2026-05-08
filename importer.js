import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_FILE = "./src/data/events.js";
const MISSING_GEO_FILE = "./src/data/missing-geo-events.json";

function loadExistingEvents() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    return [];
  }

  try {
    const content = fs.readFileSync(OUTPUT_FILE, "utf8");
    const match = content.match(/export const events = ([\s\S]*?);\s*$/);

    if (!match?.[1]) {
      return [];
    }

    const events = JSON.parse(match[1]);

    return Array.isArray(events) ? events : [];
  } catch {
    return [];
  }
}

function saveEvents(events) {
  fs.mkdirSync("./src/data", { recursive: true });

  fs.writeFileSync(
    OUTPUT_FILE,
    `export const events = ${JSON.stringify(events, null, 2)};\n`,
    "utf8"
  );
}

function saveMissingGeo(events) {
  fs.mkdirSync("./src/data", { recursive: true });

  fs.writeFileSync(
    MISSING_GEO_FILE,
    JSON.stringify(events, null, 2),
    "utf8"
  );
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function normalizeKey(text) {
  return normalizeText(text).toLowerCase();
}

function cleanTitle(title) {
  return normalizeText(title)
    .replace(/\s+link$/i, "")
    .replace(/\s+\*$/i, "")
    .trim();
}

function isBadTitle(title) {
  const t = cleanTitle(title);
  const n = normalizeKey(t);

  if (!t || t.length < 5) return true;

  const exactBad = [
    "..mehr",
    "buchen",
    "link",
    "zurück",
    "vor",
    "heute",
    "nächster tag",
    "key anmelden",
    "home startseite",
    "gear einstellungen",
    "search suche",
    "map karte",
    "location locations",
    "angebote artists",
  ];

  if (exactBad.includes(n)) return true;

  const badPatterns = [
    /^\(.+\)$/i,
    /^ab\s+/i,
    /^ab\s+klasse/i,
    /^\d+\s*€$/i,
    /^\d{1,2}:\d{2}/i,
    /^tags\s+/i,
    /^pin\s+/i,
    /^genre:/i,
    /^de\s+20\d{2}/i,
    /^usa\s+20\d{2}/i,
    /^live\s+20\d{2}$/i,
    /^sonstige/i,
    /^konzert\s*\/\s*/i,
    /^party\s*\/\s*/i,
    /^kino\s*\/\s*/i,
    /^film\s*\/\s*/i,
    /^drama\s*(\/|\|)/i,
    /^komödie\s*(\/|\|)/i,
    /^action\s*(\/|\|)/i,
    /^animation\s*(\/|\|)/i,
    /^familie\s*(\/|\|)/i,
    /^fantasy\s*(\/|\|)/i,
    /^historie\s*(\/|\|)/i,
    /^horror\s*(\/|\|)/i,
    /^thriller\s*(\/|\|)/i,
    /^musik\s*(\/|\|)/i,
    /^dokumentarfilm\s*(\/|\|)/i,
    /^liebesfilm\s*(\/|\|)/i,
    /^abenteuer\s*(,|\/|\|)/i,
    /^krimi\s*(,|\/|\|)/i,
    /fsk\s*\d+/i,
    /regie:/i,
    /darsteller/i,
    /darstellende/i,
    /schauspiel/i,
    /eintritt frei/i,
    /reservierung nicht möglich/i,
    /ab\s+\d+,\d+\s*€/i,
    /preis:\s*\d+/i,
  ];

  return badPatterns.some((regex) => regex.test(t));
}

function buildAddress(event) {
  let venue = event.venue || "";
  const city = event.city || "";

  venue = venue.replace(/\(.*?\)/g, "").trim();

  venue = venue
    .replace(/\bSaal\b/gi, "")
    .replace(/\bGroßes Haus\b/gi, "")
    .replace(/\bZimmer\b/gi, "")
    .replace(/\bGewölbe\b/gi, "")
    .replace(/\bT1\b/gi, "")
    .replace(/\bT2\b/gi, "")
    .replace(/\bT4\b/gi, "")
    .trim();

  venue = venue.replace(/\s+/g, " ");

  const badVenues = ["EM", "Theater", "Saal", "Kino"];

  if (badVenues.includes(venue)) {
    venue = "";
  }

  if (venue && city) {
    return `${venue}, ${city}, Deutschland`;
  }

  if (city) {
    return `${city}, Deutschland`;
  }

  return "";
}

async function geocode(address) {
  if (!address) {
    return {
      lat: null,
      lng: null,
    };
  }

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: address,
        format: "json",
        limit: 1,
      });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Event-Finder",
      },
    });

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }
  } catch {
    console.log("⚠️ Geocoding Fehler:", address);
  }

  return {
    lat: null,
    lng: null,
  };
}

function extractLocation(line) {
  const cleaned = String(line || "")
    .replace(/^.*?\bpin\s+/i, "")
    .replace(/\s+favoriten.*$/i, "")
    .replace(/\s+X.*$/i, "")
    .replace(/\s+link\s*:/i, ",")
    .replace(/\d{1,2}:\d{2}\s*Uhr.*$/i, "")
    .replace(/:\s*\d{1,2}:\d{2}.*$/i, "")
    .replace(/,\s*\d+,\d+\s*km.*$/i, "")
    .replace(/,\s*\d+\s*km.*$/i, "")
    .trim();

  const parts = cleaned
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    venue: parts[0] || "",
    city: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

function extractDate(line, currentSectionDate = "") {
  const date =
    String(line || "").match(/([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2})/)?.[1] ||
    String(line || "").match(/\bmorgen\b/i)?.[0] ||
    currentSectionDate ||
    "";

  const time =
    String(line || "").match(/(\d{1,2}:\d{2})\s*Uhr/i)?.[1] ||
    String(line || "").match(/:\s*(\d{1,2}:\d{2})/)?.[1] ||
    "";

  return [date, time ? `${time} Uhr` : ""].filter(Boolean).join(" · ");
}

function getEventKey(event) {
  return [
    normalizeKey(event.title),
    normalizeKey(event.date),
    normalizeKey(event.city),
    normalizeKey(event.venue),
  ].join("|");
}

function parseEventsFromText(bodyText) {
  const lines = bodyText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const events = [];
  let currentSectionDate = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const sectionDateMatch = line.match(
      /\/\s*([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2}\.\d{2})/
    );

    if (sectionDateMatch) {
      currentSectionDate = sectionDateMatch[1];
      continue;
    }

    const isLocationLine =
      /\bpin\b/i.test(line) &&
      (/\d{1,2}:\d{2}\s*Uhr/i.test(line) ||
        /:\s*\d{1,2}:\d{2}/.test(line));

    if (!isLocationLine) continue;

    const location = extractLocation(line);
    const date = extractDate(line, currentSectionDate);

    if (!location.venue || !date) continue;

    let title = "";
    let description = "";

    for (let j = i - 1; j >= Math.max(0, i - 6); j--) {
      const candidate = cleanTitle(lines[j]);

      if (
        isBadTitle(candidate) ||
        /\bpin\b/i.test(candidate) ||
        /\d{1,2}:\d{2}\s*Uhr/i.test(candidate)
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
      source: SOURCE_URL,
    });
  }

  const unique = [];
  const seen = new Set();

  for (const event of events) {
    const key = getEventKey(event);

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

function nextEventId(events) {
  let max = 0;

  for (const event of events) {
    const match = String(event.id || "").match(/^event-(\d+)$/);

    if (match) {
      max = Math.max(max, Number(match[1]));
    }
  }

  return max + 1;
}

async function run() {
  const existingEvents = loadExistingEvents();
  const existingKeys = new Set(existingEvents.map(getEventKey));

  console.log(`📦 ${existingEvents.length} vorhandene Events geladen`);

  const scrapedEvents = await scrapeEvents();

  console.log(`🔎 ${scrapedEvents.length} Events auf Quelle gefunden`);

  const newEvents = [];
  const missingGeoEvents = [];

  let nextId = nextEventId(existingEvents);

  for (const event of scrapedEvents) {
    const key = getEventKey(event);

    if (existingKeys.has(key)) {
      console.log(`⏭️ Bereits vorhanden: ${event.title}`);
      continue;
    }

    const address = buildAddress(event);
    const geo = await geocode(address);

    const finalEvent = {
      ...event,
      id: `event-${nextId++}`,
      address,
      lat: geo.lat,
      lng: geo.lng,
    };

    if (finalEvent.lat === null || finalEvent.lng === null) {
      missingGeoEvents.push(finalEvent);
    }

    newEvents.push(finalEvent);
    existingKeys.add(key);

    console.log(`📍 Neu: ${finalEvent.title} ${finalEvent.lat} ${finalEvent.lng}`);

    await new Promise((resolve) => setTimeout(resolve, 1100));
  }

  const allEvents = [...existingEvents, ...newEvents];

  if (allEvents.length === 0) {
    console.log("❌ Abbruch: Keine Events gefunden.");
    console.log("events.js wird NICHT überschrieben.");
    return;
  }

  saveEvents(allEvents);
  saveMissingGeo(missingGeoEvents);

  console.log(`⚠️ ${missingGeoEvents.length} neue Events ohne Geokoordinaten`);
  console.log(`✅ ${newEvents.length} neue Events importiert`);
  console.log(`📦 ${allEvents.length} Events insgesamt gespeichert`);
}

run();