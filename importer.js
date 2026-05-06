// importer.js
// CSV -> events.js mit Geocoding + korrekten Koordinaten

import fs from "fs";
import path from "path";
import csv from "csv-parser";

const INPUT = "./data/events.csv";
const OUTPUT = "./src/data/events.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
      console.log("❌ Kein Treffer:", address);
      return { lat: null, lng: null };
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch (e) {
    console.log("❌ Geocode Fehler:", address, e.message);

    return {
      lat: null,
      lng: null,
    };
  }
}

function normalize(row) {
  const title = row.title || row.name || "";
  const date = row.date || "";
  const city = row.city || "";
  const venue = row.venue || "";
  const street = row.street || "";
  const zip = row.zip || "";
  const country = row.country || "Deutschland";

  const address = [street, zip, city, country]
    .filter(Boolean)
    .join(", ");

  return {
    id:
      row.id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),

    title,
    date,
    city,
    venue,
    street,
    zip,
    country,
    address,

    image:
      row.image ||
      "/images/default.jpg",

    url: row.url || "",
    category: row.category || "Event",
  };
}

async function run() {
  const rows = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(INPUT)
      .pipe(csv())
      .on("data", (row) => rows.push(normalize(row)))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`📦 ${rows.length} Events geladen`);

  const finalEvents = [];

  for (let i = 0; i < rows.length; i++) {
    const ev = rows[i];

    console.log(`📍 ${i + 1}/${rows.length}: ${ev.title}`);

    const geo = await geocode(ev.address);

    finalEvents.push({
      ...ev,
      lat: geo.lat,
      lng: geo.lng,
    });

    await sleep(1100); // Nominatim Rate Limit
  }

  const content =
    `export const events = ` +
    JSON.stringify(finalEvents, null, 2) +
    `;\n`;

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

  fs.writeFileSync(OUTPUT, content, "utf8");

  console.log("✅ events.js erzeugt:", OUTPUT);

  const missing = finalEvents.filter(
    (e) => e.lat === null || e.lng === null
  );

  console.log(
    `📍 Mit Koordinaten: ${finalEvents.length - missing.length}`
  );

  console.log(`❌ Ohne Koordinaten: ${missing.length}`);

  if (missing.length) {
    console.log("\nFehlende Koordinaten:");

    missing.forEach((m) => {
      console.log("-", m.title, "|", m.address);
    });
  }
}

run();