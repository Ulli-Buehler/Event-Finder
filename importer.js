import fs from "fs";
import { chromium } from "playwright";

const OUTPUT = "./src/data/events.js";
const MISSING_GEO_OUTPUT = "./src/data/missing-geo-events.json";

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

function cleanTitle(title) {
  return String(title || "")
    .replace(/\s+link$/i, "")
    .replace(/\s+\*$/i, "")
    .trim();
}

function isInvalidTitle(title) {
  const t = cleanTitle(title);
  const n = normalize(t);

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

function normalizeUrl(url, sourceUrl = "") {
  if (!url) return "";

  try {
    return new URL(url, sourceUrl).href.replace(/\/$/, "").toLowerCase();
  } catch {
    return normalize(url);
  }
}

function getEventKey(event) {
  return [
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
  } catch {
    return [];
  }
}

async function geocode(address) {
  if (!address || address === "Deutschland") {
    return { lat: null, lng: null };
  }

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

function parseEventsFromText(bodyText, source) {
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
        isInvalidTitle(candidate) ||
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

    if (isInvalidTitle(title)) continue;

    events.push({
      title,
      city: location.city,
      venue: location.venue,
      street: "",
      zip: "",
      date,
      description,
      image: "",
      url: source,
      source,
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

async function scrapePage(page, source) {
  const bodyText = await page.evaluate(() => document.body.innerText);
  return parseEventsFromText(bodyText, source);
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

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const newEvents = [];
  const missingGeoEvents = [];

  let nextId = nextEventId(existingEvents);

  for (const source of SOURCES) {
    console.log("🌍", source);

    await page.goto(source, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const scraped = await scrapePage(page, source);

    console.log(`🔎 ${scraped.length} Events auf Quelle gefunden`);

    for (const ev of scraped) {
      const key = getEventKey(ev);

      if (existingKeys.has(key)) {
        console.log("⏭️ Bereits vorhanden:", ev.title);
        continue;
      }

      const address = [ev.venue, ev.city, "Deutschland"]
        .filter(Boolean)
        .join(", ");

      const geo = await geocode(address);

      const event = {
        ...ev,
        id: `event-${nextId++}`,
        address,
        lat: geo.lat,
        lng: geo.lng,
      };

      if (geo.lat === null || geo.lng === null) {
        missingGeoEvents.push(event);
      }

      newEvents.push(event);
      existingKeys.add(key);

      console.log("📍 Neu:", ev.title, geo.lat, geo.lng);

      await sleep(1100);
    }
  }

  await browser.close();

  const events = [...existingEvents, ...newEvents];

  if (events.length === 0) {
    console.log("❌ Abbruch: Keine Events gefunden.");
    console.log("events.js wird NICHT überschrieben.");
    return;
  }

  fs.mkdirSync("./src/data", {
    recursive: true,
  });

  fs.writeFileSync(
    OUTPUT,
    `export const events = ${JSON.stringify(events, null, 2)};\n`,
    "utf8"
  );

  fs.writeFileSync(
    MISSING_GEO_OUTPUT,
    JSON.stringify(missingGeoEvents, null, 2),
    "utf8"
  );

  console.log(`⚠️ ${missingGeoEvents.length} neue Events ohne Geokoordinaten`);
  console.log(`✅ ${newEvents.length} neue Events importiert`);
  console.log(`📦 ${events.length} Events insgesamt gespeichert`);
}

run();