#!/usr/bin/env node
'use strict';

/**
 * EventBW Importer
 *
 * Strategie:
 * - EventBW-eigene Suche verwenden
 * - Kategorien direkt abfragen:
 *   - Märkte
 *   - Feste
 * - Ort: Dettingen
 * - Datum:
 *   - wenn heute Sonntag: heute
 *   - sonst: kommender Sonntag
 * - kein Playwright
 * - kein Browser
 * - serverseitiges HTML
 *
 * Outputs:
 * - eventbw/debug-output.json
 * - eventbw/debug-output.txt
 * - eventbw/feste-maerkte.json
 * - eventbw/feste-maerkte.txt
 * - eventbw/01-raw-import.json
 * - eventbw/01-raw-import.txt
 * - eventbw/02-sonntag.json
 * - eventbw/02-sonntag.txt
 */

const fs = require('node:fs/promises');
const path = require('node:path');

const BASE_URL = 'https://www.veranstaltung-baden-wuerttemberg.de';
const OUT_DIR = path.resolve(process.cwd(), 'eventbw');

const SEARCH_PLACE = process.env.EVENTBW_SEARCH_PLACE || 'Dettingen Teck';
const MAX_PAGES_PER_CATEGORY = Number(process.env.EVENTBW_MAX_PAGES_PER_CATEGORY || 20);
const FETCH_TIMEOUT_MS = Number(process.env.EVENTBW_FETCH_TIMEOUT_MS || 12000);
const USER_AGENT = 'Mozilla/5.0 EventBW-SearchImporter/2.0 (+https://github.com/Ulli-Buehler/Event-Finder)';

const CATEGORIES = [
  {
    key: 'maerkte',
    label: 'Märkte',
    path: '/kategorie/maerkte/',
  },
  {
    key: 'feste',
    label: 'Feste',
    path: '/kategorie/feste/',
  },
];

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

function buildSearchUrl(category, targetDate, page = 1) {
  const basePath = page === 1
    ? category.path
    : `${category.path}page/${page}/`;

  const url = new URL(basePath, BASE_URL);

  url.searchParams.set('post_type', 'event');
  url.searchParams.set('ort', SEARCH_PLACE);
  url.searchParams.set('region', '');
  url.searchParams.set('von', targetDate);
  url.searchParams.set('bis', targetDate);

  return url.toString();
}

function extractCount(html) {
  const text = cleanText(html);
  const m = text.match(/(\d+)\s+Veranstaltungen gefunden/i)
    || text.match(/(\d+)\s+aktuelle/i);

  return m ? Number(m[1]) : null;
}

function extractCity(text, categoryLabel, dateRaw) {
  let city = '';

  if (categoryLabel && dateRaw) {
    const escapedCategory = categoryLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedDate = dateRaw.slice(0, 10).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`${escapedCategory}\\s*\\|\\s*([^\\n|]+?)\\s+${escapedDate}`, 'i');
    const m = text.match(re);
    if (m) city = cleanText(m[1]);
  }

  if (!city) {
    const generic = text.match(/(?:Feste|Märkte|Maerkte)\s*\|\s*([^0-9|]+?)\s+\d{2}\.\d{2}\.\d{4}/i);
    if (generic) city = cleanText(generic[1]);
  }

  return city;
}

