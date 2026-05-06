const HIDDEN_EVENT_URLS = new Set([
  "https://www.veranstaltung-baden-wuerttemberg.de/veranstaltung/veranstaltung-test/"
]);

function isHiddenEvent(event) {
  return HIDDEN_EVENT_URLS.has(event.detailsUrl);
}