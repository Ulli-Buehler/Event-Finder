// importer.js
// Playwright Importer + Geocoding + events.js Generator

import fs from "fs";
import { chromium } from "playwright";

const OUTPUT = "./src/data/events.js";

const SOURCES = [
  "https://www.wasgehtapp.de/events",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(address) {
  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: address,
        format: "json",
        limit: 1,
      });

    const res = await fetch(url, {
      headers: {
        "User-Agent": "event-importer/1.0",
      },
    });

    const data = await res.json();

    if (!data?.length) {
      return {
        lat: null,
        lng: null,
      };
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch {
    return {
      lat: null,
      lng: null,
    };
  }
}

async function scrapePage(page) {
  return await page.evaluate(() => {
    const cards = [...document.querySelectorAll("article, .event, .card")];

    return cards.map((el, index) => {
      const text = (sel) =>
        el.querySelector(sel)?.textContent?.trim() || "";

      const attr = (sel, a) =>
        el.querySelector(sel)?.getAttribute(a) || "";

      const title =
        text("h1") ||
        text("h2") ||
        text("h3");

      const city =
        text(".city") ||
        text(".location");

      const venue =
        text(".venue");

      const street =
        text(".street");

      const zip =
        text(".zip");

      const date =
        text("time") ||
        text(".date");

      const image =
        attr("img", "src");

      const url =
        attr("a", "href");

      return {
        id: `event-${index + 1}`,
        title,
        city,
        venue,
        street,
        zip,
        date,
        image,
        url,
      };
    });
  });
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const events = [];

  for (const source of SOURCES) {
    console.log("🌍", source);

    await page.goto(source, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const scraped = await scrapePage(page);

    for (const ev of scraped) {
      const address = [
        ev.street,
        ev.zip,
        ev.city,
        "Deutschland",
      ]
        .filter(Boolean)
        .join(", ");

      const geo = await geocode(address);

      events.push({
        ...ev,
        address,
        lat: geo.lat,
        lng: geo.lng,
      });

      console.log(
        "📍",
        ev.title,
        geo.lat,
        geo.lng
      );

      await sleep(1100);
    }
  }

  await browser.close();

  const content =
    `export const events = ` +
    JSON.stringify(events, null, 2) +
    `;\n`;

  fs.mkdirSync("./src/data", {
    recursive: true,
  });

  fs.writeFileSync(
    OUTPUT,
    content,
    "utf8"
  );

  console.log(
    `✅ ${events.length} Events gespeichert`
  );
}

run();