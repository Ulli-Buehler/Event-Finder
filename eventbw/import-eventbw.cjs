#!/usr/bin/env node
'use strict';

/**
 * EventBW Phase-1 Vergleichsimporter
 *
 * Ziel:
 * - EventBW-Region Stuttgart möglichst direkt spiegeln
 * - kein Radiusfilter
 * - kein Markt/Fest-Filter
 * - kein Negativfilter
 * - kein Geo-Filter
 * - nur Datum: heute Sonntag, sonst kommender Sonntag
 *
 * Richtige Quelle:
 * https://www.veranstaltung-baden-wuerttemberg.de/region/region-stuttgart/
 *
 * Outputs:
 * - eventbw/01-raw-import.json
 * - eventbw/01-raw-import.txt
 * - eventbw/02-sonntag.json
 * - eventbw/02-sonntag.txt
 * - eventbw/debug-output.json
 * - eventbw/debug-output.txt
 * - eventbw/feste-maerkte.json
 * - eventbw/feste-maerkte.txt
 *
 * Node >= 20, no Playwright, no npm dependencies.
 */

const fs = require('node:fs/promises');
const path = require('node:path');

const BASE_URL = 'https://www.veranstaltung-baden-wuerttemberg.de';
const OUT_DIR = path.resolve(process.cwd(), 'eventbw');

const REGION_KEY = process.env.EVENTBW_REGION_KEY || 'region-stuttgart';
const REGION_URL = `${BASE_URL}/region/${REGION_KEY}/`;

const MAX_PAGES = Number(process.env.EVENTBW_MAX_PAGES_PER_CATEGORY || process.env.EVENTBW_MAX_PAGES || 80);
const FETCH_TIMEOUT_MS = Number(process.env.EVENTBW_FETCH_TIMEOUT_MS || 12000);
const USER_AGENT = 'Mozilla/5.0 EventBW-Phase1-CompareImporter/1.1 (+https://github.com/Ulli-Buehler/Event-Finder)';

