// importer.js
// Playwright Importer + Geocoding + events.js Generator
// Importiert nur neue Events und ignoriert vorhandene Duplikate
// Mit Schreibschutz: events.js wird nie leer überschrieben
// Debug-Version: prüft, warum aktuell keine Events gefunden werden

import fs from "fs";
import { chromium } from "playwright";

const OUTPUT = "./src/data/events.js";
const MISSING_GEO_OUTPUT = "./src/data/missing-geo-events.json";
const MISSING_LOCATION_OUTPUT = "./src/data/missing-location-events.json";

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

function hasGeo(event) {
  return (
    typeof event.lat === "number" &&
    typeof event.lng === "number" &&
    !Number.isNaN(event.lat) &&
    !Number.isNaN(event.lng)
  );
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
    console.log("=== DEBUG START ===");
    console.log("Titel:", document.title);
    console.log("URL:", window.location.href);
    console.log("Body Länge:", document.body.innerText.length);
    console.log("Body Anfang:", document.body.innerText.slice(0, 1000));

    const links = [...document.querySelectorAll("a")]
      .slice(0, 30)
      .map((a) => ({
        text: a.textContent?.trim(),
        href: a.href,
      }));

    console.log("Links:", links);

    console.log("article:", document.querySelectorAll("article").length);
    console.log(".event:", document.querySelectorAll(".event").length);
    console.log(".card:", document.querySelectorAll(".card").length);
    console.log("[class*='event']:", document.querySelectorAll("[class*='event']").length);
    console.log("[class*='card']:", document.querySelectorAll("[class*='card']").length);
    console.log("time:", document.querySelectorAll("time").length);

    console.log("=== DEBUG END ===");

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

function findMissingGeoEvents(events) {
  return events
    .filter((event) => !hasGeo(event))
    .map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      venue: event.venue,
      street: event.street,
      zip: event.zip,
      city: event.city,
      address: event.address,
      lat: event.lat ?? null,
      lng: event.lng ?? null,
      url: event.url,
      source: event.source,
    }));
}

function findMissingLocationEvents(events) {
  return events
    .filter((event) => {
      const city = normalize(event.city);
      const venue = normalize(event.venue);

      return (
        !city ||
        !venue ||
        city === "unbekannt" ||
        venue === "unbekannt" ||
        venue === "ohne standort"
      );
    })
    .map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      venue: event.venue,
      street: event.street,
      zip: event.zip,
      city: event.city,
      address: event.address,
      lat: event.lat ?? null,
      lng: event.lng ?? null,
      url: event.url,
      source: event.source,
    }));
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
  let totalScraped = 0;
  let nextId = nextEventId(existingEvents);

  for (const source of SOURCES) {
    console.log("🌍", source);

    await page.goto(source, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    await page.waitForTimeout(3000);

    const scraped = await scrapePage(page, source);
    totalScraped += scraped.length;

    console.log(`🔎 ${scraped.length} Events auf Quelle gefunden`);

    if (scraped.length === 0) {
      console.warn("⚠️ Keine Events auf dieser Quelle gefunden:", source);
      continue;
    }

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

  if (totalScraped === 0) {
    console.error("❌ Abbruch: Scraper hat 0 Events gefunden.");
    console.error("events.js wird NICHT überschrieben.");
    process.exit(1);
  }

  if (events.length === 0) {
    console.error("❌ Abbruch: Es würden 0 Events gespeichert.");
    console.error("events.js wird NICHT überschrieben.");
    process.exit(1);
  }

  const missingGeoEvents = findMissingGeoEvents(events);
  const missingLocationEvents = findMissingLocationEvents(events);

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

  fs.writeFileSync(
    MISSING_LOCATION_OUTPUT,
    JSON.stringify(missingLocationEvents, null, 2),
    "utf8"
  );

  console.log(`🔎 ${totalScraped} Events insgesamt gescraped`);
  console.log(`⚠️ ${missingGeoEvents.length} Events ohne Geokoordinaten`);
  console.log(`📍 ${missingLocationEvents.length} Events mit fehlenden Ortsdaten`);
  console.log(`✅ ${newEvents.length} neue Events importiert`);
  console.log(`📦 ${events.length} Events insgesamt gespeichert`);
}

run();