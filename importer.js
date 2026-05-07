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

function cleanTitle(title) {
  return String(title || "")
    .replace(/\s+link$/i, "")
    .replace(/\s+\*$/i, "")
    .trim();
}

function isValidTitle(title) {
  const t = cleanTitle(title);
  const n = normalize(t);

  if (!t || t.length < 5) return false;

  const invalidPatterns = [
    /^ab\s+\d+/i,
    /^\d+\s*€$/i,
    /^genre:/i,
    /^de\s+\d{4}/i,
    /^drama\s*\|/i,
    /^komödie\s*\|/i,
    /^action\s*\|/i,
    /^animation\s*\|/i,
    /^familie\s*\|/i,
    /^fantasy\s*\|/i,
    /^historie\s*\|/i,
    /^horror\s*\|/i,
    /^thriller\s*\|/i,
    /^musik\s*\|/i,
    /^musik\s*\//i,
    /^dokumentarfilm\s*\|/i,
    /^liebesfilm\s*\|/i,
    /^abenteuer,/i,
    /^pin\s+/i,
    /^tags\s+/i,
    /^\d{1,2}:\d{2}\s*uhr/i,
  ];

  if (invalidPatterns.some((regex) => regex.test(t))) {
    return false;
  }

  const invalidContains = [
    "fsk",
    "regie:",
    "darsteller:",
    "darstellende:",
    "schauspieler:",
    "schauspielende:",
    "eintritt frei",
    "reservierung nicht möglich",
  ];

  if (invalidContains.some((bad) => n.includes(bad))) {
    return false;
  }

  const invalidExact = [
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

  if (invalidExact.includes(n)) {
    return false;
  }

  return true;
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

function extractLocation(line) {
  const raw = String(line || "");

  const cleaned = raw
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

  return [date, time ? `${time} Uhr` : ""]
    .filter(Boolean)
    .join(" · ");
}

async function scrapePage(page, source) {
  return await page.evaluate((source) => {
    const normalizeInside = (value) =>
      String(value || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

    const cleanTitleInside = (title) =>
      String(title || "")
        .replace(/\s+link$/i, "")
        .replace(/\s+\*$/i, "")
        .trim();

    const isValidTitleInside = (title) => {
      const t = cleanTitleInside(title);
      const n = normalizeInside(t);

      if (!t || t.length < 5) return false;

      const invalidPatterns = [
        /^ab\s+\d+/i,
        /^\d+\s*€$/i,
        /^genre:/i,
        /^de\s+\d{4}/i,
        /^drama\s*\|/i,
        /^komödie\s*\|/i,
        /^action\s*\|/i,
        /^animation\s*\|/i,
        /^familie\s*\|/i,
        /^fantasy\s*\|/i,
        /^historie\s*\|/i,
        /^horror\s*\|/i,
        /^thriller\s*\|/i,
        /^musik\s*\|/i,
        /^musik\s*\//i,
        /^dokumentarfilm\s*\|/i,
        /^liebesfilm\s*\|/i,
        /^abenteuer,/i,
        /^pin\s+/i,
        /^tags\s+/i,
        /^\d{1,2}:\d{2}\s*uhr/i,
      ];

      if (invalidPatterns.some((regex) => regex.test(t))) {
        return false;
      }

      const invalidContains = [
        "fsk",
        "regie:",
        "darsteller:",
        "darstellende:",
        "schauspieler:",
        "schauspielende:",
        "eintritt frei",
        "reservierung nicht möglich",
      ];

      if (invalidContains.some((bad) => n.includes(bad))) {
        return false;
      }

      const invalidExact = [
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

      if (invalidExact.includes(n)) {
        return false;
      }

      return true;
    };

    const extractLocationInside = (line) => {
      const raw = String(line || "");

      const cleaned = raw
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
    };

    const extractDateInside = (line, currentSectionDate = "") => {
      const date =
        String(line || "").match(/([A-Za-zÄÖÜäöü]{2},\s*\d{2}\.\d{2})/)?.[1] ||
        String(line || "").match(/\bmorgen\b/i)?.[0] ||
        currentSectionDate ||
        "";

      const time =
        String(line || "").match(/(\d{1,2}:\d{2})\s*Uhr/i)?.[1] ||
        String(line || "").match(/:\s*(\d{1,2}:\d{2})/)?.[1] ||
        "";

      return [date, time ? `${time} Uhr` : ""]
        .filter(Boolean)
        .join(" · ");
    };

    const lines = document.body.innerText
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
        (
          /\d{1,2}:\d{2}\s*Uhr/i.test(line) ||
          /:\s*\d{1,2}:\d{2}/.test(line)
        );

      if (!isLocationLine) {
        continue;
      }

      let title = "";
      let description = "";

      for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
        const candidate = cleanTitleInside(lines[j]);

        if (
          !isValidTitleInside(candidate) ||
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

      if (!isValidTitleInside(title)) {
        continue;
      }

      const location = extractLocationInside(line);

      events.push({
        title,
        city: location.city,
        venue: location.venue,
        street: "",
        zip: "",
        date: extractDateInside(line, currentSectionDate),
        description,
        image: "",
        url: source,
        source,
      });
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
  const missingGeoEvents = [];

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
      ev.title = cleanTitle(ev.title);

      if (!isValidTitle(ev.title)) {
        console.log("🚫 Übersprungen:", ev.title);
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
        ev.venue,
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

      if (geo.lat === null || geo.lng === null) {
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

  const events = [
    ...existingEvents,
    ...newEvents,
  ];

  if (events.length === 0) {
    console.log("❌ Abbruch: Keine Events gefunden.");
    console.log("events.js wird NICHT überschrieben.");
    return;
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
    "./src/data/missing-geo-events.json",
    JSON.stringify(missingGeoEvents, null, 2),
    "utf8"
  );

  console.log(
    `⚠️ ${missingGeoEvents.length} neue Events ohne Geokoordinaten`
  );

  console.log(
    `✅ ${newEvents.length} neue Events importiert`
  );

  console.log(
    `📦 ${events.length} Events insgesamt gespeichert`
  );
}

run();