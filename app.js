let userPos = [48.65, 9.45];
let radiusKm = 50;
let dateMode = "sunday";

const map = L.map("map").setView(userPos, 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:"© OpenStreetMap"
}).addTo(map);

let radiusCircle = L.circle(userPos, {
  radius: radiusKm * 1000,
  color:"#007aff",
  fillColor:"#007aff",
  fillOpacity:0.1
}).addTo(map);

let userMarker = L.marker(userPos).addTo(map).bindPopup("Startpunkt");

const cards = document.getElementById("cards");
const statusText = document.getElementById("status");
const radiusSlider = document.getElementById("radiusSlider");
const radiusLabel = document.getElementById("radiusLabel");
const dateSelect = document.getElementById("dateSelect");
const refreshBtn = document.getElementById("refreshBtn");
const importStatus = document.getElementById("importStatus");

const markers = [];

const sheet = document.createElement("div");
sheet.className = "sheet";
sheet.innerHTML = `
  <div class="sheet-handle"></div>
  <h2 id="sheet-title">Event</h2>
  <p id="sheet-info"></p>
  <button class="sheet-close">Schließen</button>
`;
document.body.appendChild(sheet);

function distanceKm(lat1, lon1, lat2, lon2){
  const R = 6371;
  const dLat = (lat2-lat1) * Math.PI / 180;
  const dLon = (lon2-lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2) ** 2;

  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

function eventEmoji(event){
  const text = (event.title + " " + event.description).toLowerCase();

  if(text.includes("markt")) return "🛍️";
  if(text.includes("fest")) return "🎪";
  if(text.includes("musik")) return "🎵";
  if(text.includes("food") || text.includes("essen")) return "🍔";
  if(text.includes("kinder")) return "👨‍👩‍👧";
  return "📍";
}

function matchesDate(event){
  const d = (event.date || "").toLowerCase();

  if(dateMode === "all") return true;
  if(dateMode === "today") return d.includes("heute");
  if(dateMode === "tomorrow") return d.includes("morgen");
  if(dateMode === "sunday") return d.includes("sonntag");

  return true;
}

function openSheet(event){
  document.getElementById("sheet-title").innerText = event.title;

  document.getElementById("sheet-info").innerHTML = `
    <strong>${event.place}</strong><br>
    ${event.date} · ${event.distance}<br><br>
    ${event.description || "Keine Beschreibung vorhanden."}
  `;

  sheet.classList.add("open");
}

function closeSheet(){
  sheet.classList.remove("open");
}

sheet.querySelector(".sheet-close").onclick = closeSheet;
sheet.querySelector(".sheet-handle").onclick = closeSheet;

function clearMarkers(){
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
}

function render(){
  cards.innerHTML = "";
  clearMarkers();

  radiusCircle.setLatLng(userPos);
  radiusCircle.setRadius(radiusKm * 1000);
  userMarker.setLatLng(userPos);

  radiusLabel.innerText = radiusKm + " km";
  statusText.innerText = "Radius " + radiusKm + " km";

  const visibleEvents = EVENTS
    .map(event => {
      const realDistance = distanceKm(
        userPos[0],
        userPos[1],
        event.lat,
        event.lng
      );

      return {
        ...event,
        realDistance
      };
    })
    .filter(event => event.realDistance <= radiusKm)
    .filter(matchesDate)
    .sort((a,b) => a.realDistance - b.realDistance);

  visibleEvents.forEach(event => {
    const marker = L.marker([event.lat,event.lng])
      .addTo(map)
      .on("click", () => openSheet(event));

    markers.push(marker);

    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openSheet(event);

    card.innerHTML = `
      <div class="card-image">${eventEmoji(event)}</div>
      <div class="card-body">
        <h2>${event.title}</h2>
        <p>${event.date} • ${event.realDistance} km</p>
      </div>
    `;

    cards.appendChild(card);
  });

  if(visibleEvents.length === 0){
    cards.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h2>Keine Events gefunden</h2>
          <p>Radius oder Datum ändern.</p>
        </div>
      </div>
    `;
  }
}

refreshBtn.onclick = () => {
  refreshBtn.disabled = true;

  let seconds = 0;
  importStatus.innerText = "🔄 Aktualisierung läuft ... 0s";

  const timer = setInterval(() => {
    seconds++;
    importStatus.innerText = "🔄 Aktualisierung läuft ... " + seconds + "s";
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    importStatus.innerText = "✅ Neu geladen";
    location.reload();
  }, 15000);
};

radiusSlider.oninput = () => {
  radiusKm = Number(radiusSlider.value);
  render();
};

dateSelect.onchange = () => {
  dateMode = dateSelect.value;
  render();
};

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(
    pos => {
      userPos = [pos.coords.latitude, pos.coords.longitude];
      map.setView(userPos, 10);
      render();
    },
    () => {
      render();
    }
  );
} else {
  render();
}