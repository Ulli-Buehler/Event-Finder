const fs = require("fs");

async function run() {

  const response = await fetch(
    "https://www.veranstaltungen-bw.de/"
  );

  const html = await response.text();

  const eventBlocks =
    html.split('class="event-item"');

  const EVENTS = [];

  for (const block of eventBlocks) {

    try {

      const title =
        extract(block, 'title="', '"') ||
        extract(block, "<h3>", "</h3>");

      const place =
        extract(block, 'event-location">', "<") ||
        "Unbekannt";

      const rawText =
        cleanup(stripHtml(block));

      const dateInfo =
        parseDateInfo(rawText);

      const coords =
        fakeGeo(place);

      EVENTS.push({
        title: cleanup(title),
        place: cleanup(place),

        date:
          dateInfo.label ||

        "",

        dateStart:
          dateInfo.start ||

        null,

        dateEnd:
          dateInfo.end ||

        null,

        dateText:
          dateInfo.dateText ||

        "",

        timeText:
          dateInfo.timeText ||

        "",

        description: rawText,

        lat: coords.lat,
        lng: coords.lng
      });

    } catch (err) {

      console.log("skip event");

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

function extract(text, start, end) {

  const s = text.indexOf(start);

  if (s === -1) return "";

  const from = s + start.length;

  const e = text.indexOf(end, from);

  if (e === -1) return "";

  return text.substring(from, e);
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

function parseDateInfo(text) {

  const lines =
    text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

  let dateText = "";
  let timeText = "";

  for (const line of lines) {

    if (
      /\d{2}\.\d{2}\.\d{4}/.test(line)
    ) {

      dateText = line;

      if (line.includes(",")) {

        const parts = line.split(",");

        dateText = parts[0].trim();

        timeText =
          parts
            .slice(1)
            .join(",")
            .trim();
      }

      break;
    }
  }

  let start = null;
  let end = null;

  if (dateText.includes(" - ")) {

    const parts =
      dateText.split(" - ");

    start =
      convertDate(parts[0]);

    end =
      convertDate(parts[1]);

  } else if (dateText) {

    start =
      convertDate(dateText);

    end =
      convertDate(dateText);
  }

  return {
    label:
      monthLabel(start),

    start,
    end,
    dateText,
    timeText
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

  const names = {
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

  return names[month] || "";
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

    "Bad Saulgau":
      { lat: 48.0158, lng: 9.5010 },

    "Wolfach":
      { lat: 48.2950, lng: 8.2150 },

    "Überlingen am Bodensee":
      { lat: 47.7667, lng: 9.1667 }
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