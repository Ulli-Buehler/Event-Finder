import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 60;
const CLICK_WAIT_MS = 50;
const PAUSE_MS = 0;

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(line => line === "calendar");
  if (startIndex === -1) return [];

  const endIndex = lines.findIndex(
    (line, index) => index > startIndex && line.includes("Zum Kalender zufügen")
  );

  return lines
    .slice(Math.max(0, startIndex - 1), endIndex === -1 ? startIndex + 30 : endIndex)
    .filter(Boolean);
}

function extractFields(detailLines) {
  const title = normalizeText(detailLines[0] || "");

  const dateIndex = detailLines.findIndex(line => line === "calendar");
  const pinIndex = detailLines.findIndex(line => line === "pin");
  const tagsIndex = detailLines.findIndex(line => line === "tags");

  const date = dateIndex >= 0 ? normalizeText(detailLines[dateIndex + 1] || "") : "";
  const location = pinIndex >= 0 ? normalizeText(detailLines[pinIndex + 1] || "") : "";
  const tags = tagsIndex >= 0 ? normalizeText(detailLines[tagsIndex + 1] || "") : "";

  return { title, date, location, tags };
}

function makeKey(event) {
  return `${event.title}|${event.date}|${event.location}`.toLowerCase();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  const listText = normalizeText(await card.innerText());

  await card.click({ timeout: 10000 });
  await page.waitForTimeout(CLICK_WAIT_MS);

  const lines = await page.evaluate(() => {
    return (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
  });

  const detailLines = extractDetailBlock(lines);
  const fields = extractFields(detailLines);

  return {
    ok: Boolean(fields.title && fields.date && fields.location),
    listText,
    detailLines,
    ...fields
  };
}

async function run() {
  console.log("🔎 Debug Detail Importer V7");
  console.log("Ziel: schneller