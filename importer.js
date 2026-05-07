import fs from "fs";
import { chromium } from "playwright";

const OUTPUT = "./src/data/events.js";

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
  } catch {
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

function isValidTitle(title) {
  if (!title) return false;

  const t = title.trim();

  if (t.length < 6) return false;

  const blockedStarts = [
    "ab ",
    "genre:",
    "drama",
    "komödie",
    "thriller",
    "horror",
    "animation",
    "familie",
    "action",
    "dokumentarfilm",
    "historie",
    "liebesfilm",
    "fantasy",
    "musik /",
    "pin ",
    "tags ",
  ];

  if (
    blockedStarts.some((s) =>
      t.toLowerCase().startsWith(s)
    )
  ) {
    return false;
  }

  if (
    t.match(/^\d{1,2}:\d{2}\s*uhr/i)
  ) {
    return false;
  }

  if (
    t.match(/^ab\s+\d+/i)
  ) {
    return false;
  }

  if (
    t.includes("FSK")
  ) {
    return false;
  }

  if (
    t.includes("Regie:")
  ) {
    return false;
  }

  if (
    t.includes("Darsteller:")
  ) {
    return false;
  }

  return true;
}

async function scrapePage(page, source) {
  return await page.evaluate((source) => {
    const text = document.body.innerText;

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const events = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const next = lines[i + 1] || "";

      if (
        next.match(/\d{1,2}:\d{2}\s*Uhr/i)
      ) {
        events.push({
          title: line,
          date: next,
          city: "",
          venue: "",
          street: "",
          zip: "",
          image: "",
          url: source,
          source,
        });
      }
    }

    return events;
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

  let nextId = nextEventId(existingEvents);

  for (const source of SOURCES) {
    console.log("🌍", source);

    await page.goto(source, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const scraped = await scrapePage(
      page,
      source
    );

    console.log(
      `🔎 ${scraped.length} Events auf Quelle gefunden`
    );

    for (const ev of scraped) {
      if (!isValidTitle(ev.title)) {
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

      await sleep(300);
    }
  }

  await browser.close();

  const events = [
    ...existingEvents,
    ...newEvents,
  ];

  const missingGeo = events.filter(
    (e) => e.lat == null || e.lng == null
  );

  console.log(
    `⚠️ ${missingGeo.length} Events ohne Geokoordinaten`
  );

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

  console.log(
    `✅ ${newEvents.length} neue Events importiert`
  );

  console.log(
    `📦 ${events.length} Events insgesamt gespeichert`
  );
}

run();