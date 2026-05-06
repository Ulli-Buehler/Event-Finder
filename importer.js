import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/?post_type=event&kategorie=&ort=&region=&von=&bis=";

const BASE_PAGE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/page";

const GEO_CACHE_FILE = "./geo-cache.json";

const MAX_PAGES = 11;
const PAGE_DELAY_MS = 300;

let geoCache = {};

if (fs.existsSync(GEO_CACHE_FILE)) {
  geoCache = JSON.parse(
    fs.readFileSync(GEO_CACHE_FILE, "utf8")
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toIsoDate(text) {
  const match = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!match) return null;
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function monthLabel(isoDate) {
  if (!isoDate) return "";

  const month = isoDate.split("-")[1];

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

function parseDateLine(line) {
  let dateText = line.trim();
  let timeText = "";

  if (dateText.includes(",")) {
    const parts = dateText.split(",");
    dateText = parts[0].trim();
    timeText = parts.slice(1).join(",").trim();
  }

  let dateStart = null;
  let dateEnd = null;

  if (dateText.includes(" - ")) {
    const parts = dateText.split(" - ");
    dateStart = toIsoDate(parts[0]);
    dateEnd = toIsoDate(parts[1]);
  } else {
    dateStart = toIsoDate(dateText);
    dateEnd = dateStart;
  }

  return {
    dateText,
    timeText,
    dateStart,
    dateEnd,
    date: monthLabel(dateStart)
  };
}

function parseRawEvent(raw, fallbackTitle) {
  const lines = raw
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const day = lines[0] || "";
  const month = lines[1] || "";
  const category = lines[2] || "";
  const title = lines[3] || fallbackTitle || "";

  let place = "Unbekannt";
  let categoryLine = "";

  const expectedPrefix = category + " |";

  for (const line of lines) {
    if (line.startsWith(expectedPrefix)) {
      categoryLine = line;

      const parts = line
        .split("|")
        .map(p => p.trim());

      place = parts[1] || "Unbekannt";
      break;
    }
  }

  let dateLine = "";
  let dateLineIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/\d{2}\.\d{2}\.\d{4}/.test(lines[i])) {
      dateLine = lines[i];
      dateLineIndex = i;
      break;
    }
  }

  const dateInfo = parseDateLine(dateLine);

  let summary = "";

  if (dateLineIndex >= 0) {
    const afterDate = lines.slice(dateLineIndex + 1);
    const useful = afterDate.filter(line => line !== "Details");
    summary = useful.join("\n").trim();
  }

  return {
    title,
    category,
    place,
    categoryLine,
    day,
    month,
    ...dateInfo,
    summary,
    description: raw
  };
}

function getCachedCoords(place) {
  if (!place || place === "Unbekannt") {
    return null;
  }

  return geoCache[place] || null;
}

function pageUrl(pageNum) {
  if (pageNum === 1) {
    return START_URL;
  }

  return `${BASE_PAGE_URL}/${pageNum}/?post_type=event&kategorie=&ort=&region=&von=&bis=`;
}

console.log("➡️ Import gestartet");
console.log("➡️ Schnellmodus aktiv");
console.log("➡️ Seitenlimit:", MAX_PAGES);

const browser = await chromium.launch({
  headless: true
});

const page = await browser.newPage();

const EVENTS = [];
const SKIPPED_EVENTS = [];
const MISSING_GEO_PLACES = new Set();

for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
  const url = pageUrl(pageNum);

  console.log("➡️ Lade:", url);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  try {
    await page.waitForSelector("article.event-card", {
      timeout: 10000
    });
  } catch {
    console.log("⚠️ Keine Event-Cards gefunden");
  }

  await page.waitForTimeout(PAGE_DELAY_MS);

  const rawEvents = await page.evaluate(() => {
    const items = [];

    document
      .querySelectorAll("article.event-card")
      .forEach(card => {
        const raw = card.innerText.trim();

        if (!raw) return;

        const title =
          card.querySelector("h2, h3")
            ?.innerText
            ?.trim() || "";

        const detailsLink =
          Array
            .from(card.querySelectorAll("a"))
            .find(a =>
              a.innerText
                .trim()
                .toLowerCase()
                .includes("details")
            );

        const detailsUrl =
          detailsLink
            ? detailsLink.href
            : "";

        items.push({
          raw,
          title,
          detailsUrl
        });
      });

    return items;
  });

  console.log(`➡️ Seite ${pageNum}: ${rawEvents.length} Events`);

  if (rawEvents.length === 0) {
    console.log("➡️ Keine Events mehr gefunden");
    break;
  }

  for (const item of rawEvents) {
    const parsed = parseRawEvent(item.raw, item.title);

    if (!parsed.title || !parsed.dateStart) {
      SKIPPED_EVENTS.push({
        reason: "missing_required_fields",
        parsed,
        detailsUrl: item.detailsUrl,
        raw: item.raw
      });

      continue;
    }

    const coords = getCachedCoords(parsed.place);

    if (!coords && parsed.place && parsed.place !== "Unbekannt") {
      MISSING_GEO_PLACES.add(parsed.place);
    }

    EVENTS.push({
      ...parsed,
      detailsUrl: item.detailsUrl,
      lat: coords ? coords.lat : null,
      lng: coords ? coords.lng : null,
      locationQuality:
        coords
          ? "cached"
          : "missing_or_invalid"
    });

    if (!coords) {
      SKIPPED_EVENTS.push({
        reason: "missing_geocode_but_imported",
        parsed,
        detailsUrl: item.detailsUrl,
        raw: item.raw
      });
    }
  }

  console.log("➡️ Zwischenstand:", EVENTS.length, "Events");

  await sleep(100);
}

await browser.close();

const eventsOutput =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

const skippedOutput =
  "const SKIPPED_EVENTS = " +
  JSON.stringify(SKIPPED_EVENTS, null, 2) +
  ";";

const missingGeoOutput =
  "const MISSING_GEO_PLACES = " +
  JSON.stringify(
    [...MISSING_GEO_PLACES].sort(),
    null,
    2
  ) +
  ";";

fs.writeFileSync("./events.js", eventsOutput);
fs.writeFileSync("./events-preview.js", eventsOutput);
fs.writeFileSync("./skipped-events.js", skippedOutput);
fs.writeFileSync("./missing-geo-places.js", missingGeoOutput);

console.log("➡️ Gesamt importiert:", EVENTS.length);
console.log("➡️ Ohne gültige Koordinaten:", SKIPPED_EVENTS.length);
console.log("➡️ Orte ohne Cache:", MISSING_GEO_PLACES.size);
console.log("➡️ Dateien geschrieben");