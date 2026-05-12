#!/usr/bin/env node
'use strict';

/**
 * EventBW schlanker Voll-Listenimport mit lokalem Ortsfilter
 *
 * Quelle:
 * - /kategorie/maerkte/
 * - /kategorie/feste/
 *
 * Ablauf:
 * 1. alle Märkte/Feste aus den Listenseiten laden
 * 2. Datum lokal filtern
 * 3. Ort lokal filtern
 *
 * Keine Detailseiten.
 * Keine Geodaten.
 * Keine km-Berechnung.
 */

const fs = require('node:fs/promises');
const path = require('node:path');

const BASE_URL = 'https://www.veranstaltung-baden-wuerttemberg.de';
const OUT_DIR = path.resolve(process.cwd(), 'eventbw');

const MAX_PAGES_PER_CATEGORY = Number(process.env.EVENTBW_MAX_PAGES_PER_CATEGORY || 300);
const FETCH_TIMEOUT_MS = Number(process.env.EVENTBW_FETCH_TIMEOUT_MS || 15000);
const USER_AGENT = 'Mozilla/5.0 EventBW-SlimListImporter/5.0 (+https://github.com/Ulli-Buehler/Event-Finder)';

const CATEGORIES = [
  { category: 'maerkte', label: 'Märkte', path: '/kategorie/maerkte/' },
  { category: 'feste', label: 'Feste', path: '/kategorie/feste/' },
];

/**
 * Grober regionaler Ortsfilter rund um Dettingen unter Teck.
 * Noch KEIN harter Radiusfilter.
 * Ziel: offensichtliche Fern-Treffer entfernen, aber lieber etwas zu viel behalten.
 */
const REGIONAL_CITIES = [
  'Dettingen unter Teck',
  'Kirchheim unter Teck',
  'Owen',
  'Bissingen an der Teck',
  'Weilheim an der Teck',
  'Holzmaden',
  'Ohmden',
  'Lenningen',
  'Erkenbrechtsweiler',
  'Beuren',
  'Neuffen',
  'Frickenhausen',
  'Nürtingen',
  'Wendlingen am Neckar',
  'Wernau',
  'Plochingen',
  'Reichenbach an der Fils',
  'Ebersbach an der Fils',
  'Uhingen',
  'Göppingen',
  'Eislingen/Fils',
  'Esslingen am Neckar',
  'Filderstadt',
  'Leinfelden-Echterdingen',
  'Ostfildern',
  'Neuhausen auf den Fildern',
  'Denkendorf',
  'Köngen',
  'Unterensingen',
  'Oberboihingen',
  'Wolfschlugen',
  'Aichtal',
  'Neckartenzlingen',
  'Bempflingen',
  'Grafenberg',
  'Riederich',
  'Metzingen',
  'Bad Urach',
  'Römerstein',
  'Grabenstetten',
  'Hülben',
  'Reutlingen',
  'Pfullingen',
  'Lichtenstein',
  'Wiesensteig',
  'Mühlhausen im Täle',
  'Bad Ditzenbach',
  'Deggingen',
  'Laichingen',
  'Merklingen',
  'Gruibingen',
  'Gammelshausen',
  'Heiningen',
  'Boll',
  'Aichelberg',
  'Hattenhofen',
  'Schlierbach',
  'Albershausen',
];

