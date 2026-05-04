import { chromium } from "playwright";
import fs from "fs";

const BASE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen+Teck&umkreis=30&region=&von=2026-05-10&bis=2026-05-10";

const TARGET_DATE = "10.05.2026";
const HOME = [48.6167, 9.45];
const MAX_KM = 50;
const MAX_PAGES = 12;

const COORDS = {
  "Dettingen Teck": [48.6167, 9.45],
  "Dettingen unter Teck": [48.6167, 9.45],
  "Kirchheim unter Teck": [48.6468, 9.4538],
  "Weilheim an der Teck": [48.6156, 9.5375],
  "Frickenhausen": [48.5935, 9.3608],
  "Nürtingen": [48.6259, 9.3420],
  "Tübingen": [48.5216, 9.0576],
  "Reutlingen": [48.4914, 9.2043],
  "Ludwigsburg": [48.8941, 9.1955],
  "Göppingen": [48.7054, 9.6512],
  "Esslingen": [48.7433, 9.3201],
  "Esslingen am Neckar": [48.7433, 9.3201],
  "Plochingen": [48.7107, 9.4196],
  "Wendlingen am Neckar": [48.6712, 9.3763],
  "Wernau": [48.6932, 9.4152],
  "Ebersbach an der Fils": [48.7167, 9.5333],
  "Uhingen": [48.704, 9.5862],
  "Eislingen": [48.6955, 9.7063],
  "Eislingen/Fils": [48.6955, 9.7063],
  "Rechberghausen": [48.7303, 9.6436],
  "Schorndorf": [48.8054, 9.5272],
  "Stuttgart": [48.7758, 9.1829]
};

function log(text) {
  console.log("➡️ " + text);
}

function clean(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function distanceKm(a, b) {
  const R = 6371;
  const dLat = (b[0] - a[0]) * Math.PI / 180;
  const dLon = (b[1] - a[1]) * Math.PI / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[0] * Math.PI / 180) *
      Math.cos(b[0] * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

function pageUrl(page) {
  if (page === 1) return BASE_URL;
  return BASE_URL + "&sf_paged=" + page;
}

function extractPlace(description) {
  const parts = description.split("|");
  return clean(parts[parts.length - 1]);
}

async function readPage(page, browser) {
  const url = pageUrl(page);
  log("Lade Seite " + page + ": " + url);

  const tab = await browser.newPage();

  await tab.goto(url, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  const text = await tab.locator("body").innerText();

  await tab.close();

  return text
    .split("\n")
    .map(clean)
    .filter(Boolean);
}

async function run() {
  log("Import gestartet");

  const browser = await chromium.launch({ headless: true });

  const events = [];
  const seen = new Set();

  for (let page = 1; page <= MAX_PAGES; page++) {
    const lines = await readPage(page, browser);

    let foundOnPage = 0;

    for (let i = 0; i < lines.length; i++) {
      const dateLine = lines[i];

      if (!dateLine.includes(TARGET_DATE)) continue;

      const title = lines[i - 2] || "";
      const description = lines[i - 1] || "";

      if (!title || !description.includes("|")) continue;

      const place = extractPlace(description);
      const coords = COORDS[place];

      if (!coords) {
        log("⚠️ Ort ohne Koordinaten: " + place);
        continue;
      }

      const distance = distanceKm(HOME, coords);

      if (distance > MAX_KM) {
        continue;
      }

      const key = title + "|" + place + "|" + dateLine;

      if (seen.has(key)) continue;
      seen.add(key);

      events.push({
        title,
        place,
        date: TARGET_DATE,
        description,
        distance: distance + " km",
        lat: coords[0],
        lng: coords[1]
      });

      foundOnPage++;
      log("✅ Event: " + title + " / " + place + " / " + distance + " km");
    }

    log("Seite " + page + ": " + foundOnPage + " Events übernommen");
  }

  await browser.close();

  log("Events gesamt: " + events.length);

  if (events.length === 0) {
    throw new Error("Keine Events gefunden — events.js bleibt unverändert");
  }

  fs.writeFileSync(
    "events.js",
    `const EVENTS = ${JSON.stringify(events, null, 2)};`
  );

  log("events.js geschrieben");
}

run().catch(err => {
  console.error("❌ IMPORTER FEHLER:");
  console.error(err);
  process.exit(1);
});