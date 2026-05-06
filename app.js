console.log("APP VERSION: rollback-working-v2-category-toggle");

let userPos = [48.6167, 9.45];
let radiusKm = 30;
let dateMode = "all";
let categoriesOpen = false;

const ACTIVE_CATEGORIES = new Set(["Feste", "Märkte"]);

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

const eventMeta = document.createElement("div");
eventMeta.className = "event-meta";
importStatus.insertAdjacentElement("afterend", eventMeta);

const categoryToggle = document.createElement("button");
categoryToggle.className = "category-toggle";
categoryToggle.innerText = "Kategorien anzeigen";
eventMeta.insertAdjacentElement("afterend", categoryToggle);

const categoryBar