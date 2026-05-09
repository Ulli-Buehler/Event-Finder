import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 10;
const CLICK_DELAY_MS = 900;

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDetailBlock(lines) {
  const startIndex = lines.findIndex(line => line === "calendar");

  if (startIndex === -1) return lines.slice(0, 25);

  const title = lines[startIndex - 1] || "";
  const endIndex = lines.findIndex(
    (line, index) => index > startIndex && line.includes("Zum Kalender zufügen")
  );

  const detailLines = lines.slice(
    Math.max(0, startIndex - 1),
    endIndex === -1 ? startIndex + 20 : endIndex
  );

  return detailLines.filter(line => normalizeText(line) !== "");
}

async function run() {
  console.log("🔎 Debug Detail Importer V3");
  console.log("Quelle:", SOURCE_URL);
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

  await page.waitForTimeout(4000);

  const count = await page.locator(".termin.inline").count();

  console.log(`Gefundene .termin.inline Container: ${count}`);
  console.log("");

  const total = Math.min(count, MAX_EVENTS);

  for (let i = 0; i < total; i++) {
    console.log(`--- Event ${i + 1} ---`);

    try {
      await page.goto(SOURCE_URL, {
        waitUntil: "networkidle",
        timeout: 60000
      });

      await page.waitForTimeout(2500);

      const cards = page.locator(".termin.inline");
      const card = cards.nth(i);

      const listText = normalizeText(await card.innerText());

      console.log("Listenkarte:");
      console.log(listText.slice(0, 250));

      await card.click({ timeout: 10000 });

      await page.waitForTimeout(1800);

      const lines = await page.evaluate(() => {
        return (document.body.innerText || "")
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean);
      });

      const detailLines = extractDetailBlock(lines);

      console.log("Detailblock:");

      detailLines.forEach((line, idx) => {
        console.log(`${String(idx + 1).padStart(2, "0")}: ${normalizeText(line)}`);
      });

      console.log("");
      await page.waitForTimeout(CLICK_DELAY_MS);
    } catch (error) {
      console.log("❌ Fehler:", error.message);
      console.log("");
    }
  }

  await browser.close();
  console.log("✅ Debug-Test V3 beendet.");
}

run();