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
    const detailBlock = document.querySelector(".detail-block"); // Use specific detail block class
    
    if (!detailBlock) return { lines: [], mapLinks: [] }; // Guard clause if detail block is missing

    const lines = (detailBlock.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const mapLinks = Array.from(
      detailBlock.querySelectorAll("a.map_link") // Scoped to the detail block
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
      ? active.mapLinks[active.mapLinks.length - 1] // Use the last map link
      : "";

  const geo = extractGeoFromUrl(lastMapLink);

  return {
    ok: Boolean(lastMapLink && geo),
    mapCandidates: active.mapLinks,
    geo,
    mapLink: lastMapLink
  };
}

async function run() {
  log("[34m[1mDebug Detail Importer V11 - Geo-Fix[0m");
  log("Ziel: Geo-Daten aus letzten Map-Link prüfen.");
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

  for (let i = 0; i < total; i++) {
    try {
      log(`--- Event ${i + 1} ---`);

      const event = await readEvent(page, i);

      log("Map-Kandidaten:");
      event.mapCandidates.forEach((candidate, idx) => {
        const geo = extractGeoFromUrl(candidate);

        log(
          `${idx + 1}. ${candidate} => ${
            geo ? `${geo.lat}, ${geo.lng}` : "FEHLT"
          }`
        );
      });

      log(
        `Gewählt: ${
          event.geo ? `${event.geo.lat}, ${event.geo.lng}` : "KEINE GEO"
        }`
      );

      log("");

      structuredLogs.push({
        index: i + 1,
        ok: event.ok,
        geo: event.geo,
        mapLink: event.mapLink,
        mapCandidates: event.mapCandidates
      });
    } catch (error) {
      log(`FEHLER: ${error.message}`);
    }
  }

  await browser.close();

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

  log("\u001b[32m✔ Debug abgeschlossen.\u001b[0m");
}

run();