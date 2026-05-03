const map = L.map('map').setView([48.65, 9.45], 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:'© OpenStreetMap'
  }
).addTo(map);

L.circle([48.65,9.45],{
  radius:50000,
  color:'#007aff',
  fillColor:'#007aff',
  fillOpacity:0.1
}).addTo(map);

const cards = document.getElementById("cards");

EVENTS.forEach(event => {

  L.marker([event.lat,event.lng])
    .addTo(map)
    .bindPopup(event.title);

  cards.innerHTML += `
    <div class="card">
      <h2>${event.title}</h2>
      <p>${event.date} • ${event.distance}</p>
    </div>
  `;
});
