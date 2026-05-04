import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

console.time("Import Dauer");

function log(text) {
  console.log("➡️ " + text);
}

const configText = fs.readFileSync("config.js", "utf8");
eval(configText);

const CONFIG = globalThis.IMPORT_CONFIG;

if (!CONFIG) {
  throw new Error("IMPORT_CONFIG wurde nicht gefunden");
}

const SOURCE_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltungen-dettingen-unter-teck-qqc371901ch50hi80i";

async function run() {
  log("Importer gestartet");
  log("Ort: " + CONFIG.place);
  log("Import-Radius: " + CONFIG.radiusKm + " km");
  log("Quelle: " + SOURCE_URL);

  const res = await fetch(SOURCE_URL);

  if (!res.ok) {
    throw new Error("Quelle konnte nicht geladen werden: " + res.status);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const lines = $("body")
    .text()
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  log("Zeilen gefunden: " + lines.length);

  const events = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (
      line.toLowerCase().includes("markt") ||
      line.toLowerCase().includes("märkte") ||
      line.toLowerCase().includes("fest") ||
      line.toLowerCase().includes("flohmarkt")
    ) {
      log("TREFFER:");
      log(lines.slice(Math.max(0, i - 3), i + 5).join(" | "));
    }
  }

  log("DEBUG ENDE");
  log("Events gefunden: " + events.length);

  throw new Error("Debug-Lauf beendet — events.js wurde nicht überschrieben");
}

run()
  .catch(err => {
    console.error("❌ IMPORTER FEHLER:");
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.timeEnd("Import Dauer");
  });