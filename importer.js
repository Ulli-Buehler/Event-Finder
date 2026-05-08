import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_FILE = "events.json";

function loadExistingEvents() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(OUTPUT_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log("⚠️ Fehler beim Laden bestehender Events");
    return [];
  }
}

function saveEvents(events) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(events, null, 2), "utf8");
}

function normalizeText(text) {
  return (text || "")
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

function buildAddress(event) {
  let venue = event.venue || "";
  let city = event.city || "";

  // Inhalte in Klammern entfernen
  venue = venue.replace(/\(.*?\)/g, "").trim();

  // Problematische Zusätze entfernen
  venue = venue
    .replace(/\bSaal\b/gi, "")
    .replace(/\bGroßes Haus\b/gi, "")
    .replace(/\bZimmer\b/gi, "")
    .replace(/\bGewölbe\b/gi, "")
    .replace(/\bT1\b/gi, "")
    .replace(/\bT2\b/gi, "")
    .replace(/\bT4\b/gi, "")
    .trim();

  // Mehrfache Leerzeichen entfernen
  venue = venue.replace(/\s+/g, " ");

  // Schlechte generische Namen ignorieren
  const badVenues = [
    "EM",
    "Theater",
    "Saal",
    "Kino",
  ];

  if (badVenues.includes(venue)) {
    venue = "";
  }

  let address = "";

  if (venue && city) {
    address = `${venue}, ${city}, Deutschland`;
  } else if (city) {
    address = `${city}, Deutschland`;
  }

  return address;
}

async function geocode(address) {
  if (!address) {
    return {
      lat: null,
      lng: null,
    };
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Event-Finder",
      },
    });

    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.log("⚠️ Geocoding Fehler:", address);
  }

  return {
    lat: null,
    lng: null,
  };
}

async function scrapeEvents() {
  console.log("🌍", SOURCE_URL);

  const response = await fetch(SOURCE_URL);
  const html = await response.text();

  const $ = cheerio.load(html);

  const events = [];

  $(".event, .veranstaltung, .item").each((index, element) => {
    const title = normalizeText(
      $(element).find("h2, h3, .title").first().text()
    );

    if (!title) return;

    const venue = normalizeText(
      $(element).find(".location, .venue").first().text()
    );

    const city = normalizeText(
      $(element).find(".city").first().text()
    );

    const date = normalizeText(
      $(element).find(".date").first().text()
    );

    const description = normalizeText(
      $(element).find(".description, p").first().text()
    );

    const image =
      $(element).find("img").attr("src") || "";

    const event = {
      title,
      city,
      venue,
      street: "",
      zip: "",
      date,
      description,
      image,
      url: SOURCE_URL,
      source: SOURCE_URL,
      id: `event-${index + 1}`,
    };

    events.push(event);
  });

  return events;
}

async function run() {
  const existingEvents = loadExistingEvents();

  console.log(`📦 ${existingEvents.length} vorhandene Events geladen`);

  const scrapedEvents = await scrapeEvents();

  console.log(`🔎 ${scrapedEvents.length} Events auf Quelle gefunden`);

  const existingIds = new Set(
    existingEvents.map((e) => `${e.title}_${e.date}`)
  );

  let newEvents = 0;
  let missingCoords = 0;

  for (const event of scrapedEvents) {
    const uniqueId = `${event.title}_${event.date}`;

    if (existingIds.has(uniqueId)) {
      console.log(`⏭️ Bereits vorhanden: ${event.title}`);
      continue;
    }

    event.address = buildAddress(event);

    const geo = await geocode(event.address);

    event.lat = geo.lat;
    event.lng = geo.lng;

    if (!event.lat || !event.lng) {
      missingCoords++;
    }

    console.log(
      `📍 Neu: ${event.title} ${event.lat} ${event.lng}`
    );

    existingEvents.push(event);
    newEvents++;

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  saveEvents(existingEvents);

  console.log(`⚠️ ${missingCoords} neue Events ohne Geokoordinaten`);
  console.log(`✅ ${newEvents} neue Events importiert`);
  console.log(`📦 ${existingEvents.length} Events insgesamt gespeichert`);
}

run();