import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region&von=2026-05-10&bis=2026-05-10";

const COORDS = {
  "Pfullendorf": [47.9267, 9.2578],
  "Ludwigsburg": [48.8941, 9.1955],
  "Schwäbisch Hall": [49.1122, 9.7373],
  "Tübingen": [48.5216, 9.0576],
  "Frickenhausen": [48.5935, 9.3608],
  "Bad Saulgau": [48.0167, 9.5],
  "Weilheim": [48.6156, 9.5375],
  "Radolfzell": [47.7419, 8.97],
  "Eppingen": [49.1365, 8.9123],
  "Reutlingen": [48.4914, 9.2043],
  "Sinsheim": [49.2529, 8.8787],
  "Göppingen": [48.7054, 9.6512],
  "Ravensburg": [47.7811, 9.6136],
  "Endingen": [48.1422, 7.7],
  "Wolfach": [48.2933, 8.2156]
};

console.log("➡️ Import gestartet");

const browser = await chromium.launch({
  headless: true,
});

const page = await browser.newPage();

let EVENTS = [];

function detectPlace(text) {
  for (const city of Object.keys(COORDS)) {
    if (text.includes(city)) {
      return city;
    }
  }

  return null;
}

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

      items.push({
        title,
        raw: text,
      });
    });

    return items;
  });

  const cleaned = events
    .map((event) => {
      const place = detectPlace(event.raw);

      if (!place) return null;

      const coords = COORDS[place];

      return {
        title: event.title,
        place,
        date: "Sonntag",
        description: event.raw,
        lat: coords[0],
        lng: coords[1],
      };
    })
    .filter(Boolean);

  console.log(`➡️ Seite ${pageNum}: ${cleaned.length} Events`);

  EVENTS.push(...cleaned);
}

console.log(`➡️ Gesamt: ${EVENTS.length}`);

const output =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

fs.writeFileSync("./events.js", output);

console.log("➡️ events.js geschrieben");

await browser.close();