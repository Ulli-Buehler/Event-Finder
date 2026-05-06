console.log("APP VERSION: stable-filter-v2");

let userPos = [48.6167, 9.45];
let radiusKm = 30;
let dateMode = "sunday";

const ACTIVE_CATEGORIES = new Set([
  "Feste",
  "Märkte"
]);

function isoToday(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function nextSundayIso() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

const map = L.map("map").setView(userPos, 9);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap"
  }
).addTo(map);

let radiusCircle = L.circle(userPos, {
  radius: radiusKm * 1000,
  color: "#007aff",
  fillColor: "#007aff",
  fillOpacity: 0.08
}).addTo(map);

L.marker(userPos)
  .addTo(map)
  .bindPopup("Startpunkt");

const cards = document.getElementById("cards");
const statusText = document.getElementById("status");
const radiusSlider = document.getElementById("radiusSlider");
const radiusLabel = document.getElementById("radiusLabel");
const dateSelect = document.getElementById("dateSelect");
const refreshBtn = document.getElementById("refreshBtn");
const importStatus = document.getElementById("importStatus");

let markers = [];

function distanceKm(a, b) {
  const R = 6371;

  const dLat = (b[0] - a[0]) * Math.PI / 180;
  const dLon = (b[1] - a[1]) * Math.PI / 180;

  const lat1 = a[0] * Math.PI / 180;
  const lat2 = b[0] * Math.PI / 180;

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2) *
    Math.cos(lat1) *
    Math.cos(lat2);

  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function categoryEmoji(category = "") {
  const c = category.toLowerCase();

  if (c.includes("markt")) return "🧺";
  if (c.includes("essen")) return "🍔";
  if (c.includes("musik")) return "🎵";
  if (c.includes("konzert")) return "🎤";
  if (c.includes("sport")) return "⚽";
  if (c.includes("kunst")) return "🎨";
  if (c.includes("festival")) return "🎪";

  return "🎪";
}

function passesDateFilter(event) {
  if (!event.date) return true;

  const date = event.date.slice(0, 10);

  if (dateMode === "today") {
    return date === isoToday();
  }

  if (dateMode === "tomorrow") {
    return date === isoToday(1);
  }

  if (dateMode === "sunday") {
    return date === nextSundayIso();
  }

  return true;
}

function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

function renderEvents(events) {

  clearMarkers();

  cards.innerHTML = "";

  events = events.filter(event =>
    event.lat &&
    event.lon
  );

  events.forEach(event => {
    event.distanceKm = distanceKm(
      userPos,
      [event.lat, event.lon]
    );
  });

  events = events.filter(event =>
    event.distanceKm <= radiusKm
  );

  if (typeof isHiddenEvent === "function") {
    events = events.filter(event => !isHiddenEvent(event));
  }

  events = events.filter(event =>
    ACTIVE_CATEGORIES.has(event.category)
  );

  events = events.filter(passesDateFilter);

  events.sort((a, b) =>
    a.distanceKm - b.distanceKm
  );

  importStatus.textContent =
    `${events.length} von ${window.events.length} Events sichtbar`;

  events.forEach(event => {

    const marker = L.marker([
      event.lat,
      event.lon
    ]).addTo(map);

    marker.bindPopup(`
      <b>${event.title}</b><br>
      ${event.location || "Unbekannt"}<br>
      ${Math.round(event.distanceKm)} km
    `);

    markers.push(marker);

    const card = document.createElement("div");
    card.className = "card";

    const emoji = categoryEmoji(event.category);

    const distance = Math.round(event.distanceKm);

    card.innerHTML = `
      <div class="card-image">
        ${emoji}
      </div>

      <div class="card-body">

        <h2>${event.title}</h2>

        <p>
          ${event.category || ""}
        </p>

        <p>
          ${event.location || "Unbekannt"}
          •
          ${distance} km
        </p>

        <p>
          ${event.date || ""}
        </p>

      </div>
    `;

    card.onclick = () => {
      map.setView([event.lat, event.lon], 13);
      marker.openPopup();
    };

    cards.appendChild(card);

  });
}

function refreshEvents() {

  importStatus.textContent =
    "Events werden geladen ...";

  renderEvents(window.events);

  importStatus.textContent =
    "Bereit";
}

radiusSlider.addEventListener("input", e => {

  radiusKm = Number(e.target.value);

  radiusLabel.textContent =
    `${radiusKm} km`;

  statusText.textContent =
    `Kirchheim unter Teck • Radius ${radiusKm} km`;

  radiusCircle.setRadius(radiusKm * 1000);

  refreshEvents();
});

dateSelect.addEventListener("change", e => {
  dateMode = e.target.value;
  refreshEvents();
});

refreshBtn.addEventListener("click", refreshEvents);

refreshEvents();