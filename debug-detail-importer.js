import fs from "fs";
import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_FILE = "./src/data/events.js";
const DEBUG_FILE = "./src/data/import-debug.json";
const DATA_DIR = "./src/data";

const MAX_EVENTS = 220;
const DETAIL_TIMEOUT_MS = 5000;
const RETRIES = 2;

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLocation(text) {
  return normalizeText(text)
    .replace(/^pin\s*/i, "")
    .replace(/\s*map\s*link\s*$/i, "")
    .replace(/\s*map\s*$/i, "")
    .trim();
}

function splitLocation(locationText) {
  const cleaned = cleanLocation(locationText);
  const parts = cleaned
    .split(",")
    .map(part => normalizeText(part))
    .filter(Boolean);

  return {
    venue: parts[0] || cleaned,
    city: parts.length > 1 ? parts[parts.length - 1] : ""
  };
}

function extractCategory(listText, title, tags) {
  const text = normalizeText(`${listText} ${title} ${tags}`).toLowerCase();

  if (text.startsWith("party:") || text.includes(" party ")) return "Party";
  if (text.startsWith("konzert:") || text.includes(" konzert ") || text.includes("musik")) return "Konzert";
  if (text.startsWith("bühne:") || text.includes("theater") || text.includes("comedy") || text.includes("kabarett")) return "Bühne";
  if (text.includes("kino") || text.includes("film")) return "Kino";
  if (text.includes("kinder") || text.includes("familie")) return "Kinder";
  if (text.includes("markt")) return "Markt";
  if (text.includes("lesung") || text.includes("vortrag") || text.includes("führung")) return "Vortrag";
  if (text.includes("fest")) return "Fest";

  return "Sonstiges";
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(line => line === "calendar");

  if (startIndex === -1) return [];

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex &&
      line.includes("Zum Kalender zufügen")
  );

  return lines
    .slice(
      Math.max(0, startIndex - 1),
      endIndex === -1 ? startIndex + 40 : endIndex
    )
    .filter(Boolean);
}

function extractFields(detailLines) {
  const title = normalizeText(detailLines[0] || "");

  const dateIndex = detailLines.findIndex(line => line === "calendar");
  const pinIndex = detailLines.findIndex(line => line === "pin");
  const tagsIndex = detailLines.findIndex(line => line === "tags");

  const date =
    dateIndex >= 0
      ? normalizeText(detailLines[dateIndex + 1] || "")
      : "";

  const location =
    pinIndex >= 0
      ? cleanLocation(detailLines[pinIndex + 1] || "")
      : "";

  const tags =
    tagsIndex >= 0
      ? normalizeText(detailLines[tagsIndex + 1] || "")
      : "";

  const descriptionStart = Math.max(
    pinIndex >= 0 ? pinIndex + 2 : 0,
    tagsIndex >= 0 ? tagsIndex + 2 : 0
  );

  const description = detailLines
    .slice(descriptionStart)
    .filter(line => line !== "tags")
    .filter(line => line !== "pin")
    .filter(line => line !== "calendar")
    .filter(line => !line.includes("Tickets bei"))
    .filter(line => !line.includes("Mehr Informationen gibt es auf"))
    .filter(line => !line.startsWith("https://"))
    .join(" ")
    .trim();

  return {
    title,
    date,
    location,
    tags,
    description
  };
}

function extractGeoFromUrl(url) {
  if (!url) return null;

  const decoded = decodeURIComponent(url);

  const patterns = [
    /[?&]daddr=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /[?&](?:q|query|ll)=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /[?&]lat=(-?\d+(?:\.\d+)?).*?[?&](?:lon|lng)=(-?\d+(?:\.\d+)?)/i,
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /#map=\d+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/i
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);

    if (match) {
      return {
        lat: Number(match[1]),
        lng: Number(match[2])
      };
    }
  }

  return null;
}

