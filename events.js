import fetch from "node-fetch";
import * as cheerio from "cheerio";

function log(text) {
  console.log("➡️ " + text);
}

const URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen+Teck&umkreis=30&region=&von=2026-05-10&bis=2026-05-10";

async function run() {
  log("Debug Import gestartet");
  log("Quelle: " + URL);

  const res = await fetch(URL);

  log("HTTP Status: " + res.status);

  if (!res.ok) {
    throw new Error("Quelle nicht erreichbar");
  }

  const html = await res.text();

  log("HTML Länge: " + html.length);

  const $ = cheerio.load(html);

  $("script, style, noscript, svg").remove();

  const lines = $("body")
    .text()
    .split("\n")
    .map(x => x.trim())
    .filter(Boolean);

  log("Zeilen gefunden: " + lines.length);

  console.log("===== ERSTE 200 ZEILEN =====");

  lines.slice(0, 200).forEach((line, i) => {
    console.log(i + ": " + line);
  });

  console.log("===== DEBUG ENDE =====");

  throw new Error("Debug beendet — events.js wurde NICHT überschrieben");
}

run().catch(err => {
  console.error("❌ DEBUG STOPP:");
  console.error(err.message);
  process.exit(1);
});