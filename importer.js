const fs = require("fs");

async function run() {

  const url =
    "https://www.veranstaltung-baden-wuerttemberg.de/?post_type=event&kategorie=&ort=&region=&von=&bis=";

  console.log("lade events...");

  const response = await fetch(url);

  const html = await response.text();

  const blocks =
    html.split('class="event-item"');

  const EVENTS = [];

  for (const block of blocks) {

    try {

      const title =
        cleanup(
          extract(block, 'title="', '"')
        );

      if (!title) continue;

      const raw =
        cleanup(
          stripHtml(block)
        );

      const parsed =
        parseEvent(raw);

      const geo =
        fakeGeo(parsed.place);

      EVENTS.push({

        title,

        place:
          parsed.place,

        date:
          parsed.label,

        dateStart:
          parsed.dateStart,

        dateEnd:
          parsed.dateEnd,

        dateText:
          parsed.dateText,

        timeText:
          parsed.timeText,

        description:
          raw,

        lat:
          geo.lat,

        lng:
          geo.lng
      });

    } catch (err) {

      console.log(
        "skip event"
      );

    }
  }

  fs.writeFileSync(
    "./events-preview.js",
    "const EVENTS = " +
    JSON.stringify(EVENTS, null, 2)
  );

  console.log(
    "events:",
    EVENTS.length
  );
}

function parseEvent(text) {

  const lines =
    text
      .split("\n")
      .map(v => v.trim())
      .filter(Boolean);

  let place = "Unbekannt";

  let dateText = "";

  let timeText = "";

  for (const line of lines) {

    if (
      line.includes("|")
    ) {

      const parts =
        line.split("|");

      place =
        cleanup(
          parts[1] || ""
        );

    }

    if (
      /\d{2}\.\d{2}\.\d{4}/
      .test(line)
    ) {

      if (
        line.includes(",")
      ) {

        const split =
          line.split(",");

        dateText =
          split[0].trim();

        timeText =
          split
            .slice(1)
            .join(",")
            .trim();

      } else {

        dateText =
          line.trim();
      }

      break;
    }
  }

  let dateStart = null;

  let dateEnd = null;

  if (
    dateText.includes(" - ")
  ) {

    const parts =
      dateText.split(" - ");

    dateStart =
      convertDate(parts[0]);

    dateEnd =
      convertDate(parts[1]);

  } else {

    dateStart =
      convertDate(dateText);

    dateEnd =
      convertDate(dateText);
  }

  return {

    place,

    dateText,

    timeText,

    dateStart,

    dateEnd,

    label:
      monthLabel(dateStart)
  };
}

function convertDate(text) {

  const m =
    text.match(
      /(\d{2})\.(\d{2})\.(\d{4})/
    );

  if (!m) return null;

  return `${m[3]}-${m[2]}-${m[1]}`;
}

function monthLabel(date) {

  if (!date) return "";

  const month =
    date.split("-")[1];

  const map = {

    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AUG",
    "09": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DEC"
  };

  return map[month] || "";
}

function extract(
  text,
  start,
  end
) {

  const s =
    text.indexOf(start);

  if (s === -1)
    return "";

  const from =
    s + start.length;

  const e =
    text.indexOf(end, from);

  if (e === -1)
    return "";

  return text.substring(
    from,
    e
  );
}

function stripHtml(html) {

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
}

function cleanup(text) {

  return text
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/\n+/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
}

function fakeGeo(place) {

  const map = {

    "Kirchheim unter Teck":
      { lat: 48.6463, lng: 9.4538 },

    "Weilheim an der Teck":
      { lat: 48.6154, lng: 9.5383 },

    "Göppingen":
      { lat: 48.7035, lng: 9.6526 },

    "Tübingen":
      { lat: 48.5216, lng: 9.0576 },

    "Reutlingen":
      { lat: 48.4914, lng: 9.2043 },

    "Schwäbisch Hall":
      { lat: 49.1124, lng: 9.7371 },

    "Überlingen am Bodensee":
      { lat: 47.7667, lng: 9.1667 },

    "Wolfach":
      { lat: 48.2950, lng: 8.2150 }
  };

  if (map[place]) {
    return map[place];
  }

  return {
    lat: 48.6463,
    lng: 9.4538
  };
}

run();