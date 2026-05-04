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
        place: "Dettingen Teck",
        date: lines[1] || "",
        description: lines.join(" | "),
        lat: 48.6167,
        lng: 9.45,
      });
    });

    return items;
  });

  console.log(`➡️ Seite ${pageNum}: ${events.length} Events`);

  EVENTS.push(...events);
}

console.log(`➡️ Gesamt: ${EVENTS.length}`);

const output =
  "const EVENTS = " +
  JSON.stringify(EVENTS, null, 2) +
  ";";

// WICHTIG: echter Repo-Pfad
fs.writeFileSync("./events-preview.js", output);

console.log("➡️ events-preview.js geschrieben");

await browser.close();