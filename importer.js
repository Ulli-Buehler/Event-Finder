import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_FILE = "./src/data/events.js";

function normalize(text) {
  return text
    ?.replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function isGarbageTitle(title) {
  if (!title) return true;

  const t = title.toLowerCase();

  const blockedPatterns = [
    /^ab\s\d+/i,
    /^\d+\s?€$/,
    /^genre:/i,
    /^drama\s?\|/i,
    /^komödie\s?\|/i,
    /^thriller\s?\|/i,
    /^horror\s?\|/i,
    /^familie\s?\|/i,
    /^animation\s?\|/i,
    /^action\s?\|/i,
    /^historie\s?\|/i,
    /^musik\s?\|/i,
    /^dokumentarfilm\s?\|/i,
    /^liebesfilm\s?\|/i,
    /^fantasy\s?\|/i,
    /^de\s20/i,
    /^usa\s20/i,
    /^fsk\s/i,
    /^sonstige/i,
    /^\.\.mehr$/,
  ];

  return blockedPatterns.some((r) => r.test(t));
}

async function getCoordinates(location) {
  if (!location) {
    return { lat: null, lon: null };
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "EventFinder/1.0",
      },
    });

    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.log("⚠️ Geocoding Fehler:", location);
  }

  return { lat: null, lon: null };
}

async function loadExistingEvents() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    return [];
  }

  const content = fs.readFileSync(OUTPUT_FILE, "utf8");

  const match = content.match(/\[(.*)\]/s);

  if (!match) {
    return [];
  }

  try {
    return JSON.parse(`[${match[1]}]`);
  } catch {
    return [];
  }
}

async function scrapeEvents() {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  console.log("🌍", SOURCE_URL);

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 120000,
  });

  await page.waitForTimeout(5000);

  const html = await page.content();

  await browser.close();

  const $ = cheerio.load(html);

  const events = [];

  $(".veranstaltung, .event, .panel").each((_, element) => {
    const container = $(element);

    const textLines = container
      .text()
      .split("\n")
      .map((x) => normalize(x))
      .filter(Boolean);

    let title = null;

    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i];

      const nextLine = textLines[i + 1] || "";

      const hasTime =
        /\d{1,2}:\d{2}/.test(nextLine) ||
        /\d{1,2}\.\d{2}/.test(nextLine) ||
        nextLine.includes("Uhr");

      if (
        line.length > 3 &&
        !isGarbageTitle(line) &&
        hasTime
      ) {
        title = line;
        break;
      }
    }

    if (!title) {
      return;
    }

    const location =
      normalize(container.find(".location").text()) ||
      normalize(container.find(".ort").text()) ||
      normalize(container.find(".venue").text()) ||
      null;

    const date =
      normalize(container.find(".date").text()) ||
      normalize(container.find(".datum").text()) ||
      null;

    const link =
      container.find("a").attr("href") || null;

    events.push({
      title,
      date,
      location,
      link,
    });
  });

  const unique = [];
  const seen = new Set();

  for (const event of events) {
    const key = `${event.title}_${event.date}_${event.location}`;

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(event);
    }
  }

  console.log(`🔎 ${unique.length} Events auf Quelle gefunden`);

  return unique;
}

async function main() {
  const existingEvents = await loadExistingEvents();

  console.log(`📦 ${existingEvents.length} vorhandene Events geladen`);

  const existingKeys = new Set(
    existingEvents.map(
      (e) => `${e.title}_${e.date}_${e.location}`
    )
  );

  const scrapedEvents = await scrapeEvents();

  const newEvents = [];

  let missingCoordinates = 0;

  for (const event of scrapedEvents) {
    const key = `${event.title}_${event.date}_${event.location}`;

    if (existingKeys.has(key)) {
      console.log(`⏭️ Bereits vorhanden: ${event.title}`);
      continue;
    }

    const coords = await getCoordinates(event.location);

    if (!coords.lat || !coords.lon) {
      missingCoordinates++;
    }

    console.log(
      `📍 Neu: ${event.title} ${coords.lat} ${coords.lon}`
    );

    newEvents.push({
      ...event,
      lat: coords.lat,
      lon: coords.lon,
    });
  }

  const allEvents = [...existingEvents, ...newEvents];

  const fileContent = `export const events = ${JSON.stringify(
    allEvents,
    null,
    2
  )};\n`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);

  console.log(
    `⚠️ ${missingCoordinates} neue Events ohne Geokoordinaten`
  );

  console.log(
    `✅ ${newEvents.length} neue Events importiert`
  );

  console.log(
    `📦 ${allEvents.length} Events insgesamt gespeichert`
  );
}

main();