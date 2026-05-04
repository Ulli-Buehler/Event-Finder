import fs from "fs";

function log(text) {
  console.log(text);
}

const configText = fs.readFileSync("config.js", "utf8");
eval(configText);

const CONFIG = globalThis.IMPORT_CONFIG;

if (!CONFIG) {
  throw new Error("IMPORT_CONFIG wurde nicht gefunden");
}

log("Importer gestartet");
log("Ort: " + CONFIG.place);
log("Radius: " + CONFIG.radiusKm + " km");

const events = [
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

log("Events gefunden: " + events.length);

const fileContent =
`const EVENTS = ${JSON.stringify(events, null, 2)};`;

fs.writeFileSync("events.js", fileContent);

log("events.js geschrieben");
log("Import erfolgreich");