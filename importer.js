// importer.js
// Playwright Importer + Geocoding + Debug + Events Generator

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

async function writeDebugPage(page) {
  const debug = await page.evaluate(() => {
    return {
      title: document.title,
      url: location.href,
      bodyLength: document.body.innerText.length,
      bodyPreview: document.body.innerText.slice(0, 3000),
      selectors: {
        article: document.querySelectorAll("article").length,
        event: document.querySelectorAll(".event").length,
        card: document.querySelectorAll(".card").length,
        classEvent: document.querySelectorAll("[class*=event]").length,
        classCard: document.querySelectorAll("[class*=card]").length,
        time: document.querySelectorAll("time").length,
      },
      links: [...document.querySelectorAll("a")]
        .slice(0, 50)
        .map((a) => ({
          text: a.innerText?.trim(),
          href: a.href,
        })),
    };
  });

  fs.mkdirSync("./src/data", {
    recursive: true,
  });

  fs.writeFileSync(
    DEBUG_FILE,
    JSON.stringify(debug, null, 2),
    "utf8"
  );
}

async function scrapePage(page, source) {
  return await page.evaluate((source) => {
    const cards = [
      ...document.querySelectorAll(
        "article, .event, .card, [class*=event], [class*=card]"
      ),
    ];

    return cards.map((el, index) => {
      const text = (sel) =>
        el.querySelector(sel)?.textContent?.trim() || "";

      const attr = (sel, a) =>
        el.querySelector(sel)?.getAttribute(a) || "";

      const allText =
        el.innerText
          ?.split("\n")
          .map((t) => t.trim())
          .filter(Boolean) || [];

      const title =
        text("h1") ||
        text("h2") ||
        text("h3") ||
        allText[0] ||
        "";

      const city =
        text(".city") ||
        text(".location") ||
        allText.find((t) =>
          t.match(
            /(Esslingen|Göppingen|Reutlingen|Stuttgart|Kirchheim|Dettingen)/i
          )
        ) ||
        "";

      const venue =
        text(".venue") ||
        allText[1] ||
        "";

      const street =
        text(".street");

      const zip =
        text(".zip");

      const date =
        text("time") ||
        text(".date") ||
        allText.find((t) =>
          t.match(/\d{2}\.\d{2}\.\d{4}/)
        ) ||
        "";

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
  const existingKeys = new Set(
    existingEvents.map(getEventKey)
  );

  console.log(
    `📦 ${existingEvents.length} vorhandene Events geladen`
  );

  const browser = await chromium.launch({
    headless: true,
  });

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

    console.log(
      `🔎 ${scraped.length} Events auf Quelle gefunden`
    );

    if (!scraped.length) {
      console.log(
        `⚠️ Keine Events auf dieser Quelle gefunden: ${source}`
      );
      continue;
    }

    for (const ev of scraped) {
      if (!ev.title || ev.title.length < 4) {
        continue;
      }

      const key = getEventKey(ev);

      if (existingKeys.has(key)) {
        console.log(
          "⏭️ Bereits vorhanden:",
          ev.title
        );
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

      if (!ev.city && !ev.street) {
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

  if (!newEvents.length) {
    console.log(
      "❌ Abbruch: Scraper hat 0 Events gefunden."
    );

    console.log(
      `📝 Debug-Datei sollte unter ${DEBUG_FILE} liegen`
    );

    console.log(
      "events.js wird NICHT überschrieben."
    );

    return;
  }

  const events = [
    ...existingEvents,
    ...newEvents,
  ];

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
    MISSING_GEO_FILE,
    JSON.stringify(missingGeoEvents, null, 2),
    "utf8"
  );

  fs.writeFileSync(
    MISSING_LOCATION_FILE,
    JSON.stringify(missingLocationEvents, null, 2),
    "utf8"
  );

  console.log(
    `⚠️ ${missingGeoEvents.length} Events ohne Geokoordinaten`
  );

  console.log(
    `📍 ${missingLocationEvents.length} Events mit fehlenden Ortsdaten`
  );

  console.log(
    `✅ ${newEvents.length} neue Events importiert`
  );

  console.log(
    `📦 ${events.length} Events insgesamt gespeichert`
  );
}

run();