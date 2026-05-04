import fs from "fs";

function log(text) {
  console.log(text);
}

const configText = fs.readFileSync("config.js", "utf8");

eval(configText);

const CONFIG = IMPORT_CONFIG;

log("Importer gestartet");
log("Ort: " + CONFIG.place);
log("Radius: " + CONFIG.radiusKm + " km");

function fakeEvents() {
  return [
    {
      title: "Frühlingsmarkt Eislingen",
      place: "Eislingen",
      date: "Sonntag",
      description: "Großer Markt in Eislingen",
      lat: 48.695,
      lng: 9.706
    },
    {
      title: "Dorffest Rechberghausen",
      place: "Rechberghausen",
      date: "Sonntag",
      description: "Fest im Ortskern",
      lat: 48.730,
      lng: 9.645
    },
    {
      title: "Planet der Hasen",
      place: "Kirchheim",
      date: "Sonntag",
      description: "Familienevent",
      lat: 48.648,
      lng: 9.451
    }
  ];
}

const events = fakeEvents();

log("Events im Import-Radius gefunden: " + events.length);

if (events.length === 0) {
  throw new Error(
    "Keine Events gefunden — events.js wird nicht überschrieben"
  );
}

const fileContent =
`const EVENTS = ${JSON.stringify(events, null, 2)};`;

fs.writeFileSync("events.js", fileContent);

log("events.js geschrieben");
log("Import erfolgreich");