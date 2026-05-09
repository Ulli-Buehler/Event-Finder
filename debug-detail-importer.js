import fs from "fs";
import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 20;
const DETAIL_TIMEOUT_MS = 5000;

const textLogs = [];
const structuredLogs = [];

function log(line = "") {
  console.log(line);
  textLogs.push(line);
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

function extractGeoFromUrl(url) {
  if (!url) return null;

  const decoded = decodeURIComponent(url);

  const match = decoded.match(
    /[?&]daddr=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i
  );

  if (!match) return null;

  return {
    lat: Number(match[1]),
    lng: Number(match[2])
  };
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(
    line => line === "calendar"
  );

  if (startIndex === -1) return [];

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex &&
      line.includes("Zum Kalender zufügen")
  );

  return lines.slice(
    Math.max(0, startIndex - 1),
    endIndex === -1 ? startIndex + 40 : endIndex
  );
}

function extractFields(detailLines) {
  const title = normalizeText(detailLines[0] || "");

  const dateIndex = detailLines.findIndex(
    line => line === "calendar"
  );

  const pinIndex = detailLines.findIndex(
    line => line === "pin"
  );

  return {
    title,
    date:
      dateIndex >= 0
        ? normalizeText(detailLines[dateIndex + 1] || "")
        : "",
    location:
      pinIndex >= 0
        ? cleanLocation(detailLines[pinIndex + 1] || "")
        : ""
  };
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

async function readActiveDetail(page) {
  return await page.evaluate(() => {
    const lines = (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const mapLinks = Array.from(
      document.querySelectorAll("a.map_link")
    )
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

  const oldSnapshot = await page.evaluate(
    () => document.body.innerText || ""
  );

  await card.click({
    timeout: 10000
  });

  await waitForDetailChange(page, oldSnapshot);

  const active = await readActiveDetail(page);

  const detailLines = extractDetailBlock(active.lines);

  const fields = extractFields(detailLines);

  const lastMapLink =
    active.mapLinks.length > 0
      ? active.mapLinks[active.mapLinks.length - 1]
      : "";

  const geo = extractGeoFromUrl(lastMapLink);

  return {
    ok: Boolean(
      fields.title &&
        fields.date &&
        fields.location &&
        geo
    ),
    title: fields.title,
    date: fields.date,
    location: fields.location,
    geo,
    mapLink: lastMapLink,
    mapCandidates: active.mapLinks
  };
}

async function run() {
  log("🔎 Debug Detail Importer V10");
  log("Ziel: Geo-Fix mit letztem Map-Link prüfen");
  log(`Max Events: ${MAX_EVENTS}`);
  log("");

  const startedAt = Date.now();

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

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  const count = await page.locator(".termin.inline").count();

  const total = Math.min(count, MAX_EVENTS);

  log(`Gefundene Container: ${count}`);
  log(`Teste Events: ${total}`);
  log("");

  let okCount = 0;
  let errorCount = 0;
  let geoCount = 0;

  for (let i = 0; i < total; i++) {
    try {
      const event = await readEvent(page, i);

      structuredLogs.push({
        index: i + 1,
        ok: event.ok,
        title: event.title,
        date: event.date,
        location: event.location,
        geo: event.geo,
        mapLink: event.mapLink,
        mapCandidates: event.mapCandidates
      });

      if (event.ok) okCount++;
      else errorCount++;

      if (event.geo) geoCount++;

      log(`--- Event ${i + 1} ---`);
      log(`Titel: ${event.title}`);
      log(`Datum: ${event.date}`);
      log(`Ort: ${event.location}`);
      log("");

      log("Map-Kandidaten:");

      event.mapCandidates.forEach((candidate, idx) => {
        const geo = extractGeoFromUrl(candidate);

        log(
          `${idx + 1}. ${candidate} => ${
            geo
              ? `${geo.lat}, ${geo.lng}`
              : "KEINE GEO"
          }`
        );
      });

      log("");
      log(
        `Ausgewählt: ${
          event.geo
            ? `${event.geo.lat}, ${event.geo.lng}`
            : "KEINE GEO"
        }`
      );

      log("");
    } catch (error) {
      errorCount++;

      structuredLogs.push({
        index: i + 1,
        ok: false,
        error: error.message
      });

      log(`--- Event ${i + 1} ---`);
      log(`FEHLER: ${error.message}`);
      log("");
    }
  }

  await browser.close();

  const duration = (
    (Date.now() - startedAt) /
    1000
  ).toFixed(1);

  log("========== ZUSAMMENFASSUNG ==========");
  log(`Events getestet: ${total}`);
  log(`OK: ${okCount}`);
  log(`Fehler: ${errorCount}`);
  log(`Mit Geo: ${geoCount}`);
  log(`Dauer: ${duration}s`);
  log("");
  log("✅ Debug-Test V10 beendet.");

  fs.writeFileSync(
    "debug-output.txt",
    textLogs.join("\n"),
    "utf8"
  );

  fs.writeFileSync(
    "debug-output.json",
    JSON.stringify(structuredLogs, null, 2),
    "utf8"
  );

  console.log("");
  console.log("📄 debug-output.txt geschrieben");
  console.log("📄 debug-output.json geschrieben");
}

run();