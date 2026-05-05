const EVENTS = [
  {
    "title": "Landpartie Schloss Monrepos",
    "place": "Ludwigsburg",
    "date": "Sonntag",
    "description": "07\nMAY\nMärkte\nLandpartie Schloss Monrepos\n\nMärkte | Ludwigsburg\n\n 07.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.8941,
    "lng": 9.1955
  },
  {
    "title": "Käse- und Genussmarkt",
    "place": "Schwäbisch Hall",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nKäse- und Genussmarkt\n\nMärkte | Schwäbisch Hall\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 49.1122,
    "lng": 9.7373
  },
  {
    "title": "Markt der Möglichkeiten – Kunst & Handwerk",
    "place": "Tübingen",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nMarkt der Möglichkeiten – Kunst & Handwerk\n\nMärkte | Tübingen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.5216,
    "lng": 9.0576
  },
  {
    "title": "Kunst, Keramik, Kunsthandwerk in Frickenhausen",
    "place": "Frickenhausen",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nKunst, Keramik, Kunsthandwerk in Frickenhausen\n\nMärkte | Frickenhausen\n\n 09.05.2026 - 10.05.2026\n\nDetails",
    "lat": 48.5935,
    "lng": 9.3608
  },
  {
    "title": "Frühlings-Flohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nFrühlings-Flohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 09.05.2026\n\nDetails",
    "lat": 48.0167,
    "lng": 9.5
  },
  {
    "title": "Käse- und Genießermarkt",
    "place": "Weilheim",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nKäse- und Genießermarkt\n\nMärkte | Weilheim an der Teck\n\n 09.05.2026, 9 - 16 Uhr\n\nDetails",
    "lat": 48.6156,
    "lng": 9.5375
  },
  {
    "title": "Radolfzeller Kräutermarkt",
    "place": "Radolfzell",
    "date": "Sonntag",
    "description": "09\nMAY\nMärkte\nRadolfzeller Kräutermarkt\n\nMärkte | Radolfzell am Bodensee\n\n 09.05.2026\n\nDetails",
    "lat": 47.7419,
    "lng": 8.97
  },
  {
    "title": "Maimarkt",
    "place": "Eppingen",
    "date": "Sonntag",
    "description": "13\nMAY\nMärkte\nMaimarkt\n\nMärkte | Eppingen\n\n 13.05.2026\n\nDetails",
    "lat": 49.1365,
    "lng": 8.9123
  },
  {
    "title": "GardenLife",
    "place": "Reutlingen",
    "date": "Sonntag",
    "description": "14\nMAY\nMärkte\nGardenLife\n\nMärkte | Reutlingen\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 48.4914,
    "lng": 9.2043
  },
  {
    "title": "Sinsheimer Fohlenmarkt",
    "place": "Sinsheim",
    "date": "Sonntag",
    "description": "14\nMAY\nMärkte\nSinsheimer Fohlenmarkt\n\nMärkte | Sinsheim\n\n 14.05.2026 - 17.05.2026\n\nDetails",
    "lat": 49.2529,
    "lng": 8.8787
  },
  {
    "title": "Maimarkt",
    "place": "Göppingen",
    "date": "Sonntag",
    "description": "15\nMAY\nMärkte\nMaimarkt\n\nMärkte | Göppingen\n\n 15.05.2026\n\nDetails",
    "lat": 48.7054,
    "lng": 9.6512
  },
  {
    "title": "Flohmarkt",
    "place": "Ravensburg",
    "date": "Sonntag",
    "description": "16\nMAY\nMärkte\nFlohmarkt\n\nMärkte | Ravensburg\n\n 16.05.2026\n\nDetails",
    "lat": 47.7811,
    "lng": 9.6136
  },
  {
    "title": "Endinger Büchermarkt",
    "place": "Endingen",
    "date": "Sonntag",
    "description": "16\nMAY\nMärkte\nEndinger Büchermarkt\n\nMärkte | Endingen\n\n 16.05.2026\n\nDetails",
    "lat": 48.1422,
    "lng": 7.7
  },
  {
    "title": "Pfingstmarkt",
    "place": "Wolfach",
    "date": "Sonntag",
    "description": "20\nMAY\nMärkte\nPfingstmarkt\n\nMärkte | Wolfach\n\n 20.05.2026\n\nDetails",
    "lat": 48.2933,
    "lng": 8.2156
  },
  {
    "title": "HandmadeART Reutlingen",
    "place": "Reutlingen",
    "date": "Sonntag",
    "description": "07\nJUN\nMärkte\nHandmadeART Reutlingen\n\nMärkte | Reutlingen\n\n 07.06.2026\n\nDetails",
    "lat": 48.4914,
    "lng": 9.2043
  },
  {
    "title": "Eppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”",
    "place": "Eppingen",
    "date": "Sonntag",
    "description": "13\nJUN\nMärkte\nEppinger Kunsthandwerkermarkt “Forum Artificium – Markt der Kunstfertigkeiten”\n\nMärkte | Eppingen\n\n 13.06.2026 - 14.06.2026\n\nDetails",
    "lat": 49.1365,
    "lng": 8.9123
  },
  {
    "title": "Radolfzeller Abendmarkt",
    "place": "Radolfzell",
    "date": "Sonntag",
    "description": "25\nJUN\nMärkte\nRadolfzeller Abendmarkt\n\nMärkte | Radolfzell am Bodensee\n\n 25.06.2026 - 10.09.2026, 16:00 - 21:00 Uhr\n\nGenuss, Kunsthandwerk und Unterhaltung – dafür steht der Radolfzeller Abendmarkt.\n\nDetails",
    "lat": 47.7419,
    "lng": 8.97
  },
  {
    "title": "Kunstmarkt rund ums Nonnenhaus",
    "place": "Tübingen",
    "date": "Sonntag",
    "description": "04\nJUL\nMärkte\nKunstmarkt rund ums Nonnenhaus\n\nMärkte | Tübingen\n\n 04.07.2026\n\nDetails",
    "lat": 48.5216,
    "lng": 9.0576
  },
  {
    "title": "Kunst- und Handwerkermarkt",
    "place": "Ravensburg",
    "date": "Sonntag",
    "description": "04\nJUL\nMärkte\nKunst- und Handwerkermarkt\n\nMärkte | Ravensburg\n\n 04.07.2026 - 05.07.2026\n\nDetails",
    "lat": 47.7811,
    "lng": 9.6136
  },
  {
    "title": "Abendflohmarkt",
    "place": "Ravensburg",
    "date": "Sonntag",
    "description": "15\nAUG\nMärkte\nAbendflohmarkt\n\nMärkte | Ravensburg\n\n 15.08.2026\n\nDetails",
    "lat": 47.7811,
    "lng": 9.6136
  },
  {
    "title": "Bartholomäusmarkt",
    "place": "Eppingen",
    "date": "Sonntag",
    "description": "24\nAUG\nMärkte\nBartholomäusmarkt\n\nMärkte | Eppingen\n\n 24.08.2026\n\nDetails",
    "lat": 49.1365,
    "lng": 8.9123
  },
  {
    "title": "Herbstflohmarkt mit Krämermarkt",
    "place": "Bad Saulgau",
    "date": "Sonntag",
    "description": "19\nSEP\nMärkte\nHerbstflohmarkt mit Krämermarkt\n\nMärkte | Bad Saulgau\n\n 19.09.2026\n\nDetails",
    "lat": 48.0167,
    "lng": 9.5
  },
  {
    "title": "Gallusmarkt",
    "place": "Wolfach",
    "date": "Sonntag",
    "description": "14\nOCT\nMärkte\nGallusmarkt\n\nMärkte | Wolfach\n\n 14.10.2026\n\nDetails",
    "lat": 48.2933,
    "lng": 8.2156
  },
  {
    "title": "Alemannischer Brotmarkt",
    "place": "Endingen",
    "date": "Sonntag",
    "description": "17\nOCT\nMärkte\nAlemannischer Brotmarkt\n\nMärkte | Endingen\n\n 17.10.2026\n\nDetails",
    "lat": 48.1422,
    "lng": 7.7
  },
  {
    "title": "Verkaufsoffener Sonntag in Pfullendorf",
    "place": "Pfullendorf",
    "date": "Sonntag",
    "description": "18\nOCT\nMärkte\nVerkaufsoffener Sonntag in Pfullendorf\n\nMärkte | Pfullendorf\n\n 18.10.2026, 13:00 - 18:00 Uhr\n\nOb in der Innenstadt, im Linzgau Center, an der Otterswanger Straße oder im Seepark-Center – die Einzelhändler locken mit attraktiven Angeboten.\n\nDetails",
    "lat": 47.9267,
    "lng": 9.2578
  },
  {
    "title": "Nikolausmarkt",
    "place": "Pfullendorf",
    "date": "Sonntag",
    "description": "14\nDEC\nMärkte\nNikolausmarkt\n\nMärkte | Pfullendorf\n\n 14.12.2026\n\nDetails",
    "lat": 47.9267,
    "lng": 9.2578
  },
  {
    "title": "Verkaufsoffener Sonntag “See(h)reise”",
    "place": "Radolfzell",
    "date": "Sonntag",
    "description": "11\nAPR\nMärkte\nVerkaufsoffener Sonntag “See(h)reise”\n\nMärkte | Radolfzell am Bodensee\n\n 11.04.2027, 12:30 - 17:30 Uhr\n\nDer erste verkaufsoffene Sonntag des Jahres steht in Radolfzell stets unter dem Motto \"See(h)reise\".\n\nDetails",
    "lat": 47.7419,
    "lng": 8.97
  },
  {
    "title": "Maimarkt",
    "place": "Pfullendorf",
    "date": "Sonntag",
    "description": "04\nMAY\nMärkte\nMaimarkt\n\nMärkte | Pfullendorf\n\n 04.05.2027\n\nDetails",
    "lat": 47.9267,
    "lng": 9.2578
  }
];