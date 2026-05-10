import { chromium } from "playwright";
import fs from "fs";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_TXT = "debug-output.txt";
const OUTPUT_JSON = "debug-output.json";
const RAW_OUTPUT_TXT = "fast-raw-cards.txt";
const RAW_OUTPUT_JSON = "fast-raw-cards.json";

const FEST_MARKT_WORDS = [
  "fest",
  "feste",
  "festival",
  "stadtfest",
  "dorffest",
  "straßenfest",
  "strassenfest",
  "weinfest",
  "bierfest",
  "sommerfest",
  "frühlingsfest",
  "fruehlingsfest",
  "herbstfest",
  "jahrmarkt",
  "markt",
  "märkte",
  "maerkte",
  "flohmarkt",
  "weihnachtsmarkt",
  "kunstmarkt",
  "handwerkermarkt",
  "kreativmarkt",
  "wochenmarkt",
  "krämermarkt",
  "kraemermarkt"
];

function normalizeText(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .trim();
}

function normalizeOneLine(value) {
  return normalizeText(value).replace(/\s+/g, " ").trim();
}

function cleanText(value) {
  return normalizeOneLine(value)
    .replace(/\bpin\b/gi, "")
    .replace(/\bcalendar\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDistanceKm(text) {
  const match = String(text || "").match(/(\d+(?:[,.]\d+)?)\s*km\b/i);
  return match ? Number(match[1].replace(",", ".")) : null;
}

function parseTime(text) {
  const match = String(text || "").match(/\b([01]?\d|2[0-3])\s*:\s*([0-5]\d)\s*Uhr\b/i);
  if (!match) return "";
  return `${match[1].padStart(2, "0")}:${match[2]} Uhr`;
}

function splitCategoryTitle(text) {
  const cleaned = cleanText(text);

  const match = cleaned.match(/^([^:]{2,30}):\s*(.+)$/);
  if (!match) {
    return {
      category: "",
      title: cleaned
    };
  }

  return {
    category: match[1].trim(),
    title: match[2].trim()
  };
}

function isProbablyBadTitle(title) {
  if (!title) return true;
  if (/^\d{1,2}\s*:\s*\d{2}\s*Uhr/i.test(title)) return true;
  if (/^pin\b/i.test(title)) return true;
  if (/^\d+(?:[,.]\d+)?\s*km$/i.test(title)) return true;
  return false;
}

function guessTitleFromLines(lines) {
  const candidates = lines
    .map(cleanText)
    .filter(Boolean)
    .filter(line => !/^So$|^Mo$|^Di$|^Mi$|^Do$|^Fr$|^Sa$/i.test(line))
    .filter(line => !/^\d{1,2}$/.test(line))
    .filter(line => !/^Mai$|^Juni$|^Juli$|^August$|^September$|^Oktober$|^November$|^Dezember$/i.test(line))
    .filter(line => !/^\d{1,2}\s*:\s*\d{2}\s*Uhr/i.test(line))
    .filter(line => !/^pin\b/i.test(line))
    .filter(line => !/\d+(?:[,.]\d+)?\s*km$/i.test(line))
    .filter(line => !/^€|^\d+\s*€/.test(line));

  const withCategory = candidates.find(line => /^[^:]{2,30}:\s+.+/.test(line));
  if (withCategory) return withCategory;

  return candidates[0] || "";
}

function extractLocationFromLines(lines) {
  const cleaned = lines.map(cleanText).filter(Boolean);

  const pinLineIndex = cleaned.findIndex(line => /^pin\b/i.test(line));
  if (pinLineIndex >= 0 && cleaned[pinLineIndex + 1]) {
    return cleaned[pinLineIndex + 1];
  }

  const lineWithDistance = cleaned.find(line => /\d+(?:[,.]\d+)?\s*km\b/i.test(line));
  if (lineWithDistance) {
    return lineWithDistance.replace(/\s*,?\s*\d+(?:[,.]\d+)?\s*km\b/i, "").trim();
  }

  const lineWithPlace = cleaned.find(line => /,\s*[A-ZÄÖÜ][a-zäöüß]/.test(line));
  return lineWithPlace || "";
}

function isFestMarktEvent(event) {
  const haystack = [
    event.category,
    event.title,
    event.subtitle,
    event.location,
    event.rawText
  ]
    .join(" ")
    .toLowerCase();

  return FEST_MARKT_WORDS.some(word => haystack.includes(word.toLowerCase()));
}

function formatEventLine(event) {
  const title = event.category ? `${event.category}: ${event.title}` : event.title;

  const parts = [
    `${String(event.index).padStart(3, "0")}. ${title || "-"}`,
    event.time || "-",
    event.location || "-"
  ];

  if (event.distanceKm !== null) {
    parts.push(`${event.distanceKm} km`);
  }

  return parts.join(" | ");
}

async function run() {
  const startedAt = Date.now();

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      isMobile: true
    }
  });

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(3000);

  const rawCards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".termin.inline")).map((el, index) => {
      const lines = (el.innerText || "")
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      const links = Array.from(el.querySelectorAll("a"))
        .map(a => ({
          text: (a.innerText || "").trim(),
          href: a.href || ""
        }))
        .filter(link => link.text || link.href);

      const images = Array.from(el.querySelectorAll("img"))
        .map(img => img.currentSrc || img.src || "")
        .filter(Boolean);

      const className = el.className || "";

      return {
        index: index + 1,
        className,
        text: el.innerText || "",
        html: el.innerHTML || "",
        lines,
        links,
        images
      };
    });
  });

  const events = rawCards.map(card => {
    const lines = card.lines || [];
    const rawText = normalizeText(card.text);
    const oneLine = normalizeOneLine(rawText);

    const guessedTitle = guessTitleFromLines(lines);
    const categoryTitle = splitCategoryTitle(guessedTitle);

    let title = categoryTitle.title;
    let category = categoryTitle.category;

    if (isProbablyBadTitle(title)) {
      const fallback = splitCategoryTitle(oneLine);
      title = fallback.title;
      category = category || fallback.category;
    }

    const time = parseTime(oneLine);
    const location = extractLocationFromLines(lines);
    const distanceKm = parseDistanceKm(location || oneLine);

    const subtitle = lines
      .map(cleanText)
      .filter(Boolean)
      .find(line =>
        line !== guessedTitle &&
        line !== title &&
        line !== location &&
        !line.includes(time) &&
        !/^\d+(?:[,.]\d+)?\s*km$/i.test(line)
      ) || "";

    return {
      index: card.index,
      category,
      title,
      subtitle,
      time,
      location,
      distanceKm,
      imageUrl: card.images[0] || "",
      links: card.links,
      rawText,
      rawLines: lines
    };
  });

  const festMarktEvents = events.filter(isFestMarktEvent);
  const durationSec = ((Date.now() - startedAt) / 1000).toFixed(1);

  const textLog = [];

  textLog.push("Fast Importer - Wasgehtapp Übersicht V2");
  textLog.push(`Quelle: ${SOURCE_URL}`);
  textLog.push(`Events gefunden: ${events.length}`);
  textLog.push(`Feste/Märkte Treffer: ${festMarktEvents.length}`);
  textLog.push(`Dauer: ${durationSec}s`);
  textLog.push("");
  textLog.push("Alle Treffer Feste/Märkte:");
  textLog.push("========================");

  for (const event of festMarktEvents) {
    textLog.push(formatEventLine(event));
  }

  textLog.push("");
  textLog.push("Alle importierten Events:");
  textLog.push("========================");

  for (const event of events) {
    textLog.push(formatEventLine(event));
  }

  textLog.push("");
  textLog.push("Hinweis:");
  textLog.push(`Rohdaten pro Event stehen zusätzlich in ${RAW_OUTPUT_TXT} und ${RAW_OUTPUT_JSON}.`);
  textLog.push("Damit kann man prüfen, welche Infos direkt in der Listenansicht vorhanden sind.");

  const rawTextLog = [];

  rawTextLog.push("Fast Importer Rohdaten - Wasgehtapp Übersicht V2");
  rawTextLog.push(`Quelle: ${SOURCE_URL}`);
  rawTextLog.push(`Events gefunden: ${rawCards.length}`);
  rawTextLog.push("");
  rawTextLog.push("========================");

  for (const card of rawCards) {
    rawTextLog.push("");
    rawTextLog.push(`EVENT ${String(card.index).padStart(3, "0")}`);
    rawTextLog.push("========================");
    rawTextLog.push("LINES:");
    for (const line of card.lines) {
      rawTextLog.push(`- ${line}`);
    }
    rawTextLog.push("");
    rawTextLog.push("LINKS:");
    for (const link of card.links) {
      rawTextLog.push(`- ${link.text || "(ohne Text)"} => ${link.href}`);
    }
    rawTextLog.push("");
    rawTextLog.push("IMAGES:");
    for (const image of card.images) {
      rawTextLog.push(`- ${image}`);
    }
    rawTextLog.push("");
    rawTextLog.push("RAW TEXT:");
    rawTextLog.push(card.text || "");
  }

  fs.writeFileSync(OUTPUT_TXT, textLog.join("\n"), "utf8");
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(events, null, 2), "utf8");

  fs.writeFileSync(RAW_OUTPUT_TXT, rawTextLog.join("\n"), "utf8");
  fs.writeFileSync(RAW_OUTPUT_JSON, JSON.stringify(rawCards, null, 2), "utf8");

  console.log(textLog.join("\n"));

  await browser.close();
}

run().catch(error => {
  console.error(error);

  fs.writeFileSync(
    OUTPUT_TXT,
    String(error.stack || error),
    "utf8"
  );

  process.exit(1);
});
