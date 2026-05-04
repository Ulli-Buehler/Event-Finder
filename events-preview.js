const EVENTS = [
  {
    "title": "Maimarkt",
    "date": "MAY",
    "description": "04 | MAY | Märkte | Maimarkt | Märkte | Pfullendorf | 04.05.2026 | Details",
    "place": "Pfullendorf",
    "lat": 47.9267,
    "lng": 9.2578
  },
  {
    "title": "Landpartie Schloss Monrepos",
    "date": "MAY",
    "description": "07 | MAY | Märkte | Landpartie Schloss Monrepos | Märkte | Ludwigsburg | 07.05.2026 - 10.05.2026 | Details",
    "place": "Ludwigsburg",
    "lat": 48.8941,
    "lng": 9.1955
  },
  {
    "title": "Käse- und Genussmarkt",
    "date": "MAY",
    "description": "09 | MAY | Märkte | Käse- und Genussmarkt | Märkte | Schwäbisch Hall | 09.05.2026 - 10.05.2026 | Details",
    "place": "Schwäbisch Hall",
    "lat": 49.1122,
    "lng": 9.7373
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "date": "MAY",
    "description": "09 | MAY | Märkte | Markt der Möglichkeiten – Kunst & Handwerk | Märkte | Tübingen | 09.05.2026 - 10.05.2026 | Details",
    "place": "Tübingen",
    "lat": 48.5216,
    "lng": 9.0576
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "date": "MAY",
    "description": "09 | MAY | Märkte | Kunst, Keramik, Kunsthandwerk in Frickenhausen | Märkte | Frickenhausen | 09.05.2026 - 10.05.2026 | Details",
    "place": "Frickenhausen",
    "lat": 48.5935,
    "lng": 9.3608
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "date": "MAY",
    "description": "09 | MAY | Märkte | Frühlings-Flohmarkt mit Krämermarkt | Märkte | Bad Saulgau | 09.05.2026 | Details",
    "place": "Bad Saulgau",
    "lat": 48.0167,
    "lng": 9.5
  },
  {
    "title": "Käse- und Genießermarkt",
    "date": "MAY",
    "description": "09 | MAY | Märkte | Käse- und Genießermarkt | Märkte | Weilheim an der Teck | 09.05.2026, 9 - 16 Uhr | Details",
    "place": "Weilheim an der Teck",
    "lat": 48.6156,
    "lng": 9.5375
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "date": "MAY",
    "description": "09 | MAY | Märkte | Radolfzeller Kräutermarkt | Märkte | Radolfzell am Bodensee | 09.05.2026 | Details",
    "place": "Radolfzell am Bodensee",
    "lat": 47.7419,
    "lng": 8.97
  },
  {
    "title": "Maimarkt",
    "date": "MAY",
    "description": "13 | MAY | Märkte | Maimarkt | Märkte | Eppingen | 13.05.2026 | Details",
    "place": "Eppingen",
    "lat": 49.1365,
    "lng": 8.9123
  },
  {
    "title": "GardenLife",
    "date": "MAY",
    "description": "14 | MAY | Märkte | GardenLife | Märkte | Reutlingen | 14.05.2026 - 17.05.2026 | Details",
    "place": "Reutlingen",
    "lat": 48.4914,
    "lng": 9.2043
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "date": "MAY",
    "description": "14 | MAY | Märkte | Sinsheimer Fohlenmarkt | Märkte | Sinsheim | 14.05.2026 - 17.05.2026 | Details",
    "place": "Sinsheim",
    "lat": 49.2529,
    "lng": 8.8787
  },
  {
    "title": "Maimarkt",
    "date": "MAY",
    "description": "15 | MAY | Märkte | Maimarkt | Märkte | Göppingen | 15.05.2026 | Details",
    "place": "Göppingen",
    "lat": 48.7054,
    "lng": 9.6512
  },
  {
    "title": "Flohmarkt",
    "date": "MAY",
    "description": "16 | MAY | Märkte | Flohmarkt | Märkte | Ravensburg | 16.05.2026 | Details",
    "place": "Ravensburg",
    "lat": 47.7811,
    "lng": 9.6136
  },
  {
    "title": "Endinger Büchermarkt",
    "date": "MAY",
    "description": "16 | MAY | Märkte | Endinger Büchermarkt | Märkte | Endingen | 16.05.2026 | Details",
    "place": "Endingen",
    "lat": 48.1422,
    "lng": 7.7
  },
  {
    "title": "Muttertagsmarkt",
    "date": "MAY",
    "description": "17 | MAY | Märkte | Muttertagsmarkt | Märkte | Hausach | 17.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Pfingstmarkt",
    "date": "MAY",
    "description": "20 | MAY | Märkte | Pfingstmarkt | Märkte | Wolfach | 20.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Michelstädter Bienenmarkt",
    "date": "MAY",
    "description": "22 | MAY | Märkte | Michelstädter Bienenmarkt | Märkte | Michelstadt | 22.05.2026 - 31.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "date": "MAY",
    "description": "23 | MAY | Märkte | Mittelaltermarkt mit Ritterturnier und Feuershow | Märkte | Dischingen | 23.05.2026 - 25.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt",
    "date": "MAY",
    "description": "24 | MAY | Märkte | Naturparkmarkt | Märkte | Löwenstein | 24.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "date": "MAY",
    "description": "24 | MAY | Märkte | Naturparkmarkt Löwenstein | Märkte | Löwenstein | 24.05.2026, 11:00 - 17:00 Uhr | Die Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "date": "MAY",
    "description": "25 | MAY | Märkte | Trossinger Pfingstmarkt | Märkte | Trossingen | 25.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "date": "MAY",
    "description": "30 | MAY | Märkte | KUNST.MARKT.GENUSS. mit Vogtsburg-Markt | Märkte | Vogtsburg im Kaiserstuhl | 30.05.2026 - 31.05.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "date": "MAY",
    "description": "31 | MAY | Märkte | Naturpark-Markt Ettlingen | Märkte | Ettlingen | 31.05.2026, 11:00 - 17:00 Uhr | Frische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "date": "JUN",
    "description": "06 | JUN | Märkte | Rosen-, Garten- & Kunstmarkt | Märkte | Waiblingen | 06.06.2026 - 07.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "HandmadeART Reutlingen",
    "date": "JUN",
    "description": "07 | JUN | Märkte | HandmadeART Reutlingen | Märkte | Reutlingen | 07.06.2026 | Details",
    "place": "Reutlingen",
    "lat": 48.4914,
    "lng": 9.2043
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "date": "JUN",
    "description": "07 | JUN | Märkte | Naturpark-Markt Oberndorf a. N. | Märkte | Oberndorf am Neckar | 07.06.2026, 11:00 - 17:00 Uhr | Naturpark-Markt am 7. Juni 2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Krämermarkt",
    "date": "JUN",
    "description": "11 | JUN | Märkte | Krämermarkt | Märkte | Dettingen an der Erms | 11.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "date": "JUN",
    "description": "13 | JUN | Märkte | Tag der Rose & Antikmarkt | Märkte | Ulm/Neu-Ulm | 13.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "date": "JUN",
    "description": "13 | JUN | Märkte | Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten” | Märkte | Eppingen | 13.06.2026 - 14.06.2026 | Details",
    "place": "Eppingen",
    "lat": 49.1365,
    "lng": 8.9123
  },
  {
    "title": "Kunstmarkt",
    "date": "JUN",
    "description": "13 | JUN | Märkte | Kunstmarkt | Märkte | Sipplingen | 13.06.2026 - 14.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "date": "JUN",
    "description": "13 | JUN | Märkte | Ursulamarkt mit Flohmarkt | Märkte | Rosenfeld | 13.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt",
    "date": "JUN",
    "description": "14 | JUN | Märkte | Naturparkmarkt | Märkte | Calw | 14.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Häussler Backtage",
    "date": "JUN",
    "description": "18 | JUN | Märkte | Häussler Backtage | Märkte | Altheim | 18.06.2026 - 20.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Büchermarkt",
    "date": "JUN",
    "description": "20 | JUN | Märkte | Büchermarkt | Märkte | Kirchberg an der Jagst | 20.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "date": "JUN",
    "description": "20 | JUN | Märkte | Darmsheimer Töpfermarkt | Märkte | Sindelfingen | 20.06.2026 - 21.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt",
    "date": "JUN",
    "description": "21 | JUN | Märkte | Naturparkmarkt | Märkte | Ettlingen | 21.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "date": "JUN",
    "description": "21 | JUN | Märkte | Naturparkmarkt Plüderhausen | Märkte | Plüderhausen | 21.06.2026, 11:00 - 17:00 Uhr | Die Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "date": "JUN",
    "description": "25 | JUN | Märkte | Radolfzeller Abendmarkt | Märkte | Radolfzell am Bodensee | 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr | Genuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt. | Details",
    "place": "Radolfzell am Bodensee",
    "lat": 47.7419,
    "lng": 8.97
  },
  {
    "title": "Peter und Paul Markt",
    "date": "JUN",
    "description": "29 | JUN | Märkte | Peter und Paul Markt | Märkte | Schönau im Schwarzwald | 29.06.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "635. Zunftmarkt",
    "date": "JUN",
    "description": "29 | JUN | Märkte | 635. Zunftmarkt | Märkte | Bad Wimpfen | 29.06.2026 - 30.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "date": "JUL",
    "description": "02 | JUL | Märkte | Hamburger Fischmarkt in Stuttgart | Märkte | Stuttgart | 02.07.2026 - 12.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "date": "JUL",
    "description": "04 | JUL | Märkte | Kunstmarkt rund ums Nonnenhaus | Märkte | Tübingen | 04.07.2026 | Details",
    "place": "Tübingen",
    "lat": 48.5216,
    "lng": 9.0576
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "date": "JUL",
    "description": "04 | JUL | Märkte | Süddeutscher Kunsthandwerkermarkt | Märkte | Villingen-Schwenningen | 04.07.2026 - 05.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "date": "JUL",
    "description": "04 | JUL | Märkte | Töpfer- und Kunstmarkt | Märkte | Immenstaad am Bodensee | 04.07.2026 - 05.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "date": "JUL",
    "description": "04 | JUL | Märkte | Kunst- und Handwerkermarkt | Märkte | Ravensburg | 04.07.2026 - 05.07.2026 | Details",
    "place": "Ravensburg",
    "lat": 47.7811,
    "lng": 9.6136
  },
  {
    "title": "Life’s finest",
    "date": "JUL",
    "description": "09 | JUL | Märkte | Life’s finest | Märkte | Bretten | 09.07.2026 - 12.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "JAAmarkt",
    "date": "JUL",
    "description": "11 | JUL | Märkte | JAAmarkt | Märkte | Aalen | 11.07.2026 - 12.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Altstadt-Antikmarkt",
    "date": "JUL",
    "description": "14 | JUL | Märkte | Altstadt-Antikmarkt | Märkte | Kehl | 14.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "date": "JUL",
    "description": "17 | JUL | Märkte | Pforzheimer Gruschtelmarkt | Märkte | Pforzheim | 17.07.2026 - 18.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "date": "JUL",
    "description": "17 | JUL | Märkte | Isnyer Feierabendmärkte 2026 | Märkte | Isny im Allgäu | 17.07.2026, 16:00 - 21:00 Uhr | Die Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "date": "JUL",
    "description": "18 | JUL | Märkte | “Sommerfrische im Fürstlichen Hofgarten” | Märkte | Wolfegg | 18.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt",
    "date": "JUL",
    "description": "19 | JUL | Märkte | Naturparkmarkt | Märkte | Fichtenberg | 19.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "date": "JUL",
    "description": "19 | JUL | Märkte | Kunst-Handwerker-Markt | Märkte | Blaufelden | 19.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "date": "JUL",
    "description": "19 | JUL | Märkte | Naturparkmarkt Fichtenberg | Märkte | Fichtenberg | 19.07.2026, 11:00 - 17:00 Uhr | Die Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Jakobimarkt",
    "date": "JUL",
    "description": "25 | JUL | Märkte | Jakobimarkt | Märkte | Nellingen | 25.07.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Flohmarkt",
    "date": "AUG",
    "description": "01 | AUG | Märkte | Flohmarkt | Märkte | Emmendingen | 01.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Isnyer Töpfermarkt",
    "date": "AUG",
    "description": "01 | AUG | Märkte | Isnyer Töpfermarkt | Märkte | Isny im Allgäu | 01.08.2026 - 02.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunstgewerbemarkt",
    "date": "AUG",
    "description": "02 | AUG | Märkte | Kunstgewerbemarkt | Märkte | Bietigheim-Bissingen | 02.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "date": "AUG",
    "description": "08 | AUG | Märkte | 16. Gartenmarkt “Sommer – Blüten – Träume” | Märkte | Rechberghausen | 08.08.2026 - 09.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Vespermarkt",
    "date": "AUG",
    "description": "08 | AUG | Märkte | Vespermarkt | Märkte | Zwiefalten | 08.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kräutermarkt",
    "date": "AUG",
    "description": "08 | AUG | Märkte | Kräutermarkt | Märkte | Mosbach | 08.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunst- & Genießermarkt",
    "date": "AUG",
    "description": "14 | AUG | Märkte | Kunst- & Genießermarkt | Märkte | Uhldingen-Mühlhofen | 14.08.2026 - 16.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Abendflohmarkt",
    "date": "AUG",
    "description": "15 | AUG | Märkte | Abendflohmarkt | Märkte | Ravensburg | 15.08.2026 | Details",
    "place": "Ravensburg",
    "lat": 47.7811,
    "lng": 9.6136
  },
  {
    "title": "Vespermarkt",
    "date": "AUG",
    "description": "15 | AUG | Märkte | Vespermarkt | Märkte | Zwiefalten | 15.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Bartholomäusmarkt",
    "date": "AUG",
    "description": "24 | AUG | Märkte | Bartholomäusmarkt | Märkte | Eppingen | 24.08.2026 | Details",
    "place": "Eppingen",
    "lat": 49.1365,
    "lng": 8.9123
  },
  {
    "title": "Internationaler Töpfermarkt",
    "date": "AUG",
    "description": "28 | AUG | Märkte | Internationaler Töpfermarkt | Märkte | Überlingen | 28.08.2026 - 30.08.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Französischer Markt",
    "date": "SEP",
    "description": "03 | SEP | Märkte | Französischer Markt | Märkte | Neckargemünd | 03.09.2026 - 05.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Krämermarkt",
    "date": "SEP",
    "description": "03 | SEP | Märkte | Krämermarkt | Märkte | Dettingen an der Erms | 03.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Mittelaltermarkt",
    "date": "SEP",
    "description": "04 | SEP | Märkte | Mittelaltermarkt | Märkte | Furtwangen | 04.09.2026 - 06.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Fürstliche Gartentage",
    "date": "SEP",
    "description": "04 | SEP | Märkte | Fürstliche Gartentage | Märkte | Langenburg | 04.09.2026 - 06.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "date": "SEP",
    "description": "05 | SEP | Märkte | Töpfermarkt Neu-Ulm | Märkte | Ulm/Neu-Ulm | 05.09.2026 - 06.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "date": "SEP",
    "description": "12 | SEP | Märkte | ES funkelt – Lichtermarkt & Nachtflohmarkt | Märkte | Esslingen am Neckar | 12.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt",
    "date": "SEP",
    "description": "13 | SEP | Märkte | Naturparkmarkt | Märkte | Pfedelbach | 13.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "date": "SEP",
    "description": "13 | SEP | Märkte | Naturparkmarkt Pfedelbach | Märkte | Pfedelbach | 13.09.2026, 11:00 - 17:00 Uhr | Die Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "date": "SEP",
    "description": "13 | SEP | Märkte | Naturpark-Markt Egenhausen | Märkte | Egenhausen | 13.09.2026, 11:00 - 17:00 Uhr | Naturpark-Markt Egenhausen am 13.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt",
    "date": "SEP",
    "description": "15 | SEP | Märkte | Herbstmarkt | Märkte | Güglingen | 15.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Mittelaltermarkt",
    "date": "SEP",
    "description": "18 | SEP | Märkte | Mittelaltermarkt | Märkte | Sigmaringen | 18.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Historischer Markt",
    "date": "SEP",
    "description": "19 | SEP | Märkte | Historischer Markt | Märkte | Heubach | 19.09.2026 - 20.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "date": "SEP",
    "description": "19 | SEP | Märkte | Herbstflohmarkt mit Krämermarkt | Märkte | Bad Saulgau | 19.09.2026 | Details",
    "place": "Bad Saulgau",
    "lat": 48.0167,
    "lng": 9.5
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "date": "SEP",
    "description": "20 | SEP | Märkte | Wildensteiner Jahrmarkt | Märkte | Leibertingen | 20.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "date": "SEP",
    "description": "20 | SEP | Märkte | Regionalmarkt Rothauser Land | Märkte | Ühlingen-Birkendorf | 20.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "date": "SEP",
    "description": "20 | SEP | Märkte | Regionalmarkt Rothauser Land | Märkte | Grafenhausen | 20.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Holz- und Bauernmarkt",
    "date": "SEP",
    "description": "20 | SEP | Märkte | Holz- und Bauernmarkt | Märkte | Welzheim | 20.09.2026, 11 - 18 Uhr | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Matthäusmarkt",
    "date": "SEP",
    "description": "21 | SEP | Märkte | Matthäusmarkt | Märkte | Trochtelfingen | 21.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt Harthausen",
    "date": "SEP",
    "description": "21 | SEP | Märkte | Herbstmarkt Harthausen | Märkte | Filderstadt | 21.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "date": "SEP",
    "description": "22 | SEP | Märkte | Herbstmarkt Plattenhardt | Märkte | Filderstadt | 22.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt",
    "date": "SEP",
    "description": "26 | SEP | Märkte | Herbstmarkt | Märkte | Schutterwald | 26.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Trossinger Kilbemarkt",
    "date": "SEP",
    "description": "26 | SEP | Märkte | Trossinger Kilbemarkt | Märkte | Trossingen | 26.09.2026 - 27.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Großer Flohmarkt",
    "date": "SEP",
    "description": "26 | SEP | Märkte | Großer Flohmarkt | Märkte | Munderkingen | 26.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt",
    "date": "SEP",
    "description": "27 | SEP | Märkte | Herbstmarkt | Märkte | Neckargemünd | 27.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt und verkaufsoffenem Sonntag",
    "date": "SEP",
    "description": "27 | SEP | Märkte | Herbstmarkt und verkaufsoffenem Sonntag | Märkte | Südwärts | 27.09.2026, 12:00 - 17:00 Uhr | Live MusikEssen & Trinken durch Vereine und FoodtrucksAttraktionen & GewinnspieleKinderprogrammShoppen im geöffneten Einzelhandel Weitere Aktionen in den teilnehmenden Geschäften | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "date": "SEP",
    "description": "27 | SEP | Märkte | „Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag | Märkte | Müllheim | 27.09.2026, 12:00 - 17:00 Uhr | Am Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "date": "SEP",
    "description": "27 | SEP | Märkte | Cittaslow – Tag mit verkaufsoffenem Sonntag | Märkte | Bad Schussenried | 27.09.2026, 12:00 - 17:00 Uhr | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "date": "SEP",
    "description": "30 | SEP | Märkte | Herbstmarkt Sielmingen | Märkte | Filderstadt | 30.09.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunsthandwerkermarkt",
    "date": "OCT",
    "description": "03 | OCT | Märkte | Kunsthandwerkermarkt | Märkte | Kandern | 03.10.2026 - 04.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Biosphärenmarkt",
    "date": "OCT",
    "description": "03 | OCT | Märkte | Biosphärenmarkt | Märkte | Münsingen | 03.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Drachenfest",
    "date": "OCT",
    "description": "03 | OCT | Märkte | Drachenfest | Märkte | Ostfildern | 03.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "date": "OCT",
    "description": "03 | OCT | Märkte | Naturpark-Markt Ebhausen-Rotfelden | Märkte | Ebhausen-Rotfelden | 03.10.2026, 11:00 - 17:00 Uhr | Naturpark-Markt Ebhausen-Rotfelden 03.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt",
    "date": "OCT",
    "description": "04 | OCT | Märkte | Naturparkmarkt | Märkte | Murrhardt | 04.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "date": "OCT",
    "description": "04 | OCT | Märkte | Ulmer Marktsonntag & verkaufsoffener Sonntag | Märkte | Ulm | 04.10.2026, 13:00 - 18:00 Uhr | Bummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "date": "OCT",
    "description": "04 | OCT | Märkte | Flanieren, Genießen, Einkaufen | Märkte | Ehingen (Donau) | 04.10.2026, 13:00 - 18:00 Uhr | Am 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein. | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "date": "OCT",
    "description": "04 | OCT | Märkte | Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen | Märkte | Meckenbeuren | 04.10.2026, 12:00 - 17:00 Uhr | Am Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt Villingen",
    "date": "OCT",
    "description": "08 | OCT | Märkte | Herbstmarkt Villingen | Märkte | Villingen-Schwenningen | 08.10.2026 - 11.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "date": "OCT",
    "description": "09 | OCT | Märkte | Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden) | Märkte | Laufenburg (Baden) | 09.10.2026 - 11.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Krämermarkt",
    "date": "OCT",
    "description": "09 | OCT | Märkte | Krämermarkt | Märkte | Gechingen | 09.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "date": "OCT",
    "description": "10 | OCT | Märkte | Isnyer Schmalzmarkt | Märkte | Isny im Allgäu | 10.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "date": "OCT",
    "description": "11 | OCT | Märkte | Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe | Märkte | Schramberg | 11.10.2026, 11:00 - 18:00 Uhr | Am 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten… | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "date": "OCT",
    "description": "11 | OCT | Märkte | Jazz & Einkauf mit SonntagsShopping | Märkte | Heilbronn | 11.10.2026, 13:00 - 18:00 Uhr | Jazz in der City und entspanntes Shopping in der gesamten Stadt. | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt",
    "date": "OCT",
    "description": "12 | OCT | Märkte | Herbstmarkt | Märkte | Schönau im Schwarzwald | 12.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Gallusmarkt",
    "date": "OCT",
    "description": "14 | OCT | Märkte | Gallusmarkt | Märkte | Wolfach | 14.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Gallenmarkt",
    "date": "OCT",
    "description": "15 | OCT | Märkte | Gallenmarkt | Märkte | Burladingen | 15.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Altstadt-Antikmarkt",
    "date": "OCT",
    "description": "17 | OCT | Märkte | Altstadt-Antikmarkt | Märkte | Gengenbach | 17.10.2026 - 18.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Jahrmarkt Odenheim",
    "date": "OCT",
    "description": "17 | OCT | Märkte | Jahrmarkt Odenheim | Märkte | Östringen | 17.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Alemannischer Brotmarkt",
    "date": "OCT",
    "description": "17 | OCT | Märkte | Alemannischer Brotmarkt | Märkte | Endingen | 17.10.2026 | Details",
    "place": "Endingen",
    "lat": 48.1422,
    "lng": 7.7
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "date": "OCT",
    "description": "18 | OCT | Märkte | Verkaufsoffener Sonntag mit Herbstmarkt | Märkte | Ettlingen | 18.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "date": "OCT",
    "description": "18 | OCT | Märkte | Überlinger Herbst mit Verkaufsoffenem Sonntag | Märkte | Überlingen am Bodensee | 18.10.2026, 10:00 - 18:00 Uhr | Erneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "date": "OCT",
    "description": "18 | OCT | Märkte | Verkaufsoffener Sonntag in Pfullendorf | Märkte | Pfullendorf | 18.10.2026, 13:00 - 18:00 Uhr | Ob in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten. | Details",
    "place": "Pfullendorf",
    "lat": 47.9267,
    "lng": 9.2578
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "date": "OCT",
    "description": "18 | OCT | Märkte | Verkaufsoffener Sonntag in der Innenstadt | Märkte | Donaueschingen | 18.10.2026, 13:00 - 18:00 Uhr | in der Donaueschinger Innenstadt. | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Herbstmarkt",
    "date": "OCT",
    "description": "19 | OCT | Märkte | Herbstmarkt | Märkte | Schönau im Schwarzwald | 19.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "date": "OCT",
    "description": "25 | OCT | Märkte | Kunsthandwerkermarkt / Kunst in den Schaufenstern | Märkte | Nürtingen | 25.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "date": "OCT",
    "description": "25 | OCT | Märkte | Naturparkmarkt und Kerwe | Märkte | Kürnbach | 25.10.2026, 11 - 18 Uhr | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kirchweihmarkt",
    "date": "OCT",
    "description": "26 | OCT | Märkte | Kirchweihmarkt | Märkte | Laichingen | 26.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "date": "OCT",
    "description": "30 | OCT | Märkte | Traditioneller Jahrmarkt | Märkte | Herbolzheim | 30.10.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "25. Martinimarkt",
    "date": "NOV",
    "description": "07 | NOV | Märkte | 25. Martinimarkt | Märkte | Eschenbach | 07.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Esslinger Herbst",
    "date": "NOV",
    "description": "08 | NOV | Märkte | Esslinger Herbst | Märkte | Esslingen am Neckar | 08.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Bauernmarkt",
    "date": "NOV",
    "description": "08 | NOV | Märkte | Bauernmarkt | Märkte | Wertheim | 08.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Martinimarkt",
    "date": "NOV",
    "description": "09 | NOV | Märkte | Martinimarkt | Märkte | Sigmaringen | 09.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "date": "NOV",
    "description": "10 | NOV | Märkte | 64. Modelleisenbahn-Börse | Märkte | Gerlingen | 10.11.2026, 11 - 16 Uhr | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Martinimarkt",
    "date": "NOV",
    "description": "12 | NOV | Märkte | Martinimarkt | Märkte | Bad Wurzach | 12.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Martinimarkt",
    "date": "NOV",
    "description": "14 | NOV | Märkte | Martinimarkt | Märkte | Mühlacker | 14.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Wintermarkt",
    "date": "NOV",
    "description": "14 | NOV | Märkte | Wintermarkt | Märkte | Wehingen | 14.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Esslinger Herbst",
    "date": "NOV",
    "description": "15 | NOV | Märkte | Esslinger Herbst | Märkte | Esslingen am Neckar | 15.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Martinimarkt",
    "date": "NOV",
    "description": "16 | NOV | Märkte | Martinimarkt | Märkte | Sigmaringen | 16.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Martinimarkt",
    "date": "NOV",
    "description": "18 | NOV | Märkte | Martinimarkt | Märkte | Mengen | 18.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Spätjahrmarkt",
    "date": "NOV",
    "description": "24 | NOV | Märkte | Spätjahrmarkt | Märkte | Kandern | 24.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Martinimarkt",
    "date": "NOV",
    "description": "27 | NOV | Märkte | Martinimarkt | Märkte | Hornberg | 27.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kreativmarkt",
    "date": "NOV",
    "description": "28 | NOV | Märkte | Kreativmarkt | Märkte | Rielasingen-Worblingen | 28.11.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "date": "DEC",
    "description": "01 | DEC | Märkte | Kalter Markt / Chalte Märt | Märkte | Schopfheim | 01.12.2026 - 02.12.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "“Kloosemärt”",
    "date": "DEC",
    "description": "01 | DEC | Märkte | “Kloosemärt” | Märkte | Hüfingen | 01.12.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Spätjahrmarkt",
    "date": "DEC",
    "description": "01 | DEC | Märkte | Spätjahrmarkt | Märkte | Kandern | 01.12.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kathreinenmarkt",
    "date": "DEC",
    "description": "03 | DEC | Märkte | Kathreinenmarkt | Märkte | Munderkingen | 03.12.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "date": "DEC",
    "description": "08 | DEC | Märkte | Kalter Markt / Chalte Märt | Märkte | Schopfheim | 08.12.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Nikolausmarkt",
    "date": "DEC",
    "description": "14 | DEC | Märkte | Nikolausmarkt | Märkte | Pfullendorf | 14.12.2026 | Details",
    "place": "Pfullendorf",
    "lat": 47.9267,
    "lng": 9.2578
  },
  {
    "title": "Wintermarkt Schluchsee",
    "date": "DEC",
    "description": "28 | DEC | Märkte | Wintermarkt Schluchsee | Märkte | Schluchsee | 28.12.2026 - 30.12.2026 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Märzenmarkt",
    "date": "MAR",
    "description": "08 | MAR | Märkte | Märzenmarkt | Märkte | Kirchheim unter Teck | 08.03.2027 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "date": "APR",
    "description": "11 | APR | Märkte | Verkaufsoffener Sonntag “See(h)reise” | Märkte | Radolfzell am Bodensee | 11.04.2027, 12:30 - 17:30 Uhr | Der erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\". | Details",
    "place": "Radolfzell am Bodensee",
    "lat": 47.7419,
    "lng": 8.97
  },
  {
    "title": "Maimarkt",
    "date": "MAY",
    "description": "01 | MAY | Märkte | Maimarkt | Märkte | Lonsee | 01.05.2027 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  },
  {
    "title": "Flohmarkt",
    "date": "MAY",
    "description": "08 | MAY | Märkte | Flohmarkt | Märkte | Emmendingen | 08.05.2027 | Details",
    "place": "Dettingen Teck",
    "lat": 48.6167,
    "lng": 9.45
  }
];