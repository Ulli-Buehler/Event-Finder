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
 * 3. alle Events am Zieldatum geocodieren
 * 4. Webseite filtert danach live über Radius
 *
 * Keine Detailseiten.
 * Geo nur für Zieldatum-Events.
 * km-Berechnung passiert im Browser.
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
 * Grobe regionale Ortsliste bleibt nur noch für Debug/Statistik erhalten.
 * Die finale Ausgabe enthält jetzt alle Events am Zieldatum mit Geo.
 * Der echte Radiusfilter passiert live im Browser.
 */
const REGIONAL_CITIES = [
  // Zentrum / Teck
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

  // Nürtingen / Neckar / Filder
  'Nürtingen',
  'Wendlingen am Neckar',
  'Wernau',
  'Plochingen',
  'Reichenbach an der Fils',
  'Köngen',
  'Unterensingen',
  'Oberboihingen',
  'Wolfschlugen',
  'Aichtal',
  'Neckartenzlingen',
  'Bempflingen',
  'Grafenberg',
  'Riederich',

  // Esslingen / Filder / Stuttgart-Rand
  'Esslingen am Neckar',
  'Filderstadt',
  'Leinfelden-Echterdingen',
  'Ostfildern',
  'Neuhausen auf den Fildern',
  'Denkendorf',
  'Deizisau',
  'Altbach',
  'Baltmannsweiler',
  'Aichwald',
  'Kernen im Remstal',
  'Fellbach',
  'Waiblingen',
  'Weinstadt',
  'Remshalden',
  'Schorndorf',

  // Reutlingen / Ermstal / Alb-Nähe
  'Metzingen',
  'Bad Urach',
  'Römerstein',
  'Grabenstetten',
  'Hülben',
  'Reutlingen',
  'Pfullingen',
  'Eningen unter Achalm',
  'Lichtenstein',
  'Tübingen',
  'Pliezhausen',
  'Walddorfhäslach',
  'Gomaringen',
  'Mössingen',
  'Münsingen',
  'Biosphärengebiet Schwäbische Alb',

  // Göppingen / Filstal
  'Ebersbach an der Fils',
  'Uhingen',
  'Göppingen',
  'Eislingen/Fils',
  'Süßen',
  'Donzdorf',
  'Salach',
  'Wangen',
  'Rechberghausen',
  'Heiningen',
  'Boll',
  'Bad Boll',
  'Dürnau',
  'Gammelshausen',
  'Aichelberg',
  'Hattenhofen',
  'Schlierbach',
  'Albershausen',
  'Gruibingen',
  'Mühlhausen im Täle',
  'Wiesensteig',
  'Bad Ditzenbach',
  'Deggingen',

  // Alb / Laichingen
  'Laichingen',
  'Merklingen',
  'Westerheim',
  'Heroldstatt',
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
    '- Ortsfilter: nicht final angewendet',
    '- Geo: für alle Zieldatum-Events',
    '- km/Radius: live im Browser',
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



function extractJsonLdLocation(html) {
  const scripts = [...String(html || '').matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )];

  const candidates = [];

  function collectFromNode(node) {
    if (!node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      node.forEach(collectFromNode);
      return;
    }

    if (node['@graph']) {
      collectFromNode(node['@graph']);
    }

    const location = node.location || node.venue || null;

    if (location && typeof location === 'object') {
      const name = cleanText(location.name || '');
      const address = location.address || {};
      const street = cleanText(address.streetAddress || '');
      const postalCode = cleanText(address.postalCode || '');
      const locality = cleanText(address.addressLocality || '');
      const region = cleanText(address.addressRegion || '');
      const parts = [name, street, postalCode, locality, region]
        .filter(Boolean);

      if (parts.length) {
        candidates.push(parts.join(', '));
      }
    }

    for (const value of Object.values(node)) {
      if (value && typeof value === 'object') {
        collectFromNode(value);
      }
    }
  }

  for (const script of scripts) {
    try {
      collectFromNode(JSON.parse(decodeHtml(script[1]).trim()));
    } catch {
      // ignore invalid JSON-LD
    }
  }

  return candidates.find(Boolean) || '';
}

