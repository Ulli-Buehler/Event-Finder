// importer.js
// Playwright Importer + Text-Scraping + Geocoding + events.js Generator

import fs from "fs";
import { chromium } from "playwright";

const OUTPUT = "./src/data/events.js";
const DEBUG_FILE = "./src/data/debug-page.json";
const MISSING_GEO_FILE = "./src/data/missing-geo-events.json";
const MISSING_LOCATION_FILE = "./src/data/missing-location-events.json";

const SOURCES = [
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeUrl(url, sourceUrl = "") {
  if (!url) return "";

  try {
    return new URL(url, sourceUrl).href.replace(/\/$/, "").toLowerCase();
  } catch {
    return normalize(url);
  }
}

function getEventKey(event) {
  const url = normalizeUrl(event.url, event.source);

  if (url && url !== normalizeUrl(event.source)) {
    return `url:${url}`;
  }

  return [
    "fallback",
    normalize(event.title),
    normalize(event.date),
    normalize(event.city),
    normalize(event.venue),
  ].join("|");
}

function loadExistingEvents() {
  if (!fs.existsSync(OUTPUT)) return [];

  try {
    const file = fs.readFileSync(OUTPUT, "utf8");
    const match = file.match(/export const events = ([\s\S]*?);\s*$/);

    if (!match?.[1]) return [];

    const events = JSON.parse(match[1]);

    return Array.isArray(events) ? events : [];
  } catch (error) {
    console.warn("⚠️ Vorhandene events.js konnte nicht gelesen werden.");
    console.warn(error.message);
    return [];
  }
}

async function geocode(address) {
  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: address,
        format: "json",
        limit: 1,
      });

    const res = await fetch(url, {
      headers: {
        "User-Agent": "event-importer/1.0",
      },
    });

    const data = await res.json();

    if (!data?.length) {
      return { lat: null, lng: null };
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch {
    return { lat: null, lng: null };
  }
}

function cleanTitle(line) {
  return String(line || "")
    .replace(/\s+link$/i, "")
    .replace(/\s+\*$/i, "")
    .replace(/^tipp\s*/i, "")
    .trim();
}

function isBadTitle(line) {
  const value = normalize(line);

  if (!value) return true;
  if (value.length < 4) return true;

  return [
    "key anmelden",
    "home startseite",
    "gear einstellungen",
    "search suche",
    "map karte",
    "play medien vorschau",
    "location locations",
    "angebote artists",
    "vorschau / tipps",
    "zurück",
    "vor",
    "heute",
    "nächster tag",
    "..mehr",
  ].some((bad) => value.includes(bad));
}