function extractEventsFromHtml(html, category, page, searchUrl) {
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

    const city = extractCity(blockText, category.label, dateRaw);

    const teaser = cleanText(
      blockText
        .replace(title, '')
        .replace(category.label, '')
        .replace(city, '')
        .replace(dateRaw, '')
        .replace('Details', '')
    );

    if (!title || !url) continue;

    events.push({
      source: 'eventbw',
      category: category.label,
      categoryKey: category.key,
      searchPlace: SEARCH_PLACE,
      searchUrl,
      page,
      title,
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
    const key = normalizeText(`${event.title}|${event.categoryKey}|${event.startDate}|${event.url}`);

    if (seen.has(key)) continue;

    seen.add(key);
    out.push(event);
  }

  return out;
}

async function collectCategory(category, targetDate) {
  const pages = [];
  const events = [];

  for (let page = 1; page <= MAX_PAGES_PER_CATEGORY; page++) {
    const searchUrl = buildSearchUrl(category, targetDate, page);

    try {
      const html = await fetchHtml(searchUrl);
      const pageEvents = extractEventsFromHtml(html, category, page, searchUrl);
      const reportedCount = page === 1 ? extractCount(html) : null;

      pages.push({
        category: category.key,
        page,
        url: searchUrl,
        ok: true,
        reportedCount,
        parsedCount: pageEvents.length,
      });

      if (!pageEvents.length) break;

      events.push(...pageEvents);

      if (reportedCount !== null && events.length >= reportedCount) break;
    } catch (err) {
      pages.push({
        category: category.key,
        page,
        url: searchUrl,
        ok: false,
        error: String(err.message || err),
      });
      break;
    }
  }

  return {
    pages,
    events,
  };
}

function eventsToText(title, events, meta) {
  const lines = [];

  lines.push(title);
  lines.push(`Ort/Suche: ${SEARCH_PLACE}`);
  lines.push(`Zieldatum: ${meta.targetDate}`);
  lines.push(`Treffer: ${events.length}`);
  lines.push('');

  for (const [i, e] of events.entries()) {
    lines.push(`${i + 1}. ${e.title}`);
    lines.push(`   Kategorie: ${e.category}`);
    lines.push(`   Ort: ${e.city || 'unbekannt'}`);
    lines.push(`   Datum: ${e.startDate || 'unbekannt'}${e.endDate && e.endDate !== e.startDate ? ` - ${e.endDate}` : ''}${e.time ? ` | ${e.time}` : ''}`);
    if (e.teaser) lines.push(`   Text: ${e.teaser}`);
    lines.push(`   Suchseite: ${e.searchUrl}`);
    lines.push(`   URL: ${e.url}`);
    lines.push('');
  }

  return lines.join('\n');
}

function summaryToText(meta, pages) {
  return [
    'EventBW Direct Search Import',
    '',
    `Ort/Suche: ${SEARCH_PLACE}`,
    `Zieldatum: ${meta.targetDate}`,
    '',
    'Suchstrategie:',
    '- EventBW eigene Kategorie-Suche',
    '- Kategorie Märkte',
    '- Kategorie Feste',
    '- Datum von/bis identisch',
    '- Ort Dettingen',
    '- kein Radiusfilter',
    '- kein eigener Markt/Fest-Filter',
    '- kein Negativfilter',
    '- kein Geofilter',
    '',
    'Counts:',
    JSON.stringify(meta.counts, null, 2),
    '',
    'Pages:',
    JSON.stringify(pages, null, 2),
    '',
  ].join('\n');
}

async function main() {
  const startedAt = new Date().toISOString();
  const targetDate = targetSundayIso();

  await fs.mkdir(OUT_DIR, { recursive: true });

  const allPages = [];
  const collected = [];

  for (const category of CATEGORIES) {
    const result = await collectCategory(category, targetDate);
    allPages.push(...result.pages);
    collected.push(...result.events);
  }

  const rawEvents = dedupeEvents(collected);
  const sundayEvents = rawEvents.filter(e => eventTouchesDate(e, targetDate));

  const finalEvents = sundayEvents.sort((a, b) => {
    const c = a.category.localeCompare(b.category, 'de');
    if (c !== 0) return c;
    return a.title.localeCompare(b.title, 'de');
  });

  const meta = {
    source: BASE_URL,
    searchPlace: SEARCH_PLACE,
    targetDate,
    startedAt,
    finishedAt: new Date().toISOString(),
    filters: {
      eventbwCategorySearch: true,
      categories: CATEGORIES.map(c => c.key),
      dateFromTo: true,
      place: SEARCH_PLACE,
      radius: false,
      ownMarketFestivalFilter: false,
      negative: false,
      geo: false,
    },
    counts: {
      pages: allPages.length,
      rawCollectedIncludingDuplicates: collected.length,
      rawUnique: rawEvents.length,
      sunday: sundayEvents.length,
      final: finalEvents.length,
      maerkte: finalEvents.filter(e => e.categoryKey === 'maerkte').length,
      feste: finalEvents.filter(e => e.categoryKey === 'feste').length,
    },
  };

  const debug = {
    meta,
    pages: allPages,
    rawEvents,
    sundayEvents,
    finalEvents,
  };

  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.json'), JSON.stringify({ meta, events: rawEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.txt'), eventsToText('01 RAW IMPORT - EventBW Suche Märkte + Feste', rawEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, '02-sonntag.json'), JSON.stringify({ meta, events: sundayEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '02-sonntag.txt'), eventsToText('02 SONNTAG - EventBW Suche ohne eigene Filter', sundayEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'debug-output.txt'), summaryToText(meta, allPages), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: finalEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), eventsToText('EventBW Feste/Märkte - direkte Suche', finalEvents, meta), 'utf8');

  console.log(`EventBW direct search import done.`);
  console.log(`Place: ${SEARCH_PLACE}`);
  console.log(`Target date: ${targetDate}`);
  console.log(`Raw unique: ${rawEvents.length}`);
  console.log(`Final: ${finalEvents.length}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
