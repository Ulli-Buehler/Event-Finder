import { chromium } from "playwright";
import fs from "fs";

const START_URL =
  "https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region";

console.log("➡️ Import gestartet");

const browser = await chromium.launch({
  headless: true,
});

const page = await browser.newPage();

const EVENTS = [];

function randomCoord() {
  return {
    lat: 48.65 + (Math.random() - 0.5) * 1.5,
    lng: 9.45 + (Math.random() - 0.5) * 1.5,
  };
}

function extractPlace(text) {
  const cleaned = text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const match = cleaned.match(
    /Märkte\s*\|\s*([^|0-9]+)/
  );

  if (match && match[1]) {
    return match[1].trim();
  }

  return "Unbekannt";
}

function extractDate(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("sonntag") ||
    lower.includes("verkaufsoffenen sonntag")
  ) {
    return "Sonntag";
  }

  const monthMatch = text.match(
    /\b(JAN|FEB|MÄR|APR|MAY|JUN|JUL|AUG|SEP|OKT|NOV|DEZ)\b/i
  );

  return monthMatch ? monthMatch[1].toUpperCase() : "";
}

for (let pageNum = 1; pageNum <= 11; pageNum++) {
  const url =
    pageNum === 1
      ? START_URL
      : `https://www.veranstaltung-baden-wuerttemberg.de/kategorie/maerkte/page/${pageNum}/?post_type=event&ort=Dettingen%20Teck&umkreis=30&region`;

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

  console.log(`➡️ Seite ${pageNum}: ${events.length} Events`);

  for (const event of events) {
    const place = extractPlace(event.raw);
    const coords = randomCoord();

    EVENTS.push({
      title: event.title,
      place,
      date: extractDate(event.raw),
      description: event.raw,
      lat: coords.lat,
      lng: coords.lng,
    });
  }
}

console.log(`➡️ Gesamt: ${EVENTS.length}`);

const output =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

fs.writeFileSync("./events.js", output);

console.log("➡️ events.js geschrieben");

await browser.close();
