console.log("APP VERSION: rollback-working-v7-fixed-events");

let userPos = [48.6167, 9.45];
let radiusKm = 30;
let dateMode = "all";

const ACTIVE_CATEGORIES = new Set();

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

const categoryBar = document.createElement("div");
categoryBar.className = "category-bar";
eventMeta.insertAdjacentElement("afterend", categoryBar);

const markers = [];

const ALL_CATEGORIES = [
  ...new Set(
    EVENTS
      .map(e => e.category)
      .filter(Boolean)
  )
].sort();

const sheet = document.createElement("div");

sheet.className = "sheet";

sheet.innerHTML = `
  <div class="sheet-handle"></div>

  <h2 id="sheet-title"></h2>

  <div id="sheet-place"></div>

  <div id="sheet-date"></div>

  <div id="sheet-description"></div>

  <button class="sheet-close">
    Schließen
  </button>
`;

document.body.appendChild(sheet);

function hasCoords(event) {
  return (
    typeof event.lat === "number" &&
    typeof event.lng === "number"
  );
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat =
    (lat2 - lat1) *
    Math.PI / 180;

  const dLon =
    (lon2 - lon1) *
    Math.PI / 180;

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

function eventEmoji(event) {
  const text =
    (
      (event.title || "") +
      " " +
      (event.description || "")
    ).toLowerCase();

  if (text.includes("markt")) return "🧺";
  if (text.includes("musik")) return "🎵";
  if (text.includes("fest")) return "🎪";
  if (text.includes("essen")) return "🍽️";
  if (text.includes("kultur")) return "🎭";

  return "📍";
}

function formatDate(event) {
  if (
    event.dateText &&
    event.timeText
  ) {
    return (
      event.dateText +
      " · " +
      event.timeText
    );
  }

  return event.date || "";
}

function getPlace(event) {
  if (event.place) {
    return event.place;
  }

  const parts = [];

  if (event.venue) {
    parts.push(event.venue);
  }

  if (event.city) {
    parts.push(event.city);
  }

  return parts.join(", ");
}

function openSheet(event) {
  document.getElementById(
    "sheet-title"
  ).innerText =
    event.title || "Event";

  document.getElementById(
    "sheet-place"
  ).innerHTML =
    `<strong>${
      getPlace(event) ||
      "Ort unbekannt"
    }</strong>`;

  document.getElementById(
    "sheet-date"
  ).innerHTML =
    `${formatDate(event)} • ${event.realDistanceText}`;

  document.getElementById(
    "sheet-description"
  ).innerText =
    event.summary ||
    event.description ||
    "Keine Beschreibung vorhanden.";

  sheet.classList.add("open");
}

function closeSheet() {
  sheet.classList.remove("open");
}

sheet
  .querySelector(".sheet-close")
  .onclick = closeSheet;

sheet
  .querySelector(".sheet-handle")
  .onclick = closeSheet;

function renderCategoryButtons() {
  categoryBar.innerHTML = "";

  ALL_CATEGORIES.forEach(category => {
    const button =
      document.createElement("button");

    button.className =
      ACTIVE_CATEGORIES.has(category)
        ? "category-btn active"
        : "category-btn";

    button.innerText = category;

    button.onclick = () => {
      if (
        ACTIVE_CATEGORIES.has(category)
      ) {
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

function render() {
  closeSheet();

  cards.innerHTML = "";
  cards.scrollLeft = 0;

  markers.forEach(marker => {
    map.removeLayer(marker);
  });

  markers.length = 0;

  radiusKm =
    Number(radiusSlider.value);

  radiusLabel.innerText =
    radiusKm + " km";

  statusText.innerText =
    "Kirchheim unter Teck • Radius " +
    radiusKm +
    " km";

  radiusCircle.setLatLng(userPos);

  radiusCircle.setRadius(
    radiusKm * 1000
  );

  userMarker.setLatLng(userPos);

  const visibleEvents = EVENTS

    .filter(event => {
      const title =
        (event.title || "")
          .toLowerCase();

      return !title.includes(
        "veranstaltung test"
      );
    })

    .map(event => {
      if (!hasCoords(event)) {
        return {
          ...event,
          hasLocation: false,
          realDistanceText:
            "Ohne Standort"
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
        realDistanceText:
          dist + " km"
      };
    })

    .filter(event => {
      if (
        ACTIVE_CATEGORIES.size === 0
      ) {
        return true;
      }

      return ACTIVE_CATEGORIES.has(
        event.category
      );
    })

    .filter(event => {
      if (!event.hasLocation) {
        return true;
      }

      return (
        event.realDistance <=
        radiusKm
      );
    })

    .sort((a, b) => {
      if (!a.hasLocation) {
        return 1;
      }

      if (!b.hasLocation) {
        return -1;
      }

      return (
        a.realDistance -
        b.realDistance
      );
    });

  eventMeta.innerText =
    visibleEvents.length +
    " von " +
    EVENTS.length +
    " Events sichtbar";

  visibleEvents.forEach(event => {
    if (event.hasLocation) {
      const marker =
        L.marker([
          event.lat,
          event.lng
        ])
        .addTo(map)
        .on("click", () => {
          openSheet(event);
        });

      markers.push(marker);
    }

    const card =
      document.createElement("div");

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

        <p class="card-category">
          ${event.category || ""}
        </p>

        <p class="card-place">
          ${
            getPlace(event) ||
            "Ort unbekannt"
          }
          •
          ${event.realDistanceText}
        </p>

        <p class="card-date">
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
    await fetch(
      "/api/trigger-import",
      {
        method: "POST"
      }
    );

    importStatus.innerText =
      "✅ Import gestartet";
  } catch (err) {
    importStatus.innerText =
      "❌ Fehler";
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