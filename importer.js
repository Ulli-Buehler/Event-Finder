import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region&von=2026-05-10&bis=2026-05-10";

const COORDS = {
  "Dettingen Teck": [48.6167, 9.45],
  "Dettingen unter Teck": [48.6167, 9.45],
  "Pfullendorf": [47.9267, 9.2578],
  "Ludwigsburg": [48.8941, 9.1955],
  "Schwäbisch Hall": [49.1122, 9.7373],
  "Tübingen": [48.5216, 9.0576],
  "Frickenhausen": [48.5935, 9.3608],
  "Bad Saulgau": [48.0167, 9.5],
  "Weilheim an der Teck": [48.6156, 9.5375],
  "Radolfzell am Bodensee": [47.7419, 8.97],
  "Eppingen": [49.1365, 8.9123],
  "Reutlingen": [48.4914, 9.2043],
  "Sinsheim": [49.2529, 8.8787],
  "Göppingen": [48.7054, 9.6512],
  "Ravensburg": [47.7811, 9.6136],
  "Endingen": [48.1422, 7.7]
};

function extractPlace(description) {
  const parts = description
    .split("|")
    .map(p => p.trim())
    .filter(Boolean);

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];

    if (COORDS[part]) {
      return part;
    }
  }

  return "Dettingen Teck";
}

console.log("➡️ Import gestartet");

const browser = await chromium.launch({
  headless: true,
});

const page = await browser.newPage();

let EVENTS = [];

for (let pageNum = 1; pageNum <= 11; pageNum++) {
  const url =
    pageNum === 1
      ? START_URL
      : `https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/page/${pageNum}/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region&von=2026-05-10&bis=2026-05-10`;

  console.log("➡️ Lade:", url);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

  const events = await page.evaluate(() => {
    const items = [];
    const cards = document.querySelectorAll("article");

    cards.forEach((card) => {
      const title =
        card.querySelector("h2, h3")?.innerText?.trim() || "";

      if (!title) return;

      const text = card.innerText.trim();
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      items.push({
        title,
        date: lines[1] || "",
        description: lines.join(" | ")
      });
    });

    return items;
  });

  const fixedEvents = events.map(event => {
    const place = extractPlace(event.description);
    const coords = COORDS[place] || COORDS["Dettingen Teck"];

    return {
      ...event,
      place,
      lat: coords[0],
      lng: coords[1]
    };
  });

  console.log(`➡️ Seite ${pageNum}: ${fixedEvents.length} Events`);

  EVENTS.push(...fixedEvents);
}

console.log(`➡️ Gesamt: ${EVENTS.length}`);

const output =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

fs.writeFileSync("./events-preview.js", output);

console.log("➡️ events-preview.js geschrieben");

await browser.close();