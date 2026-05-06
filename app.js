console.log("APP VERSION: collapsible-category-menu-v1")

let userPos = [48.6167, 9.45];
let radiusKm = 30;
let dateMode = "all";
let categoriesOpen = false;

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

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let radiusCircle = L.circle(userPos, {
  radius: radiusKm * 1000,
  color: "#007aff",
  fillColor: "#007aff",
  fillOpacity: 0.08
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
const top = document.querySelector(".top");

radiusSlider.min = 5;
radiusSlider.max = 200;
radiusSlider.value = 30;

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

  return Math.round(
    R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

function eventEmoji(event) {

  const text =
    (
      (event.title || "") +
      " " +
      (event.description || "")
    ).toLowerCase();

  if (
    text.includes("markt") ||
    text.includes("flohmarkt") ||
    text.includes("basar")
  ) {
    return "🧺";
  }

  if (text.includes("musik")) return "🎵";
  if (text.includes("fest")) return "🎪";
  if (text.includes("essen")) return "🍽️";
  if (text.includes("trinken")) return "🍷";
  if (text.includes("kultur")) return "🎭";
  if (text.includes("ausstellung")) return "🖼️";

  return "📍";
}

function dateInRange(target, start, end) {

  if (!start || !end) return false;

  return target >= start && target <= end;
}

function matchesDate(event) {

  if (dateMode === "all") return true;

  if (dateMode === "today") {
    return dateInRange(
      isoToday(),
      event.dateStart,
      event.dateEnd
    );
  }

  if (dateMode === "tomorrow") {
    return dateInRange(
      isoToday(1),
      event.dateStart,
      event.dateEnd
    );
  }

  if (dateMode === "sunday") {
    return dateInRange(
      nextSundayIso(),
      event.dateStart,
      event.dateEnd
    );
  }

  return true;
}

function matchesCategory(event) {

  if (ACTIVE_CATEGORIES.size === 0) {
    return true;
  }

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

  if (event.dateText) {
    return event.dateText;
  }

  return event.date || "";
}

function openSheet(event) {

  document.getElementById("sheet-title").innerText =
    event.title || "Event";

  document.getElementById("sheet-place").innerHTML =
    `<strong>${event.place || "Ohne Standort"}</strong>`;

  document.getElementById("sheet-date").innerHTML =
    `${formatDate(event)}${event.realDistanceText ? " • " + event.realDistanceText : ""}`;

  document.getElementById("sheet-description").innerText =
    event.summary ||
    event.description ||
    "Keine Beschreibung vorhanden.";

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

  statusText.innerText =
    "Radius " + radiusKm + " km";

  radiusCircle.setLatLng(userPos);

  radiusCircle.setRadius(radiusKm * 1000);

  userMarker.setLatLng(userPos);

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

  const existingCounter =
    document.getElementById("eventCounter");

  if (existingCounter) {
    existingCounter.remove();
  }

  const existingCategoryBar =
    document.querySelector(".category-bar");

  if (existingCategoryBar) {
    existingCategoryBar.remove();
  }

  const existingToggle =
    document.querySelector(".category-toggle");

  if (existingToggle) {
    existingToggle.remove();
  }

  const counter = document.createElement("div");

  counter.id = "eventCounter";

  counter.className = "event-counter";

  counter.innerText =
    `${visibleEvents.length} von ${EVENTS.length} Events sichtbar`;

  top.appendChild(counter);

  const allCategories = [
    ...new Set(
      EVENTS
        .map(e => e.category)
        .filter(Boolean)
    )
  ].sort();

  const toggleButton =
    document.createElement("button");

  toggleButton.className =
    "category-toggle";

  toggleButton.innerText =
    categoriesOpen
      ? "Kategorien ausblenden"
      : "Kategorien anzeigen";

  toggleButton.onclick = () => {

    categoriesOpen = !categoriesOpen;

    render();
  };

  top.appendChild(toggleButton);

  if (categoriesOpen) {

    const categoryBar =
      document.createElement("div");

    categoryBar.className =
      "category-bar";

    allCategories.forEach(category => {

      const btn =
        document.createElement("button");

      btn.className =
        ACTIVE_CATEGORIES.has(category)
          ? "category-btn active"
          : "category-btn";

      btn.innerText = category;

      btn.onclick = () => {

        if (
          ACTIVE_CATEGORIES.has(category)
        ) {
          ACTIVE_CATEGORIES.delete(category);
        } else {
          ACTIVE_CATEGORIES.add(category);
        }

        render();
      };

      categoryBar.appendChild(btn);
    });

    top.appendChild(categoryBar);
  }

  visibleEvents.forEach(event => {

    if (event.hasLocation) {

      const marker = L.marker([
        event.lat,
        event.lng
      ])
        .addTo(map)
        .on("click", () =>
          openSheet(event)
        );

      markers.push(marker);
    }

    const card =
      document.createElement("div");

    card.className =
      event.hasLocation
        ? "card"
        : "card no-location";

    card.onclick = () =>
      openSheet(event);

    card.innerHTML = `
      <div class="card-image">
        ${eventEmoji(event)}
      </div>

      <div class="card-body">

        <h2>
          ${event.title || "Event"}
        </h2>

        <p>
          ${event.category || ""}
          <br>

          ${event.place || "Ohne Standort"}
          ${event.realDistanceText ? " • " + event.realDistanceText : ""}

          <br>

          ${formatDate(event)}
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

          <p>
            Radius oder Filter ändern.
          </p>

        </div>

      </div>
    `;
  }
}

refreshBtn.onclick = async () => {

  refreshBtn.disabled = true;

  importStatus.innerText =
    "🔄 Import gestartet ...";

  try {

    await fetch("/api/trigger-import", {
      method: "POST"
    });

    importStatus.innerText =
      "✅ Import gestartet. Bitte kurz warten und neu laden.";

  } catch (err) {

    importStatus.innerText =
      "❌ Fehler beim Starten";
  }

  refreshBtn.disabled = false;
};

radiusSlider.oninput = render;

dateSelect.onchange = () => {

  dateMode = dateSelect.value;

  render();
};

render();