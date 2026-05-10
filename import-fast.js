import { chromium } from "playwright";
import fs from "fs";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const OUTPUT_JSON = "fast-output.json";
const OUTPUT_TXT = "fast-output.txt";

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(rawTitle) {
  const text = normalizeText(rawTitle);
  const match = text.match(/^([^:]+):\s*(.+)$/);

  if (!match) {
    return {
      category: "",
      title: text
    };
  }

  return {
    category: normalizeText(match[1]),
    title: normalizeText(match[2])
  };
}

function extractTime(text) {
  const match = normalizeText(text).match(/\b\d{1,2}:\d{2}\s*Uhr\b/i);
  return match ? match[0] : "";
}

function extractLocation(text) {
  const lines = String(text || "")
    .split("\n")
    .map(normalizeText)
    .filter(Boolean);

  const timeLineIndex = lines.findIndex(line => /\b\d{1,2}:\d{2}\s*Uhr\b/i.test(line));

  if (timeLineIndex < 0) return "";

  const timeLine = lines[timeLineIndex];
  const afterTime = normalizeText(
    timeLine.replace(/^.*?\b\d{1,2}:\d{2}\s*Uhr\b/i, "")
  );

  if (afterTime) {
    return normalizeText(afterTime.replace(/^pin\s*/i, ""));
  }

  const nextLine = lines[timeLineIndex + 1] || "";
  return normalizeText(nextLine.replace(/^pin\s*/i, ""));
}

function isWantedMarketOrFestival(event) {
  const haystack = normalizeText(
    `${event.category} ${event.title} ${event.subtitle} ${event.location} ${event.text}`
  ).toLowerCase();

  const wantedWords = [
    "fest",
    "feste",
    "festival",
    "markt",
    "märkte",
    "flohmarkt",
    "kunstmarkt",
    "jahrmarkt",
    "weihnachtsmarkt",
    "street food",
    "hocketse",
    "hockete",
    "dorffest",
    "stadtfest",
    "frühlingsfest",
    "sommerfest",
    "herbstfest"
  ];

  return wantedWords.some(word => haystack.includes(word));
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

  const rawEvents = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".termin.inline")).map((el, index) => {
      const image = el.querySelector("img");
      const link = el.querySelector("a");
      const lines = (el.innerText || "")
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      return {
        index: index + 1,
        text: el.innerText || "",
        html: el.innerHTML || "",
        lines,
        imageUrl: image ? image.src || "" : "",
        detailUrl: link ? link.href || "" : ""
      };
    });
  });

  const events = rawEvents.map(raw => {
    const firstTitleLine = raw.lines.find(line => line.includes(":")) || raw.lines[0] || "";
    const titleParts = splitTitle(firstTitleLine);
    const time = extractTime(raw.text);
    const location = extractLocation(raw.text);

    const subtitle = raw.lines.find(line => {
      const normalized = normalizeText(line);
      if (!normalized) return false;
      if (normalized === firstTitleLine) return false;
      if (/\b\d{1,2}:\d{2}\s*Uhr\b/i.test(normalized)) return false;
      if (normalized.includes(location)) return false;
      return true;
    }) || "";

    const event = {
      index: raw.index,
      category: titleParts.category,
      title: titleParts.title,
      subtitle: normalizeText(subtitle),
      time,
      location,
      imageUrl: raw.imageUrl,
      detailUrl: raw.detailUrl,
      text: normalizeText(raw.text)
    };

    return {
      ...event,
      matchesMarketOrFestival: isWantedMarketOrFestival(event)
    };
  });

  const filtered = events.filter(event => event.matchesMarketOrFestival);
  const durationSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);

  const textLog = [];
  textLog.push("Fast Importer - Wasgehtapp Übersicht");
  textLog.push(`Quelle: ${SOURCE_URL}`);
  textLog.push(`Events gefunden: ${events.length}`);
  textLog.push(`Feste/Märkte Treffer: ${filtered.length}`);
  textLog.push(`Dauer: ${durationSeconds}s`);
  textLog.push("");
  textLog.push("Alle Treffer Feste/Märkte:");
  textLog.push("========================");

  for (const event of filtered) {
    textLog.push(
      `${String(event.index).padStart(3, "0")}. ${event.category}: ${event.title} | ${event.time} | ${event.location}`
    );
  }

  textLog.push("");
  textLog.push("Alle importierten Events:");
  textLog.push("========================");

  for (const event of events) {
    textLog.push(
      `${String(event.index).padStart(3, "0")}. ${event.category}: ${event.title} | ${event.time} | ${event.location}`
    );
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ events, filtered }, null, 2), "utf8");
  fs.writeFileSync(OUTPUT_TXT, textLog.join("\n"), "utf8");

  console.log(textLog.join("\n"));

  await browser.close();
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
