#!/usr/bin/env node
'use strict';

/**
 * EventBW Vollständiger Listen-Importer
 *
 * Ziel:
 * - alle Listenkarten aus Märkte + Feste ziehen
 * - keine Detailseiten laden
 * - keine Geo-Daten laden
 * - keine Radiusfilterung
 * - Daten direkt normalisiert speichern
 *
 * Gespeicherte Kerndaten:
 * - title
 * - category
 * - city
 * - startDate
 * - endDate
 * - targetDate
 * - touchesTargetDate
 * - time
 * - sortDate
 * - sortTime
 * - isMultiDay
 * - dateLabel
 * - teaser
 * - detailUrl
 * - sourceUrl
 * - page
 *
 * Outputs:
 * - eventbw/01-raw-import.json
 * - eventbw/01-raw-import.txt
 * - eventbw/02-zieldatum.json
 * - eventbw/02-zieldatum.txt
 * - eventbw/debug-output.json
 * - eventbw/debug-output.txt
 * - eventbw/feste-maerkte.json
 * - eventbw/feste-maerkte.txt
 * - eventbw/html/list-maerkte-page1.html
 * - eventbw/html/list-feste-page1.html
 * - eventbw/html/detail-sample-1.html
 * - eventbw/html/detail-sample-2.html
 * - eventbw/html/detail-sample-3.html
 * - eventbw/html/geo-km-scan.txt
 */

const fs = require('node:fs/promises');
const path = require('node:path');

const BASE_URL = 'https://www.veranstaltung-baden-wuerttemberg.de';
const OUT_DIR = path.resolve(process.cwd(), 'eventbw');
const HTML_DEBUG_DIR = path.join(OUT_DIR, 'html');

const SEARCH_PLACE = process.env.EVENTBW_SEARCH_PLACE || 'Dettingen Teck';
const MAX_PAGES_PER_CATEGORY = Number(process.env.EVENTBW_MAX_PAGES_PER_CATEGORY || 300);
const FETCH_TIMEOUT_MS = Number(process.env.EVENTBW_FETCH_TIMEOUT_MS || 15000);
const USER_AGENT = 'Mozilla/5.0 EventBW-FullListImporter/3.0 (+https://github.com/Ulli-Buehler/Event-Finder)';

