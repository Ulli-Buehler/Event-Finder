import { chromium } from "playwright";
import fs from "fs";

const URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen+Teck&umkreis=30&region=&von=2026-05-10&bis=2026-05-10";

const TARGET_DATE = "10.05.2026";
const HOME = [48.6167, 9.45];
const MAX_KM = 50;

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
  "Pfullendorf": [47.9267, 9.2578],
  "Schwäbisch Hall": [49.1122, 9.7373],
  "Bad Saulgau": [48.0167, 9.5],
  "Radolfzell am Bodensee": [47.7419, 8.97],
  "Eppingen": [49.1365, 8.9123],
  "Sinsheim": [49.2529, 8.8787],
  "Ravensburg": [47.7811, 9.6136],
  "Endingen": [48.1422, 7.7]
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

  return Math.round(
    R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  );
}

function extractPlace(description) {
  const parts = description.split("|");
  return clean(parts[parts.length - 1]);
}

async function run() {
  log("Import gestartet");
  log("Quelle: " + URL);

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  const text = await page.locator("body").innerText();

  await browser.close();

  const lines = text
    .split("\n")
    .map(clean)
    .filter(Boolean);

  const events = [];
  const seen = new Set();

  for (let i = 0; i < lines.length; i++) {
    const dateLine = lines[i];

    if (!dateLine.includes(TARGET_DATE)) continue;

    const title = lines[i - 2] || "";
    const description = lines[i - 1] || "";

    if (!title || !description.includes("|")) continue;

    const place = extractPlace(description);
    const coords = COORDS[place];

    if (!coords) {
      log("⚠️ Ort ohne Koordinaten übersprungen: " + place);
      continue;
    }

    const distance = distanceKm(HOME, coords);

    if (distance > MAX_KM) {
      log(
        "⚠️ Zu weit weg: " +
          title +
          " / " +
          place +
          " / " +
          distance +
          " km"
      );
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

    log(
      "✅ Event: " +
        title +
        " / " +
        place +
        " / " +
        distance +
        " km"
    );
  }

  log("Events gefunden: " + events.length);

  if (events.length === 0) {
    throw new Error(
      "Keine Events gefunden — events-preview.js bleibt unverändert"
    );
  }

  fs.writeFileSync(
    "events-preview.js",
    `const EVENTS = ${JSON.stringify(events, null, 2)};`
  );

  log("events-preview.js geschrieben");
}

run().catch(err => {
  console.error("❌ IMPORTER FEHLER:");
  console.error(err);
  process.exit(1);
});