function parseRawEvent(raw) {
  const lines = raw
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const cleanLines = lines.filter(
    l =>
      l !== "Details" &&
      !/^Posts pagination/i.test(l) &&
      !/^\d+$/.test(l)
  );

  const monthIndex = cleanLines.findIndex(l =>
    /^[A-ZÄÖÜ]{3,}$/i.test(l)
  );

  const category = cleanLines[monthIndex + 1] || "";

  const title = cleanLines[monthIndex + 2] || "";

  // Nur echte "Kategorie | Ort"-Zeilen verwenden
  let place = "Unbekannt";
  let categoryLine = "";

  const expectedPrefix = category + " |";

  for (const line of cleanLines) {
    if (line.startsWith(expectedPrefix)) {
      categoryLine = line;

      const parts = line
        .split("|")
        .map(p => p.trim());

      place = parts[1] || "Unbekannt";

      break;
    }
  }

  // Datum erkennen
  let dateText = "";
  let timeText = "";
  let dateStart = "";
  let dateEnd = "";

  const dateRegex =
    /(\d{2}\.\d{2}\.\d{4})(?:\s*-\s*(\d{2}\.\d{2}\.\d{4}))?(?:,\s*(.*))?/;

  for (const line of cleanLines) {
    const match = line.match(dateRegex);

    if (match) {
      dateText = match[0];

      const startRaw = match[1];
      const endRaw = match[2];
      const timeRaw = match[3];

      const [d1, m1, y1] = startRaw.split(".");
      dateStart = `${y1}-${m1}-${d1}`;

      if (endRaw) {
        const [d2, m2, y2] = endRaw.split(".");
        dateEnd = `${y2}-${m2}-${d2}`;
      } else {
        dateEnd = dateStart;
      }

      if (timeRaw) {
        timeText = timeRaw.trim();
      }

      break;
    }
  }

  // Summary
  let summary = "";

  const dateLineIndex = cleanLines.findIndex(l =>
    l.includes(dateText)
  );

  if (
    dateLineIndex >= 0 &&
    cleanLines[dateLineIndex + 1] &&
    cleanLines[dateLineIndex + 1] !== "Details"
  ) {
    summary = cleanLines[dateLineIndex + 1];
  }

  return {
    title,
    category,
    place,
    categoryLine,
    dateText,
    timeText,
    dateStart,
    dateEnd,
    date: cleanLines[1] || "",
    summary,
    description: raw
  };
}