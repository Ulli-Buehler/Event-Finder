#!/usr/bin/env node
'use strict';

/**
 * EventBW ultra-fast importer
 * Source: https://www.veranstaltung-baden-wuerttemberg.de/
 *
 * Outputs:
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

const TARGET_CENTER = {
  name: 'Dettingen unter Teck',
  lat: 48.6158,
  lon: 9.4535,
};

const RADIUS_KM = Number(process.env.EVENTBW_RADIUS_KM || 40);
const MAX_PAGES_PER_CATEGORY = Number(process.env.EVENTBW_MAX_PAGES_PER_CATEGORY || 40);
const DETAIL_CONCURRENCY = Number(process.env.EVENTBW_DETAIL_CONCURRENCY || 8);
const FETCH_TIMEOUT_MS = Number(process.env.EVENTBW_FETCH_TIMEOUT_MS || 12000);
const USER_AGENT = 'Mozilla/5.0 EventBW-FastImporter/1.1 (+https://github.com/Ulli-Buehler/Event-Finder)';

const CATEGORIES = [
  { key: 'feste', label: 'Feste', url: `${BASE_URL}/kategorie/feste/` },
  { key: 'maerkte', label: 'Märkte', url: `${BASE_URL}/kategorie/maerkte/` },
];

const CITY_COORDS = {
  'dettingen unter teck': [48.6158, 9.4535],
  'kirchheim unter teck': [48.6468, 9.4538],
  'kirchheim u. teck': [48.6468, 9.4538],
  'weilheim an der teck': [48.6152, 9.5377],
  'weilheim': [48.6152, 9.5377],
  'owen': [48.5874, 9.4483],
  'bissingen an der teck': [48.5999, 9.4918],
  'lenningen': [48.5501, 9.4706],
  'erkenbrechtsweiler': [48.5563, 9.4301],
  'beuren': [48.5692, 9.4059],
  'neuffen': [48.5555, 9.3750],
  'frickenhausen': [48.5938, 9.3596],
  'nuertingen': [48.6257, 9.3420],
  'nürtingen': [48.6257, 9.3420],
  'wendlingen': [48.6725, 9.3778],
  'wendlingen am neckar': [48.6725, 9.3778],
  'koengen': [48.6838, 9.3662],
  'köngen': [48.6838, 9.3662],
  'wernau': [48.6930, 9.4160],
  'plochingen': [48.7105, 9.4195],
  'ploechingen': [48.7105, 9.4195],
  'esslingen': [48.7429, 9.3072],
  'esslingen am neckar': [48.7429, 9.3072],
  'deizisau': [48.7120, 9.3868],
  'denkendorf': [48.6955, 9.3164],
  'ostfildern': [48.7270, 9.2495],
  'leinfelden-echterdingen': [48.6941, 9.1681],
  'filderstadt': [48.6572, 9.2170],
  'neuhausen auf den fildern': [48.6836, 9.2757],
  'reichenbach an der fils': [48.7109, 9.4647],
  'reichenbach': [48.7109, 9.4647],
  'ebersbach an der fils': [48.7160, 9.5233],
  'uhingen': [48.7040, 9.5858],
  'goeppingen': [48.7035, 9.6521],
  'göppingen': [48.7035, 9.6521],
  'eislingen/fils': [48.6952, 9.7068],
  'suessen': [48.6797, 9.7553],
  'süßen': [48.6797, 9.7553],
  'geislingen an der steige': [48.6242, 9.8274],
  'bad boll': [48.6424, 9.6124],
  'aichelberg': [48.6365, 9.5631],
  'holzmaden': [48.6332, 9.5147],
  'notzingen': [48.6703, 9.4582],
  'schlierbach': [48.6730, 9.5182],
  'hochdorf': [48.6951, 9.4646],
  'altbach': [48.7229, 9.3800],
  'reutlingen': [48.4914, 9.2043],
  'metzingen': [48.5364, 9.2839],
  'bad urach': [48.4911, 9.4000],
  'dettingen an der erms': [48.5301, 9.3450],
  'tuebingen': [48.5216, 9.0576],
  'tübingen': [48.5216, 9.0576],
  'pfullingen': [48.4646, 9.2279],
  'lichtenstein': [48.4303, 9.2550],
  'stuttgart': [48.7758, 9.1829],
  'waiblingen': [48.8324, 9.3164],
  'fellbach': [48.8091, 9.2769],
  'schorndorf': [48.8054, 9.5272],
  'winterbach': [48.7992, 9.4796],
  'weinstadt': [48.8108, 9.3639],
  'münsingen': [48.4113, 9.4974],
  'muensingen': [48.4113, 9.4974],
};

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
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function stripTags(html) {
  return cleanText(String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
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

function normalizeCity(s) {
  return normalizeText(s);
}

function haversineKm(a, b) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function cityDistanceKm(city) {
  const key = normalizeCity(city);
  const coord = CITY_COORDS[key];
  if (!coord) return null;

  return Number(haversineKm(TARGET_CENTER, {
    lat: coord[0],
    lon: coord[1],
  }).toFixed(1));
}

function parseDateRange(value) {
  const text = cleanText(value);
  const matches = [...text.matchAll(/(\d{2})\.(\d{2})\.(\d{4})/g)];

  const start = matches[0] ? `${matches[0][3]}-${matches[0][2]}-${matches[0][1]}` : null;
  const end = matches[1] ? `${matches[1][3]}-${matches[1][2]}-${matches[1][1]}` : start;
  const timeMatch = text.match(/,\s*([^,]+?Uhr)/i);

  return {
    raw: text,
    startDate: start,
    endDate: end,
    time: timeMatch ? cleanText(timeMatch[1]) : '',
  };
}

function berlinNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(new Date()).reduce((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});

  return {
    y: Number(parts.year),
    m: Number(parts.month),
    d: Number(parts.day),
  };
}

function targetSundayIso() {
  const now = berlinNow();
  const date = new Date(Date.UTC(now.y, now.m - 1, now.d, 12, 0, 0));
  const day = date.getUTCDay();
  const addDays = day === 0 ? 0 : 7 - day;
  date.setUTCDate(date.getUTCDate() + addDays);
  return date.toISOString().slice(0, 10);
}

function compareIso(a, b) {
  if (!a || !b) return 0;
  return a < b ? -1 : a > b ? 1 : 0;
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

function extractListItems(html, category) {
  const main = html.split(/<h2[^>]*>\s*Posts pagination\s*<\/h2>/i)[0] || html;
  const h3Re = /<h3[^>]*>\s*<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
  const matches = [...main.matchAll(h3Re)];
  const items = [];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : main.length;
    const block = main.slice(start, end);
    const text = stripTags(block);

    const title = stripTags(m[2]);
    const url = absoluteUrl(m[1]);

    const placeMatch =
      text.match(new RegExp(`${category.label}\\s*\\|\\s*([^\\n|]+?)\\s+(\\d{2}\\.\\d{2}\\.\\d{4}[^\\n]*)`, 'i'))
      || text.match(/(?:Feste|Märkte)\s*\|\s*([^\n|]+?)\s+(\d{2}\.\d{2}\.\d{4}[^\n]*)/i);

    const dateMatch = text.match(/\d{2}\.\d{2}\.\d{4}(?:\s*-\s*\d{2}\.\d{2}\.\d{4})?(?:,\s*[^\n]+?Uhr)?/i);

    const city = placeMatch ? cleanText(placeMatch[1]) : '';
    const dateRaw = dateMatch ? cleanText(dateMatch[0]) : '';
    const range = parseDateRange(dateRaw);
    const description = cleanText(
      text
        .replace(title, '')
        .replace(category.label, '')
        .replace(city, '')
        .replace(dateRaw, '')
        .replace('Details', '')
    );

    if (!title || !url || !range.startDate) continue;

    items.push({
      source: 'eventbw',
      category: category.label,
      categoryKey: category.key,
      title,
      city,
      dateRaw: range.raw,
      startDate: range.startDate,
      endDate: range.endDate,
      time: range.time,
      description,
      url,
      listOnly: true,
    });
  }

  return items;
}

function pageUrl(category, page) {
  return page === 1 ? category.url : `${category.url}page/${page}/`;
}

async function collectCategory(category, targetDate) {
  const all = [];
  const debugPages = [];

  for (let page = 1; page <= MAX_PAGES_PER_CATEGORY; page++) {
    const url = pageUrl(category, page);

    try {
      const html = await fetchHtml(url);
      const items = extractListItems(html, category);

      debugPages.push({
        category: category.key,
        page,
        url,
        ok: true,
        items: items.length,
      });

      if (!items.length) break;
      all.push(...items);

      const firstFuture = items.find(x =>
        compareIso(x.startDate, targetDate) > 0
        && compareIso(x.endDate, targetDate) > 0
      );

      const last = items[items.length - 1];

      if (firstFuture && last && compareIso(last.startDate, targetDate) > 0) {
        break;
      }
    } catch (err) {
      debugPages.push({
        category: category.key,
        page,
        url,
        ok: false,
        error: String(err.message || err),
      });
      break;
    }
  }

  return { items: all, debugPages };
}

function isTargetDateEvent(event, targetDate) {
  return event.startDate
    && event.endDate
    && compareIso(event.startDate, targetDate) <= 0
    && compareIso(event.endDate, targetDate) >= 0;
}

function isMarketOrFestival(event) {
  const hay = normalizeText(`${event.category} ${event.title} ${event.description} ${event.venue || ''}`);

  const strongPositive =
    /markt|maimarkt|schaefermarkt|schafermarkt|kraemermarkt|flohmarkt|kunsthandwerkermarkt|dorffest|stadtfest|strassenfest|fruehlingsfest|sommerfest|weinfest|hocketse|festzelt|schausteller|markthaendler|festbetrieb|vereinsfest|backhausfest|maifest|weindorf|dorfhock|hock/.test(hay);

  const negative =
    /museumstag|museum|fuehrung|kostuemfuehrung|ausstellung|konzert|dinner|theater|schifffahrt|rundfahrt|fahrt|workshop|seminar|vortrag|wanderung|bike|turnfest|film|kino|chorprojekt|lesung|symposium|tagung|kurs|yoga|exkursion|besichtigung/.test(hay);

  if (strongPositive) return true;
  if (negative) return false;

  return event.categoryKey === 'maerkte';
}

function isRegionCandidate(event) {
  const dist = cityDistanceKm(event.city);

  if (dist === null) {
    return true;
  }

  return dist <= RADIUS_KM;
}

function extractDetail(html, base) {
  const text = stripTags(html);

  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? stripTags(titleMatch[1]) : base.title;

  const catCityDate = text.match(/(?:Feste|Märkte)\s*\|\s*([^·]+?)\s*·\s*(\d{2}\.\d{2}\.\d{4}(?:\s*-\s*\d{2}\.\d{2}\.\d{4})?(?:,\s*.*?Uhr)?)/i);

  const city = catCityDate ? cleanText(catCityDate[1]) : base.city;
  const dateRaw = catCityDate ? cleanText(catCityDate[2]) : base.dateRaw;
  const range = parseDateRange(dateRaw);

  const descMatch = html.match(/<h1[^>]*>[\s\S]*?<\/h1>\s*([\s\S]*?)<h2[^>]*>\s*Veranstaltungsdetails\s*<\/h2>/i);
  const description = descMatch
    ? stripTags(descMatch[1]).replace(/^.*?\|.*?·\s*\d{2}\.\d{2}\.\d{4}\s*/i, '').trim()
    : base.description;

  const details = text.match(/Veranstaltungsdetails\s+Termin\s+([\s\S]*?)(?:Veranstaltungsort|Veranstalter|728 x 90|Veranstaltungen in)/i);
  const detailDateRaw = details ? cleanText(details[1]) : '';
  const finalRange = detailDateRaw ? parseDateRange(detailDateRaw) : range;

  const venueMatch = text.match(/Veranstaltungsort\s+([\s\S]*?)(?:Auf Google Maps anzeigen|Veranstalter|728 x 90|Veranstaltungen in)/i);
  const venueText = venueMatch ? cleanText(venueMatch[1]) : '';

  const organizerMatch = text.match(/Veranstalter\s+([\s\S]*?)(?:728 x 90|Veranstaltungen in|Weitere|Hinweis:)/i);
  const organizer = organizerMatch ? cleanText(organizerMatch[1]) : '';

  return {
    ...base,
    title,
    city,
    dateRaw: finalRange.raw || dateRaw,
    startDate: finalRange.startDate || base.startDate,
    endDate: finalRange.endDate || base.endDate,
    time: finalRange.time || base.time,
    description: cleanText(description),
    venue: venueText,
    organizer,
    listOnly: false,
  };
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const idx = next++;
      out[idx] = await fn(items[idx], idx);
    }
  });

  await Promise.all(workers);
  return out;
}

