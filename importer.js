// importer.js
// Playwright Importer + Geocoding + events.js Generator
// Importiert nur neue Events und ignoriert vorhandene Duplikate
// Erstellt zusätzlich eine Diagnose-Datei für fehlende Geokoordinaten

import fs from "fs";
import { chromium } from "playwright";

const OUTPUT = "./src/data/events.js";
const MISSING_GEO_OUTPUT = "./src/data/missing-geo-events.json";

const SOURCES = [
  "https://www.wasgehtapp.de/events",
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
    return new URL(url, sourceUrl).href
      .replace(/\/$/, "")
      .toLowerCase();
  } catch {
    return normalize(url);
  }
}

function getEventKey(event) {
  const url = normalizeUrl(event.url, event.source);

  if (url) {
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
  if (!fs.existsSync(OUTPUT)) {
    return [];
  }

  try {
    const file = fs.readFileSync(OUTPUT, "utf8");

    const match = file.match(/export const events = ([\s\S]*?);\s*$/);

    if (!match?.[1]) {
      return [];
    }

    const events = JSON.parse(match[1]);

    if (!Array.isArray(events)) {
      return [];
    }

    return events;
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
      return {
        lat: null,
        lng: null,
      };
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch {
    return {
      lat: null,
      lng: null,
    };
  }
}

async function scrapePage(page, source) {
  return await page.evaluate((source) => {
    const cards = [...document.querySelectorAll("article, .event, .card")];

    return cards.map((el, index) => {
      const text = (sel) =>
        el.querySelector(sel)?.textContent?.trim() || "";

      const attr = (sel, a) =>
        el.querySelector(sel)?.getAttribute(a) || "";

      const title =
        text("h1") ||
        text("h2") ||
        text("h3");

      const city =
        text(".city") ||
        text(".location");

      const venue =
        text(".venue");

      const street =
        text(".street");

      const zip =
        text(".zip");

      const date =
        text("time") ||
        text(".date");

      const image =
        attr("img", "src");

      const url =
        attr("a", "href");

      return {
        id: `event-${index + 1}`,
        title,
        city,
        venue,
        street,
        zip,
        date,
        image,
        url,
        source,
      };
    });
  }, source);
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
  let nextId = nextEventId(existingEvents);

  for (const source of SOURCES) {
    console.log("🌍", source);

    await page.goto(source, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const scraped = await scrapePage(page, source);

    for (const ev of scraped) {
      const key = getEventKey(ev);

      if (existingKeys.has(key)) {
        console.log("⏭️ Bereits vorhanden:", ev.title);
        continue;
      }

      const address = [
        ev.street,
        ev.zip,
        ev.city,
        "Deutschland",
      ]
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

      newEvents.push(event);
      existingKeys.add(key);

      console.log(
        "📍 Neu:",
        ev.title,
        geo.lat,
        geo.lng
      );

      await sleep(1100);
    }
  }

  await browser.close();

  const events = [
    ...existingEvents,
    ...newEvents,
  ];

  const missingGeoEvents = events.filter(
    (event) =>
      event.lat === null ||
      event.lng === null
  );

  if (missingGeoEvents.length > 0) {
    console.log("⚠️ Events ohne Geokoordinaten:");

    for (const event of missingGeoEvents) {
      console.log({
        title: event.title,
        date: event.date,
        venue: event.venue,
        street: event.street,
        zip: event.zip,
        city: event.city,
        address: event.address,
        url: event.url,
      });
    }
  }

  const content =
    `export const events = ` +
    JSON.stringify(events, null, 2) +
    `;\n`;

  fs.mkdirSync("./src/data", {
    recursive: true,
  });

  fs.writeFileSync(
    OUTPUT,
    content,
    "utf8"
  );

  fs.writeFileSync(
    MISSING_GEO_OUTPUT,
    JSON.stringify(missingGeoEvents, null, 2),
    "utf8"
  );

  console.log(
    `⚠️ ${missingGeoEvents.length} Events ohne Geokoordinaten`
  );

  console.log(
    `✅ ${newEvents.length} neue Events importiert`
  );

  console.log(
    `📦 ${events.length} Events insgesamt gespeichert`
  );
}

run();