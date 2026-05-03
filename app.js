const map = L.map('map').setView([48.65, 9.45], 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:'© OpenStreetMap'
  }
).addTo(map);

L.circle([48.65, 9.45], {
  radius: 50000,
  color: '#007aff',
  fillColor: '#007aff',
  fillOpacity: 0.1
}).addTo(map);

const cards = document.getElementById("cards");

const sheet = document.createElement("div");
sheet.className = "sheet";
sheet.innerHTML = `
  <div class="sheet-handle"></div>
  <h2 id="sheet-title">Event</h2>
  <p id="sheet-info"></p>
  <button class="sheet-close">Schließen</button>
`;
document.body.appendChild(sheet);

function openSheet(event) {
  document.getElementById("sheet-title").innerText = event.title;

  document.getElementById("sheet-info").innerHTML = `
    <strong>${event.place}</strong><br>
    ${event.date} · ${event.distance}<br><br>
    ${event.description}
  `;

  sheet.classList.add("open");
}

function closeSheet() {
  sheet.classList.remove("open");
}

sheet.querySelector(".sheet-close").onclick = closeSheet;
sheet.querySelector(".sheet-handle").onclick = closeSheet;

EVENTS.forEach(event => {
  L.marker([event.lat, event.lng])
    .addTo(map)
    .on("click", () => openSheet(event));

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${event.title}</h2>
    <p>${event.date} • ${event.distance}</p>
  `;
  card.onclick = () => openSheet(event);

  cards.appendChild(card);
});