function decodeHtml(s) {
  return String(s || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#038;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;|&#8212;/g, '-')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8216;|&#8217;/g, "'")
    .replace(/&hellip;/g, '...');
}

function cleanText(s) {
  return decodeHtml(String(s || ''))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function normalizeText(s) {
  return cleanText(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDateRange(value) {
  const text = cleanText(value);
  const matches = [...text.matchAll(/(\d{2})\.(\d{2})\.(\d{4})/g)];

  const startDate = matches[0] ? `${matches[0][3]}-${matches[0][2]}-${matches[0][1]}` : null;
  const endDate = matches[1] ? `${matches[1][3]}-${matches[1][2]}-${matches[1][1]}` : startDate;

  const timeMatch = text.match(/,\s*([^,]+?Uhr)/i);

  return {
    raw: text,
    startDate,
    endDate,
    time: timeMatch ? cleanText(timeMatch[1]) : '',
  };
}

function berlinDateParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date()).reduce((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}

function targetSundayIso() {
  if (process.env.EVENTBW_TARGET_DATE && /^\d{4}-\d{2}-\d{2}$/.test(process.env.EVENTBW_TARGET_DATE)) {
    return process.env.EVENTBW_TARGET_DATE;
  }

  const p = berlinDateParts();
  const date = new Date(Date.UTC(p.year, p.month - 1, p.day, 12, 0, 0));
  const day = date.getUTCDay();
  const addDays = day === 0 ? 0 : 7 - day;

  date.setUTCDate(date.getUTCDate() + addDays);

  return date.toISOString().slice(0, 10);
}

function compareIso(a, b) {
  if (!a || !b) return 0;
  return a < b ? -1 : a > b ? 1 : 0;
}

function eventTouchesDate(event, targetDate) {
  return event.startDate
    && event.endDate
    && compareIso(event.startDate, targetDate) <= 0
    && compareIso(event.endDate, targetDate) >= 0;
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,*/*',
      },
      signal: controller.signal,
    });

    const html = await res.text();

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return html;
  } finally {
    clearTimeout(timeout);
  }
}

function absoluteUrl(href) {
  if (!href) return '';

  try {
    return new URL(decodeHtml(href), BASE_URL).toString();
  } catch {
    return '';
  }
}

function pageUrl(page) {
  return page === 1 ? REGION_URL : `${REGION_URL}page/${page}/`;
}

function guessCategory(text) {
  const m = text.match(/\b(Feste|Märkte|Maerkte|Konzerte|Ausstellungen|Führungen|Fuehrungen|Theater|Sport|Kinder|Brauchtum|Kultur)\b/i);

  if (!m) return '';

  return cleanText(m[1]).replace('Maerkte', 'Märkte').replace('Fuehrungen', 'Führungen');
}

function extractCityFromText(text, category, dateRaw) {
  let city = '';

  if (category && dateRaw) {
    const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedDate = dateRaw.slice(0, 10).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const re = new RegExp(`${escapedCategory}\\s*\\|\\s*([^\\n|]+?)\\s+${escapedDate}`, 'i');
    const m = text.match(re);

    if (m) {
      city = cleanText(m[1]);
    }
  }

  if (!city) {
    const generic = text.match(/(?:Feste|Märkte|Maerkte|Konzerte|Ausstellungen|Führungen|Fuehrungen|Theater|Sport|Kinder|Brauchtum|Kultur)\s*\|\s*([^0-9|]+?)\s+\d{2}\.\d{2}\.\d{4}/i);
    if (generic) {
      city = cleanText(generic[1]);
    }
  }

  return city;
}

function extractEventsFromListHtml(html, page) {
  const beforePagination = html.split(/<h2[^>]*>\s*Posts pagination\s*<\/h2>/i)[0] || html;
  const h3Re = /<h3[^>]*>\s*<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
  const matches = [...beforePagination.matchAll(h3Re)];
  const events = [];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : beforePagination.length;
    const blockHtml = beforePagination.slice(start, end);
    const blockText = cleanText(blockHtml);

    const title = cleanText(m[2]);
    const url = absoluteUrl(m[1]);

    const dateMatch = blockText.match(/\d{2}\.\d{2}\.\d{4}(?:\s*-\s*\d{2}\.\d{2}\.\d{4})?(?:,\s*[^|]*?Uhr)?/i);
    const dateRaw = dateMatch ? cleanText(dateMatch[0]) : '';
    const dateRange = parseDateRange(dateRaw);

    const category = guessCategory(blockText);
    const city = extractCityFromText(blockText, category, dateRaw);

    const teaser = cleanText(
      blockText
        .replace(title, '')
        .replace(category, '')
        .replace(city, '')
        .replace(dateRaw, '')
        .replace('Details', '')
    );

    if (!title || !url) continue;

    events.push({
      source: 'eventbw',
      importPhase: 'phase1-region-stuttgart-no-filters',
      page,
      title,
      category,
      city,
      dateRaw: dateRange.raw,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      time: dateRange.time,
      teaser,
      url,
      rawText: blockText,
    });
  }

  return events;
}

function dedupeEvents(events) {
  const seen = new Set();
  const out = [];

  for (const event of events) {
    const key = normalizeText(`${event.title}|${event.startDate}|${event.url}`);

    if (seen.has(key)) continue;

    seen.add(key);
    out.push(event);
  }

  return out;
}

function eventsToText(title, events, meta) {
  const lines = [];

  lines.push(title);
  lines.push(`Quelle: ${REGION_URL}`);
  lines.push(`Region: ${REGION_KEY}`);
  lines.push(`Zieldatum: ${meta.targetDate}`);
  lines.push(`Treffer: ${events.length}`);
  lines.push('');

  for (const [i, e] of events.entries()) {
    lines.push(`${i + 1}. ${e.title}`);
    lines.push(`   Kategorie: ${e.category || 'unbekannt'}`);
    lines.push(`   Ort: ${e.city || 'unbekannt'}`);
    lines.push(`   Datum: ${e.startDate || 'unbekannt'}${e.endDate && e.endDate !== e.startDate ? ` - ${e.endDate}` : ''}${e.time ? ` | ${e.time}` : ''}`);
    if (e.teaser) lines.push(`   Text: ${e.teaser}`);
    lines.push(`   Seite: ${e.page}`);
    lines.push(`   URL: ${e.url}`);
    lines.push('');
  }

  return lines.join('\n');
}

function summaryToText(meta) {
  return [
    'EventBW Phase-1 Debug Import',
    '',
    `Quelle: ${REGION_URL}`,
    `Region: ${REGION_KEY}`,
    `Zieldatum: ${meta.targetDate}`,
    '',
    'Filter:',
    '- Region Stuttgart: JA',
    '- Datum Sonntag: JA für 02-sonntag/feste-maerkte',
    '- Radiusfilter: NEIN',
    '- Markt/Fest-Filter: NEIN',
    '- Negativfilter: NEIN',
    '- Geofilter: NEIN',
    '',
    'Counts:',
    JSON.stringify(meta.counts, null, 2),
    '',
  ].join('\n');
}

async function main() {
  const startedAt = new Date().toISOString();
  const targetDate = targetSundayIso();

  await fs.mkdir(OUT_DIR, { recursive: true });

  const pages = [];
  const collected = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = pageUrl(page);

    try {
      const html = await fetchHtml(url);
      const events = extractEventsFromListHtml(html, page);

      pages.push({
        page,
        url,
        ok: true,
        count: events.length,
      });

      if (!events.length) break;

      collected.push(...events);

      const pageDates = events
        .map(e => e.startDate)
        .filter(Boolean)
        .sort();

      const minDate = pageDates[0] || null;
      const maxDate = pageDates[pageDates.length - 1] || null;

      if (minDate && compareIso(minDate, targetDate) > 0) {
        break;
      }

      if (maxDate && compareIso(maxDate, targetDate) > 0 && events.every(e => e.startDate && compareIso(e.startDate, targetDate) > 0)) {
        break;
      }
    } catch (err) {
      pages.push({
        page,
        url,
        ok: false,
        error: String(err.message || err),
      });
      break;
    }
  }

  const rawEvents = dedupeEvents(collected);
  const sundayEvents = rawEvents.filter(e => eventTouchesDate(e, targetDate));

  const meta = {
    source: BASE_URL,
    regionKey: REGION_KEY,
    regionUrl: REGION_URL,
    targetDate,
    startedAt,
    finishedAt: new Date().toISOString(),
    filters: {
      regionStuttgart: true,
      sundayOnlyForFinal: true,
      radius: false,
      marketFestival: false,
      negative: false,
      geo: false,
    },
    counts: {
      pages: pages.length,
      rawCollectedIncludingDuplicates: collected.length,
      rawUnique: rawEvents.length,
      sunday: sundayEvents.length,
    },
  };

  const debug = {
    meta,
    pages,
    rawEvents,
    sundayEvents,
  };

  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.json'), JSON.stringify({ meta, events: rawEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.txt'), eventsToText('01 RAW IMPORT - Region Stuttgart ohne Filter', rawEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, '02-sonntag.json'), JSON.stringify({ meta, events: sundayEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '02-sonntag.txt'), eventsToText('02 SONNTAG - Region Stuttgart ohne Markt/Fest/Radiusfilter', sundayEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'debug-output.txt'), summaryToText(meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: sundayEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), eventsToText('PHASE 1 FINAL - noch ungefilterte Sonntagstreffer', sundayEvents, meta), 'utf8');

  console.log(`EventBW Phase 1 done.`);
  console.log(`Region: ${REGION_URL}`);
  console.log(`Target date: ${targetDate}`);
  console.log(`Raw unique: ${rawEvents.length}`);
  console.log(`Sunday: ${sundayEvents.length}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
