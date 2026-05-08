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

    const match = content.match(
      /const EVENTS = ([\s\S]*?);\s*$/
    );

    if (!match?.[1]) {
      return [];
    }

    const events = JSON.parse(match[1]);

    return Array.isArray(events)
      ? events
      : [];
  } catch {
    return [];
  }
}

function saveEvents(events) {
  fs.mkdirSync("./src/data", {
    recursive: true
  });

  fs.writeFileSync(
    OUTPUT_FILE,
    `const EVENTS = ${JSON.stringify(events, null, 2)};\n`,
    "utf8"
  );
}

function saveMissingGeo(events) {
  fs.mkdirSync("./src/data", {
    recursive: true
  });

  fs.writeFileSync(
    MISSING_GEO_FILE,
    JSON.stringify(events, null, 2),
    "utf8"
  );
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeKey(text) {
  return normalizeText(text)
    .toLowerCase();
}

function getEventKey(event) {
  return [
    normalizeKey(event.title),
    normalizeKey(event.date),
    normalizeKey(event.city),
    normalizeKey(event.venue)
  ].join("|");
}

function buildAddress(event) {
  const parts = [];

  if (event.venue) {
    parts.push(event.venue);
  }

  if (event.city) {
    parts.push(event.city);
  }

  parts.push("Deutschland");

  return parts.join(", ");
}

async function geocode(address) {
  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: address,
        format: "json",
        limit: 1
      });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Event-Finder"
      }
    });

    const data = await response.json();

    if (
      Array.isArray(data) &&
      data.length > 0
    ) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon)
      };
    }
  } catch {
    console.log(
      "⚠️ Geocoding Fehler:",
      address
    );
  }

  return {
    lat: null,
    lng: null
  };
}

function extractDate(line) {
  const match = line.match(
    /([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2}(?:\.\d{2})?)\s*·\s*(\d{1,2}:\d{2}\s*Uhr)/
  );

  if (!match) {
    return "";
  }

  return `${match[1]} · ${match[2]}`;
}

function parseEventsFromText(bodyText) {
  const lines = bodyText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const events = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const date = extractDate(line);

    if (!date) continue;

    const title =
      normalizeText(lines[i - 2]);

    const description =
      normalizeText(lines[i - 1]);

    const locationLine =
      normalizeText(lines[i + 1]);

    const locationParts =
      locationLine
        .split(",")
        .map(p => p.trim());

    const venue =
      locationParts[0] || "";

    const city =
      locationParts[
        locationParts.length - 1
      ] || "";

    if (!title || !city) {
      continue;
    }

    events.push({
      title,
      city,
      venue,
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
    const key = getEventKey(event);

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(event);
  }

  return unique;
}

async function scrapeEvents() {
  console.log("🌍", SOURCE_URL);

  const response =
    await fetch(SOURCE_URL);

  const html =
    await response.text();

  const $ = cheerio.load(html);

  const bodyText =
    $("body").text();

  return parseEventsFromText(bodyText);
}

function nextEventId(events) {
  let max = 0;

  for (const event of events) {
    const match = String(
      event.id || ""
    ).match(/^event-(\d+)$/);

    if (match) {
      max = Math.max(
        max,
        Number(match[1])
      );
    }
  }

  return max + 1;
}

async function run() {
  const existingEvents =
    loadExistingEvents();

  const existingKeys =
    new Set(
      existingEvents.map(
        getEventKey
      )
    );

  console.log(
    `📦 ${existingEvents.length} vorhandene Events geladen`
  );

  const scrapedEvents =
    await scrapeEvents();

  console.log(
    `🔎 ${scrapedEvents.length} Events auf Quelle gefunden`
  );

  const newEvents = [];
  const missingGeoEvents = [];

  let nextId =
    nextEventId(existingEvents);

  for (const event of scrapedEvents) {
    const key =
      getEventKey(event);

    if (existingKeys.has(key)) {
      console.log(
        `⏭️ Bereits vorhanden: ${event.title}`
      );

      continue;
    }

    const address =
      buildAddress(event);

    const geo =
      await geocode(address);

    const finalEvent = {
      ...event,
      id: `event-${nextId++}`,
      address,
      lat: geo.lat,
      lng: geo.lng
    };

    if (
      finalEvent.lat === null ||
      finalEvent.lng === null
    ) {
      missingGeoEvents.push(
        finalEvent
      );
    }

    newEvents.push(finalEvent);

    existingKeys.add(key);

    console.log(
      `📍 Neu: ${finalEvent.title}`
    );

    await new Promise(resolve =>
      setTimeout(resolve, 1100)
    );
  }

  const allEvents = [
    ...existingEvents,
    ...newEvents
  ];

  if (allEvents.length === 0) {
    console.log(
      "❌ Keine Events gefunden"
    );

    return;
  }

  saveEvents(allEvents);

  saveMissingGeo(
    missingGeoEvents
  );

  console.log(
    `⚠️ ${missingGeoEvents.length} neue Events ohne Geokoordinaten`
  );

  console.log(
    `✅ ${newEvents.length} neue Events importiert`
  );

  console.log(
    `📦 ${allEvents.length} Events insgesamt gespeichert`
  );
}

run();