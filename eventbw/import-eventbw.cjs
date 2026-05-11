#!/usr/bin/env node
'use strict';

/**
 * EventBW Listen-Importer
 *
 * Strategie:
 * - EventBW-eigene Kategorie-Suche verwenden
 * - Kategorien:
 *   - Märkte
 *   - Feste
 * - Suchort: Dettingen Teck
 * - Datum:
 *   - wenn heute Sonntag: heute
 *   - sonst: kommender Sonntag
 * - KEINE Detailseiten laden
 * - Listenkarte sauber auslesen:
 *   - Titel
 *   - Kategorie
 *   - Ort
 *   - Datum
 *   - Uhrzeit
 *   - Kurztext
 *   - Detail-URL
 * - EventBW-Datumsfilter ist nicht zuverlässig, deshalb zusätzlicher eigener Datumsfilter.
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
const MAX_PAGES_PER_CATEGORY = Number(process.env.EVENTBW_MAX_PAGES_PER_CATEGORY || 30);
const FETCH_TIMEOUT_MS = Number(process.env.EVENTBW_FETCH_TIMEOUT_MS || 12000);
const USER_AGENT = 'Mozilla/5.0 EventBW-ListImporter/2.1 (+https://github.com/Ulli-Buehler/Event-Finder)';

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

function stripTags(html) {
  return decodeHtml(String(html || ''))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
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

function parseListDateAndTime(text) {
  const t = cleanText(text);

  const fullDateRe = /(\d{2})\.(\d{2})\.(\d{4})/g;
  const matches = [...t.matchAll(fullDateRe)];

  if (!matches.length) {
    return {
      dateRaw: '',
      startDate: null,
      endDate: null,
      time: '',
      dateDisplay: '',
    };
  }

  const first = matches[0];
  const startDate = germanDateToIso(first[1], first[2], first[3]);

  let endDate = startDate;
  let dateRawEndIndex = first.index + first[0].length;

  if (matches.length > 1) {
    const second = matches[1];
    const between = t.slice(first.index + first[0].length, second.index);

    if (/^\s*-\s*$/.test(between) || /^\s*bis\s*$/i.test(between)) {
      endDate = germanDateToIso(second[1], second[2], second[3]);
      dateRawEndIndex = second.index + second[0].length;
    }
  }

  const afterDate = t.slice(dateRawEndIndex, dateRawEndIndex + 80);

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
      time = cleanText(m[1]).replace(/\s*–\s*/g, ' - ').replace(/\s*-\s*/g, ' - ');
      break;
    }
  }

  const dateRaw = cleanText(
    t.slice(first.index, dateRawEndIndex) + (time ? `, ${time}` : '')
  );

  const dateDisplay = `${startDate}${endDate && endDate !== startDate ? ` - ${endDate}` : ''}${time ? ` | ${time}` : ''}`;

  return {
    dateRaw,
    startDate,
    endDate,
    time,
    dateDisplay,
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

  if (categoryLabel && dateRaw) {
    const firstGermanDate = (dateRaw.match(/\d{2}\.\d{2}\.\d{4}/) || [])[0] || '';

    if (firstGermanDate) {
      const escapedCategory = categoryLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedDate = firstGermanDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`${escapedCategory}\\s*\\|\\s*([^\\n|]+?)\\s+${escapedDate}`, 'i');
      const m = text.match(re);

      if (m) city = cleanText(m[1]);
    }
  }

  if (!city) {
    const generic = text.match(/(?:Feste|Märkte|Maerkte)\s*\|\s*([^0-9|]+?)\s+\d{2}\.\d{2}\.\d{4}/i);
    if (generic) city = cleanText(generic[1]);
  }

  return city;
}

function extractEventsFromHtml(html, category, page, searchUrl) {
  const cards = extractCardBlocks(html);
  const events = [];

  for (const card of cards) {
    const blockText = cleanText(card.blockHtml);

    const title = cleanText(card.titleHtml);
    const url = absoluteUrl(card.href);

    const dateInfo = parseListDateAndTime(blockText);
    const city = extractCity(blockText, category.label, dateInfo.dateRaw);

    const teaser = cleanText(
      blockText
        .replace(title, '')
        .replace(category.label, '')
        .replace(city, '')
        .replace(dateInfo.dateRaw, '')
        .replace(dateInfo.time, '')
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
      dateRaw: dateInfo.dateRaw,
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
      time: dateInfo.time,
      dateDisplay: dateInfo.dateDisplay,
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
    const key = normalizeText(`${event.title}|${event.categoryKey}|${event.startDate}|${event.time}|${event.url}`);

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
    lines.push(`   Datum/Uhrzeit: ${e.dateDisplay || 'unbekannt'}`);
    if (e.teaser) lines.push(`   Text: ${e.teaser}`);
    lines.push(`   Suchseite: ${e.searchUrl}`);
    lines.push(`   URL: ${e.url}`);
    lines.push('');
  }

  return lines.join('\n');
}

function summaryToText(meta, pages) {
  return [
    'EventBW Listenimport',
    '',
    `Ort/Suche: ${SEARCH_PLACE}`,
    `Zieldatum: ${meta.targetDate}`,
    '',
    'Suchstrategie:',
    '- EventBW eigene Kategorie-Suche',
    '- Kategorie Märkte',
    '- Kategorie Feste',
    '- Datum von/bis identisch',
    '- Ort Dettingen Teck',
    '- kein Radiusfilter',
    '- kein Detailseitenimport',
    '- zusätzlicher eigener Datumsfilter wegen unzuverlässigem EventBW-Vorfilter',
    '- Uhrzeit aus Listenkarte extrahiert',
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

    const d = String(a.startDate || '').localeCompare(String(b.startDate || ''));
    if (d !== 0) return d;

    const t = String(a.time || '').localeCompare(String(b.time || ''));
    if (t !== 0) return t;

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
      localDateFilter: true,
      place: SEARCH_PLACE,
      radius: false,
      detailsLoaded: false,
      geo: false,
    },
    counts: {
      pages: allPages.length,
      rawCollectedIncludingDuplicates: collected.length,
      rawUnique: rawEvents.length,
      localDateFiltered: sundayEvents.length,
      final: finalEvents.length,
      maerkte: finalEvents.filter(e => e.categoryKey === 'maerkte').length,
      feste: finalEvents.filter(e => e.categoryKey === 'feste').length,
      withTime: finalEvents.filter(e => e.time).length,
      withoutTime: finalEvents.filter(e => !e.time).length,
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
  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.txt'), eventsToText('01 RAW IMPORT - EventBW Listenimport Märkte + Feste', rawEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, '02-sonntag.json'), JSON.stringify({ meta, events: sundayEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '02-sonntag.txt'), eventsToText('02 DATUMSFILTER - eigener Filter nach Zielsonntag', sundayEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'debug-output.txt'), summaryToText(meta, allPages), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: finalEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), eventsToText('EventBW Feste/Märkte - Listenimport mit Datum/Uhrzeit', finalEvents, meta), 'utf8');

  console.log(`EventBW list import done.`);
  console.log(`Place: ${SEARCH_PLACE}`);
  console.log(`Target date: ${targetDate}`);
  console.log(`Raw unique: ${rawEvents.length}`);
  console.log(`Final: ${finalEvents.length}`);
  console.log(`With time: ${meta.counts.withTime}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
