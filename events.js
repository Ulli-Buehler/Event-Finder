const EVENTS = [
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Ludwigsburg",
    "date": "MAY",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.8953937,
    "lng": 9.1895147
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Schwäbisch Hall",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.1124305,
    "lng": 9.7371246
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Tübingen",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.5203263,
    "lng": 9.053596
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Frickenhausen",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.5935116,
    "lng": 9.3603596
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 48.0158071,
    "lng": 9.5010309
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Weilheim an der Teck",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 48.6153949,
    "lng": 9.5383156
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Radolfzell am Bodensee",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 47.7372802,
    "lng": 8.9702755
  },
  {
    "title": "Maimarkt",
    "place": "Eppingen",
    "date": "MAY",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 49.1369473,
    "lng": 8.90956
  },
  {
    "title": "GardenLife",
    "place": "Reutlingen",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.4919508,
    "lng": 9.2114144
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Sinsheim",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 49.2531222,
    "lng": 8.8769914
  },
  {
    "title": "Maimarkt",
    "place": "Göppingen",
    "date": "MAY",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 48.7031377,
    "lng": 9.6541116
  },
  {
    "title": "Flohmarkt",
    "place": "Ravensburg",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 47.7811014,
    "lng": 9.612468
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Endingen",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 48.1411284,
    "lng": 7.703099
  },
  {
    "title": "Muttertagsmarkt",
    "place": "Hausach",
    "date": "MAY",
    "description": "17\nMAY\nMärkte\nMuttertagsmarkt\n\nMärkte | Hausach\n\n 17.05.2026\n\nDetails",
    "lat": 48.2836305,
    "lng": 8.174972
  },
  {
    "title": "Pfingstmarkt",
    "place": "Wolfach",
    "date": "MAY",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.2985845,
    "lng": 8.222608
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "place": "Dischingen",
    "date": "MAY",
    "description": "23\nMAY\nMärkte\nMittelaltermarkt mit Ritterturnier und Feuershow\n\nMärkte | Dischingen\n\n 23.05.2026 - 25.05.2026\n\nDetails",
    "lat": 48.6986742,
    "lng": 10.3570233
  },
  {
    "title": "Naturparkmarkt",
    "place": "Löwenstein",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt\n\nMärkte | Löwenstein\n\n 24.05.2026\n\nDetails",
    "lat": 49.0953123,
    "lng": 9.3809489
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "place": "Löwenstein",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt Löwenstein\n\nMärkte | Löwenstein\n\n 24.05.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 49.0953123,
    "lng": 9.3809489
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "place": "Trossingen",
    "date": "MAY",
    "description": "25\nMAY\nMärkte\nTrossinger Pfingstmarkt\n\nMärkte | Trossingen\n\n 25.05.2026\n\nDetails",
    "lat": 48.07506,
    "lng": 8.6362987
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "place": "Vogtsburg im Kaiserstuhl",
    "date": "MAY",
    "description": "30\nMAY\nMärkte\nKUNST.MARKT.GENUSS. mit Vogtsburg-Markt\n\nMärkte | Vogtsburg im Kaiserstuhl\n\n 30.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.0826236,
    "lng": 7.6236716
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "place": "Ettlingen",
    "date": "MAY",
    "description": "31\nMAY\nMärkte\nNaturpark-Markt Ettlingen\n\nMärkte | Ettlingen\n\n 31.05.2026, 11:00 - 17:00 Uhr\n\nFrische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker…\n\nDetails",
    "lat": 48.9414188,
    "lng": 8.4076347
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "place": "Waiblingen",
    "date": "JUN",
    "description": "06\nJUN\nMärkte\nRosen-, Garten- & Kunstmarkt\n\nMärkte | Waiblingen\n\n 06.06.2026 - 07.06.2026\n\nDetails",
    "lat": 48.8325659,
    "lng": 9.3163822
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Reutlingen",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 48.4919508,
    "lng": 9.2114144
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "place": "Oberndorf am Neckar",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nNaturpark-Markt Oberndorf a. N.\n\nMärkte | Oberndorf am Neckar\n\n 07.06.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt am 7. Juni 2026\n\nDetails",
    "lat": 48.2908613,
    "lng": 8.5711222
  },
  {
    "title": "Krämermarkt",
    "place": "Dettingen an der Erms",
    "date": "JUN",
    "description": "11\nJUN\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 11.06.2026\n\nDetails",
    "lat": 48.5289138,
    "lng": 9.346093
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "place": "Ulm/Neu-Ulm",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nTag der Rose & Antikmarkt\n\nMärkte | Ulm/Neu-Ulm\n\n 13.06.2026\n\nDetails",
    "lat": 48.3901,
    "lng": 9.98614
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Eppingen",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 49.1369473,
    "lng": 8.90956
  },
  {
    "title": "Kunstmarkt",
    "place": "Sipplingen",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nKunstmarkt\n\nMärkte | Sipplingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 47.7966525,
    "lng": 9.0967997
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "place": "Rosenfeld",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nUrsulamarkt mit Flohmarkt\n\nMärkte | Rosenfeld\n\n 13.06.2026\n\nDetails",
    "lat": 48.2863842,
    "lng": 8.7232519
  },
  {
    "title": "Naturparkmarkt",
    "place": "Calw",
    "date": "JUN",
    "description": "14\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Calw\n\n 14.06.2026\n\nDetails",
    "lat": 48.7142691,
    "lng": 8.7397624
  },
  {
    "title": "Häussler Backtage",
    "place": "Altheim",
    "date": "JUN",
    "description": "18\nJUN\nMärkte\nHäussler Backtage\n\nMärkte | Altheim\n\n 18.06.2026 - 20.06.2026\n\nDetails",
    "lat": 48.5808015,
    "lng": 10.0271338
  },
  {
    "title": "Büchermarkt",
    "place": "Kirchberg an der Jagst",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nBüchermarkt\n\nMärkte | Kirchberg an der Jagst\n\n 20.06.2026\n\nDetails",
    "lat": 49.2044838,
    "lng": 9.9817296
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "place": "Sindelfingen",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nDarmsheimer Töpfermarkt\n\nMärkte | Sindelfingen\n\n 20.06.2026 - 21.06.2026\n\nDetails",
    "lat": 48.7084162,
    "lng": 9.0035455
  },
  {
    "title": "Naturparkmarkt",
    "place": "Ettlingen",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Ettlingen\n\n 21.06.2026\n\nDetails",
    "lat": 48.9414188,
    "lng": 8.4076347
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "place": "Plüderhausen",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt Plüderhausen\n\nMärkte | Plüderhausen\n\n 21.06.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.7937467,
    "lng": 9.6025045
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Radolfzell am Bodensee",
    "date": "JUN",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 47.7372802,
    "lng": 8.9702755
  },
  {
    "title": "Peter und Paul Markt",
    "place": "Schönau im Schwarzwald",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\nPeter und Paul Markt\n\nMärkte | Schönau im Schwarzwald\n\n 29.06.2026\n\nDetails",
    "lat": 47.7861792,
    "lng": 7.8933977
  },
  {
    "title": "635. Zunftmarkt",
    "place": "Bad Wimpfen",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\n635. Zunftmarkt\n\nMärkte | Bad Wimpfen\n\n 29.06.2026 - 30.08.2026\n\nDetails",
    "lat": 49.2303439,
    "lng": 9.1621599
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "place": "Stuttgart",
    "date": "JUL",
    "description": "02\nJUL\nMärkte\nHamburger Fischmarkt in Stuttgart\n\nMärkte | Stuttgart\n\n 02.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.7784485,
    "lng": 9.1800132
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Tübingen",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 48.5203263,
    "lng": 9.053596
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "place": "Villingen-Schwenningen",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nSüddeutscher Kunsthandwerkermarkt\n\nMärkte | Villingen-Schwenningen\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.063152,
    "lng": 8.4929618
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "place": "Immenstaad am Bodensee",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nTöpfer- und Kunstmarkt\n\nMärkte | Immenstaad am Bodensee\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 47.6658914,
    "lng": 9.3676364
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Ravensburg",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 47.7811014,
    "lng": 9.612468
  },
  {
    "title": "Life’s finest",
    "place": "Bretten",
    "date": "JUL",
    "description": "09\nJUL\nMärkte\nLife’s finest\n\nMärkte | Bretten\n\n 09.07.2026 - 12.07.2026\n\nDetails",
    "lat": 49.0366265,
    "lng": 8.7068077
  },
  {
    "title": "JAAmarkt",
    "place": "Aalen",
    "date": "JUL",
    "description": "11\nJUL\nMärkte\nJAAmarkt\n\nMärkte | Aalen\n\n 11.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.8375607,
    "lng": 10.0929593
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Kehl",
    "date": "JUL",
    "description": "14\nJUL\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Kehl\n\n 14.07.2026\n\nDetails",
    "lat": 48.5733977,
    "lng": 7.8114002
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "place": "Pforzheim",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nPforzheimer Gruschtelmarkt\n\nMärkte | Pforzheim\n\n 17.07.2026 - 18.07.2026\n\nDetails",
    "lat": 48.890934,
    "lng": 8.7025509
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "place": "Isny im Allgäu",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nIsnyer Feierabendmärkte 2026\n\nMärkte | Isny im Allgäu\n\n 17.07.2026, 16:00 - 21:00 Uhr\n\nDie Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. \n\nDetails",
    "lat": 47.7031269,
    "lng": 10.0697593
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "place": "Wolfegg",
    "date": "JUL",
    "description": "18\nJUL\nMärkte\n“Sommerfrische im Fürstlichen Hofgarten”\n\nMärkte | Wolfegg\n\n 18.07.2026\n\nDetails",
    "lat": 47.8294848,
    "lng": 9.7893371
  },
  {
    "title": "Naturparkmarkt",
    "place": "Fichtenberg",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt\n\nMärkte | Fichtenberg\n\n 19.07.2026\n\nDetails",
    "lat": 48.986167,
    "lng": 9.7122996
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "place": "Blaufelden",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nKunst-Handwerker-Markt\n\nMärkte | Blaufelden\n\n 19.07.2026\n\nDetails",
    "lat": 49.2970043,
    "lng": 9.9737329
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "place": "Fichtenberg",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt Fichtenberg\n\nMärkte | Fichtenberg\n\n 19.07.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.986167,
    "lng": 9.7122996
  },
  {
    "title": "Jakobimarkt",
    "place": "Nellingen",
    "date": "JUL",
    "description": "25\nJUL\nMärkte\nJakobimarkt\n\nMärkte | Nellingen\n\n 25.07.2026\n\nDetails",
    "lat": 48.542181,
    "lng": 9.7911953
  },
  {
    "title": "Flohmarkt",
    "place": "Emmendingen",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 01.08.2026\n\nDetails",
    "lat": 48.1206565,
    "lng": 7.850993
  },
  {
    "title": "Isnyer Töpfermarkt",
    "place": "Isny im Allgäu",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nIsnyer Töpfermarkt\n\nMärkte | Isny im Allgäu\n\n 01.08.2026 - 02.08.2026\n\nDetails",
    "lat": 47.7031269,
    "lng": 10.0697593
  },
  {
    "title": "Kunstgewerbemarkt",
    "place": "Bietigheim-Bissingen",
    "date": "AUG",
    "description": "02\nAUG\nMärkte\nKunstgewerbemarkt\n\nMärkte | Bietigheim-Bissingen\n\n 02.08.2026\n\nDetails",
    "lat": 48.9493243,
    "lng": 9.1364229
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "place": "Rechberghausen",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\n16. Gartenmarkt “Sommer – Blüten – Träume”\n\nMärkte | Rechberghausen\n\n 08.08.2026 - 09.08.2026\n\nDetails",
    "lat": 48.7304982,
    "lng": 9.6441203
  },
  {
    "title": "Vespermarkt",
    "place": "Zwiefalten",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 08.08.2026\n\nDetails",
    "lat": 48.2331643,
    "lng": 9.4614966
  },
  {
    "title": "Kräutermarkt",
    "place": "Mosbach",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nKräutermarkt\n\nMärkte | Mosbach\n\n 08.08.2026\n\nDetails",
    "lat": 49.3521085,
    "lng": 9.1460205
  },
  {
    "title": "Kunst- & Genießermarkt",
    "place": "Uhldingen-Mühlhofen",
    "date": "AUG",
    "description": "14\nAUG\nMärkte\nKunst- & Genießermarkt\n\nMärkte | Uhldingen-Mühlhofen\n\n 14.08.2026 - 16.08.2026\n\nDetails",
    "lat": 47.7348858,
    "lng": 9.2400277
  },
  {
    "title": "Abendflohmarkt",
    "place": "Ravensburg",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 47.7811014,
    "lng": 9.612468
  },
  {
    "title": "Vespermarkt",
    "place": "Zwiefalten",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 15.08.2026\n\nDetails",
    "lat": 48.2331643,
    "lng": 9.4614966
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Eppingen",
    "date": "AUG",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 49.1369473,
    "lng": 8.90956
  },
  {
    "title": "Internationaler Töpfermarkt",
    "place": "Überlingen",
    "date": "AUG",
    "description": "28\nAUG\nMärkte\nInternationaler Töpfermarkt\n\nMärkte | Überlingen\n\n 28.08.2026 - 30.08.2026\n\nDetails",
    "lat": 47.7664456,
    "lng": 9.1605106
  },
  {
    "title": "Französischer Markt",
    "place": "Neckargemünd",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nFranzösischer Markt\n\nMärkte | Neckargemünd\n\n 03.09.2026 - 05.09.2026\n\nDetails",
    "lat": 49.3954054,
    "lng": 8.7965893
  },
  {
    "title": "Krämermarkt",
    "place": "Dettingen an der Erms",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 03.09.2026\n\nDetails",
    "lat": 48.5289138,
    "lng": 9.346093
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Furtwangen",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Furtwangen\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.0512198,
    "lng": 8.2073776
  },
  {
    "title": "Fürstliche Gartentage",
    "place": "Langenburg",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nFürstliche Gartentage\n\nMärkte | Langenburg\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 49.2531928,
    "lng": 9.8477788
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "place": "Ulm/Neu-Ulm",
    "date": "SEP",
    "description": "05\nSEP\nMärkte\nTöpfermarkt Neu-Ulm\n\nMärkte | Ulm/Neu-Ulm\n\n 05.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.3901,
    "lng": 9.98614
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "place": "Esslingen am Neckar",
    "date": "SEP",
    "description": "12\nSEP\nMärkte\nES funkelt – Lichtermarkt & Nachtflohmarkt\n\nMärkte | Esslingen am Neckar\n\n 12.09.2026\n\nDetails",
    "lat": 48.7427584,
    "lng": 9.3071685
  },
  {
    "title": "Naturparkmarkt",
    "place": "Pfedelbach",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt\n\nMärkte | Pfedelbach\n\n 13.09.2026\n\nDetails",
    "lat": 49.1781,
    "lng": 9.505
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "place": "Pfedelbach",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt Pfedelbach\n\nMärkte | Pfedelbach\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 49.1781,
    "lng": 9.505
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "place": "Egenhausen",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturpark-Markt Egenhausen\n\nMärkte | Egenhausen\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Egenhausen am 13.09.2026\n\nDetails",
    "lat": 48.5654316,
    "lng": 8.6176923
  },
  {
    "title": "Herbstmarkt",
    "place": "Güglingen",
    "date": "SEP",
    "description": "15\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Güglingen\n\n 15.09.2026\n\nDetails",
    "lat": 49.0668087,
    "lng": 8.9999838
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Sigmaringen",
    "date": "SEP",
    "description": "18\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Sigmaringen\n\n 18.09.2026\n\nDetails",
    "lat": 48.0869139,
    "lng": 9.2165039
  },
  {
    "title": "Historischer Markt",
    "place": "Heubach",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHistorischer Markt\n\nMärkte | Heubach\n\n 19.09.2026 - 20.09.2026\n\nDetails",
    "lat": 48.7888674,
    "lng": 9.9345819
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 48.0158071,
    "lng": 9.5010309
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "place": "Leibertingen",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nWildensteiner Jahrmarkt\n\nMärkte | Leibertingen\n\n 20.09.2026\n\nDetails",
    "lat": 48.0438891,
    "lng": 9.0125683
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Ühlingen-Birkendorf",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Ühlingen-Birkendorf\n\n 20.09.2026\n\nDetails",
    "lat": 47.7252375,
    "lng": 8.301544
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Grafenhausen",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Grafenhausen\n\n 20.09.2026\n\nDetails",
    "lat": 47.7744797,
    "lng": 8.2606207
  },
  {
    "title": "Holz- und Bauernmarkt",
    "place": "Welzheim",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nHolz- und Bauernmarkt\n\nMärkte | Welzheim\n\n 20.09.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.8749241,
    "lng": 9.6347406
  },
  {
    "title": "Matthäusmarkt",
    "place": "Trochtelfingen",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nMatthäusmarkt\n\nMärkte | Trochtelfingen\n\n 21.09.2026\n\nDetails",
    "lat": 48.307755,
    "lng": 9.2448375
  },
  {
    "title": "Herbstmarkt Harthausen",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nHerbstmarkt Harthausen\n\nMärkte | Filderstadt\n\n 21.09.2026\n\nDetails",
    "lat": 48.6664,
    "lng": 9.2199647
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "22\nSEP\nMärkte\nHerbstmarkt Plattenhardt\n\nMärkte | Filderstadt\n\n 22.09.2026\n\nDetails",
    "lat": 48.6664,
    "lng": 9.2199647
  },
  {
    "title": "Herbstmarkt",
    "place": "Schutterwald",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Schutterwald\n\n 26.09.2026\n\nDetails",
    "lat": 48.4563397,
    "lng": 7.8840188
  },
  {
    "title": "Trossinger Kilbemarkt",
    "place": "Trossingen",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nTrossinger Kilbemarkt\n\nMärkte | Trossingen\n\n 26.09.2026 - 27.09.2026\n\nDetails",
    "lat": 48.07506,
    "lng": 8.6362987
  },
  {
    "title": "Großer Flohmarkt",
    "place": "Munderkingen",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nGroßer Flohmarkt\n\nMärkte | Munderkingen\n\n 26.09.2026\n\nDetails",
    "lat": 48.2358225,
    "lng": 9.6441788
  },
  {
    "title": "Herbstmarkt",
    "place": "Neckargemünd",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Neckargemünd\n\n 27.09.2026\n\nDetails",
    "lat": 49.3954054,
    "lng": 8.7965893
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "place": "Müllheim",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\n„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag\n\nMärkte | Müllheim\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40…\n\nDetails",
    "lat": 47.810102,
    "lng": 7.5995606
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "place": "Bad Schussenried",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\nCittaslow – Tag mit verkaufsoffenem Sonntag\n\nMärkte | Bad Schussenried\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nDetails",
    "lat": 48.0086558,
    "lng": 9.6541299
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "30\nSEP\nMärkte\nHerbstmarkt Sielmingen\n\nMärkte | Filderstadt\n\n 30.09.2026\n\nDetails",
    "lat": 48.6664,
    "lng": 9.2199647
  },
  {
    "title": "Kunsthandwerkermarkt",
    "place": "Kandern",
    "date": "OCT",
    "description": "03\nOCT\nMärkte\nKunsthandwerkermarkt\n\nMärkte | Kandern\n\n 03.10.2026 - 04.10.2026\n\nDetails",
    "lat": 47.714697,
    "lng": 7.6610865
  },
  {
    "title": "Biosphärenmarkt",
    "place": "Münsingen",
    "date": "OCT",
    "description": "03\nOCT\nMärkte\nBiosphärenmarkt\n\nMärkte | Münsingen\n\n 03.10.2026\n\nDetails",
    "lat": 48.4128592,
    "lng": 9.4947894
  },
  {
    "title": "Drachenfest",
    "place": "Ostfildern",
    "date": "OCT",
    "description": "03\nOCT\nMärkte\nDrachenfest\n\nMärkte | Ostfildern\n\n 03.10.2026\n\nDetails",
    "lat": 48.7178603,
    "lng": 9.2630693
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "place": "Ebhausen-Rotfelden",
    "date": "OCT",
    "description": "03\nOCT\nMärkte\nNaturpark-Markt Ebhausen-Rotfelden\n\nMärkte | Ebhausen-Rotfelden\n\n 03.10.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Ebhausen-Rotfelden 03.10.2026\n\nDetails",
    "lat": 48.6064129,
    "lng": 8.6983224
  },
  {
    "title": "Naturparkmarkt",
    "place": "Murrhardt",
    "date": "OCT",
    "description": "04\nOCT\nMärkte\nNaturparkmarkt\n\nMärkte | Murrhardt\n\n 04.10.2026\n\nDetails",
    "lat": 48.9797657,
    "lng": 9.5794661
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "place": "Ulm",
    "date": "OCT",
    "description": "04\nOCT\nMärkte\nUlmer Marktsonntag & verkaufsoffener Sonntag\n\nMärkte | Ulm\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nBummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer…\n\nDetails",
    "lat": 48.3984968,
    "lng": 9.9912458
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "place": "Ehingen (Donau)",
    "date": "OCT",
    "description": "04\nOCT\nMärkte\nFlanieren, Genießen, Einkaufen\n\nMärkte | Ehingen (Donau)\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nAm 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein.\n\nDetails",
    "lat": 48.2828519,
    "lng": 9.7262175
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "place": "Meckenbeuren",
    "date": "OCT",
    "description": "04\nOCT\nMärkte\nVerkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen\n\nMärkte | Meckenbeuren\n\n 04.10.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte…\n\nDetails",
    "lat": 47.6999205,
    "lng": 9.560628
  },
  {
    "title": "Herbstmarkt Villingen",
    "place": "Villingen-Schwenningen",
    "date": "OCT",
    "description": "08\nOCT\nMärkte\nHerbstmarkt Villingen\n\nMärkte | Villingen-Schwenningen\n\n 08.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.063152,
    "lng": 8.4929618
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "place": "Laufenburg (Baden)",
    "date": "OCT",
    "description": "09\nOCT\nMärkte\nHela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)\n\nMärkte | Laufenburg (Baden)\n\n 09.10.2026 - 11.10.2026\n\nDetails",
    "lat": 47.5671976,
    "lng": 8.0599414
  },
  {
    "title": "Krämermarkt",
    "place": "Gechingen",
    "date": "OCT",
    "description": "09\nOCT\nMärkte\nKrämermarkt\n\nMärkte | Gechingen\n\n 09.10.2026\n\nDetails",
    "lat": 48.6952903,
    "lng": 8.8288715
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "place": "Isny im Allgäu",
    "date": "OCT",
    "description": "10\nOCT\nMärkte\nIsnyer Schmalzmarkt\n\nMärkte | Isny im Allgäu\n\n 10.10.2026\n\nDetails",
    "lat": 47.7031269,
    "lng": 10.0697593
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "place": "Schramberg",
    "date": "OCT",
    "description": "11\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe\n\nMärkte | Schramberg\n\n 11.10.2026, 11:00 - 18:00 Uhr\n\nAm 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten…\n\nDetails",
    "lat": 48.225478,
    "lng": 8.3852168
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "place": "Heilbronn",
    "date": "OCT",
    "description": "11\nOCT\nMärkte\nJazz & Einkauf mit SonntagsShopping\n\nMärkte | Heilbronn\n\n 11.10.2026, 13:00 - 18:00 Uhr\n\nJazz in der City und entspanntes Shopping in der gesamten Stadt. \n\nDetails",
    "lat": 49.142291,
    "lng": 9.218655
  },
  {
    "title": "Herbstmarkt",
    "place": "Schönau im Schwarzwald",
    "date": "OCT",
    "description": "12\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 12.10.2026\n\nDetails",
    "lat": 47.7861792,
    "lng": 7.8933977
  },
  {
    "title": "Gallusmarkt",
    "place": "Wolfach",
    "date": "OCT",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 48.2985845,
    "lng": 8.222608
  },
  {
    "title": "Gallenmarkt",
    "place": "Burladingen",
    "date": "OCT",
    "description": "15\nOCT\nMärkte\nGallenmarkt\n\nMärkte | Burladingen\n\n 15.10.2026\n\nDetails",
    "lat": 48.2892852,
    "lng": 9.1134689
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Gengenbach",
    "date": "OCT",
    "description": "17\nOCT\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Gengenbach\n\n 17.10.2026 - 18.10.2026\n\nDetails",
    "lat": 48.4035425,
    "lng": 8.0153059
  },
  {
    "title": "Jahrmarkt Odenheim",
    "place": "Östringen",
    "date": "OCT",
    "description": "17\nOCT\nMärkte\nJahrmarkt Odenheim\n\nMärkte | Östringen\n\n 17.10.2026\n\nDetails",
    "lat": 49.2187372,
    "lng": 8.7102268
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Endingen",
    "date": "OCT",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.1411284,
    "lng": 7.703099
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "place": "Ettlingen",
    "date": "OCT",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Herbstmarkt\n\nMärkte | Ettlingen\n\n 18.10.2026\n\nDetails",
    "lat": 48.9414188,
    "lng": 8.4076347
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "place": "Überlingen am Bodensee",
    "date": "OCT",
    "description": "18\nOCT\nMärkte\nÜberlinger Herbst mit Verkaufsoffenem Sonntag\n\nMärkte | Überlingen am Bodensee\n\n 18.10.2026, 10:00 - 18:00 Uhr\n\nErneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. \n\nDetails",
    "lat": 47.7664456,
    "lng": 9.1605106
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Pfullendorf",
    "date": "OCT",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 47.9232677,
    "lng": 9.2500203
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "place": "Donaueschingen",
    "date": "OCT",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in der Innenstadt\n\nMärkte | Donaueschingen\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nin der Donaueschinger Innenstadt.\n\nDetails",
    "lat": 47.9534194,
    "lng": 8.4959257
  },
  {
    "title": "Herbstmarkt",
    "place": "Schönau im Schwarzwald",
    "date": "OCT",
    "description": "19\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 19.10.2026\n\nDetails",
    "lat": 47.7861792,
    "lng": 7.8933977
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "place": "Nürtingen",
    "date": "OCT",
    "description": "25\nOCT\nMärkte\nKunsthandwerkermarkt / Kunst in den Schaufenstern\n\nMärkte | Nürtingen\n\n 25.10.2026\n\nDetails",
    "lat": 48.6265854,
    "lng": 9.3365463
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "place": "Kürnbach",
    "date": "OCT",
    "description": "25\nOCT\nMärkte\nNaturparkmarkt und Kerwe\n\nMärkte | Kürnbach\n\n 25.10.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 49.0775127,
    "lng": 8.8456259
  },
  {
    "title": "Kirchweihmarkt",
    "place": "Laichingen",
    "date": "OCT",
    "description": "26\nOCT\nMärkte\nKirchweihmarkt\n\nMärkte | Laichingen\n\n 26.10.2026\n\nDetails",
    "lat": 48.4896773,
    "lng": 9.6861474
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "place": "Herbolzheim",
    "date": "OCT",
    "description": "30\nOCT\nMärkte\nTraditioneller Jahrmarkt\n\nMärkte | Herbolzheim\n\n 30.10.2026\n\nDetails",
    "lat": 48.2212923,
    "lng": 7.7777553
  },
  {
    "title": "25. Martinimarkt",
    "place": "Eschenbach",
    "date": "NOV",
    "description": "07\nNOV\nMärkte\n25. Martinimarkt\n\nMärkte | Eschenbach\n\n 07.11.2026\n\nDetails",
    "lat": 48.6622903,
    "lng": 9.676742
  },
  {
    "title": "Esslinger Herbst",
    "place": "Esslingen am Neckar",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 08.11.2026\n\nDetails",
    "lat": 48.7427584,
    "lng": 9.3071685
  },
  {
    "title": "Bauernmarkt",
    "place": "Wertheim",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nBauernmarkt\n\nMärkte | Wertheim\n\n 08.11.2026\n\nDetails",
    "lat": 49.741955,
    "lng": 9.52596
  },
  {
    "title": "Martinimarkt",
    "place": "Sigmaringen",
    "date": "NOV",
    "description": "09\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 09.11.2026\n\nDetails",
    "lat": 48.0869139,
    "lng": 9.2165039
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "place": "Gerlingen",
    "date": "NOV",
    "description": "10\nNOV\nMärkte\n64. Modelleisenbahn-Börse\n\nMärkte | Gerlingen\n\n 10.11.2026, 11 - 16 Uhr\n\nDetails",
    "lat": 48.7983947,
    "lng": 9.0624386
  },
  {
    "title": "Martinimarkt",
    "place": "Bad Wurzach",
    "date": "NOV",
    "description": "12\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Bad Wurzach\n\n 12.11.2026\n\nDetails",
    "lat": 47.9084031,
    "lng": 9.8966021
  },
  {
    "title": "Martinimarkt",
    "place": "Mühlacker",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mühlacker\n\n 14.11.2026\n\nDetails",
    "lat": 48.9487402,
    "lng": 8.8592103
  },
  {
    "title": "Wintermarkt",
    "place": "Wehingen",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nWintermarkt\n\nMärkte | Wehingen\n\n 14.11.2026\n\nDetails",
    "lat": 48.1484878,
    "lng": 8.7933022
  },
  {
    "title": "Esslinger Herbst",
    "place": "Esslingen am Neckar",
    "date": "NOV",
    "description": "15\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 15.11.2026\n\nDetails",
    "lat": 48.7427584,
    "lng": 9.3071685
  },
  {
    "title": "Martinimarkt",
    "place": "Sigmaringen",
    "date": "NOV",
    "description": "16\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 16.11.2026\n\nDetails",
    "lat": 48.0869139,
    "lng": 9.2165039
  },
  {
    "title": "Martinimarkt",
    "place": "Mengen",
    "date": "NOV",
    "description": "18\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mengen\n\n 18.11.2026\n\nDetails",
    "lat": 48.0498964,
    "lng": 9.3321246
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Kandern",
    "date": "NOV",
    "description": "24\nNOV\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 24.11.2026\n\nDetails",
    "lat": 47.714697,
    "lng": 7.6610865
  },
  {
    "title": "Martinimarkt",
    "place": "Hornberg",
    "date": "NOV",
    "description": "27\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Hornberg\n\n 27.11.2026\n\nDetails",
    "lat": 48.2128411,
    "lng": 8.2316356
  },
  {
    "title": "Kreativmarkt",
    "place": "Rielasingen-Worblingen",
    "date": "NOV",
    "description": "28\nNOV\nMärkte\nKreativmarkt\n\nMärkte | Rielasingen-Worblingen\n\n 28.11.2026\n\nDetails",
    "lat": 47.729588,
    "lng": 8.8453483
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Schopfheim",
    "date": "",
    "description": "01\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 01.12.2026 - 02.12.2026\n\nDetails",
    "lat": 47.6500525,
    "lng": 7.8216997
  },
  {
    "title": "“Kloosemärt”",
    "place": "Hüfingen",
    "date": "",
    "description": "01\nDEC\nMärkte\n“Kloosemärt”\n\nMärkte | Hüfingen\n\n 01.12.2026\n\nDetails",
    "lat": 47.9269484,
    "lng": 8.4892187
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Kandern",
    "date": "",
    "description": "01\nDEC\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 01.12.2026\n\nDetails",
    "lat": 47.714697,
    "lng": 7.6610865
  },
  {
    "title": "Kathreinenmarkt",
    "place": "Munderkingen",
    "date": "",
    "description": "03\nDEC\nMärkte\nKathreinenmarkt\n\nMärkte | Munderkingen\n\n 03.12.2026\n\nDetails",
    "lat": 48.2358225,
    "lng": 9.6441788
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Schopfheim",
    "date": "",
    "description": "08\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 08.12.2026\n\nDetails",
    "lat": 47.6500525,
    "lng": 7.8216997
  },
  {
    "title": "Nikolausmarkt",
    "place": "Pfullendorf",
    "date": "",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 47.9232677,
    "lng": 9.2500203
  },
  {
    "title": "Wintermarkt Schluchsee",
    "place": "Schluchsee",
    "date": "",
    "description": "28\nDEC\nMärkte\nWintermarkt Schluchsee\n\nMärkte | Schluchsee\n\n 28.12.2026 - 30.12.2026\n\nDetails",
    "lat": 47.8185928,
    "lng": 8.177035
  },
  {
    "title": "Märzenmarkt",
    "place": "Kirchheim unter Teck",
    "date": "",
    "description": "08\nMAR\nMärkte\nMärzenmarkt\n\nMärkte | Kirchheim unter Teck\n\n 08.03.2027\n\nDetails",
    "lat": 48.6480545,
    "lng": 9.4510227
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Radolfzell am Bodensee",
    "date": "APR",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 47.7372802,
    "lng": 8.9702755
  },
  {
    "title": "Maimarkt",
    "place": "Lonsee",
    "date": "MAY",
    "description": "01\nMAY\nMärkte\nMaimarkt\n\nMärkte | Lonsee\n\n 01.05.2027\n\nDetails",
    "lat": 48.5432227,
    "lng": 9.9167965
  },
  {
    "title": "Maimarkt",
    "place": "Pfullendorf",
    "date": "MAY",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2027\n\nDetails",
    "lat": 47.9232677,
    "lng": 9.2500203
  },
  {
    "title": "Flohmarkt",
    "place": "Emmendingen",
    "date": "MAY",
    "description": "08\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 08.05.2027\n\nDetails",
    "lat": 48.1206565,
    "lng": 7.850993
  }
];