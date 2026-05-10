import { chromium } from "playwright";
import fs from "fs";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 50;
const DETAIL_TIMEOUT_MS = 5000;

const textLog = [];
const jsonLog = [];

function log(line = "") {
  console.log(line);
  textLog.push(line);
}

function cleanLine(line) {
  return String(line || "").replace(/\s+/g, " ").trim();
}

function extractGeoFromUrl(url) {
  if (!url) return null;

  const match = String(url).match(/daddr=([-0-9.]+),([-0-9.]+)/);
  if (!match) return null;

  return {
    lat: Number(match[1]),
    lon: Number(match[2]),
  };
}

function extractFieldsFromLines(lines) {
  const clean = lines.map(cleanLine).filter(Boolean);

  for (let i = 1; i < clean.length - 4; i++) {
    if (clean[i] !== "calendar") continue;

    const title = clean[i - 1];
    const date = clean[i + 1];

    let location = "";
    if (clean[i + 2] === "pin") {
      location = clean[i + 3] || "";
    }

    if (!title || title.includes("Was geht")) continue;
    if (!date) continue;
    if (!location) continue;

    location = location
      .replace(/\s+map\s+link$/i, "")
      .replace(/\s+map$/i, "")
      .trim();

    return {
      title,
      date,
      location,
    };
  }

  return {
    title: "",
    date: "",
    location: "",
  };
}

async function readActiveDetail(page) {
  return await page.evaluate(() => {
    const lines = document.body.innerText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const mapLinks = Array.from(
      document.querySelectorAll('a[href*="daddr="]')
    ).map((a) => a.href);

    return {
      lines,
      mapLinks,
    };
  });
}

async function main() {
  const startedAt = Date.now();

  log("🔎 Debug Detail Importer V13");
  log("Ziel: Reparatur ohne Copilot, V10-Logik mit 50 Events");
  log(`Max Events: ${MAX_EVENTS}`);
  log("");

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    viewport: {
      width: 390,
      height: 900,
    },
  });

  await page.goto(SOURCE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.waitForSelector(".termin.inline", {
    timeout: 20000,
  });

  const eventCount = await page.locator(".termin.inline").count();
  const testCount = Math.min(eventCount, MAX_EVENTS);

  log(`Gefundene Events: ${eventCount}`);
  log(`Teste Events: ${testCount}`);
  log("");

  let okCount = 0;
  let errorCount = 0;
  let geoCount = 0;

  let previousLocation = "";
  let previousGeoText = "";
  let warningCount = 0;

  for (let index = 0; index < testCount; index++) {
    log(`--- Event ${index + 1} ---`);

    try {
      const card = page.locator(".termin.inline").nth(index);

      const beforeText = await page.evaluate(() => document.body.innerText);

      await card.scrollIntoViewIfNeeded();
      await card.click({
        timeout: 5000,
      });

      try {
        await page.waitForFunction(
          (oldText) => document.body.innerText !== oldText,
          beforeText,
          {
            timeout: DETAIL_TIMEOUT_MS,
          }
        );
      } catch {
        await page.waitForTimeout(500);
      }

      const active = await readActiveDetail(page);
      const fields = extractFieldsFromLines(active.lines);

      const lastMapLink =
        active.mapLinks.length > 0
          ? active.mapLinks[active.mapLinks.length - 1]
          : "";

      const geo = extractGeoFromUrl(lastMapLink);

      const geoText = geo ? `${geo.lat}, ${geo.lon}` : "";
      const ok = Boolean(fields.title && fields.date && fields.location && geo);

      let warning = "";

      if (
        previousLocation &&
        fields.location &&
        previousLocation !== fields.location &&
        previousGeoText &&
        geoText &&
        previousGeoText === geoText
      ) {
        warning = "WARNUNG: Gleiche Geo bei anderem Ort";
        warningCount++;
      }

      if (ok) {
        okCount++;
      } else {
        errorCount++;
      }

      if (geo) {
        geoCount++;
      }

      log(`OK: ${ok}`);
      log(`Titel: ${fields.title || "Unbekannter Titel"}`);
      log(`Datum: ${fields.date || "Datum unbekannt"}`);
      log(`Ort: ${fields.location || "Ort unbekannt"}`);
      log(`Geo: ${geoText || "Keine Geo"}`);
      log(`Map-Link: ${lastMapLink}`);
      log(`Map-Kandidaten: ${active.mapLinks.length}`);

      if (warning) {
        log(warning);
      }

      log("");

      jsonLog.push({
        index: index + 1,
        ok,
        title: fields.title || null,
        date: fields.date || null,
        location: fields.location || null,
        geo,
        mapLink: lastMapLink || null,
        mapCandidateCount: active.mapLinks.length,
        warning: warning || null,
        error: ok ? null : "Unvollständige Daten",
      });

      if (fields.location) previousLocation = fields.location;
      if (geoText) previousGeoText = geoText;
    } catch (error) {
      errorCount++;

      log(`FEHLER: ${error.message}`);
      log("");

      jsonLog.push({
        index: index + 1,
        ok: false,
        title: null,
        date: null,
        location: null,
        geo: null,
        mapLink: null,
        mapCandidateCount: 0,
        warning: null,
        error: error.message,
      });
    }
  }

  const duration = (Date.now() - startedAt) / 1000;

  log("========== ZUSAMMENFASSUNG ==========");
  log(`Events getestet: ${testCount}`);
  log(`OK: ${okCount}`);
  log(`Fehler: ${errorCount}`);
  log(`Mit Geo: ${geoCount}`);
  log(`Warnungen: ${warningCount}`);
  log(`Dauer: ${duration.toFixed(2)}s`);
  log(`Durchschnitt pro Event: ${(duration / testCount).toFixed(2)}s`);
  log("");
  log("✔ Debug abgeschlossen.");

  fs.writeFileSync("debug-output.txt", textLog.join("\n"), "utf8");
  fs.writeFileSync("debug-output.json", JSON.stringify(jsonLog, null, 2), "utf8");

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  fs.writeFileSync("debug-output.txt", String(error.stack || error), "utf8");
  process.exit(1);
});