async function enrichDetails(items) {
  return mapLimit(items, DETAIL_CONCURRENCY, async item => {
    try {
      const html = await fetchHtml(item.url);
      return extractDetail(html, item);
    } catch (err) {
      return {
        ...item,
        detailError: String(err.message || err),
      };
    }
  });
}

function dedupe(items) {
  const seen = new Set();
  const out = [];

  for (const item of items) {
    const key = normalizeText(`${item.title}|${item.city}|${item.startDate}|${item.url}`);

    if (seen.has(key)) continue;

    seen.add(key);
    out.push(item);
  }

  return out;
}

function finalizeEvent(item) {
  const distanceKm = cityDistanceKm(item.city);

  return {
    title: item.title,
    category: item.category,
    date: item.startDate,
    startDate: item.startDate,
    endDate: item.endDate,
    time: item.time,
    city: item.city,
    venue: item.venue || '',
    distanceKm,
    withinRadius: distanceKm === null ? null : distanceKm <= RADIUS_KM,
    description: item.description || '',
    organizer: item.organizer || '',
    url: item.url,
    source: item.source,
  };
}

function toText(events, meta) {
  const lines = [];

  lines.push(`EventBW Feste/Märkte rund um ${TARGET_CENTER.name}`);
  lines.push(`Zieldatum: ${meta.targetDate}`);
  lines.push(`Radius: ${RADIUS_KM} km`);
  lines.push(`Treffer: ${events.length}`);
  lines.push('');

  for (const [i, e] of events.entries()) {
    lines.push(`${i + 1}. ${e.title}`);
    lines.push(`   ${e.category} | ${e.city || 'Ort unbekannt'}${e.distanceKm !== null ? ` | ${e.distanceKm} km` : ' | Distanz unbekannt'}`);
    lines.push(`   ${e.startDate}${e.endDate && e.endDate !== e.startDate ? ` - ${e.endDate}` : ''}${e.time ? ` | ${e.time}` : ''}`);

    if (e.venue) {
      lines.push(`   Ort: ${e.venue}`);
    }

    if (e.description) {
      lines.push(`   ${e.description}`);
    }

    lines.push(`   ${e.url}`);
    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  const startedAt = new Date().toISOString();
  const targetDate = process.env.EVENTBW_TARGET_DATE || targetSundayIso();

  await fs.mkdir(OUT_DIR, { recursive: true });

  const collected = [];
  const debugPages = [];

  for (const category of CATEGORIES) {
    const result = await collectCategory(category, targetDate);
    collected.push(...result.items);
    debugPages.push(...result.debugPages);
  }

  const dateFiltered = collected.filter(e => isTargetDateEvent(e, targetDate));
  const firstTypeFiltered = dateFiltered.filter(isMarketOrFestival);
  const regionCandidates = firstTypeFiltered.filter(isRegionCandidate);
  const detailed = await enrichDetails(regionCandidates);

  const finalEvents = dedupe(detailed)
    .filter(e => isTargetDateEvent(e, targetDate))
    .filter(isMarketOrFestival)
    .map(finalizeEvent)
    .filter(e => e.withinRadius === true || e.withinRadius === null)
    .sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999) || a.title.localeCompare(b.title, 'de'));

  const meta = {
    source: BASE_URL,
    center: TARGET_CENTER,
    radiusKm: RADIUS_KM,
    targetDate,
    categories: CATEGORIES.map(c => c.key),
    startedAt,
    finishedAt: new Date().toISOString(),
    counts: {
      collected: collected.length,
      dateFiltered: dateFiltered.length,
      typeFilteredBeforeDetails: firstTypeFiltered.length,
      regionCandidates: regionCandidates.length,
      detailed: detailed.length,
      final: finalEvents.length,
    },
  };

  const debug = {
    meta,
    pages: debugPages,
    collected,
    dateFiltered,
    typeFilteredBeforeDetails: firstTypeFiltered,
    regionCandidates,
    detailed,
    finalEvents,
    notes: [
      'No browser/Playwright used.',
      'Unknown distances are still kept for manual review.',
      'Known cities outside radius are filtered out.',
      'Negative quality filter removes obvious non-market/non-festival items unless a strong market/festival keyword is present.',
    ],
  };

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(
    path.join(OUT_DIR, 'debug-output.txt'),
    toText(finalEvents, meta) + '\n\nDEBUG COUNTS\n' + JSON.stringify(meta.counts, null, 2) + '\n',
    'utf8'
  );
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: finalEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), toText(finalEvents, meta), 'utf8');

  console.log(`EventBW import done: ${finalEvents.length} events for ${targetDate}`);
  console.log(`Outputs written to ${OUT_DIR}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});

