console.log("APP VERSION: eventbw-json-v7-autoload");

const EVENTBW_JSON_BASE_URL = "eventbw/feste-maerkte.json";
const EVENTBW_JSON_URL = () => EVENTBW_JSON_BASE_URL + "?v=" + Date.now();

let userPos = [48.6167, 9.45];
let radiusKm = 40;
let appEvents = [];
let importMeta = null;
let filtersOpen = false;
let importPollTimer = null;

const ACTIVE_CATEGORIES = new Set();

const map = L.map("map").setView(userPos, 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let radiusCircle = L.circle(userPos, {
  radius: radiusKm * 1000,
  color: "#007aff",
  fillColor: "#007aff",
  fillOpacity: 0.08,
  weight: 3
}).addTo(map);

let userMarker = L.circleMarker(userPos, {
  radius: 6,
  color: "#007aff",
  fillColor: "#007aff",
  fillOpacity: 1,
  weight: 2
})
.addTo(map)
.bindPopup("Dettingen unter Teck");

const cards = document.getElementById("cards");
const statusText = document.getElementById("status");
const radiusSlider = document.getElementById("radiusSlider");
const radiusLabel = document.getElementById("radiusLabel");
const importStatus = document.getElementById("importStatus");
const lastUpdateInfo = document.getElementById("lastUpdateInfo");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const topPanel = document.querySelector(".top");

radiusSlider.min = 5;
radiusSlider.max = 120;
radiusSlider.value = 40;

const eventMeta = document.createElement("div");
eventMeta.className = "event-meta";
importStatus.insertAdjacentElement("afterend", eventMeta);

const categoryBar = document.createElement("div");
categoryBar.className = "category-bar";
filterPanel.appendChild(categoryBar);

const markers = [];

const sheet = document.createElement("div");
sheet.className = "sheet";

sheet.innerHTML = `
  <div class="sheet-handle"></div>

  <h2 id="sheet-title"></h2>

  <div id="sheet-place"></div>

  <div id="sheet-date"></div>

  <div id="sheet-description"></div>

  <a id="sheet-link" class="detail-link" href="#" target="_blank" rel="noopener">
    Details öffnen
  </a>

  <button class="sheet-close">
    Schließen
  </button>
`;

document.body.appendChild(sheet);

function hasCoords(event) {
  return (
    typeof event.lat === "number" &&
    typeof event.lng === "number" &&
    Number.isFinite(event.lat) &&
    Number.isFinite(event.lng)
  );
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return Math.round(
    R * 2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}

function categoryLabel(category) {
  if (category === "maerkte") return "Märkte";
  if (category === "feste") return "Feste";
  return category || "Event";
}

function eventEmoji(event) {
  const text = (
    (event.title || "") + " " +
    (event.category || "") + " " +
    (event.city || "")
  ).toLowerCase();

  if (text.includes("markt")) return "🧺";
  if (text.includes("feste") || text.includes("fest")) return "🎪";
  if (text.includes("wein")) return "🍷";
  if (text.includes("museum")) return "🏛️";
  if (text.includes("garten")) return "🌿";

  return "📍";
}

function clearMarkers() {
  markers.forEach(marker => {
    map.removeLayer(marker);
  });

  markers.length = 0;
}

function cleanTime(time) {
  if (!time) return "";

  const normalized = String(time).trim();

  if (
    normalized === "00:00 - 00:00 Uhr" ||
    normalized === "0:00 - 0:00 Uhr" ||
    normalized === "00:00 Uhr"
  ) {
    return "";
  }

  return normalized;
}

function formatEventDate(event) {
  const start = event.startDate || "";
  const end = event.endDate || "";
  const time = cleanTime(event.time);

  let date = start;

  if (end && end !== start) {
    date += " – " + end;
  }

  if (time) {
    date += " • " + time;
  }

  return date || "Datum unbekannt";
}

function normalizeEvent(raw, index) {
  const event = {
    id: "eventbw-" + (index + 1),
    title: raw.title || "Event",
    category: raw.category || "",
    city: raw.city || "",
    startDate: raw.startDate || "",
    endDate: raw.endDate || raw.startDate || "",
    time: cleanTime(raw.time || ""),
    detailUrl: raw.detailUrl || "",
    sourceUrl: raw.sourceUrl || "",
    page: raw.page || "",
    venue: raw.city || "",
    address: raw.city || "",
    description: "",
    lat: typeof raw.lat === "number" ? raw.lat : Number(raw.lat),
    lng: typeof raw.lng === "number" ? raw.lng : Number(raw.lng)
  };

  event.date = formatEventDate(event);

  return event;
}

function formatUpdateTime(value) {
  if (!value) {
    return "unbekannt";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "unbekannt";
  }

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function updateLastUpdateInfo() {
  if (!lastUpdateInfo) return;

  const finishedAt =
    importMeta && importMeta.finishedAt
      ? importMeta.finishedAt
      : "";

  lastUpdateInfo.innerText =
    "Letztes Update: " + formatUpdateTime(finishedAt);
}

function setImportState(state, text) {
  importStatus.className = "import-status " + state;
  importStatus.innerText = text;
}

async function fetchEventBwData() {
  const response = await fetch(EVENTBW_JSON_URL(), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.json();
}

async function loadEventBwEvents(statusMessage = "EventBW-Daten geladen") {
  setImportState("loading", "Lade EventBW-Daten ...");

  const data = await fetchEventBwData();

  importMeta = data.meta || null;
  appEvents = (data.events || []).map(normalizeEvent);

  ACTIVE_CATEGORIES.clear();

  [...new Set(
    appEvents
      .map(event => event.category)
      .filter(Boolean)
  )].sort().forEach(category => {
    ACTIVE_CATEGORIES.add(category);
  });

  updateLastUpdateInfo();
  setImportState("ok", statusMessage);
}

function openSheet(event) {
  document.getElementById("sheet-title").innerText =
    event.title || "Event";

  document.getElementById("sheet-place").innerHTML =
    `<strong>${event.city || "Ort unbekannt"}</strong>`;

  document.getElementById("sheet-date").innerHTML =
    formatEventDate(event) + " • " + event.realDistanceText;

  document.getElementById("sheet-description").innerText =
    "Kategorie: " + categoryLabel(event.category);

  const link = document.getElementById("sheet-link");

  if (event.detailUrl) {
    link.href = event.detailUrl;
    link.style.display = "inline-block";
  } else {
    link.href = "#";
    link.style.display = "none";
  }

  sheet.classList.add("open");
}

function closeSheet() {
  sheet.classList.remove("open");
}

sheet.querySelector(".sheet-close").onclick = closeSheet;
sheet.querySelector(".sheet-handle").onclick = closeSheet;

function setFiltersOpen(open) {
  filtersOpen = open;

  filterPanel.classList.toggle("open", filtersOpen);
  topPanel.classList.toggle("compact", !filtersOpen);

  filterToggle.setAttribute(
    "aria-label",
    filtersOpen ? "Filter ausblenden" : "Filter anzeigen"
  );

  filterToggle.innerText =
    filtersOpen ? "Filter ausblenden" : "☰";
}

filterToggle.onclick = () => {
  setFiltersOpen(!filtersOpen);
};

function renderCategoryButtons() {
  categoryBar.innerHTML = "";

  const categories = [...new Set(
    appEvents
      .map(event => event.category)
      .filter(Boolean)
  )].sort();

  categories.forEach(category => {
    const button = document.createElement("button");

    button.className =
      ACTIVE_CATEGORIES.has(category)
        ? "category-btn active"
        : "category-btn";

    button.innerText = categoryLabel(category);

    button.onclick = () => {
      if (ACTIVE_CATEGORIES.has(category)) {
        ACTIVE_CATEGORIES.delete(category);
      } else {
        ACTIVE_CATEGORIES.add(category);
      }

      renderCategoryButtons();
      render();
    };

    categoryBar.appendChild(button);
  });
}

function enrichVisibleEvent(event) {
  if (!hasCoords(event)) {
    return {
      ...event,
      hasLocation: false,
      realDistance: Number.POSITIVE_INFINITY,
      realDistanceText: "ohne km"
    };
  }

  const dist = distanceKm(
    userPos[0],
    userPos[1],
    event.lat,
    event.lng
  );

  return {
    ...event,
    hasLocation: true,
    realDistance: dist,
    realDistanceText: dist + " km"
  };
}

function render() {
  closeSheet();

  cards.innerHTML = "";

  clearMarkers();

  radiusKm = Number(radiusSlider.value);
  radiusLabel.innerText = radiusKm + " km";

  const targetDateText = importMeta && importMeta.targetDate
    ? " • " + importMeta.targetDate
    : "";

  statusText.innerText =
    "EventBW Märkte/Feste" + targetDateText;

  radiusCircle.setLatLng(userPos);
  radiusCircle.setRadius(radiusKm * 1000);
  userMarker.setLatLng(userPos);

  const visibleEvents = appEvents
    .filter(event => {
      if (!event.category) return true;
      return ACTIVE_CATEGORIES.has(event.category);
    })
    .map(enrichVisibleEvent)
    .filter(event => {
      if (!event.hasLocation) return true;
      return event.realDistance <= radiusKm;
    })
    .sort((a, b) => {
      const byDistance = a.realDistance - b.realDistance;
      if (byDistance !== 0) return byDistance;

      const byDate = String(a.startDate || "").localeCompare(String(b.startDate || ""));
      if (byDate !== 0) return byDate;

      return String(a.title || "").localeCompare(String(b.title || ""), "de");
    });

  eventMeta.innerText =
    visibleEvents.length +
    " von " +
    appEvents.length +
    " Events sichtbar";

  visibleEvents.forEach(event => {
    if (event.hasLocation) {
      const marker = L.marker([
        event.lat,
        event.lng
      ])
        .addTo(map)
        .on("click", () => {
          openSheet(event);
        });

      markers.push(marker);
    }

    const card = document.createElement("div");
    card.className = "card";

    card.onclick = () => {
      openSheet(event);
    };

    card.innerHTML = `
      <div class="card-image">
        ${eventEmoji(event)}
      </div>

      <div class="card-body">

        <h2>
          ${event.title || "Event"}
        </h2>

        <p class="card-place">
          <span class="card-city">${event.city || "Ort unbekannt"}</span>
          <span class="card-distance">${event.realDistanceText}</span>
        </p>

        <p class="card-date">
          ${formatEventDate(event)}
        </p>

      </div>
    `;

    cards.appendChild(card);
  });

  if (visibleEvents.length === 0) {
    cards.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h2>
            Keine Events gefunden
          </h2>
        </div>
      </div>
    `;
  }
}

radiusSlider.oninput = render;

async function init() {
  try {
    setFiltersOpen(false);

    setImportState(
      "loading",
      "🔄 Lade aktuelle Event-Daten ..."
    );

    await loadEventBwEvents(
      "✅ Daten aktuell geladen"
    );

    renderCategoryButtons();
    render();

    setTimeout(async () => {
      try {
        await loadEventBwEvents(
          "✅ Daten automatisch aktualisiert"
        );

        renderCategoryButtons();
        render();
      } catch (err) {
        console.error(err);
      }
    }, 2500);

  } catch (err) {
    console.error(err);

    setImportState(
      "error",
      "❌ EventBW-Daten konnten nicht geladen werden"
    );

    cards.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h2>
            Fehler beim Laden
          </h2>
          <p>
            eventbw/feste-maerkte.json konnte nicht gelesen werden.
          </p>
        </div>
      </div>
    `;
  }
}

init();
