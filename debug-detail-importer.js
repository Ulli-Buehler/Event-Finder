import { chromium } from "playwright";

const SOURCE_URL =
  "https://www.wasgehtapp.de/index.php?geo_id=15546&ort=Dettingen%20unter%20Teck&x=9.45&y=48.6167&einwohner=5603&region=01&select_ort=1&radius=40";

const MAX_EVENTS = 30;
const PAUSES_TO_TEST = [0, 150, 300, 600];

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

function extractGeoFromUrl(url) {
  if (!url) return null;

  const decoded = decodeURIComponent(url);

  const patterns = [
    /[?&]daddr=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /[?&](?:q|query|ll)=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /[?&]lat=(-?\d+(?:\.\d+)?).*?[?&](?:lon|lng)=(-?\d+(?:\.\d+)?)/i,
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /#map=\d+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/i
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

async function collectMapGeo(page) {
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a.map_link"))
      .map(a => ({
        text: (a.innerText || a.textContent || "").trim(),
        href: a.href || "",
        className: a.className ? String(a.className) : ""
      }))
      .filter(link => link.href);
  });

  for (const link of links) {
    const geo = extractGeoFromUrl(link.href);
    if (geo) return geo;
  }

  return null;
}

async function readEvent(page, index) {
  const cards = page.locator(".termin.inline");
  const card = cards.nth(index);

  await card.click({ timeout: 10000 });
  await page.waitForTimeout(250);

  const lines = await page.evaluate(() => {
    return (document.body.innerText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
  });

  const detailLines = extractDetailBlock(lines);
  const fields = extractFields(detailLines);
  const geo = await collectMapGeo(page);

  return {
    ok: Boolean(fields.title && fields.date && fields.location),
    ...fields,
    geo,
    detailLineCount: detailLines.length
  };
}

async function runOneTest(pauseMs) {
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

  const startedAt = Date.now();

  await page.goto(SOURCE_URL, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  await page.waitForTimeout(4000);

  const count = await page.locator(".termin.inline").count();
  const total = Math.min(count, MAX_EVENTS);

  let ok = 0;
  let failed = 0;
  let withGeo = 0;
  const problems = [];

  console.log("");
  console.log(`==============================`);
  console.log(`Test Pause: ${pauseMs} ms`);
  console.log(`Container gefunden: ${count}`);
  console.log(`Teste Events: ${total}`);
  console.log(`==============================`);

  for (let i = 0; i < total; i++) {
    try {
      const event = await readEvent(page, i);

      if (event.ok) ok++;
      else {
        failed++;
        problems.push(`#${i + 1}: unvollständig`);
      }

      if (event.geo) withGeo++;

      console.log(
        `${String(i + 1).padStart(2, "0")}. ${
          event.ok ? "OK" : "FEHLER"
        } | ${event.geo ? "GEO" : "NO GEO"} | ${event.title} | ${event.date} | ${event.location} ${
          event.geo ? `| ${event.geo.lat},${event.geo.lng}` : ""
        }`
      );
    } catch (error) {
      failed++;
      problems.push(`#${i + 1}: ${error.message}`);
      console.log(`${String(i + 1).padStart(2, "0")}. FEHLER | ${error.message}`);
    }

    if (pauseMs > 0) {
      await sleep(pauseMs);
    }
  }

  const durationSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);

  await browser.close();

  return {
    pauseMs,
    total,
    ok,
    failed,
    withGeo,
    durationSeconds,
    problems
  };
}

async function run() {
  console.log("🔎 Debug Detail Importer V5");
  console.log("Ziel: Geschwindigkeit + Stabilität testen");
  console.log(`Max Events pro Test: ${MAX_EVENTS}`);

  const summaries = [];

  for (const pauseMs of PAUSES_TO_TEST) {
    try {
      const summary = await runOneTest(pauseMs);
      summaries.push(summary);
    } catch (error) {
      summaries.push({
        pauseMs,
        total: 0,
        ok: 0,
        failed: 1,
        withGeo: 0,
        durationSeconds: "0.0",
        problems: [error.message]
      });
    }
  }

  console.log("");
  console.log("========== ZUSAMMENFASSUNG ==========");

  for (const s of summaries) {
    console.log(
      `Pause ${String(s.pauseMs).padStart(3, " ")} ms | Events: ${s.total} | OK: ${s.ok} | Fehler: ${s.failed} | Geo: ${s.withGeo} | Dauer: ${s.durationSeconds}s`
    );

    if (s.problems.length > 0) {
      console.log(`Probleme: ${s.problems.slice(0, 5).join(" | ")}`);
    }
  }

  console.log("✅ Debug-Test V5 beendet.");
}

run();