const CATEGORIES = [
  {
    category: 'maerkte',
    label: 'Märkte',
    path: '/kategorie/maerkte/',
  },
  {
    category: 'feste',
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

function germanDateToIso(day, month, year) {
  return `${year}-${month}-${day}`;
}

function compareIso(a, b) {
  if (!a || !b) return 0;
  return a < b ? -1 : a > b ? 1 : 0;
}

function touchesDate(startDate, endDate, targetDate) {
  return Boolean(
    startDate
    && endDate
    && compareIso(startDate, targetDate) <= 0
    && compareIso(endDate, targetDate) >= 0
  );
}

function parseSortTime(time) {
  if (!time) return '';

  const match = String(time).match(/(\d{1,2})(?::(\d{2}))?/);
  if (!match) return '';

  const hh = String(match[1]).padStart(2, '0');
  const mm = String(match[2] || '00').padStart(2, '0');

  return `${hh}:${mm}`;
}

function parseListDateAndTime(text) {
  const t = cleanText(text);
  const matches = [...t.matchAll(/(\d{2})\.(\d{2})\.(\d{4})/g)];

  if (!matches.length) {
    return {
      dateRaw: '',
      startDate: null,
      endDate: null,
      time: '',
      sortDate: '',
      sortTime: '',
      isMultiDay: false,
      dateLabel: '',
    };
  }

  const first = matches[0];
  const startDate = germanDateToIso(first[1], first[2], first[3]);
  let endDate = startDate;
  let dateRawEndIndex = first.index + first[0].length;

  if (matches.length > 1) {
    const second = matches[1];
    const between = t.slice(first.index + first[0].length, second.index);

    if (/^\s*(?:-|–|bis)\s*$/i.test(between)) {
      endDate = germanDateToIso(second[1], second[2], second[3]);
      dateRawEndIndex = second.index + second[0].length;
    }
  }

  const afterDate = t.slice(dateRawEndIndex, dateRawEndIndex + 90);
  let time = '';

  const timePatterns = [
    /^\s*,\s*((?:\d{1,2})(?::\d{2})?\s*(?:-|–|bis)\s*(?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
    /^\s*,\s*((?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
    /^\s*((?:\d{1,2})(?::\d{2})?\s*(?:-|–|bis)\s*(?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
    /^\s*((?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
  ];

  for (const re of timePatterns) {
    const m = afterDate.match(re);
    if (m) {
      time = cleanText(m[1])
        .replace(/\s*–\s*/g, ' - ')
        .replace(/\s*-\s*/g, ' - ')
        .replace(/\s+Uhr/i, ' Uhr');
      break;
    }
  }

  const dateRaw = cleanText(t.slice(first.index, dateRawEndIndex) + (time ? `, ${time}` : ''));
  const sortDate = startDate;
  const sortTime = parseSortTime(time);
  const isMultiDay = Boolean(endDate && endDate !== startDate);
  const dateLabel = `${startDate}${isMultiDay ? ` - ${endDate}` : ''}${time ? ` | ${time}` : ''}`;

  return {
    dateRaw,
    startDate,
    endDate,
    time,
    sortDate,
    sortTime,
    isMultiDay,
    dateLabel,
  };
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

function buildSearchUrl(categoryConfig, targetDate, page = 1) {
  const basePath = page === 1
    ? categoryConfig.path
    : `${categoryConfig.path}page/${page}/`;

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

function extractCardBlocks(html) {
  const beforePagination = html.split(/<h2[^>]*>\s*Posts pagination\s*<\/h2>/i)[0] || html;
  const h3Re = /<h3[^>]*>\s*<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
  const matches = [...beforePagination.matchAll(h3Re)];

  return matches.map((m, i) => {
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : beforePagination.length;

    return {
      href: m[1],
      titleHtml: m[2],
      blockHtml: beforePagination.slice(start, end),
    };
  });
}

function extractCity(text, categoryLabel, dateRaw) {
  let city = '';
  const firstGermanDate = (dateRaw.match(/\d{2}\.\d{2}\.\d{4}/) || [])[0] || '';

  if (categoryLabel && firstGermanDate) {
    const escapedCategory = categoryLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedDate = firstGermanDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

function extractTeaser(blockText, title, categoryLabel, city, dateInfo) {
  let teaser = cleanText(blockText)
    .replace(title, '')
    .replace(categoryLabel, '')
    .replace(city, '')
    .replace(dateInfo.dateRaw, '')
    .replace(dateInfo.time, '')
    .replace('Details', '');

  teaser = cleanText(teaser)
    .replace(/^\|+/, '')
    .replace(/\b\d{2}\s+[A-Z][a-z]{2}\b(?:\s+Feste|\s+Märkte)?$/i, '')
    .trim();

  return teaser;
}

function extractEventsFromHtml(html, categoryConfig, page, sourceUrl, targetDate) {
  const cards = extractCardBlocks(html);
  const events = [];

  for (const card of cards) {
    const blockText = cleanText(card.blockHtml);
    const title = cleanText(card.titleHtml);
    const detailUrl = absoluteUrl(card.href);
    const dateInfo = parseListDateAndTime(blockText);
    const city = extractCity(blockText, categoryConfig.label, dateInfo.dateRaw);
    const teaser = extractTeaser(blockText, title, categoryConfig.label, city, dateInfo);

    if (!title || !detailUrl) continue;

    events.push({
      title,
      category: categoryConfig.category,
      city,
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
      targetDate,
      touchesTargetDate: touchesDate(dateInfo.startDate, dateInfo.endDate, targetDate),
      time: dateInfo.time,
      sortDate: dateInfo.sortDate,
      sortTime: dateInfo.sortTime,
      isMultiDay: dateInfo.isMultiDay,
      dateLabel: dateInfo.dateLabel,
      teaser,
      detailUrl,
      sourceUrl,
      page,
      searchPlace: SEARCH_PLACE,
      raw: {
        categoryLabel: categoryConfig.label,
        dateRaw: dateInfo.dateRaw,
        text: blockText,
      },
    });
  }

  return events;
}

function dedupeEvents(events) {
  const seen = new Set();
  const out = [];

  for (const event of events) {
    const key = normalizeText(`${event.title}|${event.category}|${event.startDate}|${event.time}|${event.detailUrl}`);

    if (seen.has(key)) continue;

    seen.add(key);
    out.push(event);
  }

  return out;
}

async function collectCategory(categoryConfig, targetDate) {
  const pages = [];
  const events = [];

  for (let page = 1; page <= MAX_PAGES_PER_CATEGORY; page++) {
    const sourceUrl = buildSearchUrl(categoryConfig, targetDate, page);

    try {
      const html = await fetchHtml(sourceUrl);

      if (page === 1) {
        await fs.mkdir(HTML_DEBUG_DIR, { recursive: true });
        await fs.writeFile(
          path.join(HTML_DEBUG_DIR, `list-${categoryConfig.category}-page1.html`),
          html,
          'utf8'
        );
      }

      const pageEvents = extractEventsFromHtml(html, categoryConfig, page, sourceUrl, targetDate);
      const reportedCount = page === 1 ? extractCount(html) : null;

      pages.push({
        category: categoryConfig.category,
        page,
        url: sourceUrl,
        ok: true,
        reportedCount,
        parsedCount: pageEvents.length,
      });

      if (!pageEvents.length) break;

      events.push(...pageEvents);

      if (reportedCount !== null && events.length >= reportedCount) break;
    } catch (err) {
      pages.push({
        category: categoryConfig.category,
        page,
        url: sourceUrl,
        ok: false,
        error: String(err.message || err),
      });

      if (/404/i.test(String(err.message || err))) {
        break;
      }

      break;
    }
  }

  return {
    pages,
    events,
  };
}

function sortEvents(events) {
  return [...events].sort((a, b) => {
    const c = String(a.category).localeCompare(String(b.category), 'de');
    if (c !== 0) return c;

    const d = String(a.sortDate || '').localeCompare(String(b.sortDate || ''));
    if (d !== 0) return d;

    const t = String(a.sortTime || '').localeCompare(String(b.sortTime || ''));
    if (t !== 0) return t;

    return String(a.title || '').localeCompare(String(b.title || ''), 'de');
  });
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
    lines.push(`   Datum/Uhrzeit: ${e.dateLabel || 'unbekannt'}`);
    lines.push(`   Trifft Zieldatum: ${e.touchesTargetDate ? 'ja' : 'nein'}`);
    if (e.teaser) lines.push(`   Text: ${e.teaser}`);
    lines.push(`   Detail: ${e.detailUrl}`);
    lines.push(`   Quelle: ${e.sourceUrl}`);
    lines.push(`   Seite: ${e.page}`);
    lines.push('');
  }

  return lines.join('\n');
}

function summaryToText(meta, pages) {
  return [
    'EventBW Vollständiger Listenimport',
    '',
    `Ort/Suche: ${SEARCH_PLACE}`,
    `Zieldatum: ${meta.targetDate}`,
    '',
    'Importiert aus Listenkarten:',
    '- title',
    '- category',
    '- city',
    '- startDate',
    '- endDate',
    '- targetDate',
    '- touchesTargetDate',
    '- time',
    '- sortDate',
    '- sortTime',
    '- isMultiDay',
    '- dateLabel',
    '- teaser',
    '- detailUrl',
    '- sourceUrl',
    '- page',
    '',
    'Nicht geladen:',
    '- Detailseiten',
    '- Geodaten',
    '- Bilder',
    '- Browser/Playwright',
    '',
    'Counts:',
    JSON.stringify(meta.counts, null, 2),
    '',
    'Pages:',
    JSON.stringify(pages, null, 2),
    '',
  ].join('\n');
}


function scanHtmlForGeoKm(name, url, html) {
  const patterns = [
    'lat',
    'lng',
    'lon',
    'latitude',
    'longitude',
    'geo',
    'geolocation',
    'maps',
    'google',
    'map',
    'distance',
    'distanz',
    'km',
    'schema.org',
    'GeoCoordinates',
    'location',
    'address',
  ];

  const lower = html.toLowerCase();
  const hits = [];

  for (const pattern of patterns) {
    const index = lower.indexOf(pattern.toLowerCase());

    if (index >= 0) {
      const start = Math.max(0, index - 180);
      const end = Math.min(html.length, index + 360);

      hits.push({
        pattern,
        index,
        snippet: cleanText(html.slice(start, end)),
      });
    }
  }

  return {
    name,
    url,
    length: html.length,
    hits,
  };
}

async function saveDetailHtmlSamples(events) {
  await fs.mkdir(HTML_DEBUG_DIR, { recursive: true });

  const samples = events.slice(0, 3);
  const scans = [];

  for (let i = 0; i < samples.length; i++) {
    const event = samples[i];

    try {
      const html = await fetchHtml(event.detailUrl);
      const fileName = `detail-sample-${i + 1}.html`;

      await fs.writeFile(path.join(HTML_DEBUG_DIR, fileName), html, 'utf8');

      scans.push(scanHtmlForGeoKm(fileName, event.detailUrl, html));
    } catch (err) {
      scans.push({
        name: `detail-sample-${i + 1}.html`,
        url: event.detailUrl,
        error: String(err.message || err),
      });
    }
  }

  return scans;
}

async function scanListSnapshotsForGeoKm(targetDate) {
  const scans = [];

  for (const categoryConfig of CATEGORIES) {
    const url = buildSearchUrl(categoryConfig, targetDate, 1);

    try {
      const html = await fetchHtml(url);
      const fileName = `list-${categoryConfig.category}-page1.html`;

      await fs.mkdir(HTML_DEBUG_DIR, { recursive: true });
      await fs.writeFile(path.join(HTML_DEBUG_DIR, fileName), html, 'utf8');

      scans.push(scanHtmlForGeoKm(fileName, url, html));
    } catch (err) {
      scans.push({
        name: `list-${categoryConfig.category}-page1.html`,
        url,
        error: String(err.message || err),
      });
    }
  }

  return scans;
}


async function main() {
  const startedAt = new Date().toISOString();
  const targetDate = targetSundayIso();

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(HTML_DEBUG_DIR, { recursive: true });

  const allPages = [];
  const collected = [];

  for (const categoryConfig of CATEGORIES) {
    const result = await collectCategory(categoryConfig, targetDate);
    allPages.push(...result.pages);
    collected.push(...result.events);
  }

  const rawEvents = sortEvents(dedupeEvents(collected));
  const targetDateEvents = sortEvents(rawEvents.filter(e => e.touchesTargetDate));

  const listGeoKmScans = await scanListSnapshotsForGeoKm(targetDate);
  const detailGeoKmScans = await saveDetailHtmlSamples(rawEvents);
  const geoKmScan = {
    generatedAt: new Date().toISOString(),
    note: 'Debug scan only: checks raw HTML for possible geo/km data without parsing or calculating distance.',
    listGeoKmScans,
    detailGeoKmScans,
  };

  await fs.writeFile(
    path.join(HTML_DEBUG_DIR, 'geo-km-scan.json'),
    JSON.stringify(geoKmScan, null, 2),
    'utf8'
  );

  await fs.writeFile(
    path.join(HTML_DEBUG_DIR, 'geo-km-scan.txt'),
    [
      'EventBW Geo/KM HTML Scan',
      '',
      JSON.stringify(geoKmScan, null, 2),
      '',
    ].join('\n'),
    'utf8'
  );

  const meta = {
    source: BASE_URL,
    searchPlace: SEARCH_PLACE,
    targetDate,
    startedAt,
    finishedAt: new Date().toISOString(),
    maxPagesPerCategory: MAX_PAGES_PER_CATEGORY,
    filters: {
      eventbwCategorySearch: true,
      categories: CATEGORIES.map(c => c.category),
      eventbwDateFromTo: true,
      localDateFilterAvailable: true,
      finalIsTargetDateOnly: true,
      radius: false,
      detailsLoaded: false,
      geo: false,
    },
    counts: {
      pages: allPages.length,
      rawCollectedIncludingDuplicates: collected.length,
      rawUnique: rawEvents.length,
      targetDateMatches: targetDateEvents.length,
      final: targetDateEvents.length,
      rawMaerkte: rawEvents.filter(e => e.category === 'maerkte').length,
      rawFeste: rawEvents.filter(e => e.category === 'feste').length,
      finalMaerkte: targetDateEvents.filter(e => e.category === 'maerkte').length,
      finalFeste: targetDateEvents.filter(e => e.category === 'feste').length,
      rawWithTime: rawEvents.filter(e => e.time).length,
      rawWithoutTime: rawEvents.filter(e => !e.time).length,
      finalWithTime: targetDateEvents.filter(e => e.time).length,
      finalWithoutTime: targetDateEvents.filter(e => !e.time).length,
    },
  };

  const debug = {
    meta,
    pages: allPages,
    rawEvents,
    targetDateEvents,
    geoKmScan,
  };

  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.json'), JSON.stringify({ meta, events: rawEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.txt'), eventsToText('01 RAW IMPORT - alle Listenkarten', rawEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, '02-zieldatum.json'), JSON.stringify({ meta, events: targetDateEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '02-zieldatum.txt'), eventsToText('02 ZIELDATUM - lokaler Datumsfilter', targetDateEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'debug-output.txt'), summaryToText(meta, allPages), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: targetDateEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), eventsToText('EventBW Feste/Märkte - Zieldatum', targetDateEvents, meta), 'utf8');

  console.log(`EventBW full list import done.`);
  console.log(`Place: ${SEARCH_PLACE}`);
  console.log(`Target date: ${targetDate}`);
  console.log(`Raw unique: ${rawEvents.length}`);
  console.log(`Target date matches: ${targetDateEvents.length}`);
  console.log(`Pages: ${allPages.length}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
