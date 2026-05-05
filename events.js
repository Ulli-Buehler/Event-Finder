const EVENTS = [
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.16603165602932,
    "lng": 10.144566777286594
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.66688265926993,
    "lng": 9.9283788885516
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 47.97750321074632,
    "lng": 9.712852449152283
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.56574355620258,
    "lng": 9.904769980772707
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 48.111693452765756,
    "lng": 8.771967941210672
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 48.96915347888193,
    "lng": 9.615914502724868
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 49.21902470477666,
    "lng": 9.323531000098566
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 48.27245238542418,
    "lng": 9.018099687597461
  },
  {
    "title": "GardenLife",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.74853713472812,
    "lng": 9.802117378150196
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.75011894852313,
    "lng": 8.85354845805301
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 48.579912626163356,
    "lng": 9.401966840264915
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 49.144951756486805,
    "lng": 8.990277165999895
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 47.97135693673474,
    "lng": 9.699034987171437
  },
  {
    "title": "Muttertagsmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "17\nMAY\nMärkte\nMuttertagsmarkt\n\nMärkte | Hausach\n\n 17.05.2026\n\nDetails",
    "lat": 48.0634827386329,
    "lng": 9.710464509775397
  },
  {
    "title": "Pfingstmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.19524693309573,
    "lng": 8.739143013355573
  },
  {
    "title": "Michelstädter Bienenmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "22\nMAY\nMärkte\nMichelstädter Bienenmarkt\n\nMärkte | Michelstadt\n\n 22.05.2026 - 31.05.2026\n\nDetails",
    "lat": 47.91618180474704,
    "lng": 9.795122649246434
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "23\nMAY\nMärkte\nMittelaltermarkt mit Ritterturnier und Feuershow\n\nMärkte | Dischingen\n\n 23.05.2026 - 25.05.2026\n\nDetails",
    "lat": 49.00699093676115,
    "lng": 9.8225198015532
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt\n\nMärkte | Löwenstein\n\n 24.05.2026\n\nDetails",
    "lat": 47.93394335976977,
    "lng": 9.055978046493212
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt Löwenstein\n\nMärkte | Löwenstein\n\n 24.05.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 49.03780754465295,
    "lng": 8.892436313876932
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "25\nMAY\nMärkte\nTrossinger Pfingstmarkt\n\nMärkte | Trossingen\n\n 25.05.2026\n\nDetails",
    "lat": 48.260248185353674,
    "lng": 9.843896496796365
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "30\nMAY\nMärkte\nKUNST.MARKT.GENUSS. mit Vogtsburg-Markt\n\nMärkte | Vogtsburg im Kaiserstuhl\n\n 30.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.52640069377062,
    "lng": 10.008796846191787
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "31\nMAY\nMärkte\nNaturpark-Markt Ettlingen\n\nMärkte | Ettlingen\n\n 31.05.2026, 11:00 - 17:00 Uhr\n\nFrische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker…\n\nDetails",
    "lat": 49.20833674987206,
    "lng": 9.735321359043727
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "06\nJUN\nMärkte\nRosen-, Garten- & Kunstmarkt\n\nMärkte | Waiblingen\n\n 06.06.2026 - 07.06.2026\n\nDetails",
    "lat": 48.88972078161641,
    "lng": 10.19479059637459
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 48.08103771544814,
    "lng": 9.232912683004583
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nNaturpark-Markt Oberndorf a. N.\n\nMärkte | Oberndorf am Neckar\n\n 07.06.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt am 7. Juni 2026\n\nDetails",
    "lat": 48.754588419531764,
    "lng": 9.001934475551426
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "11\nJUN\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 11.06.2026\n\nDetails",
    "lat": 48.11311465325227,
    "lng": 8.868202587000233
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nTag der Rose & Antikmarkt\n\nMärkte | Ulm/Neu-Ulm\n\n 13.06.2026\n\nDetails",
    "lat": 47.997122280256505,
    "lng": 9.264536587682459
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 49.055505069064104,
    "lng": 9.718773084993439
  },
  {
    "title": "Kunstmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nKunstmarkt\n\nMärkte | Sipplingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 48.241436324654394,
    "lng": 9.934127331305643
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nUrsulamarkt mit Flohmarkt\n\nMärkte | Rosenfeld\n\n 13.06.2026\n\nDetails",
    "lat": 48.98358245729764,
    "lng": 9.602121884574432
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "14\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Calw\n\n 14.06.2026\n\nDetails",
    "lat": 48.89424235642397,
    "lng": 9.882416076947685
  },
  {
    "title": "Häussler Backtage",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "18\nJUN\nMärkte\nHäussler Backtage\n\nMärkte | Altheim\n\n 18.06.2026 - 20.06.2026\n\nDetails",
    "lat": 48.5162741845295,
    "lng": 9.955512976079067
  },
  {
    "title": "Büchermarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nBüchermarkt\n\nMärkte | Kirchberg an der Jagst\n\n 20.06.2026\n\nDetails",
    "lat": 49.1510413678224,
    "lng": 8.973161025731798
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nDarmsheimer Töpfermarkt\n\nMärkte | Sindelfingen\n\n 20.06.2026 - 21.06.2026\n\nDetails",
    "lat": 48.3665592979194,
    "lng": 8.941483083017681
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Ettlingen\n\n 21.06.2026\n\nDetails",
    "lat": 48.63938812547201,
    "lng": 9.33462535707859
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt Plüderhausen\n\nMärkte | Plüderhausen\n\n 21.06.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.521287847262755,
    "lng": 10.115731066732756
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 48.9747286395569,
    "lng": 9.69314491791304
  },
  {
    "title": "Peter und Paul Markt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\nPeter und Paul Markt\n\nMärkte | Schönau im Schwarzwald\n\n 29.06.2026\n\nDetails",
    "lat": 49.088326924703985,
    "lng": 9.547456625008275
  },
  {
    "title": "635. Zunftmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\n635. Zunftmarkt\n\nMärkte | Bad Wimpfen\n\n 29.06.2026 - 30.08.2026\n\nDetails",
    "lat": 49.15523207453528,
    "lng": 9.68578225354122
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "02\nJUL\nMärkte\nHamburger Fischmarkt in Stuttgart\n\nMärkte | Stuttgart\n\n 02.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.73172833078719,
    "lng": 9.527811537681657
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 48.48090252678464,
    "lng": 9.898072159271564
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nSüddeutscher Kunsthandwerkermarkt\n\nMärkte | Villingen-Schwenningen\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.937005148587104,
    "lng": 9.33367689818761
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nTöpfer- und Kunstmarkt\n\nMärkte | Immenstaad am Bodensee\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.534897057332074,
    "lng": 9.622427883192536
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.01755101002736,
    "lng": 9.504134130739672
  },
  {
    "title": "Life’s finest",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "09\nJUL\nMärkte\nLife’s finest\n\nMärkte | Bretten\n\n 09.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.14031389425179,
    "lng": 8.825484414396374
  },
  {
    "title": "JAAmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "11\nJUL\nMärkte\nJAAmarkt\n\nMärkte | Aalen\n\n 11.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.976439418740654,
    "lng": 9.901962668445892
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "14\nJUL\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Kehl\n\n 14.07.2026\n\nDetails",
    "lat": 48.85385197017057,
    "lng": 10.097272915780714
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nPforzheimer Gruschtelmarkt\n\nMärkte | Pforzheim\n\n 17.07.2026 - 18.07.2026\n\nDetails",
    "lat": 48.20850615546113,
    "lng": 10.051776701675015
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nIsnyer Feierabendmärkte 2026\n\nMärkte | Isny im Allgäu\n\n 17.07.2026, 16:00 - 21:00 Uhr\n\nDie Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. \n\nDetails",
    "lat": 47.97302973307029,
    "lng": 9.408114726070847
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "18\nJUL\nMärkte\n“Sommerfrische im Fürstlichen Hofgarten”\n\nMärkte | Wolfegg\n\n 18.07.2026\n\nDetails",
    "lat": 49.1934673412883,
    "lng": 9.347192679181186
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt\n\nMärkte | Fichtenberg\n\n 19.07.2026\n\nDetails",
    "lat": 48.75438408939702,
    "lng": 9.65533925808504
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nKunst-Handwerker-Markt\n\nMärkte | Blaufelden\n\n 19.07.2026\n\nDetails",
    "lat": 48.833593573205356,
    "lng": 9.557941331944317
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt Fichtenberg\n\nMärkte | Fichtenberg\n\n 19.07.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 49.24530751264592,
    "lng": 10.179347982129904
  },
  {
    "title": "Jakobimarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "25\nJUL\nMärkte\nJakobimarkt\n\nMärkte | Nellingen\n\n 25.07.2026\n\nDetails",
    "lat": 48.76060635023931,
    "lng": 8.905807740001759
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 01.08.2026\n\nDetails",
    "lat": 48.21791320983965,
    "lng": 10.027411824722014
  },
  {
    "title": "Isnyer Töpfermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nIsnyer Töpfermarkt\n\nMärkte | Isny im Allgäu\n\n 01.08.2026 - 02.08.2026\n\nDetails",
    "lat": 48.55610761605417,
    "lng": 8.752681539366927
  },
  {
    "title": "Kunstgewerbemarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "02\nAUG\nMärkte\nKunstgewerbemarkt\n\nMärkte | Bietigheim-Bissingen\n\n 02.08.2026\n\nDetails",
    "lat": 48.41688443068432,
    "lng": 8.950918592858383
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\n16. Gartenmarkt “Sommer – Blüten – Träume”\n\nMärkte | Rechberghausen\n\n 08.08.2026 - 09.08.2026\n\nDetails",
    "lat": 48.270657557846356,
    "lng": 9.403794913520416
  },
  {
    "title": "Vespermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 08.08.2026\n\nDetails",
    "lat": 48.317251944828826,
    "lng": 10.041726218240312
  },
  {
    "title": "Kräutermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nKräutermarkt\n\nMärkte | Mosbach\n\n 08.08.2026\n\nDetails",
    "lat": 49.22535533745362,
    "lng": 10.136921588105094
  },
  {
    "title": "Kunst- & Genießermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "14\nAUG\nMärkte\nKunst- & Genießermarkt\n\nMärkte | Uhldingen-Mühlhofen\n\n 14.08.2026 - 16.08.2026\n\nDetails",
    "lat": 49.058342687464304,
    "lng": 9.968037183837035
  },
  {
    "title": "Abendflohmarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 49.34867770389498,
    "lng": 9.243136538325523
  },
  {
    "title": "Vespermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 15.08.2026\n\nDetails",
    "lat": 48.569113249768336,
    "lng": 9.901733330921612
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 48.705375852401154,
    "lng": 9.431238881583385
  },
  {
    "title": "Internationaler Töpfermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "28\nAUG\nMärkte\nInternationaler Töpfermarkt\n\nMärkte | Überlingen\n\n 28.08.2026 - 30.08.2026\n\nDetails",
    "lat": 48.368889054183775,
    "lng": 10.121425736298342
  },
  {
    "title": "Französischer Markt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nFranzösischer Markt\n\nMärkte | Neckargemünd\n\n 03.09.2026 - 05.09.2026\n\nDetails",
    "lat": 48.18943316542281,
    "lng": 10.017136669918402
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 03.09.2026\n\nDetails",
    "lat": 48.404380916990455,
    "lng": 9.99005427678881
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Furtwangen\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 49.05988969416129,
    "lng": 8.97893797373871
  },
  {
    "title": "Fürstliche Gartentage",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nFürstliche Gartentage\n\nMärkte | Langenburg\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.57915456289773,
    "lng": 9.976501808544677
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "05\nSEP\nMärkte\nTöpfermarkt Neu-Ulm\n\nMärkte | Ulm/Neu-Ulm\n\n 05.09.2026 - 06.09.2026\n\nDetails",
    "lat": 49.30560345757717,
    "lng": 9.379847227113222
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "12\nSEP\nMärkte\nES funkelt – Lichtermarkt & Nachtflohmarkt\n\nMärkte | Esslingen am Neckar\n\n 12.09.2026\n\nDetails",
    "lat": 47.999096097320106,
    "lng": 10.115179535801522
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt\n\nMärkte | Pfedelbach\n\n 13.09.2026\n\nDetails",
    "lat": 48.64756144660944,
    "lng": 9.94763942159863
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt Pfedelbach\n\nMärkte | Pfedelbach\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.701487172742496,
    "lng": 9.520871617819513
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturpark-Markt Egenhausen\n\nMärkte | Egenhausen\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Egenhausen am 13.09.2026\n\nDetails",
    "lat": 47.94396605723292,
    "lng": 8.988818966705844
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "15\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Güglingen\n\n 15.09.2026\n\nDetails",
    "lat": 48.230211232347365,
    "lng": 9.966239550693963
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "18\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Sigmaringen\n\n 18.09.2026\n\nDetails",
    "lat": 48.96461101812635,
    "lng": 8.864346178285373
  },
  {
    "title": "Historischer Markt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHistorischer Markt\n\nMärkte | Heubach\n\n 19.09.2026 - 20.09.2026\n\nDetails",
    "lat": 48.70062403608033,
    "lng": 9.163671122366527
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 48.37473912023665,
    "lng": 10.059238560683582
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nWildensteiner Jahrmarkt\n\nMärkte | Leibertingen\n\n 20.09.2026\n\nDetails",
    "lat": 48.28220333478232,
    "lng": 10.033170402758609
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Ühlingen-Birkendorf\n\n 20.09.2026\n\nDetails",
    "lat": 48.837869610273586,
    "lng": 10.096429481292068
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Grafenhausen\n\n 20.09.2026\n\nDetails",
    "lat": 47.942859068889064,
    "lng": 9.790158878170319
  },
  {
    "title": "Holz- und Bauernmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nHolz- und Bauernmarkt\n\nMärkte | Welzheim\n\n 20.09.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.97557190219102,
    "lng": 9.946229919495375
  },
  {
    "title": "Matthäusmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nMatthäusmarkt\n\nMärkte | Trochtelfingen\n\n 21.09.2026\n\nDetails",
    "lat": 48.32753449164486,
    "lng": 9.313443188109607
  },
  {
    "title": "Herbstmarkt Harthausen",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nHerbstmarkt Harthausen\n\nMärkte | Filderstadt\n\n 21.09.2026\n\nDetails",
    "lat": 49.27286844061066,
    "lng": 9.790044061389676
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "22\nSEP\nMärkte\nHerbstmarkt Plattenhardt\n\nMärkte | Filderstadt\n\n 22.09.2026\n\nDetails",
    "lat": 48.22691396555619,
    "lng": 9.67588673278743
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Schutterwald\n\n 26.09.2026\n\nDetails",
    "lat": 48.175970830376,
    "lng": 8.895819793965554
  },
  {
    "title": "Trossinger Kilbemarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nTrossinger Kilbemarkt\n\nMärkte | Trossingen\n\n 26.09.2026 - 27.09.2026\n\nDetails",
    "lat": 48.081106698189664,
    "lng": 9.776568519849938
  },
  {
    "title": "Großer Flohmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nGroßer Flohmarkt\n\nMärkte | Munderkingen\n\n 26.09.2026\n\nDetails",
    "lat": 48.521990280775675,
    "lng": 9.871075362425652
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Neckargemünd\n\n 27.09.2026\n\nDetails",
    "lat": 49.24907733725909,
    "lng": 9.936525526447268
  },
  {
    "title": "Herbstmarkt und verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nHerbstmarkt und verkaufsoffenem Sonntag\n\nMärkte | Südwärts\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nLive MusikEssen & Trinken durch Vereine und FoodtrucksAttraktionen & GewinnspieleKinderprogrammShoppen im geöffneten Einzelhandel Weitere Aktionen in den teilnehmenden Geschäften\n\nDetails",
    "lat": 48.91351784482496,
    "lng": 9.724253693350274
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\n„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag\n\nMärkte | Müllheim\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40…\n\nDetails",
    "lat": 49.34846349187153,
    "lng": 8.894440032005635
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nCittaslow – Tag mit verkaufsoffenem Sonntag\n\nMärkte | Bad Schussenried\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nDetails",
    "lat": 48.48129615325992,
    "lng": 8.983299108686104
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "30\nSEP\nMärkte\nHerbstmarkt Sielmingen\n\nMärkte | Filderstadt\n\n 30.09.2026\n\nDetails",
    "lat": 48.22823915831357,
    "lng": 9.948325085256556
  },
  {
    "title": "Kunsthandwerkermarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nKunsthandwerkermarkt\n\nMärkte | Kandern\n\n 03.10.2026 - 04.10.2026\n\nDetails",
    "lat": 48.56759424440276,
    "lng": 9.799860567430748
  },
  {
    "title": "Biosphärenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nBiosphärenmarkt\n\nMärkte | Münsingen\n\n 03.10.2026\n\nDetails",
    "lat": 49.25870097747131,
    "lng": 8.749572645781676
  },
  {
    "title": "Drachenfest",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nDrachenfest\n\nMärkte | Ostfildern\n\n 03.10.2026\n\nDetails",
    "lat": 48.039196271313386,
    "lng": 9.520255025489789
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nNaturpark-Markt Ebhausen-Rotfelden\n\nMärkte | Ebhausen-Rotfelden\n\n 03.10.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Ebhausen-Rotfelden 03.10.2026\n\nDetails",
    "lat": 48.8748304894084,
    "lng": 8.737359268240386
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "04\nOCT\nMärkte\nNaturparkmarkt\n\nMärkte | Murrhardt\n\n 04.10.2026\n\nDetails",
    "lat": 49.02499733997096,
    "lng": 8.923153464174938
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nUlmer Marktsonntag & verkaufsoffener Sonntag\n\nMärkte | Ulm\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nBummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer…\n\nDetails",
    "lat": 48.91679221474368,
    "lng": 9.878027139907635
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nFlanieren, Genießen, Einkaufen\n\nMärkte | Ehingen (Donau)\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nAm 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein.\n\nDetails",
    "lat": 49.29171484741484,
    "lng": 9.02260198764907
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nVerkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen\n\nMärkte | Meckenbeuren\n\n 04.10.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte…\n\nDetails",
    "lat": 48.44641274162093,
    "lng": 8.765129824905506
  },
  {
    "title": "Herbstmarkt Villingen",
    "place": "Unbekannt",
    "date": "",
    "description": "08\nOCT\nMärkte\nHerbstmarkt Villingen\n\nMärkte | Villingen-Schwenningen\n\n 08.10.2026 - 11.10.2026\n\nDetails",
    "lat": 49.08358599369238,
    "lng": 9.229358553277342
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "place": "Unbekannt",
    "date": "",
    "description": "09\nOCT\nMärkte\nHela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)\n\nMärkte | Laufenburg (Baden)\n\n 09.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.31824111303557,
    "lng": 10.088542046139398
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "09\nOCT\nMärkte\nKrämermarkt\n\nMärkte | Gechingen\n\n 09.10.2026\n\nDetails",
    "lat": 48.022380748025114,
    "lng": 10.169250621398492
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "10\nOCT\nMärkte\nIsnyer Schmalzmarkt\n\nMärkte | Isny im Allgäu\n\n 10.10.2026\n\nDetails",
    "lat": 49.130509203956514,
    "lng": 8.87843524461936
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe\n\nMärkte | Schramberg\n\n 11.10.2026, 11:00 - 18:00 Uhr\n\nAm 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten…\n\nDetails",
    "lat": 49.176172176290464,
    "lng": 9.882520697660084
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nJazz & Einkauf mit SonntagsShopping\n\nMärkte | Heilbronn\n\n 11.10.2026, 13:00 - 18:00 Uhr\n\nJazz in der City und entspanntes Shopping in der gesamten Stadt. \n\nDetails",
    "lat": 48.341901509276916,
    "lng": 9.98536951860498
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "12\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 12.10.2026\n\nDetails",
    "lat": 48.119548411642235,
    "lng": 9.523973974252348
  },
  {
    "title": "Gallusmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 49.18035398437021,
    "lng": 8.958662309188734
  },
  {
    "title": "Gallenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "15\nOCT\nMärkte\nGallenmarkt\n\nMärkte | Burladingen\n\n 15.10.2026\n\nDetails",
    "lat": 48.25333647596609,
    "lng": 9.356694062391973
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "17\nOCT\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Gengenbach\n\n 17.10.2026 - 18.10.2026\n\nDetails",
    "lat": 49.360938937760984,
    "lng": 9.437126640425573
  },
  {
    "title": "Jahrmarkt Odenheim",
    "place": "Unbekannt",
    "date": "",
    "description": "17\nOCT\nMärkte\nJahrmarkt Odenheim\n\nMärkte | Östringen\n\n 17.10.2026\n\nDetails",
    "lat": 48.46052032522303,
    "lng": 8.758864323727382
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.53500211713242,
    "lng": 9.057076290978543
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Herbstmarkt\n\nMärkte | Ettlingen\n\n 18.10.2026\n\nDetails",
    "lat": 49.04640913742921,
    "lng": 10.101695084129707
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nÜberlinger Herbst mit Verkaufsoffenem Sonntag\n\nMärkte | Überlingen am Bodensee\n\n 18.10.2026, 10:00 - 18:00 Uhr\n\nErneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. \n\nDetails",
    "lat": 49.25495843805393,
    "lng": 9.473757138316843
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 48.41001671623876,
    "lng": 8.707363168250321
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in der Innenstadt\n\nMärkte | Donaueschingen\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nin der Donaueschinger Innenstadt.\n\nDetails",
    "lat": 48.21553782026848,
    "lng": 9.628426742721595
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "19\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 19.10.2026\n\nDetails",
    "lat": 49.13887952657618,
    "lng": 10.02682007883729
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "place": "Unbekannt",
    "date": "",
    "description": "25\nOCT\nMärkte\nKunsthandwerkermarkt / Kunst in den Schaufenstern\n\nMärkte | Nürtingen\n\n 25.10.2026\n\nDetails",
    "lat": 48.96465950934964,
    "lng": 9.062765267143934
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "place": "Unbekannt",
    "date": "",
    "description": "25\nOCT\nMärkte\nNaturparkmarkt und Kerwe\n\nMärkte | Kürnbach\n\n 25.10.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.5713606678932,
    "lng": 9.876160549587729
  },
  {
    "title": "Kirchweihmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "26\nOCT\nMärkte\nKirchweihmarkt\n\nMärkte | Laichingen\n\n 26.10.2026\n\nDetails",
    "lat": 48.95834818912435,
    "lng": 9.415100531131047
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "30\nOCT\nMärkte\nTraditioneller Jahrmarkt\n\nMärkte | Herbolzheim\n\n 30.10.2026\n\nDetails",
    "lat": 48.089673292537086,
    "lng": 9.679604600098692
  },
  {
    "title": "25. Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "07\nNOV\nMärkte\n25. Martinimarkt\n\nMärkte | Eschenbach\n\n 07.11.2026\n\nDetails",
    "lat": 48.53493733143868,
    "lng": 8.89266359571355
  },
  {
    "title": "Esslinger Herbst",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 08.11.2026\n\nDetails",
    "lat": 48.046364270904995,
    "lng": 9.247618459979051
  },
  {
    "title": "Bauernmarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nBauernmarkt\n\nMärkte | Wertheim\n\n 08.11.2026\n\nDetails",
    "lat": 49.226607285000355,
    "lng": 9.262315442307138
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "09\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 09.11.2026\n\nDetails",
    "lat": 48.92654792182915,
    "lng": 9.858081414542461
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "10\nNOV\nMärkte\n64. Modelleisenbahn-Börse\n\nMärkte | Gerlingen\n\n 10.11.2026, 11 - 16 Uhr\n\nDetails",
    "lat": 49.168624606146444,
    "lng": 9.834419714618605
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "12\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Bad Wurzach\n\n 12.11.2026\n\nDetails",
    "lat": 47.91936395815902,
    "lng": 9.587439131943597
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mühlacker\n\n 14.11.2026\n\nDetails",
    "lat": 48.641860374797936,
    "lng": 10.166736509274621
  },
  {
    "title": "Wintermarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nWintermarkt\n\nMärkte | Wehingen\n\n 14.11.2026\n\nDetails",
    "lat": 48.53430826218963,
    "lng": 8.747574809322765
  },
  {
    "title": "Esslinger Herbst",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "15\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 15.11.2026\n\nDetails",
    "lat": 49.359050109631305,
    "lng": 9.590094888599063
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "16\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 16.11.2026\n\nDetails",
    "lat": 48.50703540508611,
    "lng": 9.650482306728158
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "18\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mengen\n\n 18.11.2026\n\nDetails",
    "lat": 49.26976179602965,
    "lng": 10.17996527845986
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "24\nNOV\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 24.11.2026\n\nDetails",
    "lat": 48.47468142495786,
    "lng": 8.736599563958224
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "27\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Hornberg\n\n 27.11.2026\n\nDetails",
    "lat": 48.45255190636947,
    "lng": 9.27560388346332
  },
  {
    "title": "Kreativmarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "28\nNOV\nMärkte\nKreativmarkt\n\nMärkte | Rielasingen-Worblingen\n\n 28.11.2026\n\nDetails",
    "lat": 48.25640209957647,
    "lng": 9.866713285686364
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Unbekannt",
    "date": "",
    "description": "01\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 01.12.2026 - 02.12.2026\n\nDetails",
    "lat": 48.735952721581974,
    "lng": 9.543290407935121
  },
  {
    "title": "“Kloosemärt”",
    "place": "Unbekannt",
    "date": "",
    "description": "01\nDEC\nMärkte\n“Kloosemärt”\n\nMärkte | Hüfingen\n\n 01.12.2026\n\nDetails",
    "lat": 48.838352161131255,
    "lng": 9.058829869155476
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "01\nDEC\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 01.12.2026\n\nDetails",
    "lat": 48.55612982787471,
    "lng": 9.313006215321655
  },
  {
    "title": "Kathreinenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nDEC\nMärkte\nKathreinenmarkt\n\nMärkte | Munderkingen\n\n 03.12.2026\n\nDetails",
    "lat": 48.19126880421688,
    "lng": 10.10147096711375
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Unbekannt",
    "date": "",
    "description": "08\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 08.12.2026\n\nDetails",
    "lat": 49.29261422158282,
    "lng": 9.00157581482581
  },
  {
    "title": "Nikolausmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 49.0557299093695,
    "lng": 10.146708441220643
  },
  {
    "title": "Wintermarkt Schluchsee",
    "place": "Unbekannt",
    "date": "",
    "description": "28\nDEC\nMärkte\nWintermarkt Schluchsee\n\nMärkte | Schluchsee\n\n 28.12.2026 - 30.12.2026\n\nDetails",
    "lat": 49.018417063651505,
    "lng": 9.922523974699597
  },
  {
    "title": "Märzenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "08\nMAR\nMärkte\nMärzenmarkt\n\nMärkte | Kirchheim unter Teck\n\n 08.03.2027\n\nDetails",
    "lat": 48.03362469748218,
    "lng": 8.90173678827808
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 49.31548140710281,
    "lng": 9.920271530384516
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "01\nMAY\nMärkte\nMaimarkt\n\nMärkte | Lonsee\n\n 01.05.2027\n\nDetails",
    "lat": 48.91902888079495,
    "lng": 9.741922294867772
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2027\n\nDetails",
    "lat": 48.27451025365645,
    "lng": 9.585227161348733
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "08\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 08.05.2027\n\nDetails",
    "lat": 49.31727108027965,
    "lng": 8.919716238467483
  }
];