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

  const endIndex = lines.findIndex(
    (line, index) => index > startIndex && line.includes("Zum Kalender zufügen")
  );

  return lines
    .slice(Math.max(0, startIndex - 1), endIndex === -1 ? startIndex + 25 : endIndex)
    .filter(line => normalizeText(line) !== "");
}

function extractGeoFromUrl(url) {
  if (!url) return null;

  const decoded = decodeURIComponent(url);

  const patterns = [
    /[?&](?:q|query|ll)=(-?\d+\.\d+),\s*(-?\d+\.\d+)/i,
    /[?&]lat=(-?\d+\.\d+).*?[?&]lon=(-?\d+\.\d+)/i,
    /[?&]lat=(-?\d+\.\d+).*?[?&]lng=(-?\d+\.\d+)/i,
    /@(-?\d+\.\d+),\s*(-?\d+\.\d+)/i,
    /#map=\d+\/(-?\d+\.\d+)\/(-?\d+\.\d+)/i
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);

    if (match) {
      return {
        lat: Number(match[1]),
        lng: Number(match[2])
      };
    }
  }

  return null;
}

async function run() {
  console.log("🔎 Debug Detail Importer V4");
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

      const result = await page.evaluate(() => {
        const lines = (document.body.innerText || "")
          .split("\n")
          .map(line => line.trim())
          .filter(Boolean);

        const links = Array.from(document.querySelectorAll("a"))
          .map(a => ({
            text: (a.innerText || a.textContent || "").trim(),
            href: a.href || "",
            className: a.className ? String(a.className) : "",
            title: a.title || "",
            ariaLabel: a.getAttribute("aria-label") || ""
          }))
          .filter(link => link.href);

        const mapLinks = links.filter(link => {
          const haystack = `${link.text} ${link.href} ${link.className} ${link.title} ${link.ariaLabel}`.toLowerCase();

          return (
            haystack.includes("map") ||
            haystack.includes("karte") ||
            haystack.includes("openstreetmap") ||
            haystack.includes("google") ||
            haystack.includes("maps") ||
            link.className.includes("location")
          );
        });

        return {
          url: location.href,
          lines,
          mapLinks
        };
      });

      const detailLines = extractDetailBlock(result.lines);

      console.log("Detailblock:");
      detailLines.forEach((line, idx) => {
        console.log(`${String(idx + 1).padStart(2, "0")}: ${normalizeText(line)}`);
      });

      console.log("Map-/Location-Links:");

      if (result.mapLinks.length === 0) {
        console.log("Keine Map-Links gefunden.");
      } else {
        result.mapLinks.slice(0, 10).forEach((link, idx) => {
          const geo = extractGeoFromUrl(link.href);

          console.log(`${idx + 1}. Text: ${normalizeText(link.text)}`);
          console.log(`   Class: ${link.className}`);
          console.log(`   Href: ${link.href}`);
          console.log(
            `   Geo: ${
              geo ? `lat=${geo.lat}, lng=${geo.lng}` : "keine Koordinaten im Link"
            }`
          );
        });
      }

      console.log("");
      await page.waitForTimeout(CLICK_DELAY_MS);
    } catch (error) {
      console.log("❌ Fehler:", error.message);
      console.log("");
    }
  }

  await browser.close();
  console.log("✅ Debug-Test V4 beendet.");
}

run();