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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function looksLikeEventTitle(text) {
  const t = normalizeText(text);

  if (t.length < 8) return false;
  if (/^(zurück|vor|jan|feb|mär|apr|mai|jun|jul|aug|sep|okt|nov|dez)$/i.test(t)) return false;
  if (/^\d{4}$/.test(t)) return false;
  if (/^\d{1,2}:\d{2}/.test(t)) return false;
  if (/^\d+([,.]\d+)?\s*km$/i.test(t)) return false;

  return true;
}

async function run() {
  console.log("🔎 Debug Detail Importer V2");
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

  const candidates = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("body *"));

    return elements
      .map((el, index) => {
        const rect = el.getBoundingClientRect();
        const text = (el.innerText || el.textContent || "").trim();

        return {
          index,
          tag: el.tagName,
          className: el.className ? String(el.className) : "",
          id: el.id || "",
          text,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      })
      .filter(item => item.text)
      .filter(item => item.width > 100)
      .filter(item => item.height >= 25)
      .filter(item => item.y > 150)
      .slice(0, 300);
  });

  const eventCandidates = candidates
    .filter(item => looksLikeEventTitle(item.text))
    .filter(item => !item.text.includes("Was geht in"))
    .filter(item => !item.text.includes("Zurück"))
    .filter(item => !item.text.includes("Vor"))
    .slice(0, MAX_EVENTS);

  console.log(`Klick-Kandidaten: ${eventCandidates.length}`);
  console.log("");

  eventCandidates.forEach((item, i) => {
    console.log(`Kandidat ${i + 1}`);
    console.log(`Tag: ${item.tag}`);
    console.log(`Class: ${item.className}`);
    console.log(`Text: ${normalizeText(item.text).slice(0, 180)}`);
    console.log(`Position: x=${Math.round(item.x)}, y=${Math.round(item.y)}, w=${Math.round(item.width)}, h=${Math.round(item.height)}`);
    console.log("");
  });

  for (let i = 0; i < eventCandidates.length; i++) {
    const item = eventCandidates[i];

    console.log(`--- Klick-Test Event ${i + 1} ---`);
    console.log("Ausgangstext:", normalizeText(item.text).slice(0, 180));

    try {
      await page.goto(SOURCE_URL, {
        waitUntil: "networkidle",
        timeout: 60000
      });

      await page.waitForTimeout(2500);

      const freshCandidates = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll("body *"));

        return elements
          .map((el, index) => {
            const rect = el.getBoundingClientRect();
            const text = (el.innerText || el.textContent || "").trim();

            return {
              index,
              text,
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            };
          })
          .filter(item => item.text)
          .filter(item => item.width > 100)
          .filter(item => item.height >= 25)
          .filter(item => item.y > 150)
          .slice(0, 300);
      });

      const fresh = freshCandidates
        .filter(item => looksLikeEventTitle(item.text))
        .filter(item => !item.text.includes("Was geht in"))
        .filter(item => !item.text.includes("Zurück"))
        .filter(item => !item.text.includes("Vor"))[i];

      if (!fresh) {
        console.log("❌ Kandidat nicht mehr gefunden");
        console.log("");
        continue;
      }

      await page.mouse.click(fresh.x + fresh.width / 2, fresh.y + fresh.height / 2);

      await page.waitForTimeout(2000);

      const detail = await page.evaluate(() => {
        const lines = (document.body.innerText || "")
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean);

        return {
          url: location.href,
          lines: lines.slice(0, 40)
        };
      });

      console.log("URL nach Klick:", detail.url);
      console.log("Erste Detail-Zeilen:");

      detail.lines.forEach((line, idx) => {
        console.log(`${String(idx + 1).padStart(2, "0")}: ${normalizeText(line)}`);
      });

      console.log("");
      await sleep(CLICK_DELAY_MS);
    } catch (error) {
      console.log("❌ Fehler:", error.message);
      console.log("");
    }
  }

  await browser.close();
  console.log("✅ Debug-Test V2 beendet.");
}

run();