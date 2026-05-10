
import { chromium } from "playwright";
// Backup nach erfolgreichem Geo-Test 
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
@@ -39,6 +47,14 @@ function extractGeoFromUrl(url) {
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
@@ -163,10 +179,12 @@ async function readEvent(page, index) {
}

async function run() {
  console.log("🔎 Debug Detail Importer V9");
  console.log("Ziel: Geo passend zum aktiven Detailblock prüfen");
  console.log(`Max Events: ${MAX_EVENTS}`);
  console.log("");
  const startedAt = Date.now();

  log("🔎 Debug Detail Importer V10");
  log("Ziel: Geo-Fix + strukturierte Logs + Zusammenfassung");
  log(`Max Events: ${MAX_EVENTS}`);
  log("");

  const browser = await chromium.launch({ headless: true });

@@ -190,48 +208,237 @@ async function run() {
  const count = await page.locator(".termin.inline").count();
  const total = Math.min(count, MAX_EVENTS);

  console.log(`Gefundene Container: ${count}`);
  console.log(`Teste Events: ${total}`);
  console.log("");
  log(`Gefundene Container: ${count}`);
  log(`Teste Events: ${total}`);
  log("");

  const seenKeys = new Map();

  for (let i = 0; i < total; i++) {
    console.log(`--- Event ${i + 1} ---`);
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

      console.log(`Titel: ${result.fields.title}`);
      console.log(`Datum: ${result.fields.date}`);
      console.log(`Ort: ${result.fields.location}`);
      console.log(`LocationLine roh: ${result.locationLine}`);

      console.log("Map-Kandidaten:");
      result.mapCandidates.slice(0, 6).forEach((item, idx) => {
        const geo = extractGeoFromUrl(item.href);
        console.log(
          `${idx + 1}. ${item.href} ${
            geo ? `=> ${geo.lat}, ${geo.lng}` : "=> keine Geo"
          }`
        );
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

      console.log(
        `Ausgewählt: ${
          result.selectedGeo
            ? `${result.selectedGeo.lat}, ${result.selectedGeo.lng}`
            : "KEINE GEO"
        }`
      log(
        `${String(i + 1).padStart(2, "0")}. FEHLER | ${error.message} | ${durationMs}ms`
      );
    }
  }

      console.log("");
    } catch (error) {
      console.log(`FEHLER: ${error.message}`);
      console.log("");
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

  fs.writeFileSync("debug-output.txt", textLog.join("\n"), "utf8");
  fs.writeFileSync("debug-output.json", JSON.stringify(output, null, 2), "utf8");

  await browser.close();
  console.log("✅ Debug-Test V9 beendet.");
}

run();
run().catch(error => {
  console.error(error);
  fs.writeFileSync("debug-output.txt", String(error.stack || error), "utf8");
  fs.writeFileSync(
    "debug-output.json",
    JSON.stringify(
      {
        fatal: true,
        error: String(error.stack || error)
      },
      null,
      2
    ),
    "utf8"
  );
  process.exit(1);
});