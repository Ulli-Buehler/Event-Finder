import fs from "fs";
import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 50;
const DETAIL_TIMEOUT_MS = 5000;

const textLogs = [];
const structuredLogs = [];
let warningCount = 0;
let previousGeo = null;
let previousLocation = null;

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
    const detailBlock = document.querySelector(".detail-block");

    if (!detailBlock) return { lines: [], mapLinks: [] };

    const lines = (detailBlock.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const mapLinks = Array.from(
      detailBlock.querySelectorAll("a.map_link")
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

  const lastMapLink =
    active.mapLinks.length > 0
      ? active.mapLinks[active.mapLinks.length - 1]
      : "";

  const geo = extractGeoFromUrl(lastMapLink);

  return {
    ok: Boolean(lastMapLink && geo),
    mapCandidates: active.mapLinks,
    mapCandidateCount: active.mapLinks.length,
    geo,
    mapLink: lastMapLink,
    detailLines: active.lines,
  };
}

async function run() {
  log("🔎 Debug Detail Importer V12 - Geo-Fix");
  log("Ziel: Geo-Daten mit letztem Map-Link validieren.");
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

  log(`Gefundene Events: ${count}`);
  log(`Teste Events: ${total}`);
  log("");

  let okCount = 0;
  let errorCount = 0;

  for (let i = 0; i < total; i++) {
    try {
      log(`--- Event ${i + 1} ---`);

      const event = await readEvent(page, i);

      const location = event.detailLines.find(line => line.includes("Ort:")) || "Ort unbekannt";
      const title = event.detailLines[0] || "Unbekannter Titel";

      // Detect warnings
      let warning = "";
      if (
        previousGeo && 
        previousLocation && 
        previousGeo.lat === event.geo?.lat && 
        previousGeo.lng === event.geo?.lng && 
        previousLocation !== location
      ) {
        warning = "WARNUNG: Gleiche Geo bei anderem Ort";
        warningCount++;
        log(warning);
      }

      structuredLogs.push({
        index: i + 1,
        ok: event.ok,
        title,
        date: event.detailLines.find(line => line.includes("Datum:")) || "Datum unbekannt",
        location,
        geo: event.geo,
        mapLink: event.mapLink,
        mapCandidateCount: event.mapCandidateCount,
        warning,
      });

      if (event.ok) {
        okCount++;
      } else {
        errorCount++;
      }

      log(`OK: ${event.ok}`);
      log(`Titel: ${title}`);
      log(`Datum: ${event.detailLines.find(line => line.includes("Datum:")) || "Datum unbekannt"}`);
      log(`Ort: ${location}`);
      log(`Geo: ${event.geo ? `${event.geo.lat}, ${event.geo.lng}` : "Keine Geo"}`);
      log(`Map-Link: ${event.mapLink}`);
      log(`Map-Kandidaten: ${event.mapCandidateCount}`);
      log("");

      previousGeo = event.geo;
      previousLocation = location;

    } catch (error) {
      errorCount++;

      structuredLogs.push({
        index: i + 1,
        ok: false,
        error: error.message,
      });

      log(`FEHLER: ${error.message}`);
      log("");
    }
  }

  const duration = Date.now() - startedAt;
  const averageDuration = (duration / total / 1000).toFixed(2);

  await browser.close();

  log("========== ZUSAMMENFASSUNG ==========");
  log(`Events getestet: ${total}`);
  log(`OK: ${okCount}`);
  log(`Fehler: ${errorCount}`);
  log(`Mit Geo: ${structuredLogs.filter(log => log.geo).length}`);
  log(`Warnungen: ${warningCount}`);
  log(`Dauer: ${(duration / 1000).toFixed(2)}s`);
  log(`Durchschnitt pro Event: ${averageDuration}s`);
  log("");
  log("✔ Debug abgeschlossen.");

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
}

run();