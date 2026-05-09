import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 10;
const DETAIL_DELAY_MS = 900;
const RETRY_DELAY_MS = 3000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function collectEventLinks(page) {
  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(4000);

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map(a => ({
        href: a.href,
        text: a.innerText || a.textContent || ""
      }))
      .filter(item => item.href && item.href.includes("wasgehtapp.de"))
      .filter(item => {
        const text = item.text.toLowerCase();
        return (
          item.href.includes("event") ||
          text.includes("link") ||
          text.length > 10
        );
      })
      .map(item => item.href);
  });

  return [...new Set(links)].slice(0, MAX_EVENTS);
}

async function readDetailPage(page, url, index) {
  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 60000
    });

    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
      const text = document.body.innerText || "";

      const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      return {
        url: location.href,
        title: lines[0] || "",
        lines: lines.slice(0, 25)
      };
    });

    return {
      index,
      ok: true,
      status: "OK",
      ...data
    };
  } catch (error) {
    return {
      index,
      ok: false,
      status: "ERROR",
      url,
      error: error.message
    };
  }
}

async function run() {
  console.log("🔎 Debug Detail Importer");
  console.log("Quelle:", SOURCE_URL);
  console.log(`Max Events: ${MAX_EVENTS}`);
  console.log(`Pause: ${DETAIL_DELAY_MS} ms`);
  console.log("");

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
  });

  console.log("📋 Sammle Event-Links...");

  const links = await collectEventLinks(page);

  console.log(`Gefundene Links: ${links.length}`);
  console.log("");

  if (links.length === 0) {
    console.log("❌ Keine Event-Links gefunden.");
    await browser.close();
    return;
  }

  for (let i = 0; i < links.length; i++) {
    const url = links[i];

    console.log(`--- Event ${i + 1} ---`);
    console.log(url);

    let result = await readDetailPage(page, url, i + 1);

    if (!result.ok) {
      console.log("⚠️ Fehler beim ersten Versuch. Retry...");
      await sleep(RETRY_DELAY_MS);
      result = await readDetailPage(page, url, i + 1);
    }

    if (!result.ok) {
      console.log("❌ Fehler:", result.error);
      console.log("");
      await sleep(DETAIL_DELAY_MS);
      continue;
    }

    console.log("✅ Detailseite gelesen");
    console.log("Titel-Kandidat:", normalizeText(result.title));
    console.log("Erste Zeilen:");

    result.lines.forEach((line, idx) => {
      console.log(`${String(idx + 1).padStart(2, "0")}: ${normalizeText(line)}`);
    });

    console.log("");
    await sleep(DETAIL_DELAY_MS);
  }

  await browser.close();

  console.log("✅ Debug-Test beendet.");
}

run();