function decodeHtml(value) {
  return String(value || '')
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

function cleanText(value) {
  return decodeHtml(String(value || ''))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function normalizeText(value) {
  return cleanText(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}\s/-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const REGIONAL_CITY_SET = new Set(REGIONAL_CITIES.map(normalizeText));

function isRegionalCity(city) {
  if (!city) return false;

  const normalized = normalizeText(city);

  if (REGIONAL_CITY_SET.has(normalized)) return true;

  // kleine Toleranz für Schreibvarianten
  for (const allowed of REGIONAL_CITY_SET) {
    if (normalized === allowed) return true;
    if (normalized.includes(allowed)) return true;
    if (allowed.includes(normalized)) return true;
  }

  return false;
}

function berlinDateParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date()).reduce((acc, part) => {
    acc[part.type] = part.value;
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

  const parts = berlinDateParts();
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));
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

function touchesDate(event, targetDate) {
  return Boolean(
    event.startDate
    && event.endDate
    && compareIso(event.startDate, targetDate) <= 0
    && compareIso(event.endDate, targetDate) >= 0
  );
}

function parseDateAndTime(text) {
  const clean = cleanText(text);
  const dateMatches = [...clean.matchAll(/(\d{2})\.(\d{2})\.(\d{4})/g)];

  if (!dateMatches.length) {
    return { startDate: '', endDate: '', time: '' };
  }

  const first = dateMatches[0];
  const startDate = germanDateToIso(first[1], first[2], first[3]);
  let endDate = startDate;
  let dateEndIndex = first.index + first[0].length;

  if (dateMatches.length > 1) {
    const second = dateMatches[1];
    const betweenDates = clean.slice(first.index + first[0].length, second.index);

    if (/^\s*(?:-|–|bis)\s*$/i.test(betweenDates)) {
      endDate = germanDateToIso(second[1], second[2], second[3]);
      dateEndIndex = second.index + second[0].length;
    }
  }

  const afterDate = clean.slice(dateEndIndex, dateEndIndex + 90);
  let time = '';

  const timePatterns = [
    /^\s*,\s*((?:\d{1,2})(?::\d{2})?\s*(?:-|–|bis)\s*(?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
    /^\s*,\s*((?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
    /^\s*((?:\d{1,2})(?::\d{2})?\s*(?:-|–|bis)\s*(?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
    /^\s*((?:\d{1,2})(?::\d{2})?\s*Uhr)/i,
  ];

  for (const pattern of timePatterns) {
    const match = afterDate.match(pattern);

    if (match) {
      time = cleanText(match[1])
        .replace(/\s*–\s*/g, ' - ')
        .replace(/\s*-\s*/g, ' - ')
        .replace(/\s+Uhr/i, ' Uhr');
      break;
    }
  }

  return { startDate, endDate, time };
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,*/*',
      },
      signal: controller.signal,
    });

    const html = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
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

function categoryPageUrl(categoryConfig, page) {
  if (page === 1) {
    return new URL(categoryConfig.path, BASE_URL).toString();
  }

  return new URL(`${categoryConfig.path}page/${page}/`, BASE_URL).toString();
}

function extractReportedCount(html) {
  const text = cleanText(html);
  const match = text.match(/(\d+)\s+Veranstaltungen gefunden/i)
    || text.match(/(\d+)\s+aktuelle/i);

  return match ? Number(match[1]) : null;
}

function extractCards(html) {
  const beforePagination = html.split(/<h2[^>]*>\s*Posts pagination\s*<\/h2>/i)[0] || html;
  const headingRegex = /<h3[^>]*>\s*<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
  const matches = [...beforePagination.matchAll(headingRegex)];

  return matches.map((match, index) => {
    const start = match.index;
    const end = index + 1 < matches.length ? matches[index + 1].index : beforePagination.length;

    return {
      href: match[1],
      titleHtml: match[2],
      blockHtml: beforePagination.slice(start, end),
    };
  });
}

function extractCity(text, categoryLabel, startDate) {
  if (!startDate) return '';

  const [year, month, day] = startDate.split('-');
  const germanDate = `${day}.${month}.${year}`;

  const escapedCategory = categoryLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDate = germanDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const exact = text.match(new RegExp(`${escapedCategory}\\s*\\|\\s*([^\\n|]+?)\\s+${escapedDate}`, 'i'));

  if (exact) return cleanText(exact[1]);

  const generic = text.match(/(?:Feste|Märkte|Maerkte)\s*\|\s*([^0-9|]+?)\s+\d{2}\.\d{2}\.\d{4}/i);

  if (generic) return cleanText(generic[1]);

  return '';
}

function extractEventsFromHtml(html, categoryConfig, page, sourceUrl) {
  const cards = extractCards(html);
  const events = [];

  for (const card of cards) {
    const blockText = cleanText(card.blockHtml);
    const title = cleanText(card.titleHtml);
    const detailUrl = absoluteUrl(card.href);
    const dateInfo = parseDateAndTime(blockText);
    const city = extractCity(blockText, categoryConfig.label, dateInfo.startDate);

    if (!title || !detailUrl) continue;

    events.push({
      title,
      category: categoryConfig.category,
      city,
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
      time: dateInfo.time,
      detailUrl,
      sourceUrl,
      page,
    });
  }

  return events;
}

function dedupeEvents(events) {
  const seen = new Set();
  const deduped = [];

  for (const event of events) {
    const key = normalizeText(`${event.title}|${event.category}|${event.startDate}|${event.time}|${event.detailUrl}`);

    if (seen.has(key)) continue;

    seen.add(key);
    deduped.push(event);
  }

  return deduped;
}

function sortEvents(events) {
  return [...events].sort((a, b) => {
    const byCategory = String(a.category).localeCompare(String(b.category), 'de');
    if (byCategory !== 0) return byCategory;

    const byStartDate = String(a.startDate || '').localeCompare(String(b.startDate || ''));
    if (byStartDate !== 0) return byStartDate;

    const byCity = String(a.city || '').localeCompare(String(b.city || ''), 'de');
    if (byCity !== 0) return byCity;

    return String(a.title || '').localeCompare(String(b.title || ''), 'de');
  });
}

async function collectCategory(categoryConfig) {
  const pages = [];
  const events = [];

  for (let page = 1; page <= MAX_PAGES_PER_CATEGORY; page++) {
    const sourceUrl = categoryPageUrl(categoryConfig, page);

    try {
      const html = await fetchHtml(sourceUrl);
      const pageEvents = extractEventsFromHtml(html, categoryConfig, page, sourceUrl);
      const reportedCount = page === 1 ? extractReportedCount(html) : null;

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
    } catch (error) {
      pages.push({
        category: categoryConfig.category,
        page,
        url: sourceUrl,
        ok: false,
        error: String(error.message || error),
      });

      break;
    }
  }

  return { pages, events };
}

function eventsToText(title, events, meta) {
  const lines = [];

  lines.push(title);
  lines.push(`Zieldatum: ${meta.targetDate}`);
  lines.push(`Treffer: ${events.length}`);
  lines.push('');

  for (const [index, event] of events.entries()) {
    lines.push(`${index + 1}. ${event.title}`);
    lines.push(`   Kategorie: ${event.category}`);
    lines.push(`   Ort: ${event.city || 'unbekannt'}`);
    lines.push(`   Datum: ${event.startDate || 'unbekannt'}${event.endDate && event.endDate !== event.startDate ? ` - ${event.endDate}` : ''}${event.time ? ` | ${event.time}` : ''}`);
    lines.push(`   Detail: ${event.detailUrl}`);
    lines.push(`   Quelle: ${event.sourceUrl}`);
    lines.push(`   Seite: ${event.page}`);
    lines.push('');
  }

  return lines.join('\n');
}

function cityStats(events) {
  const map = new Map();

  for (const event of events) {
    const city = event.city || 'unbekannt';
    map.set(city, (map.get(city) || 0) + 1);
  }

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
    .map(([city, count]) => ({ city, count }));
}

function summaryToText(meta, pages, cityStatsForTargetDate) {
  return [
    'EventBW Listenimport mit lokalem Ortsfilter',
    '',
    'Quellen:',
    '- /kategorie/maerkte/',
    '- /kategorie/feste/',
    '',
    'Filter:',
    '- Datumsfilter: lokal',
    '- Ortsfilter: lokal per Ortsliste',
    '- Geo/km: noch nicht',
    '',
    `Zieldatum: ${meta.targetDate}`,
    '',
    'Counts:',
    JSON.stringify(meta.counts, null, 2),
    '',
    'Regionale Ortsliste:',
    REGIONAL_CITIES.map(city => `- ${city}`).join('\n'),
    '',
    'Ortsstatistik vor Ortsfilter:',
    JSON.stringify(cityStatsForTargetDate, null, 2),
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

  for (const categoryConfig of CATEGORIES) {
    const result = await collectCategory(categoryConfig);
    allPages.push(...result.pages);
    collected.push(...result.events);
  }

  const rawEvents = sortEvents(dedupeEvents(collected));
  const targetDateEvents = sortEvents(rawEvents.filter(event => touchesDate(event, targetDate)));
  const regionalEvents = sortEvents(targetDateEvents.filter(event => isRegionalCity(event.city)));
  const nonRegionalEvents = sortEvents(targetDateEvents.filter(event => !isRegionalCity(event.city)));

  const cityStatsForTargetDate = cityStats(targetDateEvents);

  const meta = {
    source: BASE_URL,
    targetDate,
    startedAt,
    finishedAt: new Date().toISOString(),
    maxPagesPerCategory: MAX_PAGES_PER_CATEGORY,
    regionalCities: REGIONAL_CITIES,
    counts: {
      pages: allPages.length,
      rawCollectedIncludingDuplicates: collected.length,
      rawUnique: rawEvents.length,
      targetDateMatches: targetDateEvents.length,
      regionalMatches: regionalEvents.length,
      nonRegionalTargetDateMatches: nonRegionalEvents.length,

      rawMaerkte: rawEvents.filter(event => event.category === 'maerkte').length,
      rawFeste: rawEvents.filter(event => event.category === 'feste').length,

      targetDateMaerkte: targetDateEvents.filter(event => event.category === 'maerkte').length,
      targetDateFeste: targetDateEvents.filter(event => event.category === 'feste').length,

      regionalMaerkte: regionalEvents.filter(event => event.category === 'maerkte').length,
      regionalFeste: regionalEvents.filter(event => event.category === 'feste').length,
    },
  };

  const debug = {
    meta,
    pages: allPages,
    cityStatsForTargetDate,
    rawEvents,
    targetDateEvents,
    regionalEvents,
    nonRegionalEvents,
  };

  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.json'), JSON.stringify({ meta, events: rawEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '01-raw-import.txt'), eventsToText('01 RAW IMPORT - alle Märkte und Feste', rawEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, '02-zieldatum.json'), JSON.stringify({ meta, events: targetDateEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '02-zieldatum.txt'), eventsToText('02 ZIELDATUM - lokaler Datumsfilter', targetDateEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, '03-ortsfilter.json'), JSON.stringify({ meta, events: regionalEvents, removed: nonRegionalEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, '03-ortsfilter.txt'), eventsToText('03 ORTSFILTER - Datum + regionale Ortsliste', regionalEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'debug-output.txt'), summaryToText(meta, allPages, cityStatsForTargetDate), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: regionalEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), eventsToText('EventBW Feste/Märkte - Datum + Ortsfilter', regionalEvents, meta), 'utf8');

  console.log('EventBW slim full list import with city filter done.');
  console.log(`Target date: ${targetDate}`);
  console.log(`Raw unique: ${rawEvents.length}`);
  console.log(`Target date matches: ${targetDateEvents.length}`);
  console.log(`Regional matches: ${regionalEvents.length}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