function extractLocation(line) {
  const clean = String(line || "")
    .replace(/^.*?\bpin\s+/i, "")
    .replace(/\s+favoriten.*$/i, "")
    .replace(/\s+X.*$/i, "")
    .replace(/\s+link\s*:/i, ",")
    .trim();

  const withoutTime = clean
    .replace(/\d{1,2}:\d{2}\s*Uhr.*$/i, "")
    .replace(/:\s*\d{1,2}:\d{2}.*$/i, "")
    .trim();

  const withoutDistance = withoutTime
    .replace(/,\s*\d+,\d+\s*km.*$/i, "")
    .replace(/,\s*\d+\s*km.*$/i, "")
    .trim();

  const parts = withoutDistance
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    venue: parts[0] || "",
    city: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

function extractDateTime(line, fallbackDate = "") {
  const time =
    String(line || "").match(/(\d{1,2}:\d{2})\s*Uhr/i)?.[1] ||
    String(line || "").match(/:\s*(\d{1,2}:\d{2})/)?.[1] ||
    "";

  const date =
    String(line || "").match(/([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2})/)?.[1] ||
    String(line || "").match(/\bmorgen\b/i)?.[0] ||
    fallbackDate ||
    "";

  return [date, time ? `${time} Uhr` : ""].filter(Boolean).join(" · ");
}

function parseEventsFromText(bodyText, source) {
  const lines = bodyText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const events = [];
  let currentSectionDate = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const sectionDateMatch = line.match(/\/\s*([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2}\.\d{2})/);
    if (sectionDateMatch) {
      currentSectionDate = sectionDateMatch[1];
      continue;
    }

    const isLocationTimeLine =
      /\bpin\b/i.test(line) &&
      (
        /\d{1,2}:\d{2}\s*Uhr/i.test(line) ||
        /:\s*\d{1,2}:\d{2}/.test(line)
      );

    if (!isLocationTimeLine) {
      continue;
    }

    let title = "";
    let description = "";

    for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
      const candidate = cleanTitle(lines[j]);

      if (
        isBadTitle(candidate) ||
        candidate.startsWith("tags ") ||
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

    if (isBadTitle(title)) {
      continue;
    }

    const { venue, city } = extractLocation(line);
    const date = extractDateTime(line, currentSectionDate);

    events.push({
      id: `event-${events.length + 1}`,
      title,
      city,
      venue,
      street: "",
      zip: "",
      date,
      description,
      image: "",
      url: source,
      source,
    });
  }

  return events;
}

async function writeDebugPage(page) {
  const debug = await page.evaluate(() => ({
    title: document.title,
    url: location.href,
    bodyLength: document.body.innerText.length,
    bodyPreview: document.body.innerText.slice(0, 6000),
    selectors: {
      article: document.querySelectorAll("article").length,
      event: document.querySelectorAll(".event").length,
      card: document.querySelectorAll(".card").length,
      classEvent: document.querySelectorAll("[class*=event]").length,
      classCard: document.querySelectorAll("[class*=card]").length,
      time: document.querySelectorAll("time").length,
    },
    links: [...document.querySelectorAll("a")].slice(0, 50).map((a) => ({
      text: a.innerText?.trim(),
      href: a.href,
    })),
  }));

  fs.mkdirSync("./src/data", { recursive: true });
  fs.writeFileSync(DEBUG_FILE, JSON.stringify(debug, null, 2), "utf8");
}

async function scrapePage(page, source) {
  const bodyText = await page.evaluate(() => document.body.innerText);
  return parseEventsFromText(bodyText, source);
}

function nextEventId(events) {
  let max = 0;

  for (const event of events) {
    const match = String(event.id || "").match(/^event-(\d+)$/);
    if (match) max = Math.max(max, Number(match[1]));
  }

  return max + 1;
}

async function run() {
  const existingEvents = loadExistingEvents();
  const existingKeys = new Set(existingEvents.map(getEventKey));

  console.log(`📦 ${existingEvents.length} vorhandene Events geladen`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const newEvents = [];
  const missingGeoEvents = [];
  const missingLocationEvents = [];

  let nextId = nextEventId(existingEvents);

  for (const source of SOURCES) {
    console.log("🌍", source);

    await page.goto(source, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await sleep(5000);
    await writeDebugPage(page);

    const scraped = await scrapePage(page, source);

    console.log(`🔎 ${scraped.length} Events auf Quelle gefunden`);

    if (!scraped.length) {
      console.log(`⚠️ Keine Events auf dieser Quelle gefunden: ${source}`);
      continue;
    }

    for (const ev of scraped) {
      const key = getEventKey(ev);

      if (existingKeys.has(key)) {
        console.log("⏭️ Bereits vorhanden:", ev.title);
        continue;
      }

      const address = [ev.venue, ev.city, "Deutschland"]
        .filter(Boolean)
        .join(", ");

      if (!ev.city || !ev.venue) {
        missingLocationEvents.push(ev);
      }

      const geo = await geocode(address);

      const event = {
        ...ev,
        id: `event-${nextId++}`,
        address,
        lat: geo.lat,
        lng: geo.lng,
      };

      if (!geo.lat || !geo.lng) {
        missingGeoEvents.push(event);
      }

      newEvents.push(event);
      existingKeys.add(key);

      console.log("📍 Neu:", ev.title, geo.lat, geo.lng);

      await sleep(1100);
    }
  }

  await browser.close();

  if (!newEvents.length && !existingEvents.length) {
    console.log("❌ Abbruch: Keine Events gefunden.");
    console.log("events.js wird NICHT überschrieben.");
    return;
  }

  const events = [...existingEvents, ...newEvents];

  fs.mkdirSync("./src/data", { recursive: true });

  fs.writeFileSync(
    OUTPUT,
    `export const events = ${JSON.stringify(events, null, 2)};\n`,
    "utf8"
  );

  fs.writeFileSync(
    MISSING_GEO_FILE,
    JSON.stringify(missingGeoEvents, null, 2),
    "utf8"
  );

  fs.writeFileSync(
    MISSING_LOCATION_FILE,
    JSON.stringify(missingLocationEvents, null, 2),
    "utf8"
  );

  console.log(`⚠️ ${missingGeoEvents.length} Events ohne Geokoordinaten`);
  console.log(`📍 ${missingLocationEvents.length} Events mit fehlenden Ortsdaten`);
  console.log(`✅ ${newEvents.length} neue Events importiert`);
  console.log(`📦 ${events.length} Events insgesamt gespeichert`);
}

run();