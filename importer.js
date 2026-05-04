import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region&von=2026-05-10&bis=2026-05-10";

console.log("➡️ Import gestartet");

const browser = await chromium.launch({
  headless: true,
});

const page = await browser.newPage();

let EVENTS = [];

function extractPlace(text) {
  const parts = text
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (
      part.length > 2 &&
      !part.match(/^\d/) &&
      !part.includes("Märkte") &&
      !part.includes("Details") &&
      !part.includes("MAY") &&
      !part.includes("JUN") &&
      !part.includes("JUL") &&
      !part.includes("AUG") &&
      !part.includes("SEP") &&
      !part.includes("OKT")
    ) {
      return part;
    }
  }

  return "Unbekannt";
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

  const cleaned = events.map((event) => {
    const place = extractPlace(event.raw);

    return {
      title: event.title,
      place,
      date: "Sonntag",
      description: event.raw,
      lat: 48.6167 + (Math.random() - 0.5) * 0.4,
      lng: 9.45 + (Math.random() - 0.5) * 0.4,
    };
  });

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