const EVENTS = [
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.28677161971095,
    "lng": 9.365828271833605
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.13212490364075,
    "lng": 9.506136876225126
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 47.99537386214517,
    "lng": 9.666733081162036
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.21761145526106,
    "lng": 9.180062321153505
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 49.13579640210466,
    "lng": 8.83490842189783
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 48.48472847622864,
    "lng": 10.164654305876795
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 49.20062877184599,
    "lng": 9.24566886544773
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 48.20132163202489,
    "lng": 9.868786465103279
  },
  {
    "title": "GardenLife",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.67314647466519,
    "lng": 9.71582603098123
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.768283759693404,
    "lng": 9.489076700704782
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 48.09295564835276,
    "lng": 9.281876773186632
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 48.8358085739121,
    "lng": 9.383356141913643
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 48.28760936157123,
    "lng": 9.457812509192985
  },
  {
    "title": "Muttertagsmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "17\nMAY\nMärkte\nMuttertagsmarkt\n\nMärkte | Hausach\n\n 17.05.2026\n\nDetails",
    "lat": 49.03226664227467,
    "lng": 9.019849753049717
  },
  {
    "title": "Pfingstmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.64513456819139,
    "lng": 9.276810330941966
  },
  {
    "title": "Michelstädter Bienenmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "22\nMAY\nMärkte\nMichelstädter Bienenmarkt\n\nMärkte | Michelstadt\n\n 22.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.65882582892089,
    "lng": 8.886614331902859
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "23\nMAY\nMärkte\nMittelaltermarkt mit Ritterturnier und Feuershow\n\nMärkte | Dischingen\n\n 23.05.2026 - 25.05.2026\n\nDetails",
    "lat": 48.25898589560238,
    "lng": 9.542323543523825
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt\n\nMärkte | Löwenstein\n\n 24.05.2026\n\nDetails",
    "lat": 48.51702856872878,
    "lng": 8.924452570609466
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt Löwenstein\n\nMärkte | Löwenstein\n\n 24.05.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.87464428749361,
    "lng": 10.112933786332976
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "25\nMAY\nMärkte\nTrossinger Pfingstmarkt\n\nMärkte | Trossingen\n\n 25.05.2026\n\nDetails",
    "lat": 48.670836263653136,
    "lng": 10.161368419992963
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "30\nMAY\nMärkte\nKUNST.MARKT.GENUSS. mit Vogtsburg-Markt\n\nMärkte | Vogtsburg im Kaiserstuhl\n\n 30.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.514435089448355,
    "lng": 9.0453025226637
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "31\nMAY\nMärkte\nNaturpark-Markt Ettlingen\n\nMärkte | Ettlingen\n\n 31.05.2026, 11:00 - 17:00 Uhr\n\nFrische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker…\n\nDetails",
    "lat": 48.788685900899935,
    "lng": 8.737859857455554
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "06\nJUN\nMärkte\nRosen-, Garten- & Kunstmarkt\n\nMärkte | Waiblingen\n\n 06.06.2026 - 07.06.2026\n\nDetails",
    "lat": 48.30355691291206,
    "lng": 9.247468565248395
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 48.91016921585163,
    "lng": 9.979779762534363
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "07\nJUN\nMärkte\nNaturpark-Markt Oberndorf a. N.\n\nMärkte | Oberndorf am Neckar\n\n 07.06.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt am 7. Juni 2026\n\nDetails",
    "lat": 49.30417550806705,
    "lng": 9.16210589660756
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "11\nJUN\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 11.06.2026\n\nDetails",
    "lat": 47.99540862300709,
    "lng": 9.7444570049865
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nTag der Rose & Antikmarkt\n\nMärkte | Ulm/Neu-Ulm\n\n 13.06.2026\n\nDetails",
    "lat": 49.08774230643354,
    "lng": 10.182491348381078
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 49.23025404766337,
    "lng": 9.857231543807805
  },
  {
    "title": "Kunstmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nKunstmarkt\n\nMärkte | Sipplingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 48.920852065232914,
    "lng": 9.634563688542794
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "13\nJUN\nMärkte\nUrsulamarkt mit Flohmarkt\n\nMärkte | Rosenfeld\n\n 13.06.2026\n\nDetails",
    "lat": 48.973491309619156,
    "lng": 9.803267870898189
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "14\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Calw\n\n 14.06.2026\n\nDetails",
    "lat": 48.757197071443116,
    "lng": 8.80311542423067
  },
  {
    "title": "Häussler Backtage",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "18\nJUN\nMärkte\nHäussler Backtage\n\nMärkte | Altheim\n\n 18.06.2026 - 20.06.2026\n\nDetails",
    "lat": 49.25421002991479,
    "lng": 9.835888376759065
  },
  {
    "title": "Büchermarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nBüchermarkt\n\nMärkte | Kirchberg an der Jagst\n\n 20.06.2026\n\nDetails",
    "lat": 49.27303277237868,
    "lng": 10.014239465470283
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "20\nJUN\nMärkte\nDarmsheimer Töpfermarkt\n\nMärkte | Sindelfingen\n\n 20.06.2026 - 21.06.2026\n\nDetails",
    "lat": 48.95943854070447,
    "lng": 9.321149404806128
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Ettlingen\n\n 21.06.2026\n\nDetails",
    "lat": 49.05803821810975,
    "lng": 8.718110932347649
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt Plüderhausen\n\nMärkte | Plüderhausen\n\n 21.06.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.453982304582496,
    "lng": 9.17357691263734
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 49.16635167068488,
    "lng": 9.966534861818051
  },
  {
    "title": "Peter und Paul Markt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\nPeter und Paul Markt\n\nMärkte | Schönau im Schwarzwald\n\n 29.06.2026\n\nDetails",
    "lat": 47.95010420692291,
    "lng": 8.715079347105057
  },
  {
    "title": "635. Zunftmarkt",
    "place": "Unbekannt",
    "date": "JUN",
    "description": "29\nJUN\nMärkte\n635. Zunftmarkt\n\nMärkte | Bad Wimpfen\n\n 29.06.2026 - 30.08.2026\n\nDetails",
    "lat": 48.06663600581439,
    "lng": 9.200965171223942
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "02\nJUL\nMärkte\nHamburger Fischmarkt in Stuttgart\n\nMärkte | Stuttgart\n\n 02.07.2026 - 12.07.2026\n\nDetails",
    "lat": 47.90811838202226,
    "lng": 9.023176036050982
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 49.25665002218671,
    "lng": 8.990897705389022
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nSüddeutscher Kunsthandwerkermarkt\n\nMärkte | Villingen-Schwenningen\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.199851458291434,
    "lng": 9.887456270772502
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nTöpfer- und Kunstmarkt\n\nMärkte | Immenstaad am Bodensee\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 49.16918699670839,
    "lng": 9.879405008081402
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.526094546426876,
    "lng": 8.764591108296123
  },
  {
    "title": "Life’s finest",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "09\nJUL\nMärkte\nLife’s finest\n\nMärkte | Bretten\n\n 09.07.2026 - 12.07.2026\n\nDetails",
    "lat": 49.06753548100907,
    "lng": 9.671218838487055
  },
  {
    "title": "JAAmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "11\nJUL\nMärkte\nJAAmarkt\n\nMärkte | Aalen\n\n 11.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.693187838419306,
    "lng": 9.105628932394293
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "14\nJUL\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Kehl\n\n 14.07.2026\n\nDetails",
    "lat": 49.04652758961227,
    "lng": 8.853666903742822
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nPforzheimer Gruschtelmarkt\n\nMärkte | Pforzheim\n\n 17.07.2026 - 18.07.2026\n\nDetails",
    "lat": 48.45395439764713,
    "lng": 9.256725938588772
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "17\nJUL\nMärkte\nIsnyer Feierabendmärkte 2026\n\nMärkte | Isny im Allgäu\n\n 17.07.2026, 16:00 - 21:00 Uhr\n\nDie Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. \n\nDetails",
    "lat": 48.36211087284509,
    "lng": 10.047146264429976
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "18\nJUL\nMärkte\n“Sommerfrische im Fürstlichen Hofgarten”\n\nMärkte | Wolfegg\n\n 18.07.2026\n\nDetails",
    "lat": 48.53818725003204,
    "lng": 8.816007436166872
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt\n\nMärkte | Fichtenberg\n\n 19.07.2026\n\nDetails",
    "lat": 47.90041404310981,
    "lng": 10.172682936488318
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nKunst-Handwerker-Markt\n\nMärkte | Blaufelden\n\n 19.07.2026\n\nDetails",
    "lat": 48.22981707369065,
    "lng": 9.146475784650269
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt Fichtenberg\n\nMärkte | Fichtenberg\n\n 19.07.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.23730697113655,
    "lng": 9.09085564885178
  },
  {
    "title": "Jakobimarkt",
    "place": "Unbekannt",
    "date": "JUL",
    "description": "25\nJUL\nMärkte\nJakobimarkt\n\nMärkte | Nellingen\n\n 25.07.2026\n\nDetails",
    "lat": 48.43319599608794,
    "lng": 9.870000292287344
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 01.08.2026\n\nDetails",
    "lat": 48.9463732218632,
    "lng": 9.076981474521029
  },
  {
    "title": "Isnyer Töpfermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "01\nAUG\nMärkte\nIsnyer Töpfermarkt\n\nMärkte | Isny im Allgäu\n\n 01.08.2026 - 02.08.2026\n\nDetails",
    "lat": 49.37151566242019,
    "lng": 9.989264632033171
  },
  {
    "title": "Kunstgewerbemarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "02\nAUG\nMärkte\nKunstgewerbemarkt\n\nMärkte | Bietigheim-Bissingen\n\n 02.08.2026\n\nDetails",
    "lat": 48.02438121954904,
    "lng": 9.995915379258745
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\n16. Gartenmarkt “Sommer – Blüten – Träume”\n\nMärkte | Rechberghausen\n\n 08.08.2026 - 09.08.2026\n\nDetails",
    "lat": 48.73580624035771,
    "lng": 9.164048644112745
  },
  {
    "title": "Vespermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 08.08.2026\n\nDetails",
    "lat": 48.16862786824832,
    "lng": 9.862702496526625
  },
  {
    "title": "Kräutermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "08\nAUG\nMärkte\nKräutermarkt\n\nMärkte | Mosbach\n\n 08.08.2026\n\nDetails",
    "lat": 49.300389555805914,
    "lng": 9.69978491817165
  },
  {
    "title": "Kunst- & Genießermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "14\nAUG\nMärkte\nKunst- & Genießermarkt\n\nMärkte | Uhldingen-Mühlhofen\n\n 14.08.2026 - 16.08.2026\n\nDetails",
    "lat": 48.37703786185376,
    "lng": 9.099118915088106
  },
  {
    "title": "Abendflohmarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 48.044841799846964,
    "lng": 8.886371043367804
  },
  {
    "title": "Vespermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "15\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 15.08.2026\n\nDetails",
    "lat": 49.283167416049245,
    "lng": 10.105676026936965
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 49.337239521155674,
    "lng": 8.836714349019385
  },
  {
    "title": "Internationaler Töpfermarkt",
    "place": "Unbekannt",
    "date": "AUG",
    "description": "28\nAUG\nMärkte\nInternationaler Töpfermarkt\n\nMärkte | Überlingen\n\n 28.08.2026 - 30.08.2026\n\nDetails",
    "lat": 49.31790188747572,
    "lng": 9.805703893661581
  },
  {
    "title": "Französischer Markt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nFranzösischer Markt\n\nMärkte | Neckargemünd\n\n 03.09.2026 - 05.09.2026\n\nDetails",
    "lat": 49.12770743594064,
    "lng": 8.976496814108543
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "03\nSEP\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 03.09.2026\n\nDetails",
    "lat": 48.26941112699232,
    "lng": 9.125745489475754
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Furtwangen\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 49.21602130962846,
    "lng": 9.06918614934643
  },
  {
    "title": "Fürstliche Gartentage",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "04\nSEP\nMärkte\nFürstliche Gartentage\n\nMärkte | Langenburg\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.214753278753996,
    "lng": 9.328790864185589
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "05\nSEP\nMärkte\nTöpfermarkt Neu-Ulm\n\nMärkte | Ulm/Neu-Ulm\n\n 05.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.85721369823223,
    "lng": 8.993525751272356
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "12\nSEP\nMärkte\nES funkelt – Lichtermarkt & Nachtflohmarkt\n\nMärkte | Esslingen am Neckar\n\n 12.09.2026\n\nDetails",
    "lat": 47.917822308218405,
    "lng": 9.056492767416664
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt\n\nMärkte | Pfedelbach\n\n 13.09.2026\n\nDetails",
    "lat": 49.27900623622163,
    "lng": 9.740352773395218
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt Pfedelbach\n\nMärkte | Pfedelbach\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.76049266722512,
    "lng": 9.191519529863688
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "13\nSEP\nMärkte\nNaturpark-Markt Egenhausen\n\nMärkte | Egenhausen\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Egenhausen am 13.09.2026\n\nDetails",
    "lat": 49.20233659558753,
    "lng": 9.070511358559738
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "15\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Güglingen\n\n 15.09.2026\n\nDetails",
    "lat": 48.519276559528734,
    "lng": 9.89589536257847
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "18\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Sigmaringen\n\n 18.09.2026\n\nDetails",
    "lat": 48.8911606399158,
    "lng": 9.588776054571392
  },
  {
    "title": "Historischer Markt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHistorischer Markt\n\nMärkte | Heubach\n\n 19.09.2026 - 20.09.2026\n\nDetails",
    "lat": 48.00971704235671,
    "lng": 9.955864678367673
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 48.7440366980237,
    "lng": 9.571420888380505
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nWildensteiner Jahrmarkt\n\nMärkte | Leibertingen\n\n 20.09.2026\n\nDetails",
    "lat": 49.205046651085375,
    "lng": 9.771027157451888
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Ühlingen-Birkendorf\n\n 20.09.2026\n\nDetails",
    "lat": 48.32249050020129,
    "lng": 10.057843297602155
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Grafenhausen\n\n 20.09.2026\n\nDetails",
    "lat": 48.38202872128832,
    "lng": 9.010404629215442
  },
  {
    "title": "Holz- und Bauernmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "20\nSEP\nMärkte\nHolz- und Bauernmarkt\n\nMärkte | Welzheim\n\n 20.09.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.28193925999154,
    "lng": 9.31570413929355
  },
  {
    "title": "Matthäusmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nMatthäusmarkt\n\nMärkte | Trochtelfingen\n\n 21.09.2026\n\nDetails",
    "lat": 48.46938581803677,
    "lng": 9.597756558653264
  },
  {
    "title": "Herbstmarkt Harthausen",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "21\nSEP\nMärkte\nHerbstmarkt Harthausen\n\nMärkte | Filderstadt\n\n 21.09.2026\n\nDetails",
    "lat": 48.90864922924597,
    "lng": 8.758202726527959
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "22\nSEP\nMärkte\nHerbstmarkt Plattenhardt\n\nMärkte | Filderstadt\n\n 22.09.2026\n\nDetails",
    "lat": 49.33487047857416,
    "lng": 8.849891834190089
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Schutterwald\n\n 26.09.2026\n\nDetails",
    "lat": 48.89259262071198,
    "lng": 9.609873992946522
  },
  {
    "title": "Trossinger Kilbemarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nTrossinger Kilbemarkt\n\nMärkte | Trossingen\n\n 26.09.2026 - 27.09.2026\n\nDetails",
    "lat": 48.06568956040564,
    "lng": 8.977498958856861
  },
  {
    "title": "Großer Flohmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "26\nSEP\nMärkte\nGroßer Flohmarkt\n\nMärkte | Munderkingen\n\n 26.09.2026\n\nDetails",
    "lat": 48.38445100457028,
    "lng": 9.769670104070455
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "27\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Neckargemünd\n\n 27.09.2026\n\nDetails",
    "lat": 48.924708859683776,
    "lng": 9.674916948510507
  },
  {
    "title": "Herbstmarkt und verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nHerbstmarkt und verkaufsoffenem Sonntag\n\nMärkte | Südwärts\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nLive MusikEssen & Trinken durch Vereine und FoodtrucksAttraktionen & GewinnspieleKinderprogrammShoppen im geöffneten Einzelhandel Weitere Aktionen in den teilnehmenden Geschäften\n\nDetails",
    "lat": 48.46012040499899,
    "lng": 9.234837419219469
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\n„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag\n\nMärkte | Müllheim\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40…\n\nDetails",
    "lat": 48.403266510482844,
    "lng": 9.145208299912658
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nCittaslow – Tag mit verkaufsoffenem Sonntag\n\nMärkte | Bad Schussenried\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nDetails",
    "lat": 48.74942458121243,
    "lng": 9.757211000043112
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "place": "Unbekannt",
    "date": "SEP",
    "description": "30\nSEP\nMärkte\nHerbstmarkt Sielmingen\n\nMärkte | Filderstadt\n\n 30.09.2026\n\nDetails",
    "lat": 49.04713160463536,
    "lng": 9.8895465976612
  },
  {
    "title": "Kunsthandwerkermarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nKunsthandwerkermarkt\n\nMärkte | Kandern\n\n 03.10.2026 - 04.10.2026\n\nDetails",
    "lat": 48.41184368850272,
    "lng": 9.08257113763427
  },
  {
    "title": "Biosphärenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nBiosphärenmarkt\n\nMärkte | Münsingen\n\n 03.10.2026\n\nDetails",
    "lat": 48.961520937778054,
    "lng": 9.222628368800109
  },
  {
    "title": "Drachenfest",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nDrachenfest\n\nMärkte | Ostfildern\n\n 03.10.2026\n\nDetails",
    "lat": 48.77234404192609,
    "lng": 9.756075896548912
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nOCT\nMärkte\nNaturpark-Markt Ebhausen-Rotfelden\n\nMärkte | Ebhausen-Rotfelden\n\n 03.10.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Ebhausen-Rotfelden 03.10.2026\n\nDetails",
    "lat": 49.379246293654894,
    "lng": 10.033064795328993
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "04\nOCT\nMärkte\nNaturparkmarkt\n\nMärkte | Murrhardt\n\n 04.10.2026\n\nDetails",
    "lat": 48.02028206193653,
    "lng": 9.556426011660573
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nUlmer Marktsonntag & verkaufsoffener Sonntag\n\nMärkte | Ulm\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nBummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer…\n\nDetails",
    "lat": 47.96121615473661,
    "lng": 9.578270218437774
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nFlanieren, Genießen, Einkaufen\n\nMärkte | Ehingen (Donau)\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nAm 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein.\n\nDetails",
    "lat": 48.98779188677915,
    "lng": 8.783574438004925
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nVerkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen\n\nMärkte | Meckenbeuren\n\n 04.10.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte…\n\nDetails",
    "lat": 49.364016253765406,
    "lng": 8.852809905038995
  },
  {
    "title": "Herbstmarkt Villingen",
    "place": "Unbekannt",
    "date": "",
    "description": "08\nOCT\nMärkte\nHerbstmarkt Villingen\n\nMärkte | Villingen-Schwenningen\n\n 08.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.487154960245526,
    "lng": 9.480563410664464
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "place": "Unbekannt",
    "date": "",
    "description": "09\nOCT\nMärkte\nHela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)\n\nMärkte | Laufenburg (Baden)\n\n 09.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.463356430144714,
    "lng": 9.394181545231145
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "09\nOCT\nMärkte\nKrämermarkt\n\nMärkte | Gechingen\n\n 09.10.2026\n\nDetails",
    "lat": 48.47037916152001,
    "lng": 9.466741380544828
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "10\nOCT\nMärkte\nIsnyer Schmalzmarkt\n\nMärkte | Isny im Allgäu\n\n 10.10.2026\n\nDetails",
    "lat": 48.184311620770465,
    "lng": 10.190049415321669
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe\n\nMärkte | Schramberg\n\n 11.10.2026, 11:00 - 18:00 Uhr\n\nAm 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten…\n\nDetails",
    "lat": 48.03475451074757,
    "lng": 9.530871712532502
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nJazz & Einkauf mit SonntagsShopping\n\nMärkte | Heilbronn\n\n 11.10.2026, 13:00 - 18:00 Uhr\n\nJazz in der City und entspanntes Shopping in der gesamten Stadt. \n\nDetails",
    "lat": 48.97791367319904,
    "lng": 9.192840068987023
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "12\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 12.10.2026\n\nDetails",
    "lat": 48.20814787896023,
    "lng": 9.583063667158
  },
  {
    "title": "Gallusmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 49.22398008078411,
    "lng": 9.826933106510019
  },
  {
    "title": "Gallenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "15\nOCT\nMärkte\nGallenmarkt\n\nMärkte | Burladingen\n\n 15.10.2026\n\nDetails",
    "lat": 49.26442287929136,
    "lng": 8.711257438958269
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "17\nOCT\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Gengenbach\n\n 17.10.2026 - 18.10.2026\n\nDetails",
    "lat": 48.829701292615546,
    "lng": 9.785767176503986
  },
  {
    "title": "Jahrmarkt Odenheim",
    "place": "Unbekannt",
    "date": "",
    "description": "17\nOCT\nMärkte\nJahrmarkt Odenheim\n\nMärkte | Östringen\n\n 17.10.2026\n\nDetails",
    "lat": 48.60521969329971,
    "lng": 8.962079166486035
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.68169044587047,
    "lng": 9.09718846937766
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Herbstmarkt\n\nMärkte | Ettlingen\n\n 18.10.2026\n\nDetails",
    "lat": 48.73837508343108,
    "lng": 9.929277333076856
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nÜberlinger Herbst mit Verkaufsoffenem Sonntag\n\nMärkte | Überlingen am Bodensee\n\n 18.10.2026, 10:00 - 18:00 Uhr\n\nErneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. \n\nDetails",
    "lat": 48.69560056591067,
    "lng": 9.683216096978594
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 48.08196915023311,
    "lng": 9.038384360782771
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in der Innenstadt\n\nMärkte | Donaueschingen\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nin der Donaueschinger Innenstadt.\n\nDetails",
    "lat": 48.14370963453557,
    "lng": 8.993451035112257
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "19\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 19.10.2026\n\nDetails",
    "lat": 48.97745242238251,
    "lng": 8.919326846719743
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "place": "Unbekannt",
    "date": "",
    "description": "25\nOCT\nMärkte\nKunsthandwerkermarkt / Kunst in den Schaufenstern\n\nMärkte | Nürtingen\n\n 25.10.2026\n\nDetails",
    "lat": 48.456795979063955,
    "lng": 8.742967824199553
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "place": "Unbekannt",
    "date": "",
    "description": "25\nOCT\nMärkte\nNaturparkmarkt und Kerwe\n\nMärkte | Kürnbach\n\n 25.10.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.80190239372649,
    "lng": 9.398994740340529
  },
  {
    "title": "Kirchweihmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "26\nOCT\nMärkte\nKirchweihmarkt\n\nMärkte | Laichingen\n\n 26.10.2026\n\nDetails",
    "lat": 48.722569558471086,
    "lng": 9.228991633163746
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "30\nOCT\nMärkte\nTraditioneller Jahrmarkt\n\nMärkte | Herbolzheim\n\n 30.10.2026\n\nDetails",
    "lat": 48.04032365510464,
    "lng": 9.698825473542643
  },
  {
    "title": "25. Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "07\nNOV\nMärkte\n25. Martinimarkt\n\nMärkte | Eschenbach\n\n 07.11.2026\n\nDetails",
    "lat": 48.7441355546812,
    "lng": 8.732294556425934
  },
  {
    "title": "Esslinger Herbst",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 08.11.2026\n\nDetails",
    "lat": 49.32664630448768,
    "lng": 8.97626803834563
  },
  {
    "title": "Bauernmarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "08\nNOV\nMärkte\nBauernmarkt\n\nMärkte | Wertheim\n\n 08.11.2026\n\nDetails",
    "lat": 48.64848895790876,
    "lng": 9.18739296456825
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "09\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 09.11.2026\n\nDetails",
    "lat": 48.124730141546294,
    "lng": 9.408561045604069
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "10\nNOV\nMärkte\n64. Modelleisenbahn-Börse\n\nMärkte | Gerlingen\n\n 10.11.2026, 11 - 16 Uhr\n\nDetails",
    "lat": 49.00352350044493,
    "lng": 9.025972071220254
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "12\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Bad Wurzach\n\n 12.11.2026\n\nDetails",
    "lat": 48.44891082715654,
    "lng": 9.448429492376993
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mühlacker\n\n 14.11.2026\n\nDetails",
    "lat": 49.11469341406546,
    "lng": 9.190059594162614
  },
  {
    "title": "Wintermarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "14\nNOV\nMärkte\nWintermarkt\n\nMärkte | Wehingen\n\n 14.11.2026\n\nDetails",
    "lat": 48.663194701643334,
    "lng": 9.849407223183427
  },
  {
    "title": "Esslinger Herbst",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "15\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 15.11.2026\n\nDetails",
    "lat": 49.14711321113101,
    "lng": 9.959334821764172
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "16\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 16.11.2026\n\nDetails",
    "lat": 48.42065813929038,
    "lng": 9.566501948211862
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "18\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mengen\n\n 18.11.2026\n\nDetails",
    "lat": 49.05208209654165,
    "lng": 9.78948664638636
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "24\nNOV\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 24.11.2026\n\nDetails",
    "lat": 48.379397328158504,
    "lng": 9.496607393655271
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "27\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Hornberg\n\n 27.11.2026\n\nDetails",
    "lat": 48.62578513853781,
    "lng": 9.45011810393808
  },
  {
    "title": "Kreativmarkt",
    "place": "Unbekannt",
    "date": "NOV",
    "description": "28\nNOV\nMärkte\nKreativmarkt\n\nMärkte | Rielasingen-Worblingen\n\n 28.11.2026\n\nDetails",
    "lat": 48.36542973027781,
    "lng": 10.188191341929532
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Unbekannt",
    "date": "",
    "description": "01\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 01.12.2026 - 02.12.2026\n\nDetails",
    "lat": 48.359536967565866,
    "lng": 8.872494235597651
  },
  {
    "title": "“Kloosemärt”",
    "place": "Unbekannt",
    "date": "",
    "description": "01\nDEC\nMärkte\n“Kloosemärt”\n\nMärkte | Hüfingen\n\n 01.12.2026\n\nDetails",
    "lat": 47.923001965795066,
    "lng": 9.946707699972587
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "01\nDEC\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 01.12.2026\n\nDetails",
    "lat": 48.67342665160833,
    "lng": 10.021209081174819
  },
  {
    "title": "Kathreinenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "03\nDEC\nMärkte\nKathreinenmarkt\n\nMärkte | Munderkingen\n\n 03.12.2026\n\nDetails",
    "lat": 48.45167822305164,
    "lng": 9.5232640390209
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Unbekannt",
    "date": "",
    "description": "08\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 08.12.2026\n\nDetails",
    "lat": 49.23664599903208,
    "lng": 9.348884837137328
  },
  {
    "title": "Nikolausmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 48.82101051068791,
    "lng": 8.998571662088978
  },
  {
    "title": "Wintermarkt Schluchsee",
    "place": "Unbekannt",
    "date": "",
    "description": "28\nDEC\nMärkte\nWintermarkt Schluchsee\n\nMärkte | Schluchsee\n\n 28.12.2026 - 30.12.2026\n\nDetails",
    "lat": 47.95625962902841,
    "lng": 8.874569633775979
  },
  {
    "title": "Märzenmarkt",
    "place": "Unbekannt",
    "date": "",
    "description": "08\nMAR\nMärkte\nMärzenmarkt\n\nMärkte | Kirchheim unter Teck\n\n 08.03.2027\n\nDetails",
    "lat": 48.428625185416486,
    "lng": 9.43518262420562
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 48.20316580805163,
    "lng": 9.993878061294918
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "01\nMAY\nMärkte\nMaimarkt\n\nMärkte | Lonsee\n\n 01.05.2027\n\nDetails",
    "lat": 49.27177074335889,
    "lng": 9.35665327492331
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2027\n\nDetails",
    "lat": 48.17783728395653,
    "lng": 8.733223155990173
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "MAY",
    "description": "08\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 08.05.2027\n\nDetails",
    "lat": 47.90089481489263,
    "lng": 9.17882139603986
  }
];