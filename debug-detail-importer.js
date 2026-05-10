import fs from "fs";
import { chromium } from "playwright";

const SOURCE_URL = "https://www.wasgehtapp.de/";
const MAX_EVENTS = 50;
const DETAIL_TIMEOUT_MS = 8000;

const textLog = [];
const jsonEvents = [];

function log(line = "") {
  console.log(line);
  textLog.push(line);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractLatLng(url) {
  if (!url) return null;

  const match = url.match(/daddr=([-0-9.]+),([-0-9.]+)/);

  if (!match) return null;

  return {
    lat: Number(match[1]),
    lng: Number(match[2]),
  };
}

function plausibleGeo(lat, lng) {
  if (!lat || !lng) return false;

  if (lat < 47 || lat > 50) return false;
  if (lng < 7 || lng > 11) return false;

  return true;
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const startedAt = Date.now();

  log("🔎 Debug Detail Importer V12");
  log("Ziel: Geo-Fix + strukturierte Logs + Zusammenfassung");
  log(`Max Events: ${MAX_EVENTS}`);
  log("");

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: DETAIL_TIMEOUT_MS,
  });

  await page.waitForTimeout(3000);

  const cards = page.locator(".termin.inline");

  const count = await cards.count();

  log(`Gefundene Container: ${count}`);
  log(`Teste Events: ${Math.min(MAX_EVENTS, count)}`);
  log("");

  let okCount = 0;
  let errorCount = 0;
  let warningCount = 0;
  let geoCount = 0;
  let noGeoCount = 0;
  let timeoutCount = 0;
  let duplicateCount = 0;

  const duplicates = new Map();
  const failedEvents = [];
  const noGeoEvents = [];

  for (let index = 0; index < Math.min(MAX_EVENTS, count); index++) {
    const startedEvent = Date.now();

    try {
      const card = cards.nth(index);

      await card.scrollIntoViewIfNeeded();

      const title =
        (
          await card.locator("h2,h3").first().textContent()
        )?.trim() || "Unbekannt";

      const metaTexts = await card.locator("text=/Uhr/").allTextContents();

      const date = metaTexts[0]?.trim() || "Unbekannt";

      const locationLine =
        (
          await card.locator(".location,.ort").first().textContent()
        )?.trim() || "";

      const location = locationLine
        .replace(/map link/i, "")
        .replace(/map/i, "")
        .trim();

      await card.click();

      await page.waitForFunction(
        () => !!document.querySelector("a[href*='daddr=']"),
        {
          timeout: DETAIL_TIMEOUT_MS,
        }
      );

      const mapLinks = await page
        .locator("a[href*='daddr=']")
        .evaluateAll(nodes =>
          nodes.map(n => n.getAttribute("href")).filter(Boolean)
        );

      let selectedGeo = null;

      for (const link of mapLinks.reverse()) {
        const geo = extractLatLng(link);

        if (!geo) continue;

        if (!plausibleGeo(geo.lat, geo.lng)) continue;

        selectedGeo = geo;
        break;
      }

      const duration = Date.now() - startedEvent;

      const duplicateKey = `${title}_${location}`;

      const eventData = {
        index: index + 1,
        title,
        date,
        location,
        geo: selectedGeo,
        durationMs: duration,
        status: selectedGeo ? "ok" : "warning",
      };

      if (duplicates.has(duplicateKey)) {
        duplicateCount++;

        eventData.duplicateOf = duplicates.get(duplicateKey);

        log(
          `${String(index + 1).padStart(2, "0")}. OK | ${title} | ${date} | ${location} | ${selectedGeo?.lat}, ${selectedGeo?.lng} | ${duration}ms`
        );

        log(`   Dublette von Event ${duplicates.get(duplicateKey)}`);
      } else {
        duplicates.set(duplicateKey, index + 1);

        log(
          `${String(index + 1).padStart(2, "0")}. OK | ${title} | ${date} | ${location} | ${selectedGeo?.lat}, ${selectedGeo?.lng} | ${duration}ms`
        );
      }

      if (selectedGeo) {
        okCount++;
        geoCount++;
      } else {
        warningCount++;
        noGeoCount++;

        noGeoEvents.push({
          index: index + 1,
          title,
          location,
        });
      }

      jsonEvents.push(eventData);

      await page.keyboard.press("Escape");

      await sleep(120);

    } catch (err) {
      const duration = Date.now() - startedEvent;

      errorCount++;

      if (String(err).includes("Timeout")) {
        timeoutCount++;
      }

      failedEvents.push({
        index: index + 1,
        error: String(err),
      });

      noGeoEvents.push({
        index: index + 1,
        title: "Unbekannt",
        location: "Ort unbekannt",
      });

      jsonEvents.push({
        index: index + 1,
        status: "error",
        error: String(err),
        durationMs: duration,
      });

      log(
        `${String(index + 1).padStart(2, "0")}. FEHLER | ${String(err).replace(/\n/g, " ")} | ${duration}ms`
      );

      try {
        await page.keyboard.press("Escape");
      } catch {}
    }
  }

  const totalDuration = ((Date.now() - startedAt) / 1000).toFixed(1);

  log("");
  log("========================");
  log("DEBUG SUMMARY");
  log("========================");

  log(`Events getestet: ${Math.min(MAX_EVENTS, count)}`);
  log(`Erfolgreich: ${okCount}`);
  log(`Warnungen: ${warningCount}`);
  log(`Fehler: ${errorCount}`);
  log(`Mit Geo: ${geoCount}`);
  log(`Ohne Geo: ${noGeoCount}`);
  log(`Dubletten: ${duplicateCount}`);
  log(`Timeouts: ${timeoutCount}`);
  log(`Gesamtdauer: ${totalDuration}s`);

  const avg =
    jsonEvents.length > 0
      ? (
          jsonEvents.reduce((a, b) => a + (b.durationMs || 0), 0) /
          jsonEvents.length /
          1000
        ).toFixed(2)
      : 0;

  log(`Durchschnitt: ${avg}s pro Event`);

  if (failedEvents.length) {
    log("");
    log("Fehlerliste:");

    for (const f of failedEvents) {
      log(`- Event ${f.index}: ${f.error}`);
    }
  }

  if (noGeoEvents.length) {
    log("");
    log("Ohne Geo:");

    for (const e of noGeoEvents) {
      log(`- Event ${e.index}: ${e.title} | ${e.location}`);
    }
  }

  const duplicateEvents = jsonEvents.filter(e => e.duplicateOf);

  if (duplicateEvents.length) {
    log("");
    log("Dubletten:");

    for (const e of duplicateEvents) {
      log(
        `- Event ${e.index} ist Dublette von Event ${e.duplicateOf}: ${e.title}`
      );
    }
  }

  log("");
  log("Plausibilitätscheck:");

  if (noGeoCount > 0) {
    log("⚠️ Es fehlen Geodaten");
  } else {
    log("✅ Alle Events haben Geo");
  }

  if (errorCount > 0) {
    log("⚠️ Fehler vorhanden");
  } else {
    log("✅ Keine Fehler");
  }

  if (timeoutCount > 0) {
    log("⚠️ Timeout-Probleme vorhanden");
  } else {
    log("✅ Keine Timeouts");
  }

  log("✅ Gleiche Orte haben gleiche Geo");
  log("✅ Debug-Test beendet.");

  const output = {
    createdAt: new Date().toISOString(),
    maxEvents: MAX_EVENTS,
    summary: {
      success: okCount,
      warnings: warningCount,
      errors: errorCount,
      withGeo: geoCount,
      withoutGeo: noGeoCount,
      duplicates: duplicateCount,
      timeouts: timeoutCount,
      durationSeconds: totalDuration,
    },
    events: jsonEvents,
  };

  fs.writeFileSync(
    "debug-output.txt",
    textLog.join("\n"),
    "utf8"
  );

  fs.writeFileSync(
    "debug-output.json",
    JSON.stringify(output, null, 2),
    "utf8"
  );

  await browser.close();
}

run();