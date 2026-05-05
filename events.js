const EVENTS = [
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Ludwigsburg",
    "date": "MAY",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.711361396271535,
    "lng": 9.510057501109989
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Schwäbisch Hall",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.36728634427659,
    "lng": 10.074177862070869
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Tübingen",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.3820044506462,
    "lng": 9.520740438653831
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Frickenhausen",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.239923481682695,
    "lng": 9.36326268516043
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 48.41294263224177,
    "lng": 8.717242874220464
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Weilheim an der Teck",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 48.84918315801026,
    "lng": 9.778911442665636
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Radolfzell am Bodensee",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 48.19814186732477,
    "lng": 9.282764431164614
  },
  {
    "title": "Maimarkt",
    "place": "Eppingen",
    "date": "MAY",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 48.102724477548215,
    "lng": 9.841338857226082
  },
  {
    "title": "GardenLife",
    "place": "Reutlingen",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 47.93619943267332,
    "lng": 10.186345092749418
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Sinsheim",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.53184933014625,
    "lng": 9.064351926589895
  },
  {
    "title": "Maimarkt",
    "place": "Göppingen",
    "date": "MAY",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 47.91615589989574,
    "lng": 9.518150409944473
  },
  {
    "title": "Flohmarkt",
    "place": "Ravensburg",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 48.75551186328471,
    "lng": 9.735829006746307
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Endingen",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 48.785227449610694,
    "lng": 9.463193723007823
  },
  {
    "title": "Muttertagsmarkt",
    "place": "Hausach",
    "date": "MAY",
    "description": "17\nMAY\nMärkte\nMuttertagsmarkt\n\nMärkte | Hausach\n\n 17.05.2026\n\nDetails",
    "lat": 49.285831232538406,
    "lng": 8.866885336899962
  },
  {
    "title": "Pfingstmarkt",
    "place": "Wolfach",
    "date": "MAY",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.765745077295854,
    "lng": 9.966100348684206
  },
  {
    "title": "Michelstädter Bienenmarkt",
    "place": "Michelstadt",
    "date": "MAY",
    "description": "22\nMAY\nMärkte\nMichelstädter Bienenmarkt\n\nMärkte | Michelstadt\n\n 22.05.2026 - 31.05.2026\n\nDetails",
    "lat": 47.994842080946384,
    "lng": 9.80834606718926
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "place": "Dischingen",
    "date": "MAY",
    "description": "23\nMAY\nMärkte\nMittelaltermarkt mit Ritterturnier und Feuershow\n\nMärkte | Dischingen\n\n 23.05.2026 - 25.05.2026\n\nDetails",
    "lat": 47.92704626247442,
    "lng": 9.113215398221445
  },
  {
    "title": "Naturparkmarkt",
    "place": "Löwenstein",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt\n\nMärkte | Löwenstein\n\n 24.05.2026\n\nDetails",
    "lat": 48.50076745922497,
    "lng": 9.23614970728148
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "place": "Löwenstein",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt Löwenstein\n\nMärkte | Löwenstein\n\n 24.05.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 49.170076018132114,
    "lng": 9.504775721934845
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "place": "Trossingen",
    "date": "MAY",
    "description": "25\nMAY\nMärkte\nTrossinger Pfingstmarkt\n\nMärkte | Trossingen\n\n 25.05.2026\n\nDetails",
    "lat": 48.53832895277233,
    "lng": 9.02701775227137
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "place": "Vogtsburg im Kaiserstuhl",
    "date": "MAY",
    "description": "30\nMAY\nMärkte\nKUNST.MARKT.GENUSS. mit Vogtsburg-Markt\n\nMärkte | Vogtsburg im Kaiserstuhl\n\n 30.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.219396453258575,
    "lng": 10.191784751295648
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "place": "Ettlingen",
    "date": "MAY",
    "description": "31\nMAY\nMärkte\nNaturpark-Markt Ettlingen\n\nMärkte | Ettlingen\n\n 31.05.2026, 11:00 - 17:00 Uhr\n\nFrische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker…\n\nDetails",
    "lat": 49.12491391265418,
    "lng": 8.974179697995295
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "place": "Waiblingen",
    "date": "JUN",
    "description": "06\nJUN\nMärkte\nRosen-, Garten- & Kunstmarkt\n\nMärkte | Waiblingen\n\n 06.06.2026 - 07.06.2026\n\nDetails",
    "lat": 48.08581090153048,
    "lng": 9.833568931401867
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Reutlingen",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 48.18036646994227,
    "lng": 9.954461506881467
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "place": "Oberndorf am Neckar",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nNaturpark-Markt Oberndorf a. N.\n\nMärkte | Oberndorf am Neckar\n\n 07.06.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt am 7. Juni 2026\n\nDetails",
    "lat": 48.543098874949436,
    "lng": 8.947282785770573
  },
  {
    "title": "Krämermarkt",
    "place": "Dettingen an der Erms",
    "date": "JUN",
    "description": "11\nJUN\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 11.06.2026\n\nDetails",
    "lat": 48.60758931282503,
    "lng": 10.111303395060139
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "place": "Ulm/Neu-Ulm",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nTag der Rose & Antikmarkt\n\nMärkte | Ulm/Neu-Ulm\n\n 13.06.2026\n\nDetails",
    "lat": 49.199544096345335,
    "lng": 9.463473573617893
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Eppingen",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 49.12125224390078,
    "lng": 10.019154864418294
  },
  {
    "title": "Kunstmarkt",
    "place": "Sipplingen",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nKunstmarkt\n\nMärkte | Sipplingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 48.057095760689336,
    "lng": 8.72325778646544
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "place": "Rosenfeld",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nUrsulamarkt mit Flohmarkt\n\nMärkte | Rosenfeld\n\n 13.06.2026\n\nDetails",
    "lat": 48.80194168746305,
    "lng": 10.034896189856882
  },
  {
    "title": "Naturparkmarkt",
    "place": "Calw",
    "date": "JUN",
    "description": "14\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Calw\n\n 14.06.2026\n\nDetails",
    "lat": 48.6910927486585,
    "lng": 9.571793735840092
  },
  {
    "title": "Häussler Backtage",
    "place": "Altheim",
    "date": "JUN",
    "description": "18\nJUN\nMärkte\nHäussler Backtage\n\nMärkte | Altheim\n\n 18.06.2026 - 20.06.2026\n\nDetails",
    "lat": 48.05890604874458,
    "lng": 8.94385243348442
  },
  {
    "title": "Büchermarkt",
    "place": "Kirchberg an der Jagst",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nBüchermarkt\n\nMärkte | Kirchberg an der Jagst\n\n 20.06.2026\n\nDetails",
    "lat": 48.016551660974024,
    "lng": 9.921288248487764
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "place": "Sindelfingen",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nDarmsheimer Töpfermarkt\n\nMärkte | Sindelfingen\n\n 20.06.2026 - 21.06.2026\n\nDetails",
    "lat": 48.66510463731753,
    "lng": 9.028619674017532
  },
  {
    "title": "Naturparkmarkt",
    "place": "Ettlingen",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Ettlingen\n\n 21.06.2026\n\nDetails",
    "lat": 48.98219820415938,
    "lng": 10.05601265527256
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "place": "Plüderhausen",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt Plüderhausen\n\nMärkte | Plüderhausen\n\n 21.06.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.52989554486278,
    "lng": 10.017376510395298
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Radolfzell am Bodensee",
    "date": "JUN",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 47.94590199270947,
    "lng": 8.806998853335017
  },
  {
    "title": "Peter und Paul Markt",
    "place": "Schönau im Schwarzwald",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\nPeter und Paul Markt\n\nMärkte | Schönau im Schwarzwald\n\n 29.06.2026\n\nDetails",
    "lat": 49.05861948963936,
    "lng": 8.921929540474785
  },
  {
    "title": "635. Zunftmarkt",
    "place": "Bad Wimpfen",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\n635. Zunftmarkt\n\nMärkte | Bad Wimpfen\n\n 29.06.2026 - 30.08.2026\n\nDetails",
    "lat": 48.99379560146836,
    "lng": 8.705385987219247
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "place": "Stuttgart",
    "date": "JUL",
    "description": "02\nJUL\nMärkte\nHamburger Fischmarkt in Stuttgart\n\nMärkte | Stuttgart\n\n 02.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.35473259118864,
    "lng": 9.089550279158303
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Tübingen",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 49.13672792846994,
    "lng": 9.179316607573657
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "place": "Villingen-Schwenningen",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nSüddeutscher Kunsthandwerkermarkt\n\nMärkte | Villingen-Schwenningen\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.547296236345,
    "lng": 8.819412512399241
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "place": "Immenstaad am Bodensee",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nTöpfer- und Kunstmarkt\n\nMärkte | Immenstaad am Bodensee\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.02383355519231,
    "lng": 9.576714452790107
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Ravensburg",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.34652678960623,
    "lng": 9.560403709528565
  },
  {
    "title": "Life’s finest",
    "place": "Bretten",
    "date": "JUL",
    "description": "09\nJUL\nMärkte\nLife’s finest\n\nMärkte | Bretten\n\n 09.07.2026 - 12.07.2026\n\nDetails",
    "lat": 47.92446654821155,
    "lng": 9.602575501898379
  },
  {
    "title": "JAAmarkt",
    "place": "Aalen",
    "date": "JUL",
    "description": "11\nJUL\nMärkte\nJAAmarkt\n\nMärkte | Aalen\n\n 11.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.19125082835459,
    "lng": 9.508384025201094
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Kehl",
    "date": "JUL",
    "description": "14\nJUL\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Kehl\n\n 14.07.2026\n\nDetails",
    "lat": 49.05462007929927,
    "lng": 8.91587909584659
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "place": "Pforzheim",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nPforzheimer Gruschtelmarkt\n\nMärkte | Pforzheim\n\n 17.07.2026 - 18.07.2026\n\nDetails",
    "lat": 49.28959688852415,
    "lng": 9.756199280830408
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "place": "Isny im Allgäu",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nIsnyer Feierabendmärkte 2026\n\nMärkte | Isny im Allgäu\n\n 17.07.2026, 16:00 - 21:00 Uhr\n\nDie Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. \n\nDetails",
    "lat": 49.29698202279764,
    "lng": 9.542365593125645
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "place": "Wolfegg",
    "date": "JUL",
    "description": "18\nJUL\nMärkte\n“Sommerfrische im Fürstlichen Hofgarten”\n\nMärkte | Wolfegg\n\n 18.07.2026\n\nDetails",
    "lat": 47.98375259108538,
    "lng": 9.572614160225392
  },
  {
    "title": "Naturparkmarkt",
    "place": "Fichtenberg",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt\n\nMärkte | Fichtenberg\n\n 19.07.2026\n\nDetails",
    "lat": 47.91847301714989,
    "lng": 9.32550562413492
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "place": "Blaufelden",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nKunst-Handwerker-Markt\n\nMärkte | Blaufelden\n\n 19.07.2026\n\nDetails",
    "lat": 48.974006534184866,
    "lng": 9.670158839680859
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "place": "Fichtenberg",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt Fichtenberg\n\nMärkte | Fichtenberg\n\n 19.07.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.973034819679825,
    "lng": 9.787779283818438
  },
  {
    "title": "Jakobimarkt",
    "place": "Nellingen",
    "date": "JUL",
    "description": "25\nJUL\nMärkte\nJakobimarkt\n\nMärkte | Nellingen\n\n 25.07.2026\n\nDetails",
    "lat": 48.26274251953406,
    "lng": 8.744120821024046
  },
  {
    "title": "Flohmarkt",
    "place": "Emmendingen",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 01.08.2026\n\nDetails",
    "lat": 49.09979482237637,
    "lng": 9.474369533702992
  },
  {
    "title": "Isnyer Töpfermarkt",
    "place": "Isny im Allgäu",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nIsnyer Töpfermarkt\n\nMärkte | Isny im Allgäu\n\n 01.08.2026 - 02.08.2026\n\nDetails",
    "lat": 48.796252777511086,
    "lng": 9.840392101245653
  },
  {
    "title": "Kunstgewerbemarkt",
    "place": "Bietigheim-Bissingen",
    "date": "AUG",
    "description": "02\nAUG\nMärkte\nKunstgewerbemarkt\n\nMärkte | Bietigheim-Bissingen\n\n 02.08.2026\n\nDetails",
    "lat": 49.32382788518343,
    "lng": 8.789177950801013
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "place": "Rechberghausen",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\n16. Gartenmarkt “Sommer – Blüten – Träume”\n\nMärkte | Rechberghausen\n\n 08.08.2026 - 09.08.2026\n\nDetails",
    "lat": 48.50612230378602,
    "lng": 8.771919034278426
  },
  {
    "title": "Vespermarkt",
    "place": "Zwiefalten",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 08.08.2026\n\nDetails",
    "lat": 48.3068945373472,
    "lng": 9.728229099438467
  },
  {
    "title": "Kräutermarkt",
    "place": "Mosbach",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nKräutermarkt\n\nMärkte | Mosbach\n\n 08.08.2026\n\nDetails",
    "lat": 49.15123606589032,
    "lng": 9.08914010903309
  },
  {
    "title": "Kunst- & Genießermarkt",
    "place": "Uhldingen-Mühlhofen",
    "date": "AUG",
    "description": "14\nAUG\nMärkte\nKunst- & Genießermarkt\n\nMärkte | Uhldingen-Mühlhofen\n\n 14.08.2026 - 16.08.2026\n\nDetails",
    "lat": 48.0406343988276,
    "lng": 9.240928606562441
  },
  {
    "title": "Abendflohmarkt",
    "place": "Ravensburg",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 48.711592246515174,
    "lng": 8.942985670891572
  },
  {
    "title": "Vespermarkt",
    "place": "Zwiefalten",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 15.08.2026\n\nDetails",
    "lat": 48.507973297881605,
    "lng": 9.717244914885274
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Eppingen",
    "date": "AUG",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 49.04723551942848,
    "lng": 9.41803148057758
  },
  {
    "title": "Internationaler Töpfermarkt",
    "place": "Überlingen",
    "date": "AUG",
    "description": "28\nAUG\nMärkte\nInternationaler Töpfermarkt\n\nMärkte | Überlingen\n\n 28.08.2026 - 30.08.2026\n\nDetails",
    "lat": 48.086869976092906,
    "lng": 8.872302151123266
  },
  {
    "title": "Französischer Markt",
    "place": "Neckargemünd",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nFranzösischer Markt\n\nMärkte | Neckargemünd\n\n 03.09.2026 - 05.09.2026\n\nDetails",
    "lat": 48.830963565862646,
    "lng": 10.042181396611786
  },
  {
    "title": "Krämermarkt",
    "place": "Dettingen an der Erms",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 03.09.2026\n\nDetails",
    "lat": 48.65066911890362,
    "lng": 8.742039582131493
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Furtwangen",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Furtwangen\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 47.932229514812285,
    "lng": 10.034859051848496
  },
  {
    "title": "Fürstliche Gartentage",
    "place": "Langenburg",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nFürstliche Gartentage\n\nMärkte | Langenburg\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.712444941819946,
    "lng": 8.829339962789517
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "place": "Ulm/Neu-Ulm",
    "date": "SEP",
    "description": "05\nSEP\nMärkte\nTöpfermarkt Neu-Ulm\n\nMärkte | Ulm/Neu-Ulm\n\n 05.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.35447167463181,
    "lng": 8.924627761518162
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "place": "Esslingen am Neckar",
    "date": "SEP",
    "description": "12\nSEP\nMärkte\nES funkelt – Lichtermarkt & Nachtflohmarkt\n\nMärkte | Esslingen am Neckar\n\n 12.09.2026\n\nDetails",
    "lat": 48.880789387118654,
    "lng": 9.519490499964938
  },
  {
    "title": "Naturparkmarkt",
    "place": "Pfedelbach",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt\n\nMärkte | Pfedelbach\n\n 13.09.2026\n\nDetails",
    "lat": 49.3687549179081,
    "lng": 9.824308492003436
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "place": "Pfedelbach",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt Pfedelbach\n\nMärkte | Pfedelbach\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.745733910647104,
    "lng": 10.002371074873073
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "place": "Egenhausen",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturpark-Markt Egenhausen\n\nMärkte | Egenhausen\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Egenhausen am 13.09.2026\n\nDetails",
    "lat": 49.02973616565361,
    "lng": 9.255970832992446
  },
  {
    "title": "Herbstmarkt",
    "place": "Güglingen",
    "date": "SEP",
    "description": "15\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Güglingen\n\n 15.09.2026\n\nDetails",
    "lat": 48.19890459951809,
    "lng": 9.03837002448378
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Sigmaringen",
    "date": "SEP",
    "description": "18\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Sigmaringen\n\n 18.09.2026\n\nDetails",
    "lat": 49.261414710221175,
    "lng": 8.943740732199089
  },
  {
    "title": "Historischer Markt",
    "place": "Heubach",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHistorischer Markt\n\nMärkte | Heubach\n\n 19.09.2026 - 20.09.2026\n\nDetails",
    "lat": 49.060673206559805,
    "lng": 10.094703091261326
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 48.72674330079853,
    "lng": 9.300157324302956
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "place": "Leibertingen",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nWildensteiner Jahrmarkt\n\nMärkte | Leibertingen\n\n 20.09.2026\n\nDetails",
    "lat": 48.31353523957077,
    "lng": 10.199597645642855
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Ühlingen-Birkendorf",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Ühlingen-Birkendorf\n\n 20.09.2026\n\nDetails",
    "lat": 48.225566808875946,
    "lng": 10.093373098480852
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Grafenhausen",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Grafenhausen\n\n 20.09.2026\n\nDetails",
    "lat": 48.111731790447216,
    "lng": 9.87966592363109
  },
  {
    "title": "Holz- und Bauernmarkt",
    "place": "Welzheim",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nHolz- und Bauernmarkt\n\nMärkte | Welzheim\n\n 20.09.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 49.384193395986344,
    "lng": 8.764387544215317
  },
  {
    "title": "Matthäusmarkt",
    "place": "Trochtelfingen",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nMatthäusmarkt\n\nMärkte | Trochtelfingen\n\n 21.09.2026\n\nDetails",
    "lat": 48.54443461943657,
    "lng": 9.05098678400406
  },
  {
    "title": "Herbstmarkt Harthausen",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nHerbstmarkt Harthausen\n\nMärkte | Filderstadt\n\n 21.09.2026\n\nDetails",
    "lat": 48.3693445605357,
    "lng": 9.967375892750551
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "22\nSEP\nMärkte\nHerbstmarkt Plattenhardt\n\nMärkte | Filderstadt\n\n 22.09.2026\n\nDetails",
    "lat": 48.524011078500294,
    "lng": 9.42490968474977
  },
  {
    "title": "Herbstmarkt",
    "place": "Schutterwald",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Schutterwald\n\n 26.09.2026\n\nDetails",
    "lat": 48.105450808755776,
    "lng": 9.829484044661516
  },
  {
    "title": "Trossinger Kilbemarkt",
    "place": "Trossingen",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nTrossinger Kilbemarkt\n\nMärkte | Trossingen\n\n 26.09.2026 - 27.09.2026\n\nDetails",
    "lat": 48.69784692915287,
    "lng": 9.660410699484558
  },
  {
    "title": "Großer Flohmarkt",
    "place": "Munderkingen",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nGroßer Flohmarkt\n\nMärkte | Munderkingen\n\n 26.09.2026\n\nDetails",
    "lat": 49.23698638896556,
    "lng": 9.294712102828457
  },
  {
    "title": "Herbstmarkt",
    "place": "Neckargemünd",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Neckargemünd\n\n 27.09.2026\n\nDetails",
    "lat": 49.03947414082946,
    "lng": 8.955535581574573
  },
  {
    "title": "Herbstmarkt und verkaufsoffenem Sonntag",
    "place": "Südwärts",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nHerbstmarkt und verkaufsoffenem Sonntag\n\nMärkte | Südwärts\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nLive MusikEssen & Trinken durch Vereine und FoodtrucksAttraktionen & GewinnspieleKinderprogrammShoppen im geöffneten Einzelhandel Weitere Aktionen in den teilnehmenden Geschäften\n\nDetails",
    "lat": 48.18670022150586,
    "lng": 10.172567595639391
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "place": "Müllheim",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\n„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag\n\nMärkte | Müllheim\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40…\n\nDetails",
    "lat": 48.25130893087233,
    "lng": 9.521902746015945
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "place": "Bad Schussenried",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nCittaslow – Tag mit verkaufsoffenem Sonntag\n\nMärkte | Bad Schussenried\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nDetails",
    "lat": 48.277326542392714,
    "lng": 8.935845188873582
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "30\nSEP\nMärkte\nHerbstmarkt Sielmingen\n\nMärkte | Filderstadt\n\n 30.09.2026\n\nDetails",
    "lat": 49.160247662097696,
    "lng": 9.237970240590897
  },
  {
    "title": "Kunsthandwerkermarkt",
    "place": "Kandern",
    "date": "",
    "description": "03\nOCT\nMärkte\nKunsthandwerkermarkt\n\nMärkte | Kandern\n\n 03.10.2026 - 04.10.2026\n\nDetails",
    "lat": 48.14807351541888,
    "lng": 9.69430751938306
  },
  {
    "title": "Biosphärenmarkt",
    "place": "Münsingen",
    "date": "",
    "description": "03\nOCT\nMärkte\nBiosphärenmarkt\n\nMärkte | Münsingen\n\n 03.10.2026\n\nDetails",
    "lat": 48.89707050119636,
    "lng": 10.063409385435556
  },
  {
    "title": "Drachenfest",
    "place": "Ostfildern",
    "date": "",
    "description": "03\nOCT\nMärkte\nDrachenfest\n\nMärkte | Ostfildern\n\n 03.10.2026\n\nDetails",
    "lat": 48.28694298307476,
    "lng": 9.64198287265142
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "place": "Ebhausen-Rotfelden",
    "date": "",
    "description": "03\nOCT\nMärkte\nNaturpark-Markt Ebhausen-Rotfelden\n\nMärkte | Ebhausen-Rotfelden\n\n 03.10.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Ebhausen-Rotfelden 03.10.2026\n\nDetails",
    "lat": 49.21957316677857,
    "lng": 9.111862676778982
  },
  {
    "title": "Naturparkmarkt",
    "place": "Murrhardt",
    "date": "",
    "description": "04\nOCT\nMärkte\nNaturparkmarkt\n\nMärkte | Murrhardt\n\n 04.10.2026\n\nDetails",
    "lat": 48.714670414987644,
    "lng": 9.085136345150284
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "place": "Ulm",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nUlmer Marktsonntag & verkaufsoffener Sonntag\n\nMärkte | Ulm\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nBummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer…\n\nDetails",
    "lat": 48.02060353775899,
    "lng": 9.299368608134031
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "place": "Ehingen (Donau)",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nFlanieren, Genießen, Einkaufen\n\nMärkte | Ehingen (Donau)\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nAm 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein.\n\nDetails",
    "lat": 48.367228515109076,
    "lng": 10.198106688972313
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "place": "Meckenbeuren",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nVerkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen\n\nMärkte | Meckenbeuren\n\n 04.10.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte…\n\nDetails",
    "lat": 49.07018386138403,
    "lng": 9.572414173323095
  },
  {
    "title": "Herbstmarkt Villingen",
    "place": "Villingen-Schwenningen",
    "date": "",
    "description": "08\nOCT\nMärkte\nHerbstmarkt Villingen\n\nMärkte | Villingen-Schwenningen\n\n 08.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.23026959029629,
    "lng": 9.725974097401805
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "place": "Laufenburg (Baden)",
    "date": "",
    "description": "09\nOCT\nMärkte\nHela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)\n\nMärkte | Laufenburg (Baden)\n\n 09.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.43469976132481,
    "lng": 8.930902402094556
  },
  {
    "title": "Krämermarkt",
    "place": "Gechingen",
    "date": "",
    "description": "09\nOCT\nMärkte\nKrämermarkt\n\nMärkte | Gechingen\n\n 09.10.2026\n\nDetails",
    "lat": 48.00429276751579,
    "lng": 9.851109686224548
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "place": "Isny im Allgäu",
    "date": "",
    "description": "10\nOCT\nMärkte\nIsnyer Schmalzmarkt\n\nMärkte | Isny im Allgäu\n\n 10.10.2026\n\nDetails",
    "lat": 48.20089537535087,
    "lng": 9.668847213172022
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "place": "Schramberg",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe\n\nMärkte | Schramberg\n\n 11.10.2026, 11:00 - 18:00 Uhr\n\nAm 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten…\n\nDetails",
    "lat": 48.36432039414679,
    "lng": 8.947865930316901
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "place": "Heilbronn",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nJazz & Einkauf mit SonntagsShopping\n\nMärkte | Heilbronn\n\n 11.10.2026, 13:00 - 18:00 Uhr\n\nJazz in der City und entspanntes Shopping in der gesamten Stadt. \n\nDetails",
    "lat": 49.36638076695689,
    "lng": 8.808228521279737
  },
  {
    "title": "Herbstmarkt",
    "place": "Schönau im Schwarzwald",
    "date": "",
    "description": "12\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 12.10.2026\n\nDetails",
    "lat": 48.84861262235899,
    "lng": 8.946562170937682
  },
  {
    "title": "Gallusmarkt",
    "place": "Wolfach",
    "date": "",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 48.59598549410599,
    "lng": 9.39075342913638
  },
  {
    "title": "Gallenmarkt",
    "place": "Burladingen",
    "date": "",
    "description": "15\nOCT\nMärkte\nGallenmarkt\n\nMärkte | Burladingen\n\n 15.10.2026\n\nDetails",
    "lat": 47.98471132258577,
    "lng": 9.247848371029017
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Gengenbach",
    "date": "",
    "description": "17\nOCT\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Gengenbach\n\n 17.10.2026 - 18.10.2026\n\nDetails",
    "lat": 48.12425474969868,
    "lng": 9.483656536496822
  },
  {
    "title": "Jahrmarkt Odenheim",
    "place": "Östringen",
    "date": "",
    "description": "17\nOCT\nMärkte\nJahrmarkt Odenheim\n\nMärkte | Östringen\n\n 17.10.2026\n\nDetails",
    "lat": 49.08290056248847,
    "lng": 9.108080942448774
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Endingen",
    "date": "",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.957011226282525,
    "lng": 9.91377597672295
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "place": "Ettlingen",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Herbstmarkt\n\nMärkte | Ettlingen\n\n 18.10.2026\n\nDetails",
    "lat": 48.6564889749135,
    "lng": 9.646266699064068
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "place": "Überlingen am Bodensee",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nÜberlinger Herbst mit Verkaufsoffenem Sonntag\n\nMärkte | Überlingen am Bodensee\n\n 18.10.2026, 10:00 - 18:00 Uhr\n\nErneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. \n\nDetails",
    "lat": 49.216210881417766,
    "lng": 9.105226174480828
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Pfullendorf",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 48.98291490936522,
    "lng": 8.951713128095061
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "place": "Donaueschingen",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in der Innenstadt\n\nMärkte | Donaueschingen\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nin der Donaueschinger Innenstadt.\n\nDetails",
    "lat": 48.56098944301743,
    "lng": 9.662550758258933
  },
  {
    "title": "Herbstmarkt",
    "place": "Schönau im Schwarzwald",
    "date": "",
    "description": "19\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 19.10.2026\n\nDetails",
    "lat": 48.23446537163767,
    "lng": 9.355893972123372
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "place": "Nürtingen",
    "date": "",
    "description": "25\nOCT\nMärkte\nKunsthandwerkermarkt / Kunst in den Schaufenstern\n\nMärkte | Nürtingen\n\n 25.10.2026\n\nDetails",
    "lat": 48.57709597578766,
    "lng": 8.742763192578302
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "place": "Kürnbach",
    "date": "",
    "description": "25\nOCT\nMärkte\nNaturparkmarkt und Kerwe\n\nMärkte | Kürnbach\n\n 25.10.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 47.971607733827994,
    "lng": 9.729586966683248
  },
  {
    "title": "Kirchweihmarkt",
    "place": "Laichingen",
    "date": "",
    "description": "26\nOCT\nMärkte\nKirchweihmarkt\n\nMärkte | Laichingen\n\n 26.10.2026\n\nDetails",
    "lat": 48.05649808470171,
    "lng": 10.15025508280395
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "place": "Herbolzheim",
    "date": "",
    "description": "30\nOCT\nMärkte\nTraditioneller Jahrmarkt\n\nMärkte | Herbolzheim\n\n 30.10.2026\n\nDetails",
    "lat": 48.12437693980903,
    "lng": 9.21761243419346
  },
  {
    "title": "25. Martinimarkt",
    "place": "Eschenbach",
    "date": "NOV",
    "description": "07\nNOV\nMärkte\n25. Martinimarkt\n\nMärkte | Eschenbach\n\n 07.11.2026\n\nDetails",
    "lat": 48.38402074109336,
    "lng": 9.514675123733626
  },
  {
    "title": "Esslinger Herbst",
    "place": "Esslingen am Neckar",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 08.11.2026\n\nDetails",
    "lat": 48.513902692688255,
    "lng": 9.33639191862723
  },
  {
    "title": "Bauernmarkt",
    "place": "Wertheim",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nBauernmarkt\n\nMärkte | Wertheim\n\n 08.11.2026\n\nDetails",
    "lat": 48.31270546769778,
    "lng": 8.925366183920707
  },
  {
    "title": "Martinimarkt",
    "place": "Sigmaringen",
    "date": "NOV",
    "description": "09\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 09.11.2026\n\nDetails",
    "lat": 48.390321791532436,
    "lng": 9.624019351348345
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "place": "Gerlingen",
    "date": "NOV",
    "description": "10\nNOV\nMärkte\n64. Modelleisenbahn-Börse\n\nMärkte | Gerlingen\n\n 10.11.2026, 11 - 16 Uhr\n\nDetails",
    "lat": 48.95953335112013,
    "lng": 8.881041458287257
  },
  {
    "title": "Martinimarkt",
    "place": "Bad Wurzach",
    "date": "NOV",
    "description": "12\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Bad Wurzach\n\n 12.11.2026\n\nDetails",
    "lat": 48.91166826948868,
    "lng": 10.017823884994337
  },
  {
    "title": "Martinimarkt",
    "place": "Mühlacker",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mühlacker\n\n 14.11.2026\n\nDetails",
    "lat": 48.03790888045046,
    "lng": 9.38736782822333
  },
  {
    "title": "Wintermarkt",
    "place": "Wehingen",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nWintermarkt\n\nMärkte | Wehingen\n\n 14.11.2026\n\nDetails",
    "lat": 48.05998383905521,
    "lng": 9.47137021929188
  },
  {
    "title": "Esslinger Herbst",
    "place": "Esslingen am Neckar",
    "date": "NOV",
    "description": "15\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 15.11.2026\n\nDetails",
    "lat": 49.24333547786923,
    "lng": 9.878394500151012
  },
  {
    "title": "Martinimarkt",
    "place": "Sigmaringen",
    "date": "NOV",
    "description": "16\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 16.11.2026\n\nDetails",
    "lat": 49.39431028823318,
    "lng": 9.767301303314012
  },
  {
    "title": "Martinimarkt",
    "place": "Mengen",
    "date": "NOV",
    "description": "18\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mengen\n\n 18.11.2026\n\nDetails",
    "lat": 49.32684055490407,
    "lng": 9.428016297523376
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Kandern",
    "date": "NOV",
    "description": "24\nNOV\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 24.11.2026\n\nDetails",
    "lat": 48.66333702587067,
    "lng": 9.455946546428747
  },
  {
    "title": "Martinimarkt",
    "place": "Hornberg",
    "date": "NOV",
    "description": "27\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Hornberg\n\n 27.11.2026\n\nDetails",
    "lat": 47.9685772958276,
    "lng": 10.073236187441209
  },
  {
    "title": "Kreativmarkt",
    "place": "Rielasingen-Worblingen",
    "date": "NOV",
    "description": "28\nNOV\nMärkte\nKreativmarkt\n\nMärkte | Rielasingen-Worblingen\n\n 28.11.2026\n\nDetails",
    "lat": 48.718556263824446,
    "lng": 9.526270030520353
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Schopfheim",
    "date": "",
    "description": "01\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 01.12.2026 - 02.12.2026\n\nDetails",
    "lat": 49.381532450600325,
    "lng": 10.095744614238498
  },
  {
    "title": "“Kloosemärt”",
    "place": "Hüfingen",
    "date": "",
    "description": "01\nDEC\nMärkte\n“Kloosemärt”\n\nMärkte | Hüfingen\n\n 01.12.2026\n\nDetails",
    "lat": 48.00497844430594,
    "lng": 9.808048664476537
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Kandern",
    "date": "",
    "description": "01\nDEC\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 01.12.2026\n\nDetails",
    "lat": 48.693094009861575,
    "lng": 8.926351996565758
  },
  {
    "title": "Kathreinenmarkt",
    "place": "Munderkingen",
    "date": "",
    "description": "03\nDEC\nMärkte\nKathreinenmarkt\n\nMärkte | Munderkingen\n\n 03.12.2026\n\nDetails",
    "lat": 48.66245763422325,
    "lng": 9.435764595500075
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Schopfheim",
    "date": "",
    "description": "08\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 08.12.2026\n\nDetails",
    "lat": 48.79388574420161,
    "lng": 9.101317768764362
  },
  {
    "title": "Nikolausmarkt",
    "place": "Pfullendorf",
    "date": "",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 49.25423360480281,
    "lng": 8.97221105417212
  },
  {
    "title": "Wintermarkt Schluchsee",
    "place": "Schluchsee",
    "date": "",
    "description": "28\nDEC\nMärkte\nWintermarkt Schluchsee\n\nMärkte | Schluchsee\n\n 28.12.2026 - 30.12.2026\n\nDetails",
    "lat": 47.929077077478055,
    "lng": 9.210477928638868
  },
  {
    "title": "Märzenmarkt",
    "place": "Kirchheim unter Teck",
    "date": "",
    "description": "08\nMAR\nMärkte\nMärzenmarkt\n\nMärkte | Kirchheim unter Teck\n\n 08.03.2027\n\nDetails",
    "lat": 48.51091141099982,
    "lng": 9.167897672574208
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Radolfzell am Bodensee",
    "date": "Sonntag",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 47.996168497534626,
    "lng": 9.107830077801278
  },
  {
    "title": "Maimarkt",
    "place": "Lonsee",
    "date": "MAY",
    "description": "01\nMAY\nMärkte\nMaimarkt\n\nMärkte | Lonsee\n\n 01.05.2027\n\nDetails",
    "lat": 48.88791658697536,
    "lng": 9.322956370459941
  },
  {
    "title": "Maimarkt",
    "place": "Pfullendorf",
    "date": "MAY",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2027\n\nDetails",
    "lat": 49.221137632032836,
    "lng": 9.789219367225252
  },
  {
    "title": "Flohmarkt",
    "place": "Emmendingen",
    "date": "MAY",
    "description": "08\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 08.05.2027\n\nDetails",
    "lat": 48.02919437412723,
    "lng": 9.15457575643961
  }
];