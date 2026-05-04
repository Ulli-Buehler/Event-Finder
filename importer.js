import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

function log(text) {
  console.log(text);
}

const configText = fs.readFileSync("config.js", "utf8");
eval(configText);

const CONFIG = globalThis.IMPORT_CONFIG;

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-dettingen-unter-teck-qqc371901ch50hi80i";

const PLACE_COORDS = {
  "Dettingen": [48.6167, 9.45],
  "Kirchheim": [48.6468, 9.4538],
  "Eislingen": [48.6955, 9.7063],
  "Göppingen": [48.7054, 9.6512]
};

async function run() {
  log("Importer gestartet");

  const res = await fetch(SOURCE_URL);
  const html = await res.text();

  const $ = cheerio.load(html);

  const text = $("body").text();

  const parts = text
    .split("|")
    .map(t => t.trim())
    .filter(Boolean);

  const events = [];

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];

    if (
      p.toLowerCase().includes("fest") ||
      p.toLowerCase().includes("markt")
    ) {
      const title = p;

      events.push({
        title,
        place: "Dettingen unter Teck",
        date: "Sonntag",
        description: title,
        lat: 48.6167,
        lng: 9.45
      });

      log("Event gefunden: " + title);
    }
  }

  const unique = [];
  const seen = new Set();

  for (const e of events) {
    if (seen.has(e.title)) continue;
    seen.add(e.title);
    unique.push(e);
  }

  log("Events gefunden: " + unique.length);

  if (unique.length === 0) {
    throw new Error("Keine Events gefunden");
  }

  fs.writeFileSync(
    "events.js",
    `const EVENTS = ${JSON.stringify(unique, null, 2)};`
  );

  log("events.js geschrieben");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});