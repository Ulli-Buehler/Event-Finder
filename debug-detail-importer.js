import { chromium } from "playwright";
// Backup nach erfolgreichem Geo-Test

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 50;
const DETAIL_TIMEOUT_MS = 5000;

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLocation(text) {
  return normalizeText(text)
    .replace(/^pin\s*/i, "")
    .replace(/\s*map\s*link\s*$/i, "")
    .replace(/\s*map\s*$/i, "")
    .trim();
}

function extractGeoFromUrl(url) {
  if (!url) return null;

  const decoded = decodeURIComponent(url);

  const match = decoded.match(
    /[?&]daddr=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i
  );

  if (!match) return null;

  return {
    lat: Number(match[1]),
    lng: Number(match[2])
  };
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(line => line === "calendar");
  if (startIndex === -1) return [];

  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex &&
      line.includes("Zum Kalender zufügen")
  );

  return lines.slice(
    Math.max(0, startIndex - 1),
    endIndex === -1 ? startIndex + 40 : endIndex
  );
}

function extractFields(detailLines) {
  const title = normalizeText(detailLines[0] || "");
  const dateIndex = detailLines.findIndex(line => line === "calendar");
  const pinIndex = detailLines.findIndex(line => line === "pin");

  return {
    title,
    date:
      dateIndex >= 0
        ? normalizeText(detailLines[dateIndex + 1] || "")
        : "",
    location:
      pinIndex >= 0
        ? cleanLocation(detailLines[pinIndex + 1] || "")
        : ""
  };
}

async function waitForDetailChange(page, oldSnapshot) {
  await page.waitForFunction(
    previous => {
      const text = document.body.innerText || "";
      return (
        text.includes("calendar") &&
        text.includes("pin") &&
        text !== previous
      );
    },
    oldSnapshot,
    { timeout: DETAIL_TIMEOUT_MS }
  );
}

async function readActiveDetail(page) {
  return await page.evaluate(() => {
    const lines = (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const calendarIndex = lines.findIndex(line => line === "calendar");
    const pinIndex = lines.findIndex(
      (line, index) => index > calendarIndex && line === "pin"
    );

    const locationLine =
      pinIndex >= 0 ? lines[pinIndex + 1] || "" : "";

    const mapCandidates = Array.from(document.querySelectorAll("a.map_link"))
      .map(a => ({
        href: a.href || "",
        text: (a.innerText || a.textContent || "").trim(),
        html: a.outerHTML || ""
      }))
      .filter(item => item.href);

    return {
      lines,
      calendarIndex,
      pinIndex,
      locationLine,
      mapCandidates
    };
  });
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  const listText = normalizeText(await card.innerText());
  const oldSnapshot = await page.evaluate(() => document.body.innerText || "");

  await card.click({ timeout: 10000 });
  await waitForDetailChange(page, oldSnapshot);

  const active = await readActiveDetail(page);
  const detailLines = extractDetailBlock(active.lines);
  const fields = extractFields(detailLines);

  let selectedMap = null;
  let selectedGeo = null;

  const geoCandidates = active.mapCandidates
    .map(candidate => ({
      href: candidate.href,
      geo: extractGeoFromUrl(candidate.href)
    }))
    .filter(candidate => candidate.geo);

  if (geoCandidates.length > 0) {
    const selectedCandidate = geoCandidates[geoCandidates.length - 1];
    selectedMap = selectedCandidate.href;
    selectedGeo = selectedCandidate.geo;
  }

  return {
    listText,
    detailLines,
    fields,
    locationLine: active.locationLine,
    mapCandidates: active.mapCandidates,
    selectedMap,
    selectedGeo
  };
}

async function run() {
  console.log("🔎 Debug Detail Importer V9");
  console.log("Ziel: Geo passend zum aktiven Detailblock prüfen");
  console.log(`Max Events: ${MAX_EVENTS}`);
  console.log("");

  const browser = await chromium.launch({ headless: true });

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

  const count = await page.locator(".termin.inline").count();
  const total = Math.min(count, MAX_EVENTS);

  console.log(`Gefundene Container: ${count}`);
  console.log(`Teste Events: ${total}`);
  console.log("");

  for (let i = 0; i < total; i++) {
    console.log(`--- Event ${i + 1} ---`);

    try {
      const result = await readEvent(page, i);

      console.log(`Titel: ${result.fields.title}`);
      console.log(`Datum: ${result.fields.date}`);
      console.log(`Ort: ${result.fields.location}`);
      console.log(`LocationLine roh: ${result.locationLine}`);

      console.log("Map-Kandidaten:");
      result.mapCandidates.slice(0, 6).forEach((item, idx) => {
        const geo = extractGeoFromUrl(item.href);
        console.log(
          `${idx + 1}. ${item.href} ${
            geo ? `=> ${geo.lat}, ${geo.lng}` : "=> keine Geo"
          }`
        );
      });

      console.log(
        `Ausgewählt: ${
          result.selectedGeo
            ? `${result.selectedGeo.lat}, ${result.selectedGeo.lng}`
            : "KEINE GEO"
        }`
      );

      console.log("");
    } catch (error) {
      console.log(`FEHLER: ${error.message}`);
      console.log("");
    }
  }

  await browser.close();
  console.log("✅ Debug-Test V9 beendet.");
}

run();
