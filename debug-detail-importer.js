import { chromium } from "playwright";
import fs from "fs";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 50;
const DETAIL_TIMEOUT_MS = 5000;

const textLog = [];
const jsonEvents = [];

function log(line = "") {
  console.log(line);
  textLog.push(line);
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

function geoToText(geo) {
  return geo ? `${geo.lat}, ${geo.lng}` : "";
}

function eventKey(title, date, location) {
  return `${normalizeText(title)}|${normalizeText(date)}|${normalizeText(location)}`;
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(line => line === "calendar");
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
  const dateIndex = detailLines.findIndex(line => line === "calendar");
  const pinIndex = detailLines.findIndex(line => line === "pin");

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
    { timeout: DETAIL_TIMEOUT_MS }
  );
}

async function readActiveDetail(page) {
  return await page.evaluate(() => {
    const lines = (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const calendarIndex = lines.findIndex(line => line === "calendar");
    const pinIndex = lines.findIndex(
      (line, index) => index > calendarIndex && line === "pin"
    );

    const locationLine =
      pinIndex >= 0 ? lines[pinIndex + 1] || "" : "";

    const mapCandidates = Array.from(document.querySelectorAll("a.map_link"))
      .map(a => ({
        href: a.href || "",
        text: (a.innerText || a.textContent || "").trim(),
        html: a.outerHTML || ""
      }))
      .filter(item => item.href);

    return {
      lines,
      calendarIndex,
      pinIndex,
      locationLine,
      mapCandidates
    };
  });
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  const listText = normalizeText(await card.innerText());
  const oldSnapshot = await page.evaluate(() => document.body.innerText || "");

  await card.click({ timeout: 10000 });
  await waitForDetailChange(page, oldSnapshot);

  const active = await readActiveDetail(page);
  const detailLines = extractDetailBlock(active.lines);
  const fields = extractFields(detailLines);

  let selectedMap = null;
  let selectedGeo = null;

  const geoCandidates = active.mapCandidates
    .map(candidate => ({
      href: candidate.href,
      geo: extractGeoFromUrl(candidate.href)
    }))
    .filter(candidate => candidate.geo);

  if (geoCandidates.length > 0) {
    const selectedCandidate = geoCandidates[geoCandidates.length - 1];
    selectedMap = selectedCandidate.href;
    selectedGeo = selectedCandidate.geo;
  }

  return {
    listText,
    detailLines,
    fields,
    locationLine: active.locationLine,
    mapCandidates: active.mapCandidates,
    selectedMap,
    selectedGeo
  };
}

function writeDebugFiles(output) {
  const textOutput = textLog.join("\n");
  const jsonOutput = JSON.stringify(output, null, 2);

  fs.writeFileSync("./debug-output.txt", textOutput, "utf8");
  fs.writeFileSync("./debug-output.json", jsonOutput, "utf8");

  fs.mkdirSync("./Cade", { recursive: true });
  fs.writeFileSync("./Cade/debug-output.txt", textOutput, "utf8");
  fs.writeFileSync("./Cade/debug-output.json", jsonOutput, "utf8");
}

async function run() {
  const startedAt = Date.now();

  log("🔎 Debug Detail Importer V10");
  log("Ziel: Geo-Fix + strukturierte Logs + Zusammenfassung");
  log(`Max Events: ${MAX_EVENTS}`);
  log("");

  const browser = await chromium.launch({ headless: true });

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

  const seenKeys = new Map();

  for (let i = 0; i < total; i++) {
    const eventStartedAt = Date.now();

    try {
      const result = await readEvent(page, i);
      const durationMs = Date.now() - eventStartedAt;

      const title = result.fields.title;
      const date = result.fields.date;
      const location = result.fields.location;
      const geoText = geoToText(result.selectedGeo);
      const key = eventKey(title, date, location);

      const missing = [];
      if (!title) missing.push("Titel");
      if (!date) missing.push("Datum");
      if (!location) missing.push("Ort");
      if (!result.selectedGeo) missing.push("Geo");

      const duplicateOf = seenKeys.has(key) ? seenKeys.get(key) : null;
      if (!duplicateOf) {
        seenKeys.set(key, i + 1);
      }

      const ok = missing.length === 0;

      const eventData = {
        index: i + 1,
        ok,
        title,
        date,
        location,
        locationLine: result.locationLine,
        selectedGeo: result.selectedGeo,
        selectedGeoText: geoText,
        selectedMap: result.selectedMap,
        mapCandidateCount: result.mapCandidates.length,
        duplicateOf,
        missing,
        error: null,
        durationMs
      };

      jsonEvents.push(eventData);

      log(
        `${String(i + 1).padStart(2, "0")}. ${ok ? "OK" : "WARNUNG"} | ${title || "?"} | ${date || "?"} | ${location || "?"} | ${geoText || "KEINE GEO"} | ${durationMs}ms`
      );

      if (duplicateOf) {
        log(`   Dublette von Event ${duplicateOf}`);
      }

      if (missing.length > 0) {
        log(`   Fehlt: ${missing.join(", ")}`);
      }
    } catch (error) {
      const durationMs = Date.now() - eventStartedAt;

      jsonEvents.push({
        index: i + 1,
        ok: false,
        title: "",
        date: "",
        location: "",
        locationLine: "",
        selectedGeo: null,
        selectedGeoText: "",
        selectedMap: null,
        mapCandidateCount: 0,
        duplicateOf: null,
        missing: ["Event"],
        error: error.message,
        durationMs
      });

      log(
        `${String(i + 1).padStart(2, "0")}. FEHLER | ${error.message} | ${durationMs}ms`
      );
    }
  }

  const durationMs = Date.now() - startedAt;

  const okEvents = jsonEvents.filter(event => event.ok);
  const errorEvents = jsonEvents.filter(event => event.error);
  const warningEvents = jsonEvents.filter(
    event => !event.ok && !event.error
  );
  const geoEvents = jsonEvents.filter(event => event.selectedGeo);
  const noGeoEvents = jsonEvents.filter(event => !event.selectedGeo);
  const duplicates = jsonEvents.filter(event => event.duplicateOf);
  const timeoutEvents = jsonEvents.filter(event =>
    String(event.error || "").toLowerCase().includes("timeout")
  );

  const geoByLocation = new Map();
  const suspiciousGeo = [];

  for (const event of jsonEvents) {
    if (!event.location || !event.selectedGeoText) continue;

    if (!geoByLocation.has(event.location)) {
      geoByLocation.set(event.location, event.selectedGeoText);
      continue;
    }

    const previousGeo = geoByLocation.get(event.location);
    if (previousGeo !== event.selectedGeoText) {
      suspiciousGeo.push({
        index: event.index,
        title: event.title,
        location: event.location,
        previousGeo,
        currentGeo: event.selectedGeoText
      });
    }
  }

  log("");
  log("========================");
  log("DEBUG SUMMARY");
  log("========================");
  log(`Events getestet: ${total}`);
  log(`Erfolgreich: ${okEvents.length}`);
  log(`Warnungen: ${warningEvents.length}`);
  log(`Fehler: ${errorEvents.length}`);
  log(`Mit Geo: ${geoEvents.length}`);
  log(`Ohne Geo: ${noGeoEvents.length}`);
  log(`Dubletten: ${duplicates.length}`);
  log(`Timeouts: ${timeoutEvents.length}`);
  log(`Gesamtdauer: ${(durationMs / 1000).toFixed(1)}s`);
  log(`Durchschnitt: ${(durationMs / total / 1000).toFixed(2)}s pro Event`);
  log("");

  if (errorEvents.length > 0) {
    log("Fehlerliste:");
    for (const event of errorEvents) {
      log(`- Event ${event.index}: ${event.error}`);
    }
    log("");
  }

  if (noGeoEvents.length > 0) {
    log("Ohne Geo:");
    for (const event of noGeoEvents) {
      log(`- Event ${event.index}: ${event.title || "Unbekannt"} | ${event.location || "Ort unbekannt"}`);
    }
    log("");
  }

  if (duplicates.length > 0) {
    log("Dubletten:");
    for (const event of duplicates) {
      log(`- Event ${event.index} ist Dublette von Event ${event.duplicateOf}: ${event.title}`);
    }
    log("");
  }

  if (suspiciousGeo.length > 0) {
    log("Geo-Warnungen:");
    for (const item of suspiciousGeo) {
      log(
        `- Event ${item.index}: gleicher Ort "${item.location}" aber andere Geo (${item.previousGeo} vs ${item.currentGeo})`
      );
    }
    log("");
  }

  log("Plausibilitätscheck:");
  log(noGeoEvents.length === 0 ? "✅ Keine fehlenden Geodaten" : "⚠️ Es fehlen Geodaten");
  log(errorEvents.length === 0 ? "✅ Keine Fehler" : "⚠️ Fehler vorhanden");
  log(timeoutEvents.length === 0 ? "✅ Keine Timeouts" : "⚠️ Timeout-Probleme vorhanden");
  log(suspiciousGeo.length === 0 ? "✅ Gleiche Orte haben gleiche Geo" : "⚠️ Gleiche Orte mit unterschiedlicher Geo gefunden");
  log("✅ Debug-Test beendet.");

  const output = {
    meta: {
      version: "V10",
      sourceUrl: SOURCE_URL,
      maxEvents: MAX_EVENTS,
      foundContainers: count,
      testedEvents: total,
      durationMs,
      averageDurationMs: Math.round(durationMs / total)
    },
    summary: {
      ok: okEvents.length,
      warnings: warningEvents.length,
      errors: errorEvents.length,
      withGeo: geoEvents.length,
      withoutGeo: noGeoEvents.length,
      duplicates: duplicates.length,
      timeouts: timeoutEvents.length,
      suspiciousGeo: suspiciousGeo.length
    },
    problems: {
      errors: errorEvents,
      withoutGeo: noGeoEvents,
      duplicates,
      suspiciousGeo
    },
    events: jsonEvents
  };

  writeDebugFiles(output);

  await browser.close();
}

run().catch(error => {
  console.error(error);

  const output = {
    fatal: true,
    error: String(error.stack || error)
  };

  textLog.push(String(error.stack || error));
  writeDebugFiles(output);

  process.exit(1);
});