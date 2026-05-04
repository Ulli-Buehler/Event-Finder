const EVENTS = [
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2026\n\nDetails",
    "lat": 48.50629614097288,
    "lng": 9.561534240017801
  },
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.52197504632962,
    "lng": 9.48416858052363
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.626523385061056,
    "lng": 9.522685229233996
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.63636365060684,
    "lng": 9.643001883026189
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.644718374553634,
    "lng": 9.394358978798916
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 48.764134858202624,
    "lng": 9.54492088528926
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 48.554090528067995,
    "lng": 9.361775144347163
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 48.705182792819656,
    "lng": 9.418920258283931
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 48.71836302130888,
    "lng": 9.510627605724544
  },
  {
    "title": "GardenLife",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.66012756198483,
    "lng": 9.542731167072713
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.44391653915433,
    "lng": 9.265628320015745
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 48.66110152775574,
    "lng": 9.282356525002399
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 48.71764539081135,
    "lng": 9.372391252681929
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 48.64220097081995,
    "lng": 9.416864524186517
  },
  {
    "title": "Muttertagsmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "17\nMAY\nMärkte\nMuttertagsmarkt\n\nMärkte | Hausach\n\n 17.05.2026\n\nDetails",
    "lat": 48.48823186041304,
    "lng": 9.513428398888875
  },
  {
    "title": "Pfingstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.54425245361309,
    "lng": 9.465638229850798
  },
  {
    "title": "Michelstädter Bienenmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "22\nMAY\nMärkte\nMichelstädter Bienenmarkt\n\nMärkte | Michelstadt\n\n 22.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.49073907566548,
    "lng": 9.521434356428816
  },
  {
    "title": "Mittelaltermarkt mit Ritterturnier und Feuershow",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "23\nMAY\nMärkte\nMittelaltermarkt mit Ritterturnier und Feuershow\n\nMärkte | Dischingen\n\n 23.05.2026 - 25.05.2026\n\nDetails",
    "lat": 48.61562482712955,
    "lng": 9.532002420446378
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt\n\nMärkte | Löwenstein\n\n 24.05.2026\n\nDetails",
    "lat": 48.53998865636621,
    "lng": 9.614860061391694
  },
  {
    "title": "Naturparkmarkt Löwenstein",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "24\nMAY\nMärkte\nNaturparkmarkt Löwenstein\n\nMärkte | Löwenstein\n\n 24.05.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.42455668536728,
    "lng": 9.323917330018213
  },
  {
    "title": "Trossinger Pfingstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "25\nMAY\nMärkte\nTrossinger Pfingstmarkt\n\nMärkte | Trossingen\n\n 25.05.2026\n\nDetails",
    "lat": 48.48676816987291,
    "lng": 9.50580747726934
  },
  {
    "title": "KUNST.MARKT.GENUSS. mit Vogtsburg-Markt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "30\nMAY\nMärkte\nKUNST.MARKT.GENUSS. mit Vogtsburg-Markt\n\nMärkte | Vogtsburg im Kaiserstuhl\n\n 30.05.2026 - 31.05.2026\n\nDetails",
    "lat": 48.7576884611809,
    "lng": 9.56139792181175
  },
  {
    "title": "Naturpark-Markt Ettlingen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "31\nMAY\nMärkte\nNaturpark-Markt Ettlingen\n\nMärkte | Ettlingen\n\n 31.05.2026, 11:00 - 17:00 Uhr\n\nFrische Lebensmittel sowie Gemüse der Saison, Schwarzwälder Spezialitäten wie geräucherter Schinken oder regional verarbeitetes Obst wie Apfelsaft von heimischen Streuobstwiesen oder süßer Honig vom Imker…\n\nDetails",
    "lat": 48.65767278253764,
    "lng": 9.265580193054536
  },
  {
    "title": "Rosen-, Garten- & Kunstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "06\nJUN\nMärkte\nRosen-, Garten- & Kunstmarkt\n\nMärkte | Waiblingen\n\n 06.06.2026 - 07.06.2026\n\nDetails",
    "lat": 48.641114687673564,
    "lng": 9.347055231085298
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 48.576407014178,
    "lng": 9.440140539707086
  },
  {
    "title": "Naturpark-Markt Oberndorf a. N.",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "07\nJUN\nMärkte\nNaturpark-Markt Oberndorf a. N.\n\nMärkte | Oberndorf am Neckar\n\n 07.06.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt am 7. Juni 2026\n\nDetails",
    "lat": 48.599955692349006,
    "lng": 9.44499618712877
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nJUN\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 11.06.2026\n\nDetails",
    "lat": 48.75722456923182,
    "lng": 9.507385731041635
  },
  {
    "title": "Tag der Rose & Antikmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nJUN\nMärkte\nTag der Rose & Antikmarkt\n\nMärkte | Ulm/Neu-Ulm\n\n 13.06.2026\n\nDetails",
    "lat": 48.80457815671554,
    "lng": 9.575350024689824
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 48.50309126407134,
    "lng": 9.411249804543585
  },
  {
    "title": "Kunstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nJUN\nMärkte\nKunstmarkt\n\nMärkte | Sipplingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 48.72683796739597,
    "lng": 9.287522904121694
  },
  {
    "title": "Ursulamarkt mit Flohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nJUN\nMärkte\nUrsulamarkt mit Flohmarkt\n\nMärkte | Rosenfeld\n\n 13.06.2026\n\nDetails",
    "lat": 48.536200030361876,
    "lng": 9.441620883131787
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Calw\n\n 14.06.2026\n\nDetails",
    "lat": 48.623755125078645,
    "lng": 9.316672412407318
  },
  {
    "title": "Häussler Backtage",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nJUN\nMärkte\nHäussler Backtage\n\nMärkte | Altheim\n\n 18.06.2026 - 20.06.2026\n\nDetails",
    "lat": 48.48817367067381,
    "lng": 9.31684165854454
  },
  {
    "title": "Büchermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nJUN\nMärkte\nBüchermarkt\n\nMärkte | Kirchberg an der Jagst\n\n 20.06.2026\n\nDetails",
    "lat": 48.651279876316266,
    "lng": 9.495646149257809
  },
  {
    "title": "Darmsheimer Töpfermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nJUN\nMärkte\nDarmsheimer Töpfermarkt\n\nMärkte | Sindelfingen\n\n 20.06.2026 - 21.06.2026\n\nDetails",
    "lat": 48.472175242545205,
    "lng": 9.576552077808945
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt\n\nMärkte | Ettlingen\n\n 21.06.2026\n\nDetails",
    "lat": 48.66580685644903,
    "lng": 9.411037786400748
  },
  {
    "title": "Naturparkmarkt Plüderhausen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "21\nJUN\nMärkte\nNaturparkmarkt Plüderhausen\n\nMärkte | Plüderhausen\n\n 21.06.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.71660078351841,
    "lng": 9.441574269978615
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 48.46595874973621,
    "lng": 9.250426358980537
  },
  {
    "title": "Peter und Paul Markt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "29\nJUN\nMärkte\nPeter und Paul Markt\n\nMärkte | Schönau im Schwarzwald\n\n 29.06.2026\n\nDetails",
    "lat": 48.44955789690283,
    "lng": 9.37539583537908
  },
  {
    "title": "635. Zunftmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "29\nJUN\nMärkte\n635. Zunftmarkt\n\nMärkte | Bad Wimpfen\n\n 29.06.2026 - 30.08.2026\n\nDetails",
    "lat": 48.741685005469364,
    "lng": 9.5281191435192
  },
  {
    "title": "Hamburger Fischmarkt in Stuttgart",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "02\nJUL\nMärkte\nHamburger Fischmarkt in Stuttgart\n\nMärkte | Stuttgart\n\n 02.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.80799221522012,
    "lng": 9.581810170372572
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 48.63257622838536,
    "lng": 9.279182019247628
  },
  {
    "title": "Süddeutscher Kunsthandwerkermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nJUL\nMärkte\nSüddeutscher Kunsthandwerkermarkt\n\nMärkte | Villingen-Schwenningen\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.63109848275861,
    "lng": 9.412222003244176
  },
  {
    "title": "Töpfer- und Kunstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nJUL\nMärkte\nTöpfer- und Kunstmarkt\n\nMärkte | Immenstaad am Bodensee\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.44998061023038,
    "lng": 9.462247321993624
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 48.56700035724291,
    "lng": 9.57898384135581
  },
  {
    "title": "Life’s finest",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nJUL\nMärkte\nLife’s finest\n\nMärkte | Bretten\n\n 09.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.64542639314688,
    "lng": 9.42846017830958
  },
  {
    "title": "JAAmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nJUL\nMärkte\nJAAmarkt\n\nMärkte | Aalen\n\n 11.07.2026 - 12.07.2026\n\nDetails",
    "lat": 48.52086520293693,
    "lng": 9.318051295553667
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nJUL\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Kehl\n\n 14.07.2026\n\nDetails",
    "lat": 48.683261592322744,
    "lng": 9.486474089000964
  },
  {
    "title": "Pforzheimer Gruschtelmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "17\nJUL\nMärkte\nPforzheimer Gruschtelmarkt\n\nMärkte | Pforzheim\n\n 17.07.2026 - 18.07.2026\n\nDetails",
    "lat": 48.68896608163807,
    "lng": 9.287649685341886
  },
  {
    "title": "Isnyer Feierabendmärkte 2026",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "17\nJUL\nMärkte\nIsnyer Feierabendmärkte 2026\n\nMärkte | Isny im Allgäu\n\n 17.07.2026, 16:00 - 21:00 Uhr\n\nDie Arbeitswoche gemeinsam ausklingen lassen: Bei Livemusik, gutem Essen, kühlen Getränken und gemütlichem Beisammensein. \n\nDetails",
    "lat": 48.73290471403455,
    "lng": 9.435529882643557
  },
  {
    "title": "“Sommerfrische im Fürstlichen Hofgarten”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nJUL\nMärkte\n“Sommerfrische im Fürstlichen Hofgarten”\n\nMärkte | Wolfegg\n\n 18.07.2026\n\nDetails",
    "lat": 48.71616794571245,
    "lng": 9.515239018357002
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt\n\nMärkte | Fichtenberg\n\n 19.07.2026\n\nDetails",
    "lat": 48.62761425727658,
    "lng": 9.279218208335783
  },
  {
    "title": "Kunst-Handwerker-Markt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "19\nJUL\nMärkte\nKunst-Handwerker-Markt\n\nMärkte | Blaufelden\n\n 19.07.2026\n\nDetails",
    "lat": 48.673620203591774,
    "lng": 9.550643704592947
  },
  {
    "title": "Naturparkmarkt Fichtenberg",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "19\nJUL\nMärkte\nNaturparkmarkt Fichtenberg\n\nMärkte | Fichtenberg\n\n 19.07.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.790716501633995,
    "lng": 9.508160998310373
  },
  {
    "title": "Jakobimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "25\nJUL\nMärkte\nJakobimarkt\n\nMärkte | Nellingen\n\n 25.07.2026\n\nDetails",
    "lat": 48.47733973543412,
    "lng": 9.374641170390065
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "01\nAUG\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 01.08.2026\n\nDetails",
    "lat": 48.447372668417806,
    "lng": 9.350664048648284
  },
  {
    "title": "Isnyer Töpfermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "01\nAUG\nMärkte\nIsnyer Töpfermarkt\n\nMärkte | Isny im Allgäu\n\n 01.08.2026 - 02.08.2026\n\nDetails",
    "lat": 48.56426913440958,
    "lng": 9.365985313830928
  },
  {
    "title": "Kunstgewerbemarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "02\nAUG\nMärkte\nKunstgewerbemarkt\n\nMärkte | Bietigheim-Bissingen\n\n 02.08.2026\n\nDetails",
    "lat": 48.45585705928068,
    "lng": 9.435313708647717
  },
  {
    "title": "16. Gartenmarkt “Sommer – Blüten – Träume”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nAUG\nMärkte\n16. Gartenmarkt “Sommer – Blüten – Träume”\n\nMärkte | Rechberghausen\n\n 08.08.2026 - 09.08.2026\n\nDetails",
    "lat": 48.597880005591925,
    "lng": 9.548730455760031
  },
  {
    "title": "Vespermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 08.08.2026\n\nDetails",
    "lat": 48.60035691775782,
    "lng": 9.308141609944983
  },
  {
    "title": "Kräutermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nAUG\nMärkte\nKräutermarkt\n\nMärkte | Mosbach\n\n 08.08.2026\n\nDetails",
    "lat": 48.62533174595407,
    "lng": 9.402173173770686
  },
  {
    "title": "Kunst- & Genießermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nAUG\nMärkte\nKunst- & Genießermarkt\n\nMärkte | Uhldingen-Mühlhofen\n\n 14.08.2026 - 16.08.2026\n\nDetails",
    "lat": 48.57892217142367,
    "lng": 9.588960440695976
  },
  {
    "title": "Abendflohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 48.74680316399084,
    "lng": 9.308791645996974
  },
  {
    "title": "Vespermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "15\nAUG\nMärkte\nVespermarkt\n\nMärkte | Zwiefalten\n\n 15.08.2026\n\nDetails",
    "lat": 48.47251072966746,
    "lng": 9.44074809477625
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 48.47810849569432,
    "lng": 9.26224695938846
  },
  {
    "title": "Internationaler Töpfermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "28\nAUG\nMärkte\nInternationaler Töpfermarkt\n\nMärkte | Überlingen\n\n 28.08.2026 - 30.08.2026\n\nDetails",
    "lat": 48.68949470228613,
    "lng": 9.29444483317322
  },
  {
    "title": "Französischer Markt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nSEP\nMärkte\nFranzösischer Markt\n\nMärkte | Neckargemünd\n\n 03.09.2026 - 05.09.2026\n\nDetails",
    "lat": 48.69719244906634,
    "lng": 9.59129230782798
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nSEP\nMärkte\nKrämermarkt\n\nMärkte | Dettingen an der Erms\n\n 03.09.2026\n\nDetails",
    "lat": 48.66319867791219,
    "lng": 9.642315422880225
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Furtwangen\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.57007977502436,
    "lng": 9.426907153431557
  },
  {
    "title": "Fürstliche Gartentage",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nSEP\nMärkte\nFürstliche Gartentage\n\nMärkte | Langenburg\n\n 04.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.45111777324097,
    "lng": 9.387213239247108
  },
  {
    "title": "Töpfermarkt Neu-Ulm",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "05\nSEP\nMärkte\nTöpfermarkt Neu-Ulm\n\nMärkte | Ulm/Neu-Ulm\n\n 05.09.2026 - 06.09.2026\n\nDetails",
    "lat": 48.76176004396864,
    "lng": 9.617811840843682
  },
  {
    "title": "ES funkelt – Lichtermarkt & Nachtflohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "12\nSEP\nMärkte\nES funkelt – Lichtermarkt & Nachtflohmarkt\n\nMärkte | Esslingen am Neckar\n\n 12.09.2026\n\nDetails",
    "lat": 48.559983482643446,
    "lng": 9.409317866924635
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt\n\nMärkte | Pfedelbach\n\n 13.09.2026\n\nDetails",
    "lat": 48.64512200630514,
    "lng": 9.331323564758703
  },
  {
    "title": "Naturparkmarkt Pfedelbach",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nSEP\nMärkte\nNaturparkmarkt Pfedelbach\n\nMärkte | Pfedelbach\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nDie Direktvermarkter bringen frische Waren direkt vom Hof und aus der Küche auf den Marktstand. Ob knuspriges Brot, Käse und Wurst oder saftige Früchte, edle…\n\nDetails",
    "lat": 48.731168309189066,
    "lng": 9.452098201979092
  },
  {
    "title": "Naturpark-Markt Egenhausen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "13\nSEP\nMärkte\nNaturpark-Markt Egenhausen\n\nMärkte | Egenhausen\n\n 13.09.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Egenhausen am 13.09.2026\n\nDetails",
    "lat": 48.65484333984409,
    "lng": 9.623993204235477
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "15\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Güglingen\n\n 15.09.2026\n\nDetails",
    "lat": 48.503567201451986,
    "lng": 9.645647389806921
  },
  {
    "title": "Mittelaltermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nSEP\nMärkte\nMittelaltermarkt\n\nMärkte | Sigmaringen\n\n 18.09.2026\n\nDetails",
    "lat": 48.712486784568455,
    "lng": 9.470543851958555
  },
  {
    "title": "Historischer Markt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "19\nSEP\nMärkte\nHistorischer Markt\n\nMärkte | Heubach\n\n 19.09.2026 - 20.09.2026\n\nDetails",
    "lat": 48.633485418025636,
    "lng": 9.608499187774926
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 48.572782441688446,
    "lng": 9.329674611317516
  },
  {
    "title": "Wildensteiner Jahrmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nSEP\nMärkte\nWildensteiner Jahrmarkt\n\nMärkte | Leibertingen\n\n 20.09.2026\n\nDetails",
    "lat": 48.72372550809822,
    "lng": 9.36653975175525
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Ühlingen-Birkendorf\n\n 20.09.2026\n\nDetails",
    "lat": 48.43297581203372,
    "lng": 9.622244056828757
  },
  {
    "title": "Regionalmarkt Rothauser Land",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nSEP\nMärkte\nRegionalmarkt Rothauser Land\n\nMärkte | Grafenhausen\n\n 20.09.2026\n\nDetails",
    "lat": 48.63864606854828,
    "lng": 9.344589679826779
  },
  {
    "title": "Holz- und Bauernmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "20\nSEP\nMärkte\nHolz- und Bauernmarkt\n\nMärkte | Welzheim\n\n 20.09.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.71508648074495,
    "lng": 9.30130208184356
  },
  {
    "title": "Matthäusmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "21\nSEP\nMärkte\nMatthäusmarkt\n\nMärkte | Trochtelfingen\n\n 21.09.2026\n\nDetails",
    "lat": 48.65004608291467,
    "lng": 9.260947117677961
  },
  {
    "title": "Herbstmarkt Harthausen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "21\nSEP\nMärkte\nHerbstmarkt Harthausen\n\nMärkte | Filderstadt\n\n 21.09.2026\n\nDetails",
    "lat": 48.7763554019454,
    "lng": 9.251985639410305
  },
  {
    "title": "Herbstmarkt Plattenhardt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "22\nSEP\nMärkte\nHerbstmarkt Plattenhardt\n\nMärkte | Filderstadt\n\n 22.09.2026\n\nDetails",
    "lat": 48.51568595068447,
    "lng": 9.64887837196342
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "26\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Schutterwald\n\n 26.09.2026\n\nDetails",
    "lat": 48.48858954019503,
    "lng": 9.30518684128473
  },
  {
    "title": "Trossinger Kilbemarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "26\nSEP\nMärkte\nTrossinger Kilbemarkt\n\nMärkte | Trossingen\n\n 26.09.2026 - 27.09.2026\n\nDetails",
    "lat": 48.809614865565045,
    "lng": 9.63795076020711
  },
  {
    "title": "Großer Flohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "26\nSEP\nMärkte\nGroßer Flohmarkt\n\nMärkte | Munderkingen\n\n 26.09.2026\n\nDetails",
    "lat": 48.65151352729225,
    "lng": 9.420392752254752
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nHerbstmarkt\n\nMärkte | Neckargemünd\n\n 27.09.2026\n\nDetails",
    "lat": 48.5046423504717,
    "lng": 9.404996309889194
  },
  {
    "title": "Herbstmarkt und verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nHerbstmarkt und verkaufsoffenem Sonntag\n\nMärkte | Südwärts\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nLive MusikEssen & Trinken durch Vereine und FoodtrucksAttraktionen & GewinnspieleKinderprogrammShoppen im geöffneten Einzelhandel Weitere Aktionen in den teilnehmenden Geschäften\n\nDetails",
    "lat": 48.50475148063736,
    "lng": 9.453446094945287
  },
  {
    "title": "„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\n„Kunst, Kultur & Krempel 2026“ mit verkaufsoffenem Sonntag\n\nMärkte | Müllheim\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 27. September 2026, findet wieder der traditionelle verkaufsoffene Sonntag des Gewerbevereins Müllheim statt. Von 12 Uhr bis 17 Uhr öffnen mehr als 40…\n\nDetails",
    "lat": 48.52017571230371,
    "lng": 9.509478206581408
  },
  {
    "title": "Cittaslow – Tag mit verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nSEP\nMärkte\nCittaslow – Tag mit verkaufsoffenem Sonntag\n\nMärkte | Bad Schussenried\n\n 27.09.2026, 12:00 - 17:00 Uhr\n\nDetails",
    "lat": 48.54358897645317,
    "lng": 9.398754818753568
  },
  {
    "title": "Herbstmarkt Sielmingen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "30\nSEP\nMärkte\nHerbstmarkt Sielmingen\n\nMärkte | Filderstadt\n\n 30.09.2026\n\nDetails",
    "lat": 48.445808863445954,
    "lng": 9.33338329770149
  },
  {
    "title": "Kunsthandwerkermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nOCT\nMärkte\nKunsthandwerkermarkt\n\nMärkte | Kandern\n\n 03.10.2026 - 04.10.2026\n\nDetails",
    "lat": 48.60347849325738,
    "lng": 9.414986618470731
  },
  {
    "title": "Biosphärenmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nOCT\nMärkte\nBiosphärenmarkt\n\nMärkte | Münsingen\n\n 03.10.2026\n\nDetails",
    "lat": 48.445237514128564,
    "lng": 9.475667711296154
  },
  {
    "title": "Drachenfest",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nOCT\nMärkte\nDrachenfest\n\nMärkte | Ostfildern\n\n 03.10.2026\n\nDetails",
    "lat": 48.53865281016324,
    "lng": 9.483910050209964
  },
  {
    "title": "Naturpark-Markt Ebhausen-Rotfelden",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nOCT\nMärkte\nNaturpark-Markt Ebhausen-Rotfelden\n\nMärkte | Ebhausen-Rotfelden\n\n 03.10.2026, 11:00 - 17:00 Uhr\n\nNaturpark-Markt Ebhausen-Rotfelden 03.10.2026\n\nDetails",
    "lat": 48.57653079633856,
    "lng": 9.327693832339984
  },
  {
    "title": "Naturparkmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nNaturparkmarkt\n\nMärkte | Murrhardt\n\n 04.10.2026\n\nDetails",
    "lat": 48.50139707402918,
    "lng": 9.510068589818728
  },
  {
    "title": "Ulmer Marktsonntag & verkaufsoffener Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nUlmer Marktsonntag & verkaufsoffener Sonntag\n\nMärkte | Ulm\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nBummeln, entdecken, genießen: Beim Ulmer Marktsonntag mit verkaufsoffenem Sonntag trifft regionaler Marktgenuss auf offene Geschäfte und lebendiges Stadtflair. Ein besonderer Tag mitten in der Ulmer…\n\nDetails",
    "lat": 48.43711090081125,
    "lng": 9.398172567358046
  },
  {
    "title": "Flanieren, Genießen, Einkaufen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nFlanieren, Genießen, Einkaufen\n\nMärkte | Ehingen (Donau)\n\n 04.10.2026, 13:00 - 18:00 Uhr\n\nAm 4. Oktober lädt Ehingen zum verkaufsoffenen Sonntag ein.\n\nDetails",
    "lat": 48.597816968427225,
    "lng": 9.371004170237505
  },
  {
    "title": "Verkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "04\nOCT\nMärkte\nVerkaufsoffener Sonntag Meckenbeuren mit Herbstmarkt und Radrennen\n\nMärkte | Meckenbeuren\n\n 04.10.2026, 12:00 - 17:00 Uhr\n\nAm Sonntag, den 4. Oktober 2026, findet der beliebte Herbstmarkt auf dem Kirchplatz in Meckenbeuren und in dessen Umgebung statt. Ab 12 Uhr sind die Geschäfte…\n\nDetails",
    "lat": 48.616604406334964,
    "lng": 9.314346890838001
  },
  {
    "title": "Herbstmarkt Villingen",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nOCT\nMärkte\nHerbstmarkt Villingen\n\nMärkte | Villingen-Schwenningen\n\n 08.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.44282553954136,
    "lng": 9.314780906008195
  },
  {
    "title": "Hela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nOCT\nMärkte\nHela (Herbstmesse Laufenburg) mit Jahrmarkt (CH) und Apfelmarkt (Baden)\n\nMärkte | Laufenburg (Baden)\n\n 09.10.2026 - 11.10.2026\n\nDetails",
    "lat": 48.781439695310134,
    "lng": 9.278535452921709
  },
  {
    "title": "Krämermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nOCT\nMärkte\nKrämermarkt\n\nMärkte | Gechingen\n\n 09.10.2026\n\nDetails",
    "lat": 48.72446273009427,
    "lng": 9.642779025031196
  },
  {
    "title": "Isnyer Schmalzmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "10\nOCT\nMärkte\nIsnyer Schmalzmarkt\n\nMärkte | Isny im Allgäu\n\n 10.10.2026\n\nDetails",
    "lat": 48.75607863831299,
    "lng": 9.461413080453973
  },
  {
    "title": "Verkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Spendenlauf für die Katharinenhöhe\n\nMärkte | Schramberg\n\n 11.10.2026, 11:00 - 18:00 Uhr\n\nAm 20. Oktober ist es wieder soweit: Schramberg öffnet seine Türen für einen verkaufsoffenen Sonntag! Von 13-18 Uhr laden euch die Geschäfte ein, die neuesten…\n\nDetails",
    "lat": 48.81297478791201,
    "lng": 9.489144176964414
  },
  {
    "title": "Jazz & Einkauf mit SonntagsShopping",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nOCT\nMärkte\nJazz & Einkauf mit SonntagsShopping\n\nMärkte | Heilbronn\n\n 11.10.2026, 13:00 - 18:00 Uhr\n\nJazz in der City und entspanntes Shopping in der gesamten Stadt. \n\nDetails",
    "lat": 48.77626318426047,
    "lng": 9.42752828869104
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "12\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 12.10.2026\n\nDetails",
    "lat": 48.79190935081625,
    "lng": 9.623327180616515
  },
  {
    "title": "Gallusmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 48.70182695593862,
    "lng": 9.558829861355743
  },
  {
    "title": "Gallenmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "15\nOCT\nMärkte\nGallenmarkt\n\nMärkte | Burladingen\n\n 15.10.2026\n\nDetails",
    "lat": 48.68493496082086,
    "lng": 9.577197158228223
  },
  {
    "title": "Altstadt-Antikmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "17\nOCT\nMärkte\nAltstadt-Antikmarkt\n\nMärkte | Gengenbach\n\n 17.10.2026 - 18.10.2026\n\nDetails",
    "lat": 48.77377715121962,
    "lng": 9.434038317233131
  },
  {
    "title": "Jahrmarkt Odenheim",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "17\nOCT\nMärkte\nJahrmarkt Odenheim\n\nMärkte | Östringen\n\n 17.10.2026\n\nDetails",
    "lat": 48.78011659908155,
    "lng": 9.271779182680602
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.73601181721893,
    "lng": 9.427803883031636
  },
  {
    "title": "Verkaufsoffener Sonntag mit Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag mit Herbstmarkt\n\nMärkte | Ettlingen\n\n 18.10.2026\n\nDetails",
    "lat": 48.49193787276717,
    "lng": 9.543284987354461
  },
  {
    "title": "Überlinger Herbst mit Verkaufsoffenem Sonntag",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nÜberlinger Herbst mit Verkaufsoffenem Sonntag\n\nMärkte | Überlingen am Bodensee\n\n 18.10.2026, 10:00 - 18:00 Uhr\n\nErneut möchte sich Überlingen und der Überlinger Einzelhandel mit einem Herbstthema vorstellen und den Besuchern präsentieren. \n\nDetails",
    "lat": 48.52549644420076,
    "lng": 9.627214339276751
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 48.42638788619566,
    "lng": 9.469862388807599
  },
  {
    "title": "Verkaufsoffener Sonntag in der Innenstadt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in der Innenstadt\n\nMärkte | Donaueschingen\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nin der Donaueschinger Innenstadt.\n\nDetails",
    "lat": 48.72845323966955,
    "lng": 9.399585393920875
  },
  {
    "title": "Herbstmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "19\nOCT\nMärkte\nHerbstmarkt\n\nMärkte | Schönau im Schwarzwald\n\n 19.10.2026\n\nDetails",
    "lat": 48.47564712163144,
    "lng": 9.30625259243363
  },
  {
    "title": "Kunsthandwerkermarkt / Kunst in den Schaufenstern",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "25\nOCT\nMärkte\nKunsthandwerkermarkt / Kunst in den Schaufenstern\n\nMärkte | Nürtingen\n\n 25.10.2026\n\nDetails",
    "lat": 48.63180760934521,
    "lng": 9.541361336377774
  },
  {
    "title": "Naturparkmarkt und Kerwe",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "25\nOCT\nMärkte\nNaturparkmarkt und Kerwe\n\nMärkte | Kürnbach\n\n 25.10.2026, 11 - 18 Uhr\n\nDetails",
    "lat": 48.68846502314287,
    "lng": 9.556843940159965
  },
  {
    "title": "Kirchweihmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "26\nOCT\nMärkte\nKirchweihmarkt\n\nMärkte | Laichingen\n\n 26.10.2026\n\nDetails",
    "lat": 48.59893772592416,
    "lng": 9.496495398321024
  },
  {
    "title": "Traditioneller Jahrmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "30\nOCT\nMärkte\nTraditioneller Jahrmarkt\n\nMärkte | Herbolzheim\n\n 30.10.2026\n\nDetails",
    "lat": 48.57070054677093,
    "lng": 9.590530402724296
  },
  {
    "title": "25. Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "07\nNOV\nMärkte\n25. Martinimarkt\n\nMärkte | Eschenbach\n\n 07.11.2026\n\nDetails",
    "lat": 48.45539374463992,
    "lng": 9.443468367100783
  },
  {
    "title": "Esslinger Herbst",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 08.11.2026\n\nDetails",
    "lat": 48.44517730837222,
    "lng": 9.401575090161552
  },
  {
    "title": "Bauernmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nNOV\nMärkte\nBauernmarkt\n\nMärkte | Wertheim\n\n 08.11.2026\n\nDetails",
    "lat": 48.442712010056276,
    "lng": 9.620263565497515
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "09\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 09.11.2026\n\nDetails",
    "lat": 48.526365857146466,
    "lng": 9.580383657228978
  },
  {
    "title": "64. Modelleisenbahn-Börse",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "10\nNOV\nMärkte\n64. Modelleisenbahn-Börse\n\nMärkte | Gerlingen\n\n 10.11.2026, 11 - 16 Uhr\n\nDetails",
    "lat": 48.492489434809634,
    "lng": 9.46274954897511
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "12\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Bad Wurzach\n\n 12.11.2026\n\nDetails",
    "lat": 48.5507939010436,
    "lng": 9.635564621395012
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mühlacker\n\n 14.11.2026\n\nDetails",
    "lat": 48.78110025756901,
    "lng": 9.321463403531473
  },
  {
    "title": "Wintermarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nNOV\nMärkte\nWintermarkt\n\nMärkte | Wehingen\n\n 14.11.2026\n\nDetails",
    "lat": 48.698538390402675,
    "lng": 9.462660315963872
  },
  {
    "title": "Esslinger Herbst",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "15\nNOV\nMärkte\nEsslinger Herbst\n\nMärkte | Esslingen am Neckar\n\n 15.11.2026\n\nDetails",
    "lat": 48.67557296681141,
    "lng": 9.546181467217464
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "16\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Sigmaringen\n\n 16.11.2026\n\nDetails",
    "lat": 48.72244106491363,
    "lng": 9.270982382317916
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "18\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Mengen\n\n 18.11.2026\n\nDetails",
    "lat": 48.79842002929221,
    "lng": 9.480876656413905
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "24\nNOV\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 24.11.2026\n\nDetails",
    "lat": 48.677265126184594,
    "lng": 9.589867445177385
  },
  {
    "title": "Martinimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "27\nNOV\nMärkte\nMartinimarkt\n\nMärkte | Hornberg\n\n 27.11.2026\n\nDetails",
    "lat": 48.558375717742344,
    "lng": 9.36307567571191
  },
  {
    "title": "Kreativmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "28\nNOV\nMärkte\nKreativmarkt\n\nMärkte | Rielasingen-Worblingen\n\n 28.11.2026\n\nDetails",
    "lat": 48.646837896860625,
    "lng": 9.540255040457549
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "01\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 01.12.2026 - 02.12.2026\n\nDetails",
    "lat": 48.733940041775334,
    "lng": 9.49864020010788
  },
  {
    "title": "“Kloosemärt”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "01\nDEC\nMärkte\n“Kloosemärt”\n\nMärkte | Hüfingen\n\n 01.12.2026\n\nDetails",
    "lat": 48.45001133154588,
    "lng": 9.255398155938488
  },
  {
    "title": "Spätjahrmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "01\nDEC\nMärkte\nSpätjahrmarkt\n\nMärkte | Kandern\n\n 01.12.2026\n\nDetails",
    "lat": 48.44261800814532,
    "lng": 9.380199682841988
  },
  {
    "title": "Kathreinenmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "03\nDEC\nMärkte\nKathreinenmarkt\n\nMärkte | Munderkingen\n\n 03.12.2026\n\nDetails",
    "lat": 48.57401549997231,
    "lng": 9.320367007508722
  },
  {
    "title": "Kalter Markt / Chalte Märt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nDEC\nMärkte\nKalter Markt / Chalte Märt\n\nMärkte | Schopfheim\n\n 08.12.2026\n\nDetails",
    "lat": 48.625651225152694,
    "lng": 9.646158043522618
  },
  {
    "title": "Nikolausmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 48.812487693093004,
    "lng": 9.425557205194561
  },
  {
    "title": "Wintermarkt Schluchsee",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "28\nDEC\nMärkte\nWintermarkt Schluchsee\n\nMärkte | Schluchsee\n\n 28.12.2026 - 30.12.2026\n\nDetails",
    "lat": 48.63513123563818,
    "lng": 9.624055484861085
  },
  {
    "title": "Märzenmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nMAR\nMärkte\nMärzenmarkt\n\nMärkte | Kirchheim unter Teck\n\n 08.03.2027\n\nDetails",
    "lat": 48.60329930597267,
    "lng": 9.326866181422256
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 48.4198362660901,
    "lng": 9.298349675118232
  },
  {
    "title": "Maimarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "01\nMAY\nMärkte\nMaimarkt\n\nMärkte | Lonsee\n\n 01.05.2027\n\nDetails",
    "lat": 48.60465992820165,
    "lng": 9.323882450525762
  },
  {
    "title": "Flohmarkt",
    "place": "Unbekannt",
    "date": "Sonntag",
    "description": "08\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Emmendingen\n\n 08.05.2027\n\nDetails",
    "lat": 48.549245376539695,
    "lng": 9.536651887914868
  }
];