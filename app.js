console.log("APP VERSION: categories-fixed-v3");

let userPos = [48.6167, 9.45];
let radiusKm = 30;
let dateMode = "all";

const NEXT_SUNDAY = "2026-05-10";

const ACTIVE_CATEGORIES = new Set([
  "Feste",
  "Märkte"
]);

const map = L.map("map").setView(userPos, 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let radiusCircle = L.circle(userPos, {
  radius: radiusKm * 1000,
  color: "#007aff",
  fillColor: "#007aff",
  fillOpacity: 0.1
}).addTo(map);

let userMarker = L.marker(userPos)
  .addTo(map)
  .bindPopup("Startpunkt");

const cards = document.getElementById("cards");
const statusText = document.getElementById("status");
const radiusSlider = document.getElementById("radiusSlider");
const radiusLabel = document.getElementById("radiusLabel");
const dateSelect = document.getElementById("dateSelect");
const refreshBtn = document.getElementById("refreshBtn");
const importStatus = document.getElementById("importStatus");

radiusSlider.min = 5;
radiusSlider.max = 200;
radiusSlider.value = 30;
radiusLabel.innerText = "30 km";

const eventMeta = document.createElement("div");
eventMeta.className = "event-meta";
importStatus.insertAdjacentElement("afterend", eventMeta);

const categoryBar = document.createElement("div");
categoryBar.className = "category-bar";
eventMeta.insertAdjacentElement("afterend", categoryBar);

const ALL_CATEGORIES = [
  ...new Set(
    EVENTS
      .map(e => e.category)
      .filter(Boolean)
  )
].sort();

const markers = [];

const sheet = document.createElement("div");
sheet.className = "sheet";
sheet.innerHTML = `
  <div class="sheet-handle"></div>
  <h2 id="sheet-title"></h2>
  <div id="sheet-place"></div>
  <div id="sheet-date"></div>
  <div id="sheet-description"></div>
  <button class="sheet-close">Schließen</button>
`;
document.body.appendChild(sheet);

function hasCoords(event) {
  return (
    typeof event.lat === "number" &&
    typeof event.lng === "number" &&
    !isNaN(event.lat) &&
    !isNaN(event.lng)
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

  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function eventEmoji(event) {
  const text =
    ((event.title || "") + " " + (event.description || "")).toLowerCase();

  if (text.includes("markt")) return "🧺";
  if (text.includes("musik")) return "🎵";
  if (text.includes("fest")) return "🎪";
  if (text.includes("essen")) return "🍽️";
  if (text.includes("kultur")) return "🎭";

  return "📍";
}

function dateInRange(target, start, end) {
  if (!start || !end) return false;
  return target >= start && target <= end;
}

function matchesDate(event) {
  if (dateMode === "all") return true;

  if (dateMode === "sunday") {
    return dateInRange(NEXT_SUNDAY, event.dateStart, event.dateEnd);
  }

  return true;
}

function matchesCategory(event) {
  return ACTIVE_CATEGORIES.has(event.category);
}

function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
}

function formatDate(event) {
  if (event.dateText && event.timeText) {
    return event.dateText + " · " + event.timeText;
  }

  return event.dateText || event.date || "";
}

function renderCategoryButtons() {
  categoryBar.innerHTML = "";

  ALL_CATEGORIES.forEach(category => {
    const button = document.createElement("button");

    button.className =
      ACTIVE_CATEGORIES.has(category)
        ? "category-btn active"
        : "category-btn";

    button.innerText = category;

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

function openSheet(event) {
  document.getElementById("sheet-title").innerText =
    event.title || "Event";

  document.getElementById("sheet-place").innerHTML =
    `<strong>${event.place || "Ohne Standort"}</strong>`;

  document.getElementById("sheet-date").innerHTML =
    `${formatDate(event)}${event.realDistanceText ? " • " + event.realDistanceText : ""}`;

  document.getElementById("sheet-description").innerText =
    event.summary || event.description || "Keine Beschreibung vorhanden.";

  sheet.classList.add("open");
}

function closeSheet() {
  sheet.classList.remove("open");
}

sheet.querySelector(".sheet-close").onclick = closeSheet;
sheet.querySelector(".sheet-handle").onclick = closeSheet;

function render() {
  cards.innerHTML = "";
  clearMarkers();

  radiusKm = Number(radiusSlider.value);
  radiusLabel.innerText = radiusKm + " km";

  radiusCircle.setLatLng(userPos);
  radiusCircle.setRadius(radiusKm * 1000);
  userMarker.setLatLng(userPos);

  const allEventsCount = EVENTS.length;

  const visibleEvents = EVENTS
    .map(event => {
      if (!hasCoords(event)) {
        return {
          ...event,
          hasLocation: false,
          realDistance: null,
          realDistanceText: "Ohne Standort"
        };
      }

      const realDistance = distanceKm(
        userPos[0],
        userPos[1],
        event.lat,
        event.lng
      );

      return {
        ...event,
        hasLocation: true,
        realDistance,
        realDistanceText: realDistance + " km"
      };
    })
    .filter(matchesDate)
    .filter(matchesCategory)
    .filter(event => {
      if (!event.hasLocation) return true;
      return event.realDistance <= radiusKm;
    })
    .sort((a, b) => {
      if (!a.hasLocation && b.hasLocation) return 1;
      if (a.hasLocation && !b.hasLocation) return -1;
      if (!a.hasLocation && !b.hasLocation) return 0;
      return a.realDistance - b.realDistance;
    });

  statusText.innerText = "Radius " + radiusKm + " km";

  eventMeta.innerText =
    visibleEvents.length + " von " + allEventsCount + " Events sichtbar";

  visibleEvents.forEach(event => {
    if (event.hasLocation) {
      const marker = L.marker([event.lat, event.lng])
        .addTo(map)
        .on("click", () => openSheet(event));

      markers.push(marker);
    }

    const card = document.createElement("div");
    card.className = event.hasLocation ? "card" : "card no-location";
    card.onclick = () => openSheet(event);

    card.innerHTML = `
      <div class="card-image">${eventEmoji(event)}</div>
      <div class="card-body">
        <h2>${event.title || "Event"}</h2>
        <p>
          ${event.category || ""}<br>
          ${event.place || "Ohne Standort"}<br>
          ${formatDate(event)}<br>
          ${event.realDistanceText}
        </p>
      </div>
    `;

    cards.appendChild(card);
  });

  if (visibleEvents.length === 0) {
    cards.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h2>Keine Events gefunden</h2>
          <p>Filter ändern.</p>
        </div>
      </div>
    `;
  }
}

refreshBtn.onclick = async () => {
  refreshBtn.disabled = true;
  importStatus.innerText = "🔄 Import gestartet ...";

  try {
    await fetch("/api/trigger-import", {
      method: "POST"
    });

    importStatus.innerText = "✅ Import gestartet";
  } catch (err) {
    importStatus.innerText = "❌ Fehler beim Starten";
  }

  refreshBtn.disabled = false;
};

radiusSlider.oninput = render;

dateSelect.onchange = () => {
  dateMode = dateSelect.value;
  render();
};

renderCategoryButtons();
render();