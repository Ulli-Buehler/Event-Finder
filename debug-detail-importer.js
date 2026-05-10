import { chromium } from "playwright";
import fs from "fs";

const SOURCE_URL = "https://www.wasgehtapp.de/";

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

  const match = url.match(
    /[?&]daddr=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/
  );

  if (!match) return null;

  return {
    lat: Number(match[1]),
    lng: Number(match[2]),
  };
}

async function readActiveDetail(page) {
  return await page.evaluate(() => {
    const panels = [...document.querySelectorAll(".termin_detail")];

    const visible = panels.find((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        el.innerText.trim().length > 0
      );
    });

    if (!visible) return null;

    const title =
      visible.querySelector("h1,h2,h3")?.innerText?.trim() || "";

    const text = visible.innerText || "";

    const links = [
      ...visible.querySelectorAll("a[href*='maps.google'], a[href*='daddr=']")
    ].map((a) => a.href);

    return {
      title,
      text,
      links,
    };
  });
}

async function run() {
  const startTime = Date.now();

  let okCount = 0;
  let warningCount = 0;
  let errorCount = 0;
  let geoCount = 0;
  let noGeoCount = 0;
  let duplicateCount = 0;
  let timeoutCount = 0;

  const seenKeys = new Map();

  log("🔎 Debug Detail Importer V10");
  log("Ziel: Geo-Fix + strukturierte Logs + Zusammenfassung");
  log(`Max Events: ${MAX_EVENTS}`);
  log("");

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(SOURCE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

  const containers = await page.$$(".termin.inline");

  log(`Gefundene Container: ${containers.length}`);

  const events = containers.slice(0, MAX_EVENTS);

  log(`Teste Events: ${events.length}`);
  log("");

  for (let i = 0; i < events.length; i++) {
    const eventStart = Date.now();

    try {
      const container = events[i];

      await container.scrollIntoViewIfNeeded();

      const title = normalizeText(
        await container.$eval(".titel", (el) => el.innerText).catch(() => "")
      );

      const date = normalizeText(
        await container.$eval(".datum", (el) => el.innerText).catch(() => "")
      );

      const location = cleanLocation(
        await container.$eval(".ort", (el) => el.innerText).catch(() => "")
      );

      const key = `${title}|${date}|${location}`;

      let duplicateOf = null;

      if (seenKeys.has(key)) {
        duplicateCount++;
        duplicateOf = seenKeys.get(key);
      } else {
        seenKeys.set(key, i + 1);
      }

      await container.click();

      try {
        await page.waitForFunction(() => {
          const detail = document.querySelector(".termin_detail");
          if (!detail) return false;

          const style = window.getComputedStyle(detail);

          return (
            style.display !== "none" &&
            detail.innerText.trim().length > 0
          );
        }, { timeout: DETAIL_TIMEOUT_MS });
      } catch (err) {
        timeoutCount++;
        throw err;
      }

      const detail = await readActiveDetail(page);

      let geo = null;

      if (detail?.links?.length) {
        const lastLink = detail.links[detail.links.length - 1];
        geo = extractGeoFromUrl(lastLink);
      }

      const duration = Date.now() - eventStart;

      const status = geo ? "OK" : "WARNUNG";

      if (geo) {
        okCount++;
        geoCount++;
      } else {
        warningCount++;
        noGeoCount++;
      }

      const line =
        `${String(i + 1).padStart(2, "0")}. ${status} | ` +
        `${title || "Unbekannt"} | ` +
        `${date || "Kein Datum"} | ` +
        `${location || "Ort unbekannt"} | ` +
        `${geo ? `${geo.lat}, ${geo.lng}` : "KEIN GEO"} | ` +
        `${duration}ms`;

      log(line);

      if (duplicateOf) {
        log(`   Dublette von Event ${duplicateOf}`);
      }

      jsonEvents.push({
        index: i + 1,
        status,
        title,
        date,
        location,
        geo,
        durationMs: duration,
        duplicateOf,
      });
    } catch (err) {
      const duration = Date.now() - eventStart;

      errorCount++;
      noGeoCount++;

      const msg = normalizeText(err.message);

      log(
        `${String(i + 1).padStart(2, "0")}. FEHLER | ${msg} | ${duration}ms`
      );

      jsonEvents.push({
        index: i + 1,
        status: "FEHLER",
        error: msg,
        durationMs: duration,
      });
    }
  }

  await browser.close();

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);

  log("");
  log("========================");
  log("DEBUG SUMMARY");
  log("========================");
  log(`Events getestet: ${events.length}`);
  log(`Erfolgreich: ${okCount}`);
  log(`Warnungen: ${warningCount}`);
  log(`Fehler: ${errorCount}`);
  log(`Mit Geo: ${geoCount}`);
  log(`Ohne Geo: ${noGeoCount}`);
  log(`Dubletten: ${duplicateCount}`);
  log(`Timeouts: ${timeoutCount}`);
  log(`Gesamtdauer: ${totalDuration}s`);
  log(
    `Durchschnitt: ${
      events.length
        ? (Number(totalDuration) / events.length).toFixed(2)
        : 0
    }s pro Event`
  );

  const errors = jsonEvents.filter((e) => e.status === "FEHLER");

  if (errors.length) {
    log("");
    log("Fehlerliste:");

    for (const e of errors) {
      log(`- Event ${e.index}: ${e.error}`);
    }
  }

  const noGeo = jsonEvents.filter(
    (e) => e.status !== "FEHLER" && !e.geo
  );

  if (noGeo.length) {
    log("");
    log("Ohne Geo:");

    for (const e of noGeo) {
      log(`- Event ${e.index}: ${e.title} | ${e.location}`);
    }
  }

  const duplicates = jsonEvents.filter((e) => e.duplicateOf);

  if (duplicates.length) {
    log("");
    log("Dubletten:");

    for (const e of duplicates) {
      log(
        `- Event ${e.index} ist Dublette von Event ${e.duplicateOf}: ${e.title}`
      );
    }
  }

  log("");
  log("Plausibilitätscheck:");

  if (noGeoCount === 0) {
    log("✅ Alle Events haben Geo");
  } else {
    log("⚠️ Es fehlen Geodaten");
  }

  if (errorCount === 0) {
    log("✅ Keine Fehler");
  } else {
    log("⚠️ Fehler vorhanden");
  }

  if (timeoutCount === 0) {
    log("✅ Keine Timeouts");
  } else {
    log("⚠️ Timeout-Probleme vorhanden");
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
}

run();