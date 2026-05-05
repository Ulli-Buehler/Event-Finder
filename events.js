const EVENTS = [
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Ludwigsburg",
    "date": "MAY",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.356279140419566,
    "lng": 9.527726403468863
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Schwäbisch Hall",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.05463550739036,
    "lng": 9.720887057142503
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Tübingen",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.86689487715882,
    "lng": 10.016796169280019
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Frickenhausen",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.23041923960603,
    "lng": 10.176881146236548
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 49.169778987192224,
    "lng": 9.809852063811542
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Weilheim an der Teck",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 49.175196505121036,
    "lng": 9.712169083903438
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Radolfzell am Bodensee",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 49.11324981335406,
    "lng": 9.210228253422283
  },
  {
    "title": "Maimarkt",
    "place": "Eppingen",
    "date": "MAY",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 49.36758163889627,
    "lng": 9.25067126867146
  },
  {
    "title": "GardenLife",
    "place": "Reutlingen",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.46216793727845,
    "lng": 9.247414965509137
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Sinsheim",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.52645323420944,
    "lng": 8.904080894582222
  },
  {
    "title": "Maimarkt",
    "place": "Göppingen",
    "date": "MAY",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 49.07592307964173,
    "lng": 9.319121881994365
  },
  {
    "title": "Flohmarkt",
    "place": "Ravensburg",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 48.00518652637347,
    "lng": 9.295900318056988
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Endingen",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 49.23681450439653,
    "lng": 9.327259954759873
  },
  {
    "title": "Muttertagsmarkt",
    "place": "Hausach",
    "date": "MAY",
    "description": "17\nMAY\nMärkte\nMuttertagsmarkt\n\nMärkte | Hausach\n\n 17.05.2026\n\nDetails",
    "lat": 48.09213390714417,
    "lng": 9.506278781755986
  },
  {
    "title": "Pfingstmarkt",
    "place": "Wolfach",
    "date": "MAY",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.58961218526621,
    "lng": 8.764425760066915
  },
  {
    "title": "Michelstädter Bienenmarkt",
    "place": "Michelstadt",
    "date": "MAY",
    "description": "22\nMAY\nMärkte\nMichelstädter Bienenmarkt\n\nMärkte | Michelstadt\n\n 22.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.54035631485322,
    "lng": 9.913619230775385
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "place": "Dischingen",
    "date": "MAY",
    "description": "23\nMAY\nMärkte\nMittelaltermarkt mit Ritterturnier und Feuershow\n\nMärkte | Dischingen\n\n 23.05.2026 - 25.05.2026\n\nDetails",
    "lat": 48.2141568767341,
    "lng": 9.690943609466542
  },
  {
    "title": "Naturparkmarkt",
    "place": "Löwenstein",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt\n\nMärkte | Löwenstein\n\n 24.05.2026\n\nDetails",
    "lat": 48.843820400343205,
    "lng": 8.830775055632001
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "place": "Löwenstein",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt Löwenstein\n\nMärkte | Löwenstein\n\n 24.05.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.75612108932041,
    "lng": 9.539196153535606
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "place": "Trossingen",
    "date": "MAY",
    "description": "25\nMAY\nMärkte\nTrossinger Pfingstmarkt\n\nMärkte | Trossingen\n\n 25.05.2026\n\nDetails",
    "lat": 48.67597604968677,
    "lng": 9.844868692524935
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "place": "Vogtsburg im Kaiserstuhl",
    "date": "MAY",
    "description": "30\nMAY\nMärkte\nKUNST.MARKT.GENUSS. mit Vogtsburg-Markt\n\nMärkte | Vogtsburg im Kaiserstuhl\n\n 30.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.54237460494166,
    "lng": 9.03220474501215
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "place": "Ettlingen",
    "date": "MAY",
    "description": "31\nMAY\nMärkte\nNaturpark-Markt Ettlingen\n\nMärkte | Ettlingen\n\n 31.05.2026, 11:00 - 17:00 Uhr\n\nFrische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker…\n\nDetails",
    "lat": 49.39027335685838,
    "lng": 9.821037389419722
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "place": "Waiblingen",
    "date": "JUN",
    "description": "06\nJUN\nMärkte\nRosen-, Garten- & Kunstmarkt\n\nMärkte | Waiblingen\n\n 06.06.2026 - 07.06.2026\n\nDetails",
    "lat": 48.67939982992084,
    "lng": 9.39408815456945
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Reutlingen",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 49.383342597969744,
    "lng": 8.903076958162707
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "place": "Oberndorf am Neckar",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nNaturpark-Markt Oberndorf a. N.\n\nMärkte | Oberndorf am Neckar\n\n 07.06.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt am 7. Juni 2026\n\nDetails",
    "lat": 47.97505944229969,
    "lng": 9.566892589429866
  },
  {
    "title": "Krämermarkt",
    "place": "Dettingen an der Erms",
    "date": "JUN",
    "description": "11\nJUN\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 11.06.2026\n\nDetails",
    "lat": 49.20572103098138,
    "lng": 9.833219638093475
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "place": "Ulm/Neu-Ulm",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nTag der Rose & Antikmarkt\n\nMärkte | Ulm/Neu-Ulm\n\n 13.06.2026\n\nDetails",
    "lat": 48.52129249450779,
    "lng": 9.946152609419858
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Eppingen",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 48.95100841306528,
    "lng": 8.760579197698513
  },
  {
    "title": "Kunstmarkt",
    "place": "Sipplingen",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nKunstmarkt\n\nMärkte | Sipplingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 49.270678421733315,
    "lng": 9.731026893506346
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "place": "Rosenfeld",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nUrsulamarkt mit Flohmarkt\n\nMärkte | Rosenfeld\n\n 13.06.2026\n\nDetails",
    "lat": 49.207701456274684,
    "lng": 9.910122739513934
  },
  {
    "title": "Naturparkmarkt",
    "place": "Calw",
    "date": "JUN",
    "description": "14\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Calw\n\n 14.06.2026\n\nDetails",
    "lat": 48.59447526252705,
    "lng": 9.851532140927247
  },
  {
    "title": "Häussler Backtage",
    "place": "Altheim",
    "date": "JUN",
    "description": "18\nJUN\nMärkte\nHäussler Backtage\n\nMärkte | Altheim\n\n 18.06.2026 - 20.06.2026\n\nDetails",
    "lat": 48.56339053438016,
    "lng": 8.824080710543434
  },
  {
    "title": "Büchermarkt",
    "place": "Kirchberg an der Jagst",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nBüchermarkt\n\nMärkte | Kirchberg an der Jagst\n\n 20.06.2026\n\nDetails",
    "lat": 48.14167709970945,
    "lng": 8.759594967093783
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "place": "Sindelfingen",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nDarmsheimer Töpfermarkt\n\nMärkte | Sindelfingen\n\n 20.06.2026 - 21.06.2026\n\nDetails",
    "lat": 48.404859410159986,
    "lng": 8.844507813735516
  },
  {
    "title": "Naturparkmarkt",
    "place": "Ettlingen",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Ettlingen\n\n 21.06.2026\n\nDetails",
    "lat": 49.316098489785595,
    "lng": 10.102919416139127
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "place": "Plüderhausen",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt Plüderhausen\n\nMärkte | Plüderhausen\n\n 21.06.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.53285728364046,
    "lng": 8.870792809423167
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Radolfzell am Bodensee",
    "date": "JUN",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 49.27042652310564,
    "lng": 10.06545719797797
  },
  {
    "title": "Peter und Paul Markt",
    "place": "Schönau im Schwarzwald",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\nPeter und Paul Markt\n\nMärkte | Schönau im Schwarzwald\n\n 29.06.2026\n\nDetails",
    "lat": 49.14781885658037,
    "lng": 9.282847840054446
  },
  {
    "title": "635. Zunftmarkt",
    "place": "Bad Wimpfen",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\n635. Zunftmarkt\n\nMärkte | Bad Wimpfen\n\n 29.06.2026 - 30.08.2026\n\nDetails",
    "lat": 48.21359735273716,
    "lng": 8.884468261104189
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "place": "Stuttgart",
    "date": "JUL",
    "description": "02\nJUL\nMärkte\nHamburger Fischmarkt in Stuttgart\n\nMärkte | Stuttgart\n\n 02.07.2026 - 12.07.2026\n\nDetails",
    "lat": 49.08795124459045,
    "lng": 9.914113731128992
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Tübingen",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 48.927466774093176,
    "lng": 10.144854782177667
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "place": "Villingen-Schwenningen",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nSüddeutscher Kunsthandwerkermarkt\n\nMärkte | Villingen-Schwenningen\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 49.05304868460208,
    "lng": 8.725158621893659
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "place": "Immenstaad am Bodensee",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nTöpfer- und Kunstmarkt\n\nMärkte | Immenstaad am Bodensee\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 49.161372463614136,
    "lng": 9.257835378840616
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Ravensburg",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 49.39528636917322,
    "lng": 9.294430405734012
  },
  {
    "title": "Life’s finest",
    "place": "Bretten",
    "date": "JUL",
    "description": "09\nJUL\nMärkte\nLife’s finest\n\nMärkte | Bretten\n\n 09.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.119997420761315,
    "lng": 10.072795641444005
  },
  {
    "title": "JAAmarkt",
    "place": "Aalen",
    "date": "JUL",
    "description": "11\nJUL\nMärkte\nJAAmarkt\n\nMärkte | Aalen\n\n 11.07.2026 - 12.07.2026\n\nDetails",
    "lat": 49.28059576906056,
    "lng": 8.730561808182642
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Kehl",
    "date": "JUL",
    "description": "14\nJUL\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Kehl\n\n 14.07.2026\n\nDetails",
    "lat": 48.82456378651748,
    "lng": 10.038943091566544
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "place": "Pforzheim",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nPforzheimer Gruschtelmarkt\n\nMärkte | Pforzheim\n\n 17.07.2026 - 18.07.2026\n\nDetails",
    "lat": 48.74540133062236,
    "lng": 9.420308313714377
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "place": "Isny im Allgäu",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nIsnyer Feierabendmärkte 2026\n\nMärkte | Isny im Allgäu\n\n 17.07.2026, 16:00 - 21:00 Uhr\n\nDie Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. \n\nDetails",
    "lat": 49.110845018737535,
    "lng": 8.98464898806687
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "place": "Wolfegg",
    "date": "JUL",
    "description": "18\nJUL\nMärkte\n“Sommerfrische im Fürstlichen Hofgarten”\n\nMärkte | Wolfegg\n\n 18.07.2026\n\nDetails",
    "lat": 48.75797079026558,
    "lng": 8.907801551716757
  },
  {
    "title": "Naturparkmarkt",
    "place": "Fichtenberg",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt\n\nMärkte | Fichtenberg\n\n 19.07.2026\n\nDetails",
    "lat": 48.82396864434858,
    "lng": 9.92328086431188
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "place": "Blaufelden",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nKunst-Handwerker-Markt\n\nMärkte | Blaufelden\n\n 19.07.2026\n\nDetails",
    "lat": 48.80471300604246,
    "lng": 9.37519323080877
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "place": "Fichtenberg",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt Fichtenberg\n\nMärkte | Fichtenberg\n\n 19.07.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 47.98246807519556,
    "lng": 9.56039756610948
  },
  {
    "title": "Jakobimarkt",
    "place": "Nellingen",
    "date": "JUL",
    "description": "25\nJUL\nMärkte\nJakobimarkt\n\nMärkte | Nellingen\n\n 25.07.2026\n\nDetails",
    "lat": 48.05796682671215,
    "lng": 9.274688300172706
  },
  {
    "title": "Flohmarkt",
    "place": "Emmendingen",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 01.08.2026\n\nDetails",
    "lat": 48.228856215576364,
    "lng": 8.764170655542394
  },
  {
    "title": "Isnyer Töpfermarkt",
    "place": "Isny im Allgäu",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nIsnyer Töpfermarkt\n\nMärkte | Isny im Allgäu\n\n 01.08.2026 - 02.08.2026\n\nDetails",
    "lat": 49.25675355795285,
    "lng": 10.020525535469785
  },
  {
    "title": "Kunstgewerbemarkt",
    "place": "Bietigheim-Bissingen",
    "date": "AUG",
    "description": "02\nAUG\nMärkte\nKunstgewerbemarkt\n\nMärkte | Bietigheim-Bissingen\n\n 02.08.2026\n\nDetails",
    "lat": 49.24014371949547,
    "lng": 9.70044316379915
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "place": "Rechberghausen",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\n16. Gartenmarkt “Sommer – Blüten – Träume”\n\nMärkte | Rechberghausen\n\n 08.08.2026 - 09.08.2026\n\nDetails",
    "lat": 49.13446213220344,
    "lng": 9.885021703723021
  },
  {
    "title": "Vespermarkt",
    "place": "Zwiefalten",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 08.08.2026\n\nDetails",
    "lat": 48.033344958294315,
    "lng": 9.318948645912428
  },
  {
    "title": "Kräutermarkt",
    "place": "Mosbach",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nKräutermarkt\n\nMärkte | Mosbach\n\n 08.08.2026\n\nDetails",
    "lat": 49.36424767830756,
    "lng": 9.30750656755132
  },
  {
    "title": "Kunst- & Genießermarkt",
    "place": "Uhldingen-Mühlhofen",
    "date": "AUG",
    "description": "14\nAUG\nMärkte\nKunst- & Genießermarkt\n\nMärkte | Uhldingen-Mühlhofen\n\n 14.08.2026 - 16.08.2026\n\nDetails",
    "lat": 48.400990831149834,
    "lng": 9.925703159582934
  },
  {
    "title": "Abendflohmarkt",
    "place": "Ravensburg",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 48.191865415902626,
    "lng": 8.806359009204916
  },
  {
    "title": "Vespermarkt",
    "place": "Zwiefalten",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 15.08.2026\n\nDetails",
    "lat": 49.314490112996985,
    "lng": 9.430458073243353
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Eppingen",
    "date": "AUG",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 48.62371506010467,
    "lng": 8.782712716333062
  },
  {
    "title": "Internationaler Töpfermarkt",
    "place": "Überlingen",
    "date": "AUG",
    "description": "28\nAUG\nMärkte\nInternationaler Töpfermarkt\n\nMärkte | Überlingen\n\n 28.08.2026 - 30.08.2026\n\nDetails",
    "lat": 48.6077791783955,
    "lng": 9.895438694319314
  },
  {
    "title": "Französischer Markt",
    "place": "Neckargemünd",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nFranzösischer Markt\n\nMärkte | Neckargemünd\n\n 03.09.2026 - 05.09.2026\n\nDetails",
    "lat": 49.259086988895575,
    "lng": 9.311173915481392
  },
  {
    "title": "Krämermarkt",
    "place": "Dettingen an der Erms",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 03.09.2026\n\nDetails",
    "lat": 49.07732386802794,
    "lng": 8.812278110023946
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Furtwangen",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Furtwangen\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.141658082447826,
    "lng": 9.972408465330787
  },
  {
    "title": "Fürstliche Gartentage",
    "place": "Langenburg",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nFürstliche Gartentage\n\nMärkte | Langenburg\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 47.97986616928825,
    "lng": 8.86428883967645
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "place": "Ulm/Neu-Ulm",
    "date": "SEP",
    "description": "05\nSEP\nMärkte\nTöpfermarkt Neu-Ulm\n\nMärkte | Ulm/Neu-Ulm\n\n 05.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.40611751325067,
    "lng": 9.493771469779787
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "place": "Esslingen am Neckar",
    "date": "SEP",
    "description": "12\nSEP\nMärkte\nES funkelt – Lichtermarkt & Nachtflohmarkt\n\nMärkte | Esslingen am Neckar\n\n 12.09.2026\n\nDetails",
    "lat": 48.98703680193269,
    "lng": 10.041802214264472
  },
  {
    "title": "Naturparkmarkt",
    "place": "Pfedelbach",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt\n\nMärkte | Pfedelbach\n\n 13.09.2026\n\nDetails",
    "lat": 48.92710955483321,
    "lng": 8.831915753322983
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "place": "Pfedelbach",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt Pfedelbach\n\nMärkte | Pfedelbach\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 49.14833466259407,
    "lng": 9.006133204854587
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "place": "Egenhausen",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturpark-Markt Egenhausen\n\nMärkte | Egenhausen\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Egenhausen am 13.09.2026\n\nDetails",
    "lat": 48.482419426879375,
    "lng": 9.93955402115931
  },
  {
    "title": "Herbstmarkt",
    "place": "Güglingen",
    "date": "SEP",
    "description": "15\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Güglingen\n\n 15.09.2026\n\nDetails",
    "lat": 48.53387892169465,
    "lng": 10.09572077726668
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Sigmaringen",
    "date": "SEP",
    "description": "18\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Sigmaringen\n\n 18.09.2026\n\nDetails",
    "lat": 49.39930611112132,
    "lng": 10.190879941480237
  },
  {
    "title": "Historischer Markt",
    "place": "Heubach",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHistorischer Markt\n\nMärkte | Heubach\n\n 19.09.2026 - 20.09.2026\n\nDetails",
    "lat": 49.12666266243024,
    "lng": 9.974040692215338
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 49.303901619616994,
    "lng": 9.442889871994193
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "place": "Leibertingen",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nWildensteiner Jahrmarkt\n\nMärkte | Leibertingen\n\n 20.09.2026\n\nDetails",
    "lat": 49.34765104045099,
    "lng": 9.378190823460661
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Ühlingen-Birkendorf",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Ühlingen-Birkendorf\n\n 20.09.2026\n\nDetails",
    "lat": 49.1675178104457,
    "lng": 9.057345269340452
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Grafenhausen",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Grafenhausen\n\n 20.09.2026\n\nDetails",
    "lat": 49.02260020190639,
    "lng": 9.911179608854749
  },
  {
    "title": "Holz- und Bauernmarkt",
    "place": "Welzheim",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nHolz- und Bauernmarkt\n\nMärkte | Welzheim\n\n 20.09.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 49.032526938164075,
    "lng": 9.645366504601203
  },
  {
    "title": "Matthäusmarkt",
    "place": "Trochtelfingen",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nMatthäusmarkt\n\nMärkte | Trochtelfingen\n\n 21.09.2026\n\nDetails",
    "lat": 48.58181057199652,
    "lng": 8.729982235345162
  },
  {
    "title": "Herbstmarkt Harthausen",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nHerbstmarkt Harthausen\n\nMärkte | Filderstadt\n\n 21.09.2026\n\nDetails",
    "lat": 49.29002936087381,
    "lng": 9.379461766837208
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "22\nSEP\nMärkte\nHerbstmarkt Plattenhardt\n\nMärkte | Filderstadt\n\n 22.09.2026\n\nDetails",
    "lat": 48.62293112823296,
    "lng": 9.539731430479648
  },
  {
    "title": "Herbstmarkt",
    "place": "Schutterwald",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Schutterwald\n\n 26.09.2026\n\nDetails",
    "lat": 48.107764239469105,
    "lng": 9.247997822265678
  },
  {
    "title": "Trossinger Kilbemarkt",
    "place": "Trossingen",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nTrossinger Kilbemarkt\n\nMärkte | Trossingen\n\n 26.09.2026 - 27.09.2026\n\nDetails",
    "lat": 48.933209408622346,
    "lng": 9.461290745049588
  },
  {
    "title": "Großer Flohmarkt",
    "place": "Munderkingen",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nGroßer Flohmarkt\n\nMärkte | Munderkingen\n\n 26.09.2026\n\nDetails",
    "lat": 48.53165867686625,
    "lng": 9.09392560611242
  },
  {
    "title": "Herbstmarkt",
    "place": "Neckargemünd",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Neckargemünd\n\n 27.09.2026\n\nDetails",
    "lat": 48.182338278959705,
    "lng": 9.648795644779906
  },
  {
    "title": "Herbstmarkt und verkaufsoffenem Sonntag",
    "place": "Südwärts",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nHerbstmarkt und verkaufsoffenem Sonntag\n\nMärkte | Südwärts\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nLive MusikEssen & Trinken durch Vereine und FoodtrucksAttraktionen & GewinnspieleKinderprogrammShoppen im geöffneten Einzelhandel Weitere Aktionen in den teilnehmenden Geschäften\n\nDetails",
    "lat": 49.16791601557045,
    "lng": 9.984499460848612
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "place": "Müllheim",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\n„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag\n\nMärkte | Müllheim\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40…\n\nDetails",
    "lat": 48.46404841909292,
    "lng": 8.868336627835458
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "place": "Bad Schussenried",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nCittaslow – Tag mit verkaufsoffenem Sonntag\n\nMärkte | Bad Schussenried\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nDetails",
    "lat": 49.222873284971335,
    "lng": 9.31793742983517
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "place": "Filderstadt",
    "date": "SEP",
    "description": "30\nSEP\nMärkte\nHerbstmarkt Sielmingen\n\nMärkte | Filderstadt\n\n 30.09.2026\n\nDetails",
    "lat": 48.717852201281964,
    "lng": 9.468799850141135
  },
  {
    "title": "Kunsthandwerkermarkt",
    "place": "Kandern",
    "date": "",
    "description": "03\nOCT\nMärkte\nKunsthandwerkermarkt\n\nMärkte | Kandern\n\n 03.10.2026 - 04.10.2026\n\nDetails",
    "lat": 48.75243080872161,
    "lng": 9.3602815032068
  },
  {
    "title": "Biosphärenmarkt",
    "place": "Münsingen",
    "date": "",
    "description": "03\nOCT\nMärkte\nBiosphärenmarkt\n\nMärkte | Münsingen\n\n 03.10.2026\n\nDetails",
    "lat": 48.86433795833501,
    "lng": 8.919013442238226
  },
  {
    "title": "Drachenfest",
    "place": "Ostfildern",
    "date": "",
    "description": "03\nOCT\nMärkte\nDrachenfest\n\nMärkte | Ostfildern\n\n 03.10.2026\n\nDetails",
    "lat": 49.06682766855816,
    "lng": 9.42090046384418
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "place": "Ebhausen-Rotfelden",
    "date": "",
    "description": "03\nOCT\nMärkte\nNaturpark-Markt Ebhausen-Rotfelden\n\nMärkte | Ebhausen-Rotfelden\n\n 03.10.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Ebhausen-Rotfelden 03.10.2026\n\nDetails",
    "lat": 49.05327789888603,
    "lng": 10.07679439769272
  },
  {
    "title": "Naturparkmarkt",
    "place": "Murrhardt",
    "date": "",
    "description": "04\nOCT\nMärkte\nNaturparkmarkt\n\nMärkte | Murrhardt\n\n 04.10.2026\n\nDetails",
    "lat": 49.21323042014332,
    "lng": 8.944420076240503
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "place": "Ulm",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nUlmer Marktsonntag & verkaufsoffener Sonntag\n\nMärkte | Ulm\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nBummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer…\n\nDetails",
    "lat": 48.86154339823375,
    "lng": 9.584628314994738
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "place": "Ehingen (Donau)",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nFlanieren, Genießen, Einkaufen\n\nMärkte | Ehingen (Donau)\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nAm 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein.\n\nDetails",
    "lat": 48.09141424980097,
    "lng": 10.006143595416214
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "place": "Meckenbeuren",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nVerkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen\n\nMärkte | Meckenbeuren\n\n 04.10.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte…\n\nDetails",
    "lat": 49.246441764998686,
    "lng": 9.337424172773128
  },
  {
    "title": "Herbstmarkt Villingen",
    "place": "Villingen-Schwenningen",
    "date": "",
    "description": "08\nOCT\nMärkte\nHerbstmarkt Villingen\n\nMärkte | Villingen-Schwenningen\n\n 08.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.052932865850174,
    "lng": 9.209384416217386
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "place": "Laufenburg (Baden)",
    "date": "",
    "description": "09\nOCT\nMärkte\nHela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)\n\nMärkte | Laufenburg (Baden)\n\n 09.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.83248155607533,
    "lng": 9.070313995730869
  },
  {
    "title": "Krämermarkt",
    "place": "Gechingen",
    "date": "",
    "description": "09\nOCT\nMärkte\nKrämermarkt\n\nMärkte | Gechingen\n\n 09.10.2026\n\nDetails",
    "lat": 48.29673034355686,
    "lng": 9.207617205014534
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "place": "Isny im Allgäu",
    "date": "",
    "description": "10\nOCT\nMärkte\nIsnyer Schmalzmarkt\n\nMärkte | Isny im Allgäu\n\n 10.10.2026\n\nDetails",
    "lat": 49.050742736728616,
    "lng": 9.26780182346528
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "place": "Schramberg",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe\n\nMärkte | Schramberg\n\n 11.10.2026, 11:00 - 18:00 Uhr\n\nAm 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten…\n\nDetails",
    "lat": 48.679897355660465,
    "lng": 8.769636034399841
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "place": "Heilbronn",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nJazz & Einkauf mit SonntagsShopping\n\nMärkte | Heilbronn\n\n 11.10.2026, 13:00 - 18:00 Uhr\n\nJazz in der City und entspanntes Shopping in der gesamten Stadt. \n\nDetails",
    "lat": 48.84772765362399,
    "lng": 9.94460872882595
  },
  {
    "title": "Herbstmarkt",
    "place": "Schönau im Schwarzwald",
    "date": "",
    "description": "12\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 12.10.2026\n\nDetails",
    "lat": 48.15084669079798,
    "lng": 9.972207705111725
  },
  {
    "title": "Gallusmarkt",
    "place": "Wolfach",
    "date": "",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 49.30548237137656,
    "lng": 9.349172784791264
  },
  {
    "title": "Gallenmarkt",
    "place": "Burladingen",
    "date": "",
    "description": "15\nOCT\nMärkte\nGallenmarkt\n\nMärkte | Burladingen\n\n 15.10.2026\n\nDetails",
    "lat": 48.436261890014535,
    "lng": 9.086284671235848
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Gengenbach",
    "date": "",
    "description": "17\nOCT\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Gengenbach\n\n 17.10.2026 - 18.10.2026\n\nDetails",
    "lat": 49.17724053215532,
    "lng": 9.970812258791762
  },
  {
    "title": "Jahrmarkt Odenheim",
    "place": "Östringen",
    "date": "",
    "description": "17\nOCT\nMärkte\nJahrmarkt Odenheim\n\nMärkte | Östringen\n\n 17.10.2026\n\nDetails",
    "lat": 48.47984108751902,
    "lng": 9.709611562604975
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Endingen",
    "date": "",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.04758512532163,
    "lng": 9.67975338782479
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "place": "Ettlingen",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Herbstmarkt\n\nMärkte | Ettlingen\n\n 18.10.2026\n\nDetails",
    "lat": 48.02918621118226,
    "lng": 8.712506908104375
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "place": "Überlingen am Bodensee",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nÜberlinger Herbst mit Verkaufsoffenem Sonntag\n\nMärkte | Überlingen am Bodensee\n\n 18.10.2026, 10:00 - 18:00 Uhr\n\nErneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. \n\nDetails",
    "lat": 48.646261075685594,
    "lng": 9.506156865963518
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Pfullendorf",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 48.7233508129867,
    "lng": 9.950892665535765
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "place": "Donaueschingen",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in der Innenstadt\n\nMärkte | Donaueschingen\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nin der Donaueschinger Innenstadt.\n\nDetails",
    "lat": 48.17739646380195,
    "lng": 9.055473657026107
  },
  {
    "title": "Herbstmarkt",
    "place": "Schönau im Schwarzwald",
    "date": "",
    "description": "19\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 19.10.2026\n\nDetails",
    "lat": 48.1747437188781,
    "lng": 8.92831610548959
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "place": "Nürtingen",
    "date": "",
    "description": "25\nOCT\nMärkte\nKunsthandwerkermarkt / Kunst in den Schaufenstern\n\nMärkte | Nürtingen\n\n 25.10.2026\n\nDetails",
    "lat": 48.996417611729825,
    "lng": 9.192925069607824
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "place": "Kürnbach",
    "date": "",
    "description": "25\nOCT\nMärkte\nNaturparkmarkt und Kerwe\n\nMärkte | Kürnbach\n\n 25.10.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.97596624127157,
    "lng": 9.248086120313701
  },
  {
    "title": "Kirchweihmarkt",
    "place": "Laichingen",
    "date": "",
    "description": "26\nOCT\nMärkte\nKirchweihmarkt\n\nMärkte | Laichingen\n\n 26.10.2026\n\nDetails",
    "lat": 48.953191068757256,
    "lng": 9.692834379387131
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "place": "Herbolzheim",
    "date": "",
    "description": "30\nOCT\nMärkte\nTraditioneller Jahrmarkt\n\nMärkte | Herbolzheim\n\n 30.10.2026\n\nDetails",
    "lat": 48.093269293429074,
    "lng": 9.70748261237919
  },
  {
    "title": "25. Martinimarkt",
    "place": "Eschenbach",
    "date": "NOV",
    "description": "07\nNOV\nMärkte\n25. Martinimarkt\n\nMärkte | Eschenbach\n\n 07.11.2026\n\nDetails",
    "lat": 47.964809948212306,
    "lng": 8.844936869101538
  },
  {
    "title": "Esslinger Herbst",
    "place": "Esslingen am Neckar",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 08.11.2026\n\nDetails",
    "lat": 48.57806787046744,
    "lng": 10.166982823804176
  },
  {
    "title": "Bauernmarkt",
    "place": "Wertheim",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nBauernmarkt\n\nMärkte | Wertheim\n\n 08.11.2026\n\nDetails",
    "lat": 49.00021123811288,
    "lng": 9.148755750242962
  },
  {
    "title": "Martinimarkt",
    "place": "Sigmaringen",
    "date": "NOV",
    "description": "09\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 09.11.2026\n\nDetails",
    "lat": 49.294758182593505,
    "lng": 8.978980645847178
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "place": "Gerlingen",
    "date": "NOV",
    "description": "10\nNOV\nMärkte\n64. Modelleisenbahn-Börse\n\nMärkte | Gerlingen\n\n 10.11.2026, 11 - 16 Uhr\n\nDetails",
    "lat": 49.32647749389487,
    "lng": 8.854518266224286
  },
  {
    "title": "Martinimarkt",
    "place": "Bad Wurzach",
    "date": "NOV",
    "description": "12\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Bad Wurzach\n\n 12.11.2026\n\nDetails",
    "lat": 47.90451342708816,
    "lng": 9.660083256418957
  },
  {
    "title": "Martinimarkt",
    "place": "Mühlacker",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mühlacker\n\n 14.11.2026\n\nDetails",
    "lat": 48.185084946816595,
    "lng": 9.445558426891678
  },
  {
    "title": "Wintermarkt",
    "place": "Wehingen",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nWintermarkt\n\nMärkte | Wehingen\n\n 14.11.2026\n\nDetails",
    "lat": 48.51887845072513,
    "lng": 9.095974934017365
  },
  {
    "title": "Esslinger Herbst",
    "place": "Esslingen am Neckar",
    "date": "NOV",
    "description": "15\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 15.11.2026\n\nDetails",
    "lat": 48.97628135963447,
    "lng": 9.298811668834341
  },
  {
    "title": "Martinimarkt",
    "place": "Sigmaringen",
    "date": "NOV",
    "description": "16\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 16.11.2026\n\nDetails",
    "lat": 48.16791763036123,
    "lng": 9.751187033478116
  },
  {
    "title": "Martinimarkt",
    "place": "Mengen",
    "date": "NOV",
    "description": "18\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mengen\n\n 18.11.2026\n\nDetails",
    "lat": 48.50647373928535,
    "lng": 8.931961181927958
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Kandern",
    "date": "NOV",
    "description": "24\nNOV\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 24.11.2026\n\nDetails",
    "lat": 48.653331974514444,
    "lng": 10.180215732658054
  },
  {
    "title": "Martinimarkt",
    "place": "Hornberg",
    "date": "NOV",
    "description": "27\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Hornberg\n\n 27.11.2026\n\nDetails",
    "lat": 48.662922166541016,
    "lng": 9.197580021330573
  },
  {
    "title": "Kreativmarkt",
    "place": "Rielasingen-Worblingen",
    "date": "NOV",
    "description": "28\nNOV\nMärkte\nKreativmarkt\n\nMärkte | Rielasingen-Worblingen\n\n 28.11.2026\n\nDetails",
    "lat": 48.04668872568898,
    "lng": 8.708197420640865
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Schopfheim",
    "date": "",
    "description": "01\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 01.12.2026 - 02.12.2026\n\nDetails",
    "lat": 48.92399367932646,
    "lng": 9.584853998655726
  },
  {
    "title": "“Kloosemärt”",
    "place": "Hüfingen",
    "date": "",
    "description": "01\nDEC\nMärkte\n“Kloosemärt”\n\nMärkte | Hüfingen\n\n 01.12.2026\n\nDetails",
    "lat": 48.15705291106689,
    "lng": 9.093985211762368
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Kandern",
    "date": "",
    "description": "01\nDEC\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 01.12.2026\n\nDetails",
    "lat": 48.53530874570612,
    "lng": 9.523932702517591
  },
  {
    "title": "Kathreinenmarkt",
    "place": "Munderkingen",
    "date": "",
    "description": "03\nDEC\nMärkte\nKathreinenmarkt\n\nMärkte | Munderkingen\n\n 03.12.2026\n\nDetails",
    "lat": 47.93657708792165,
    "lng": 9.82908022809158
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Schopfheim",
    "date": "",
    "description": "08\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 08.12.2026\n\nDetails",
    "lat": 48.849398170606996,
    "lng": 9.645780652478106
  },
  {
    "title": "Nikolausmarkt",
    "place": "Pfullendorf",
    "date": "",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 49.28014851386884,
    "lng": 8.840817819336301
  },
  {
    "title": "Wintermarkt Schluchsee",
    "place": "Schluchsee",
    "date": "",
    "description": "28\nDEC\nMärkte\nWintermarkt Schluchsee\n\nMärkte | Schluchsee\n\n 28.12.2026 - 30.12.2026\n\nDetails",
    "lat": 48.31812003369841,
    "lng": 9.91634576896016
  },
  {
    "title": "Märzenmarkt",
    "place": "Kirchheim unter Teck",
    "date": "",
    "description": "08\nMAR\nMärkte\nMärzenmarkt\n\nMärkte | Kirchheim unter Teck\n\n 08.03.2027\n\nDetails",
    "lat": 48.25357392528375,
    "lng": 9.857709934513474
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Radolfzell am Bodensee",
    "date": "Sonntag",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 48.070168619218016,
    "lng": 8.776844364528813
  },
  {
    "title": "Maimarkt",
    "place": "Lonsee",
    "date": "MAY",
    "description": "01\nMAY\nMärkte\nMaimarkt\n\nMärkte | Lonsee\n\n 01.05.2027\n\nDetails",
    "lat": 48.38218040333468,
    "lng": 9.9580612668882
  },
  {
    "title": "Maimarkt",
    "place": "Pfullendorf",
    "date": "MAY",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2027\n\nDetails",
    "lat": 49.25889835125686,
    "lng": 9.413130763443364
  },
  {
    "title": "Flohmarkt",
    "place": "Emmendingen",
    "date": "MAY",
    "description": "08\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 08.05.2027\n\nDetails",
    "lat": 48.029542565162934,
    "lng": 9.000703232873034
  }
];