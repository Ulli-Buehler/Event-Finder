// importer.js
// Zwischenstation: später zieht diese Datei echte Events
// und erzeugt daraus saubere Daten für events.js

const SOURCE_URL = "https://www.veranstaltung-baden-wuerttemberg.de/";

async function loadEvents() {
  console.log("Lade Events von:", SOURCE_URL);

  // Nächster Schritt:
  // 1. Webseite abrufen
  // 2. HTML auslesen
  // 3. Titel / Ort / Datum finden
  // 4. daraus EVENTS erzeugen

  const events = [
    {
      title: "Test Event von Importer",
      place: "Kirchheim unter Teck",
      distance: "2 km",
      lat: 48.6468,
      lng: 9.4538,
      description: "Dieses Event kommt später automatisch vom Importer.",
      date: "Sonntag"
    }
  ];

  console.log(events);
}

loadEvents();