function extractDetailLocationFromHtml(html) {
  const jsonLdLocation = extractJsonLdLocation(html);

  if (jsonLdLocation) {
    return jsonLdLocation;
  }

  const text = cleanText(html);

  const patterns = [
    /(?:Veranstaltungsort|Ort|Location|Adresse|Treffpunkt)\s*:?\s+([^|]{3,160}?)(?:\s+(?:Anfahrt|Termine?|Datum|Uhrzeit|Weitere|Kontakt|Beschreibung)\b|$)/i,
    /(?:Veranstaltungsort|Ort|Location|Adresse|Treffpunkt)\s*:?\s+(.{3,160})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return cleanText(match[1])
        .replace(/\s{2,}/g, ' ')
        .slice(0, 180);
    }
  }

  return '';
}

function detailGeoQuery(event, detailLocation) {
  const parts = [
    detailLocation,
    event.city,
    'Baden-Württemberg',
    'Germany',
  ]
    .map(cleanText)
    .filter(Boolean);

  return [...new Set(parts)].join(', ');
}


function splitCompoundCity(city) {
  const cleanCity = cleanText(city);
  const match = cleanCity.match(/^(.+?)\s*[-–]\s*(.+)$/);

  if (!match) return null;

  const mainTown = cleanText(match[1]);
  const district = cleanText(match[2]);

  if (!mainTown || !district) return null;

  return { mainTown, district };
}

function isBodenseeContext(event) {
  const text = normalizeText(
    [
      event.title,
      event.city,
      event.geoDetailLocation,
      event.detailUrl,
    ].filter(Boolean).join(' ')
  );

  return (
    text.includes('bodensee') ||
    text.includes('kressbronn') ||
    text.includes('langenargen') ||
    text.includes('nonnenhorn') ||
    text.includes('wasserburg') ||
    text.includes('lindau') ||
    text.includes('bregenz') ||
    text.includes('konstanz') ||
    text.includes('friedrichshafen')
  );
}

function geoQueriesForCompoundCity(city) {
  const compound = splitCompoundCity(city);

  if (!compound) return [];

  const { mainTown, district } = compound;

  return [
    `${district}, ${mainTown}, Baden-Württemberg, Germany`,
    `${district}, Baden-Württemberg, Germany`,
    `${mainTown}, Baden-Württemberg, Germany`,
  ];
}