function makeKey(event) {
  return `${event.title}|${event.date}|${event.location}`
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

async function waitForDetailChange(page, oldSnapshot) {
  await page.waitForFunction(
    previous => {
      const text = document.body.innerText || "";

      return (
        text.includes("calendar") &&
        text.includes("pin") &&
        text !== previous
      );
    },
    oldSnapshot,
    {
      timeout: DETAIL_TIMEOUT_MS
    }
  );
}

async function readCurrentDetail(page) {
  return await page.evaluate(() => {
    const lines = (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const mapLinks = Array.from(document.querySelectorAll("a.map_link"))
      .map(a => a.href || "")
      .filter(Boolean);

    return {
      lines,
      mapLinks
    };
  });
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  const listText = normalizeText(await card.innerText());

  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const oldSnapshot = await page.evaluate(() => document.body.innerText || "");

      await card.click({
        timeout: 10000
      });

      await waitForDetailChange(page, oldSnapshot);

      const detail = await readCurrentDetail(page);
      const detailLines = extractDetailBlock(detail.lines);
      const fields = extractFields(detailLines);

      let geo = null;

      for (const href of detail.mapLinks) {
        geo = extractGeoFromUrl(href);
        if (geo) break;
      }

      const locationParts = splitLocation(fields.location);

      const event = {
        title: fields.title,
        category: extractCategory(listText, fields.title, fields.tags),
        city: locationParts.city,
        venue: locationParts.venue,
        street: "",
        zip: "",
        date: fields.date,
        description: fields.description,
        tags: fields.tags,
        image: "",
        url: SOURCE_URL,
        source: SOURCE_URL,
        location: fields.location,
        address: fields.location,
        lat: geo ? geo.lat : null,
        lng: geo ? geo.lng : null
      };

      if (event.title && event.date && event.location) {
        return {
          ok: true,
          event,
          listText,
          detailLines,
          attempt
        };
      }
    } catch {
      if (attempt >= RETRIES) break;
    }
  }

  return {
    ok: false,
    event: null,
    listText,
    detailLines: [],
    attempt: RETRIES
  };
}

function saveEvents(events) {
  ensureDataDir();

  fs.writeFileSync(
    OUTPUT_FILE,
    `const EVENTS = ${JSON.stringify(events, null, 2)};\n`,
    "utf8"
  );
}

function saveDebug(debug) {
  ensureDataDir();

  fs.writeFileSync(
    DEBUG_FILE,
    JSON.stringify(debug, null, 2),
    "utf8"
  );
}

async function run() {
  console.log("🚀 Event-Finder Importer");
  console.log("Quelle:", SOURCE_URL);
  console.log(`Max Events: ${MAX_EVENTS}`);

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",

    viewport: {
      width: 390,
      height: 844,
      isMobile: true
    }
  });

  const startedAt = Date.now();

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  const count = await page.locator(".termin.inline").count();
  const total = Math.min(count, MAX_EVENTS);

  console.log(`Gefundene Container: ${count}`);
  console.log(`Verarbeite Container: ${total}`);

  const events = [];
  const seen = new Set();
  const debug = {
    source: SOURCE_URL,
    totalContainers: count,
    processedContainers: total,
    imported: 0,
    duplicates: 0,
    failed: 0,
    withoutGeo: 0,
    failures: []
  };

  for (let i = 0; i < total; i++) {
    const result = await readEvent(page, i);

    if (!result.ok || !result.event) {
      debug.failed++;

      debug.failures.push({
        index: i + 1,
        listText: result.listText
      });

      console.log(`${String(i + 1).padStart(3, "0")}. FEHLER`);
      continue;
    }

    const key = makeKey(result.event);

    if (seen.has(key)) {
      debug.duplicates++;

      console.log(
        `${String(i + 1).padStart(3, "0")}. DOPPELT | ${result.event.title}`
      );

      continue;
    }

    seen.add(key);

    const finalEvent = {
      id: `event-${events.length + 1}`,
      ...result.event
    };

    if (finalEvent.lat === null || finalEvent.lng === null) {
      debug.withoutGeo++;
    }

    events.push(finalEvent);

    console.log(
      `${String(i + 1).padStart(3, "0")}. OK | ${finalEvent.title} | ${finalEvent.date} | ${finalEvent.location} | ${finalEvent.lat}, ${finalEvent.lng}`
    );
  }

  await browser.close();

  debug.imported = events.length;
  debug.durationSeconds = Number(((Date.now() - startedAt) / 1000).toFixed(1));

  if (events.length === 0) {
    saveDebug(debug);

    console.log("❌ Keine Events importiert.");
    console.log("events.js wird NICHT überschrieben.");
    return;
  }

  saveEvents(events);
  saveDebug(debug);

  console.log("");
  console.log("========== IMPORT FERTIG ==========");
  console.log(`✅ Events gespeichert: ${events.length}`);
  console.log(`🔁 Dubletten übersprungen: ${debug.duplicates}`);
  console.log(`⚠️ Fehler: ${debug.failed}`);
  console.log(`📍 Ohne Geo: ${debug.withoutGeo}`);
  console.log(`⏱️ Dauer: ${debug.durationSeconds}s`);
  console.log("✅ src/data/events.js geschrieben");
}

run();