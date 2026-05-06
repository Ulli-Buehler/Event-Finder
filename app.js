console.log("APP VERSION: date-filter-distance-v1");

let userPos = [48.6167, 9.45];
let radiusKm = 30;
let dateMode = "all";
let customDateOpen = false;

const ACTIVE_CATEGORIES = new Set(["Feste", "Märkte"]);

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

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let radiusCircle = L.circle(userPos, {
  radius: radiusKm * 1000,
  color: "#007aff",
  fillColor: "#007aff",
  fillOpacity: 0.1
}).addTo(map);

let userMarker = L.marker(userPos).addTo(map).bindPopup("Startpunkt");

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

const dateToggle = document.createElement("button");
dateToggle.className = "date-toggle";
dateToggle.innerText = "Datum wählen";
categoryBar.insertAdjacentElement("afterend", dateToggle);

const datePanel = document.createElement("div");
datePanel.className = "date-panel hidden";
datePanel.innerHTML = `
  <label>Von <input id="dateFrom" type="date"></label>
  <label>Bis <input id="dateTo" type="date"></label>
`;
dateToggle.insertAdjacentElement("afterend", datePanel);

const dateFrom = document.getElementById("dateFrom");
const dateTo = document.getElementById("dateTo");

const ALL_CATEGORIES = [
  ...new Set(EVENTS.map(e => e.category).filter(Boolean))
].sort((a, b) => {
  const aa = ACTIVE_CATEGORIES.has