function simplifyDetailLocation(detailLocation, city) {
  const detail = cleanText(detailLocation);
  const cleanCity = cleanText(city);
  const candidates = [];

  if (detail) candidates.push(detail);

  // Remove postal codes and very specific street/address parts.
  const withoutPostal = detail
    .replace(/\b\d{5}\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (withoutPostal && withoutPostal !== detail) {
    candidates.push(withoutPostal);
  }

  // Split detail location into meaningful comma parts and try venue + city.
  const parts = detail
    .split(',')
    .map(cleanText)
    .filter(Boolean);

  if (parts.length) {
    const venue = parts[0];

    if (venue && cleanCity) {
      candidates.push(`${venue}, ${cleanCity}, Baden-Württemberg, Germany`);
    }

    if (venue) {
      candidates.push(`${venue}, Baden-Württemberg, Germany`);
    }
  }

  if (cleanCity && cleanCity !== 'Echt Bodensee') {
    candidates.push(`${cleanCity}, Baden-Württemberg, Germany`);
    candidates.push(...geoQueriesForCompoundCity(cleanCity));
  }

  return [...new Set(candidates.filter(Boolean))];
}

function extractTitleGeoLocation(event) {
  const title = cleanText(event.title);

  const patterns = [
    /\bab\s+([A-ZÄÖÜ][A-Za-zÄÖÜäöüß .\-]+?)(?:\s+(?:in|und|mit|am|an|zur|zum|ins|im|durch|Richtung)\b|$)/,
    /\bin\s+([A-ZÄÖÜ][A-Za-zÄÖÜäöüß .\-]+?)(?:\s+(?:und|mit|am|an|zur|zum|ins|im|durch|Richtung)\b|$)/,
    /\bbei\s+([A-ZÄÖÜ][A-Za-zÄÖÜäöüß .\-]+?)(?:\s+(?:und|mit|am|an|zur|zum|ins|im|durch|Richtung)\b|$)/,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (!match) continue;

    const location = cleanText(match[1])
      .replace(/\s+-\s*$/g, '')
      .replace(/\s+$/g, '');

    if (
      location.length >= 3 &&
      location.length <= 60 &&
      !/^(Richtung|See|Bodensee|Markt|Fest|Tour|Rundtour)$/i.test(location)
    ) {
      return location;
    }
  }

  return '';
}

function titleGeoQueries(event, location) {
  const cleanLocation = cleanText(location);
  const city = cleanText(event.city);
  const queries = [];

  if (!cleanLocation) return [];

  if (isBodenseeContext(event)) {
    if (/^kressbronn$/i.test(cleanLocation)) {
      queries.push('Kressbronn am Bodensee, Baden-Württemberg, Germany');
      queries.push('Kressbronn am Bodensee, Germany');
    } else if (/^wasserburg$/i.test(cleanLocation)) {
      queries.push('Wasserburg (Bodensee), Germany');
      queries.push('Wasserburg am Bodensee, Germany');
    } else {
      queries.push(`${cleanLocation}, Bodenseekreis, Germany`);
      queries.push(`${cleanLocation}, Bodensee, Germany`);
    }
  }

  if (city && city !== cleanLocation && city !== 'Echt Bodensee') {
    queries.push(`${cleanLocation}, ${city}, Baden-Württemberg, Germany`);
  }

  queries.push(`${cleanLocation}, Baden-Württemberg, Germany`);
  queries.push(`${cleanLocation}, Germany`);

  return [...new Set(queries)];
}

async function tryGeoQueries(queries) {
  for (const query of queries) {
    const geo = await geocodeQuery(query);

    if (geo) {
      return {
        ...geo,
        query,
      };
    }

    await new Promise(resolve => setTimeout(resolve, 1200));
  }

  return null;
}

async function enrichMissingGeoFromCompoundCity(events) {
  let checked = 0;
  let recovered = 0;
  const tried = [];

  for (const event of events) {
    const hasGeo =
      Number.isFinite(event.lat) &&
      Number.isFinite(event.lng);

    if (hasGeo) continue;

    const queries = geoQueriesForCompoundCity(event.city);

    if (!queries.length) continue;

    checked += 1;
    event.geoCompoundCityChecked = true;
    event.geoCompoundCityQueries = queries;

    tried.push({
      title: event.title,
      city: event.city,
      queries,
    });

    const geo = await tryGeoQueries(queries);

    if (geo) {
      event.lat = geo.lat;
      event.lng = geo.lng;
      event.geoEstimated = true;
      event.geoSource = 'derived-compound-city';
      event.geoQuery = geo.query;
      event.geoCompoundCityFound = true;
      recovered += 1;
    } else {
      event.geoCompoundCityFound = false;
    }
  }

  return { checked, recovered, tried };
}

async function enrichMissingGeoFromTitle(events) {
  let checked = 0;
  let recovered = 0;
  const tried = [];

  for (const event of events) {
    const hasGeo =
      Number.isFinite(event.lat) &&
      Number.isFinite(event.lng);

    if (hasGeo) continue;

    const titleLocation = extractTitleGeoLocation(event);

    if (!titleLocation) continue;

    const queries = titleGeoQueries(event, titleLocation);

    if (!queries.length) continue;

    checked += 1;
    event.geoTitleChecked = true;
    event.geoTitleLocation = titleLocation;

    tried.push({
      title: event.title,
      city: event.city,
      extracted: titleLocation,
      queries,
    });

    const geo = await tryGeoQueries(queries);

    if (geo) {
      event.lat = geo.lat;
      event.lng = geo.lng;
      event.geoEstimated = true;
      event.geoSource = 'derived-title';
      event.geoQuery = geo.query;
      event.geoTitleFound = true;
      recovered += 1;
    } else {
      event.geoTitleFound = false;
    }
  }

  return { checked, recovered, tried };
}


async function enrichMissingGeoFromDetail(events) {
  let recovered = 0;
  let checked = 0;
  const tried = [];

  for (const event of events) {
    const hasGeo =
      Number.isFinite(event.lat) &&
      Number.isFinite(event.lng);

    if (hasGeo || !event.detailUrl) continue;

    checked += 1;

    try {
      const html = await fetchHtml(event.detailUrl);
      const detailLocation = extractDetailLocationFromHtml(html);

      event.geoDetailChecked = true;

      if (!detailLocation) {
        event.geoDetailFound = false;
        continue;
      }

      event.geoDetailFound = true;
      event.geoDetailLocation = detailLocation;

      const queries = [
        detailGeoQuery(event, detailLocation),
        ...simplifyDetailLocation(detailLocation, event.city),
      ]
        .map(cleanText)
        .filter(Boolean);

      const uniqueQueries = [...new Set(queries)];

      tried.push({
        title: event.title,
        city: event.city,
        detailLocation,
        queries: uniqueQueries,
      });

      const geo = await tryGeoQueries(uniqueQueries);

      if (geo) {
        event.lat = geo.lat;
        event.lng = geo.lng;
        event.geoEstimated = true;
        event.geoSource = 'derived-detail';
        event.geoQuery = geo.query;
        recovered += 1;
      }
    } catch (error) {
      event.geoDetailChecked = true;
      event.geoDetailError = String(error.message || error);
    }
  }

  return { checked, recovered, tried };
}

const GEO_CACHE_FILE = path.join(OUT_DIR, 'geo-cache.json');

async function loadGeoCache() {
  try {
    const raw = await fs.readFile(GEO_CACHE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveGeoCache(cache) {
  await fs.writeFile(
    GEO_CACHE_FILE,
    JSON.stringify(cache, null, 2),
    'utf8'
  );
}

async function geocodeQuery(queryText) {
  if (!queryText) return null;

  const query = encodeURIComponent(queryText);

  const url =
    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  };
}

async function geocodeCity(city) {
  if (!city) return null;

  return geocodeQuery(city + ', Baden-Württemberg, Germany');
}

async function enrichEventsWithGeo(events) {
  const cache = await loadGeoCache();

  for (const event of events) {
    const cityKey = normalizeText(event.city);

    if (!cityKey) continue;

    if (cache[cityKey]) {
      event.lat = cache[cityKey].lat;
      event.lng = cache[cityKey].lng;
      event.geoEstimated = true;
      event.geoSource = 'derived';
      event.geoQuery = cache[cityKey].query || `${event.city}, Baden-Württemberg, Germany`;
      continue;
    }

    console.log('Geocode:', event.city);

    const geo = await geocodeCity(event.city);

    if (geo) {
      cache[cityKey] = {
        ...geo,
        query: `${event.city}, Baden-Württemberg, Germany`,
      };

      event.lat = geo.lat;
      event.lng = geo.lng;
      event.geoEstimated = true;
      event.geoSource = 'derived';
      event.geoQuery = cache[cityKey].query;

      await new Promise(resolve => setTimeout(resolve, 1200));
    }
  }

  await saveGeoCache(cache);

  return events;
}


function enrichMissingGeoFromBodenseeRegion(events) {
  let checked = 0;
  let recovered = 0;

  // Grober Mittelpunkt Bodensee / Überlinger See. Nur als letzter Fallback.
  const BODENSEE_FALLBACK = {
    lat: 47.6500,
    lng: 9.3500,
    query: 'Bodensee, Baden-Württemberg, Germany',
  };

  for (const event of events) {
    const hasGeo =
      Number.isFinite(event.lat) &&
      Number.isFinite(event.lng);

    if (hasGeo) continue;

    if (!isBodenseeContext(event)) continue;

    checked += 1;

    event.lat = BODENSEE_FALLBACK.lat;
    event.lng = BODENSEE_FALLBACK.lng;
    event.geoEstimated = true;
    event.geoSource = 'derived-region-bodensee';
    event.geoQuery = BODENSEE_FALLBACK.query;
    event.geoRegionFallback = 'Bodensee';
    event.geoRegionFallbackNote = 'Kein genauer Ort gefunden; Position grob auf Bodensee gesetzt.';

    recovered += 1;
  }

  return { checked, recovered };
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
  const regionalEvents = await enrichEventsWithGeo(
    sortEvents(targetDateEvents)
  );

  const detailGeo = await enrichMissingGeoFromDetail(regionalEvents);
  const compoundCityGeo = await enrichMissingGeoFromCompoundCity(regionalEvents);
  const titleGeo = await enrichMissingGeoFromTitle(regionalEvents);
  const bodenseeRegionGeo = enrichMissingGeoFromBodenseeRegion(regionalEvents);

  const nonRegionalEvents = sortEvents(
    targetDateEvents.filter(event => !isRegionalCity(event.city))
  );

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
      targetDateWithGeo: regionalEvents.filter(event => Number.isFinite(event.lat) && Number.isFinite(event.lng)).length,
      targetDateWithoutGeo: regionalEvents.filter(event => !Number.isFinite(event.lat) || !Number.isFinite(event.lng)).length,
      targetDateGeoEstimated: regionalEvents.filter(event => event.geoEstimated === true).length,
      targetDateGeoEstimatedFromCity: regionalEvents.filter(event => event.geoSource === 'derived').length,
      targetDateGeoEstimatedFromDetail: regionalEvents.filter(event => event.geoSource === 'derived-detail').length,
      targetDateGeoEstimatedFromCompoundCity: regionalEvents.filter(event => event.geoSource === 'derived-compound-city').length,
      targetDateGeoEstimatedFromTitle: regionalEvents.filter(event => event.geoSource === 'derived-title').length,
      targetDateGeoEstimatedFromBodenseeRegion: regionalEvents.filter(event => event.geoSource === 'derived-region-bodensee').length,
      targetDateDetailGeoChecked: detailGeo.checked,
      targetDateDetailGeoRecovered: detailGeo.recovered,
      targetDateCompoundCityGeoChecked: compoundCityGeo.checked,
      targetDateCompoundCityGeoRecovered: compoundCityGeo.recovered,
      targetDateTitleGeoChecked: titleGeo.checked,
      targetDateTitleGeoRecovered: titleGeo.recovered,
      targetDateBodenseeRegionGeoChecked: bodenseeRegionGeo.checked,
      targetDateBodenseeRegionGeoRecovered: bodenseeRegionGeo.recovered,
      nonRegionalTargetDateMatches: nonRegionalEvents.length,

      rawMaerkte: rawEvents.filter(event => event.category === 'maerkte').length,
      rawFeste: rawEvents.filter(event => event.category === 'feste').length,

      targetDateMaerkte: targetDateEvents.filter(event => event.category === 'maerkte').length,
      targetDateFeste: targetDateEvents.filter(event => event.category === 'feste').length,

      targetDateWithGeoMaerkte: regionalEvents.filter(event => event.category === 'maerkte' && Number.isFinite(event.lat) && Number.isFinite(event.lng)).length,
      targetDateWithGeoFeste: regionalEvents.filter(event => event.category === 'feste' && Number.isFinite(event.lat) && Number.isFinite(event.lng)).length,
      targetDateWithoutGeoMaerkte: regionalEvents.filter(event => event.category === 'maerkte' && (!Number.isFinite(event.lat) || !Number.isFinite(event.lng))).length,
      targetDateWithoutGeoFeste: regionalEvents.filter(event => event.category === 'feste' && (!Number.isFinite(event.lat) || !Number.isFinite(event.lng))).length,
    },
  };

  const debug = {
    meta,
    pages: allPages,
    cityStatsForTargetDate,
    detailGeo,
    compoundCityGeo,
    titleGeo,
    bodenseeRegionGeo,
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
  await fs.writeFile(path.join(OUT_DIR, '03-ortsfilter.txt'), eventsToText('03 ZIELDATUM MIT GEO - Browser-Radiusfilter', regionalEvents, meta), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'debug-output.json'), JSON.stringify(debug, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'debug-output.txt'), summaryToText(meta, allPages, cityStatsForTargetDate), 'utf8');

  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.json'), JSON.stringify({ meta, events: regionalEvents }, null, 2), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'feste-maerkte.txt'), eventsToText('EventBW Feste/Märkte - Zieldatum mit Geo', regionalEvents, meta), 'utf8');

  console.log('EventBW slim full list import with city filter done.');
  console.log(`Target date: ${targetDate}`);
  console.log(`Raw unique: ${rawEvents.length}`);
  console.log(`Target date matches: ${targetDateEvents.length}`);
  console.log(`Target date with geo: ${regionalEvents.filter(event => Number.isFinite(event.lat) && Number.isFinite(event.lng)).length}`);
  console.log(`Target date without geo: ${regionalEvents.filter(event => !Number.isFinite(event.lat) || !Number.isFinite(event.lng)).length}`);
  console.log(`Detail geo checked: ${detailGeo.checked}`);
  console.log(`Detail geo recovered: ${detailGeo.recovered}`);
  console.log(`Compound city geo checked: ${compoundCityGeo.checked}`);
  console.log(`Compound city geo recovered: ${compoundCityGeo.recovered}`);
  console.log(`Title geo checked: ${titleGeo.checked}`);
  console.log(`Title geo recovered: ${titleGeo.recovered}`);
  console.log(`Bodensee region geo checked: ${bodenseeRegionGeo.checked}`);
  console.log(`Bodensee region geo recovered: ${bodenseeRegionGeo.recovered}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
