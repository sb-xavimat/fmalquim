"use strict";
(() => {
  // lib/constants.js
  var COL = {
    red: "red",
    orange: "orange",
    green: "green",
    lightGreen: "lightGreen",
    lilac: "lilac",
    grey: "grey"
  };
  var PREFIXES = {
    "1": "mono",
    "mono": "1",
    "2": "di",
    "di": "2",
    "3": "tri",
    "tri": "3",
    "4": "tetra",
    "tetra": "4",
    "5": "penta",
    "penta": "5",
    "6": "hexa",
    "hexa": "6",
    "7": "hepta",
    "hepta": "7",
    "8": "octa",
    "octa": "8",
    "9": "nona",
    "nona": "9",
    "10": "deca",
    "deca": "10"
  };
  var ROMANS = {
    "1": "(I)",
    "2": "(II)",
    "3": "(III)",
    "4": "(IV)",
    "5": "(V)",
    "6": "(VI)",
    "7": "(VII)",
    "8": "(VIII)"
    // "9": "(IX)",  // Si s'usa, cal modificar l'aplicació de preguntes (perquè només buscar I i V)
  };

  // lib/elements.js
  var ELEMENTS = [
    {
      "name_ca": "Hidrogen",
      "name_es": "Hidrógeno",
      "symb": "H",
      "Z": "1",
      "A": "1,008",
      "kind": "no-metall",
      "nox": "–1/+1",
      "order_en_nm": "11",
      "apostrof": true,
      "stem_ca": "Hidr",
      "stem_es": "Hidr"
    },
    {
      "name_ca": "Heli",
      "name_es": "Helio",
      "symb": "He",
      "Z": "2",
      "A": "4,0026",
      "kind": "gas noble",
      "nox": "0",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Liti",
      "name_es": "Litio",
      "symb": "Li",
      "Z": "3",
      "A": "6,94",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Beril·li",
      "name_es": "Berilio",
      "symb": "Be",
      "Z": "4",
      "A": "9,0122",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Bor",
      "name_es": "Boro",
      "symb": "B",
      "Z": "5",
      "A": "10,81",
      "kind": "metal·loide",
      "nox": "+3",
      "order_en_nm": "22",
      "apostrof": false,
      "stem_ca": "Bor",
      "stem_es": "Bor"
    },
    {
      "name_ca": "Carboni",
      "name_es": "Carbono",
      "symb": "C",
      "Z": "6",
      "A": "12,011",
      "kind": "no-metall",
      "nox": "–4/+2/+4",
      "order_en_nm": "17",
      "apostrof": false,
      "stem_ca": "Carb",
      "stem_es": "Carb"
    },
    {
      "name_ca": "Nitrogen",
      "name_es": "Nitrógeno",
      "symb": "N",
      "Z": "7",
      "A": "14,007",
      "kind": "no-metall",
      "nox": "–3/+3/+5",
      "order_en_nm": "12",
      "apostrof": false,
      "stem_ca": "Nitr",
      "stem_es": "Nitr"
    },
    {
      "name_ca": "Oxigen",
      "name_es": "Oxígeno",
      "symb": "O",
      "Z": "8",
      "A": "15,999",
      "kind": "no-metall",
      "nox": "–2",
      "order_en_nm": "6",
      "apostrof": true,
      "stem_ca": "-",
      "stem_es": "-"
    },
    {
      "name_ca": "Fluor",
      "name_es": "Flúor",
      "symb": "F",
      "Z": "9",
      "A": "18,998",
      "kind": "no-metall",
      "nox": "–1",
      "order_en_nm": "1",
      "apostrof": false,
      "stem_ca": "Fluor",
      "stem_es": "Fluor"
    },
    {
      "name_ca": "Neó",
      "name_es": "Neón",
      "symb": "Ne",
      "Z": "10",
      "A": "20,18",
      "kind": "gas noble",
      "nox": "0",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Sodi",
      "name_es": "Sodio",
      "symb": "Na",
      "Z": "11",
      "A": "22,99",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Magnesi",
      "name_es": "Magnesio",
      "symb": "Mg",
      "Z": "12",
      "A": "24,305",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Alumini",
      "name_es": "Aluminio",
      "symb": "Al",
      "Z": "13",
      "A": "26,982",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "23",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Silici",
      "name_es": "Silicio",
      "symb": "Si",
      "Z": "14",
      "A": "28,085",
      "kind": "metal·loide",
      "nox": "–4/+4",
      "order_en_nm": "18",
      "apostrof": false,
      "stem_ca": "Silic",
      "stem_es": "Silic"
    },
    {
      "name_ca": "Fòsfor",
      "name_es": "Fósforo",
      "symb": "P",
      "Z": "15",
      "A": "30,974",
      "kind": "no-metall",
      "nox": "–3/+3/+5",
      "order_en_nm": "13",
      "apostrof": false,
      "stem_ca": "Fosf",
      "stem_es": "Fosf"
    },
    {
      "name_ca": "Sofre",
      "name_es": "Azufre",
      "symb": "S",
      "Z": "16",
      "A": "32,06",
      "kind": "no-metall",
      "nox": "–2/+2/+4/+6",
      "order_en_nm": "7",
      "apostrof": false,
      "stem_ca": "Sulf",
      "stem_es": "Sulf"
    },
    {
      "name_ca": "Clor",
      "name_es": "Cloro",
      "symb": "Cl",
      "Z": "17",
      "A": "35,45",
      "kind": "no-metall",
      "nox": "–1/+1/+3/+5/+7",
      "order_en_nm": "2",
      "apostrof": false,
      "stem_ca": "Clor",
      "stem_es": "Clor"
    },
    {
      "name_ca": "Argó",
      "name_es": "Argón",
      "symb": "Ar",
      "Z": "18",
      "A": "39,95",
      "kind": "gas noble",
      "nox": "0",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Potassi",
      "name_es": "Potasio",
      "symb": "K",
      "Z": "19",
      "A": "39,098",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Calci",
      "name_es": "Calcio",
      "symb": "Ca",
      "Z": "20",
      "A": "40,078",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Escandi",
      "name_es": "Escandio",
      "symb": "Sc",
      "Z": "21",
      "A": "44,956",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Titani",
      "name_es": "Titanio",
      "symb": "Ti",
      "Z": "22",
      "A": "47,867",
      "kind": "metall",
      "nox": "+3/+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Vanadi",
      "name_es": "Vanadio",
      "symb": "V",
      "Z": "23",
      "A": "50,942",
      "kind": "metall",
      "nox": "+2/+3/+4/+5",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Crom",
      "name_es": "Cromo",
      "symb": "Cr",
      "Z": "24",
      "A": "51,996",
      "kind": "metall",
      "nox": "+2/+3/+6",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Manganès",
      "name_es": "Manganeso",
      "symb": "Mn",
      "Z": "25",
      "A": "54,938",
      "kind": "metall",
      "nox": "+2/+3/+4/+6/+7",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Ferro",
      "name_es": "Hierro",
      "symb": "Fe",
      "Z": "26",
      "A": "55,845",
      "kind": "metall",
      "nox": "+2/+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Cobalt",
      "name_es": "Cobalto",
      "symb": "Co",
      "Z": "27",
      "A": "58,933",
      "kind": "metall",
      "nox": "+2/+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Níquel",
      "name_es": "Níquel",
      "symb": "Ni",
      "Z": "28",
      "A": "58,693",
      "kind": "metall",
      "nox": "+2/+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Coure",
      "name_es": "Cobre",
      "symb": "Cu",
      "Z": "29",
      "A": "63,546",
      "kind": "metall",
      "nox": "+1/+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Zinc",
      "name_es": "Zinc / Cinc",
      "symb": "Zn",
      "Z": "30",
      "A": "65,38",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Gal·li",
      "name_es": "Galio",
      "symb": "Ga",
      "Z": "31",
      "A": "69,723",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "24",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Germani",
      "name_es": "Germanio",
      "symb": "Ge",
      "Z": "32",
      "A": "72,63",
      "kind": "metal·loide",
      "nox": "+2/+4",
      "order_en_nm": "19",
      "apostrof": false,
      "stem_ca": "Germ",
      "stem_es": "Germ"
    },
    {
      "name_ca": "Arsènic / Arseni",
      "name_es": "Arsénico",
      "symb": "As",
      "Z": "33",
      "A": "74,922",
      "kind": "metal·loide",
      "nox": "–3/+3/+5",
      "order_en_nm": "14",
      "apostrof": true,
      "stem_ca": "Arsen",
      "stem_es": "Arsen"
    },
    {
      "name_ca": "Seleni",
      "name_es": "Selenio",
      "symb": "Se",
      "Z": "34",
      "A": "78,971",
      "kind": "no-metall",
      "nox": "–2/+2/+4/+6",
      "order_en_nm": "8",
      "apostrof": false,
      "stem_ca": "Selen",
      "stem_es": "Selen"
    },
    {
      "name_ca": "Brom",
      "name_es": "Bromo",
      "symb": "Br",
      "Z": "35",
      "A": "79,904",
      "kind": "no-metall",
      "nox": "–1/+1/+3/+5/+7",
      "order_en_nm": "3",
      "apostrof": false,
      "stem_ca": "Brom",
      "stem_es": "Brom"
    },
    {
      "name_ca": "Criptó",
      "name_es": "Kriptón",
      "symb": "Kr",
      "Z": "36",
      "A": "83,798",
      "kind": "gas noble",
      "nox": "0",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Rubidi",
      "name_es": "Rubidio",
      "symb": "Rb",
      "Z": "37",
      "A": "85,468",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Estronci",
      "name_es": "Estroncio",
      "symb": "Sr",
      "Z": "38",
      "A": "87,62",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Itri",
      "name_es": "Itrio",
      "symb": "Y",
      "Z": "39",
      "A": "88,906",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Zirconi",
      "name_es": "Circonio",
      "symb": "Zr",
      "Z": "40",
      "A": "91,224",
      "kind": "metall",
      "nox": "+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Niobi",
      "name_es": "Niobio",
      "symb": "Nb",
      "Z": "41",
      "A": "92,906",
      "kind": "metall",
      "nox": "+3/+5",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Molibdè",
      "name_es": "Molibdeno",
      "symb": "Mo",
      "Z": "42",
      "A": "95,95",
      "kind": "metall",
      "nox": "+4/+5/+6",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tecneci",
      "name_es": "Tecnecio",
      "symb": "Tc",
      "Z": "43",
      "A": "-97",
      "kind": "metall",
      "nox": "+6/+7",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Ruteni",
      "name_es": "Rutenio",
      "symb": "Ru",
      "Z": "44",
      "A": "101,07",
      "kind": "metall",
      "nox": "+3/+4/+6",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Rodi",
      "name_es": "Rodio",
      "symb": "Rh",
      "Z": "45",
      "A": "102,91",
      "kind": "metall",
      "nox": "+1/+3/+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Pal·ladi",
      "name_es": "Paladio",
      "symb": "Pd",
      "Z": "46",
      "A": "106,42",
      "kind": "metall",
      "nox": "+2/+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Plata / Argent",
      "name_es": "Plata",
      "symb": "Ag",
      "Z": "47",
      "A": "107,87",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Cadmi",
      "name_es": "Cadmio",
      "symb": "Cd",
      "Z": "48",
      "A": "112,41",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Indi",
      "name_es": "Indio",
      "symb": "In",
      "Z": "49",
      "A": "114,82",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "25",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Estany",
      "name_es": "Estaño",
      "symb": "Sn",
      "Z": "50",
      "A": "118,71",
      "kind": "metall",
      "nox": "+2/+4",
      "order_en_nm": "20",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Antimoni",
      "name_es": "Antimonio",
      "symb": "Sb",
      "Z": "51",
      "A": "121,76",
      "kind": "metal·loide",
      "nox": "–3/+3/+5",
      "order_en_nm": "15",
      "apostrof": true,
      "stem_ca": "Antimon",
      "stem_es": "Antimon"
    },
    {
      "name_ca": "Tel·luri / Tel·lur",
      "name_es": "Telurio",
      "symb": "Te",
      "Z": "52",
      "A": "127,6",
      "kind": "metal·loide",
      "nox": "–2/+2/+4/+6",
      "order_en_nm": "9",
      "apostrof": false,
      "stem_ca": "Tel·lur",
      "stem_es": "Telur"
    },
    {
      "name_ca": "Iode",
      "name_es": "Yodo",
      "symb": "I",
      "Z": "53",
      "A": "126,9",
      "kind": "no-metall",
      "nox": "–1/+1/+3/+5/+7",
      "order_en_nm": "4",
      "apostrof": false,
      "stem_ca": "Iod",
      "stem_es": "Yod"
    },
    {
      "name_ca": "Xenó",
      "name_es": "Xenón",
      "symb": "Xe",
      "Z": "54",
      "A": "131,29",
      "kind": "gas noble",
      "nox": "0/+2/+4/+6",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Cesi",
      "name_es": "Cesio",
      "symb": "Cs",
      "Z": "55",
      "A": "132,91",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Bari",
      "name_es": "Bario",
      "symb": "Ba",
      "Z": "56",
      "A": "137,33",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Lantani / Lantà",
      "name_es": "Lantano",
      "symb": "La",
      "Z": "57",
      "A": "138,91",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Ceri",
      "name_es": "Cerio",
      "symb": "Ce",
      "Z": "58",
      "A": "140,12",
      "kind": "metall",
      "nox": "+3/+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Praseodimi",
      "name_es": "Praseodimio",
      "symb": "Pr",
      "Z": "59",
      "A": "140,91",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Neodimi",
      "name_es": "Neodimio",
      "symb": "Nd",
      "Z": "60",
      "A": "144,24",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Prometi",
      "name_es": "Prometio",
      "symb": "Pm",
      "Z": "61",
      "A": "-145",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Samari",
      "name_es": "Samario",
      "symb": "Sm",
      "Z": "62",
      "A": "150,36",
      "kind": "metall",
      "nox": "+2/+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Europi",
      "name_es": "Europio",
      "symb": "Eu",
      "Z": "63",
      "A": "151,96",
      "kind": "metall",
      "nox": "+2/+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Gadolini",
      "name_es": "Gadolinio",
      "symb": "Gd",
      "Z": "64",
      "A": "157,25",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Terbi",
      "name_es": "Terbio",
      "symb": "Tb",
      "Z": "65",
      "A": "158,93",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Disprosi",
      "name_es": "Disprosio",
      "symb": "Dy",
      "Z": "66",
      "A": "162,5",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Holmi",
      "name_es": "Holmio",
      "symb": "Ho",
      "Z": "67",
      "A": "164,93",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Erbi",
      "name_es": "Erbio",
      "symb": "Er",
      "Z": "68",
      "A": "167,26",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tuli",
      "name_es": "Tulio",
      "symb": "Tm",
      "Z": "69",
      "A": "168,93",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Iterbi",
      "name_es": "Iterbio",
      "symb": "Yb",
      "Z": "70",
      "A": "173,05",
      "kind": "metall",
      "nox": "+2/+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Luteci",
      "name_es": "Lutecio",
      "symb": "Lu",
      "Z": "71",
      "A": "174,97",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Hafni",
      "name_es": "Hafnio",
      "symb": "Hf",
      "Z": "72",
      "A": "178,49",
      "kind": "metall",
      "nox": "+4",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tàntal",
      "name_es": "Tántalo",
      "symb": "Ta",
      "Z": "73",
      "A": "180,95",
      "kind": "metall",
      "nox": "+5",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tungstè / Wolframi",
      "name_es": "Wolframio",
      "symb": "W",
      "Z": "74",
      "A": "183,84",
      "kind": "metall",
      "nox": "+4/+5/+6",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Reni",
      "name_es": "Renio",
      "symb": "Re",
      "Z": "75",
      "A": "186,21",
      "kind": "metall",
      "nox": "+4/+6/+7",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Osmi",
      "name_es": "Osmio",
      "symb": "Os",
      "Z": "76",
      "A": "190,23",
      "kind": "metall",
      "nox": "+4/+6/+8",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Iridi",
      "name_es": "Iridio",
      "symb": "Ir",
      "Z": "77",
      "A": "192,22",
      "kind": "metall",
      "nox": "+1/+3/+4",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Platí",
      "name_es": "Platino",
      "symb": "Pt",
      "Z": "78",
      "A": "195,08",
      "kind": "metall",
      "nox": "+2/+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Or",
      "name_es": "Oro",
      "symb": "Au",
      "Z": "79",
      "A": "196,97",
      "kind": "metall",
      "nox": "+1/+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Mercuri",
      "name_es": "Mercurio",
      "symb": "Hg",
      "Z": "80",
      "A": "200,59",
      "kind": "metall",
      "nox": "+1/+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tal·li",
      "name_es": "Talio",
      "symb": "Tl",
      "Z": "81",
      "A": "204,38",
      "kind": "metall",
      "nox": "+1/+3",
      "order_en_nm": "26",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Plom",
      "name_es": "Plomo",
      "symb": "Pb",
      "Z": "82",
      "A": "207,2",
      "kind": "metall",
      "nox": "+2/+4",
      "order_en_nm": "21",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Bismut",
      "name_es": "Bismuto",
      "symb": "Bi",
      "Z": "83",
      "A": "208,98",
      "kind": "metall",
      "nox": "+3/+5",
      "order_en_nm": "16",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Poloni",
      "name_es": "Polonio",
      "symb": "Po",
      "Z": "84",
      "A": "-209",
      "kind": "metal·loide",
      "nox": "+2/+4",
      "order_en_nm": "10",
      "apostrof": false,
      "stem_ca": "Polon",
      "stem_es": "Polon"
    },
    {
      "name_ca": "Àstat",
      "name_es": "Astato",
      "symb": "At",
      "Z": "85",
      "A": "-210",
      "kind": "no-metall",
      "nox": "–1/+1",
      "order_en_nm": "5",
      "apostrof": false,
      "stem_ca": "Astat",
      "stem_es": "Astat"
    },
    {
      "name_ca": "Radó",
      "name_es": "Radón",
      "symb": "Rn",
      "Z": "86",
      "A": "-222",
      "kind": "gas noble",
      "nox": "0",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Franci",
      "name_es": "Francio",
      "symb": "Fr",
      "Z": "87",
      "A": "-223",
      "kind": "metall",
      "nox": "+1",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Radi",
      "name_es": "Radio",
      "symb": "Ra",
      "Z": "88",
      "A": "-226",
      "kind": "metall",
      "nox": "+2",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Actini",
      "name_es": "Actinio",
      "symb": "Ac",
      "Z": "89",
      "A": "-227",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tori",
      "name_es": "Torio",
      "symb": "Th",
      "Z": "90",
      "A": "232,04",
      "kind": "metall",
      "nox": "+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Protoactini",
      "name_es": "Protactinio",
      "symb": "Pa",
      "Z": "91",
      "A": "231,04",
      "kind": "metall",
      "nox": "+3/+4/+5",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Urani",
      "name_es": "Uranio",
      "symb": "U",
      "Z": "92",
      "A": "238,03",
      "kind": "metall",
      "nox": "+3/+4/+5/+6",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Neptuni",
      "name_es": "Neptunio",
      "symb": "Np",
      "Z": "93",
      "A": "-237",
      "kind": "metall",
      "nox": "+3/+4/+5",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Plutoni",
      "name_es": "Plutonio",
      "symb": "Pu",
      "Z": "94",
      "A": "-244",
      "kind": "metall",
      "nox": "+3/+4/+5/+6",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Americi",
      "name_es": "Americio",
      "symb": "Am",
      "Z": "95",
      "A": "-243",
      "kind": "metall",
      "nox": "+3/+4/+5/+6",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Curi",
      "name_es": "Curio",
      "symb": "Cm",
      "Z": "96",
      "A": "-247",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Berkeli",
      "name_es": "Berkelio",
      "symb": "Bk",
      "Z": "97",
      "A": "-247",
      "kind": "metall",
      "nox": "+3/+4",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Californi",
      "name_es": "Californio",
      "symb": "Cf",
      "Z": "98",
      "A": "-251",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Einsteini",
      "name_es": "Einstenio",
      "symb": "Es",
      "Z": "99",
      "A": "-252",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Fermi",
      "name_es": "Fermio",
      "symb": "Fm",
      "Z": "100",
      "A": "-257",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Mendelevi",
      "name_es": "Mendelevio",
      "symb": "Md",
      "Z": "101",
      "A": "-258",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Nobeli",
      "name_es": "Nobelio",
      "symb": "No",
      "Z": "102",
      "A": "-259",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Lawrenci",
      "name_es": "Lawrencio",
      "symb": "Lr",
      "Z": "103",
      "A": "-266",
      "kind": "metall",
      "nox": "+3",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Rutherfordi",
      "name_es": "Rutherfordio",
      "symb": "Rf",
      "Z": "104",
      "A": "-267",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Dubni",
      "name_es": "Dubnio",
      "symb": "Db",
      "Z": "105",
      "A": "-268",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Seaborgi",
      "name_es": "Seaborgio",
      "symb": "Sg",
      "Z": "106",
      "A": "-269",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Bohri",
      "name_es": "Bohrio",
      "symb": "Bh",
      "Z": "107",
      "A": "-278",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Hassi",
      "name_es": "Hasio",
      "symb": "Hs",
      "Z": "108",
      "A": "-278",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Meitneri",
      "name_es": "Meitnerio",
      "symb": "Mt",
      "Z": "109",
      "A": "-282",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Darmstadti",
      "name_es": "Darmstatio",
      "symb": "Ds",
      "Z": "110",
      "A": "-282",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Roentgeni",
      "name_es": "Roentgenio",
      "symb": "Rg",
      "Z": "111",
      "A": "-286",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Copernici",
      "name_es": "Copernicio",
      "symb": "Cn",
      "Z": "112",
      "A": "-286",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Nihoni",
      "name_es": "Nihonio",
      "symb": "Nh",
      "Z": "113",
      "A": "-286",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Flerovi",
      "name_es": "Flerovio",
      "symb": "Fl",
      "Z": "114",
      "A": "-290",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Moscovi",
      "name_es": "Moscovio",
      "symb": "Mc",
      "Z": "115",
      "A": "-290",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Livermori",
      "name_es": "Livermorio",
      "symb": "Lv",
      "Z": "116",
      "A": "-293",
      "kind": "metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "name_ca": "Tennes",
      "name_es": "Teneso",
      "symb": "Ts",
      "Z": "117",
      "A": "-294",
      "kind": "no-metall",
      "nox": "",
      "order_en_nm": "",
      "apostrof": false,
      "stem_ca": "-",
      "stem_es": "-"
    },
    {
      "name_ca": "Oganessó",
      "name_es": "Oganesón",
      "symb": "Og",
      "Z": "118",
      "A": "-294",
      "kind": "gas noble",
      "nox": "",
      "order_en_nm": "",
      "apostrof": true,
      "stem_ca": "",
      "stem_es": ""
    },
    {
      "symb": "X"
      // Usat per grup peròxid o hidròxid.
    }
  ];

  // lib/help.js
  var HELP = {
    "es-1-PRE-FN": {
      "id": "es-1-PRE-FN",
      "lang": "es",
      "kind": 1,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo correspondiente al subíndice del elemento",
        "Nombre del elemento"
      ],
      "example": [
        "H/2",
        "di",
        "di/hidrógeno"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "corrected"
    },
    "es-1-PRE-NF": {
      "id": "es-1-PRE-NF",
      "lang": "es",
      "kind": 1,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del elemento",
        "Subíndice correspondiente al prefijo"
      ],
      "example": [
        "di/nitrógeno",
        "N",
        "N/2"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "corrected"
    },
    "es-1-NOX-FN": {
      "id": "es-1-NOX-FN",
      "lang": "es",
      "kind": 1,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Nombre del elemento"
      ],
      "example": [
        "H/2",
        "hidrógeno"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "cancelled (not needed)"
    },
    "es-1-NOX-NF": {
      "id": "es-1-NOX-NF",
      "lang": "es",
      "kind": 1,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del elemento",
        "Subíndice|Para poner subíndices hay que saber que:|* Todos los metales tienen un subíndice 1|* Los gases nobles tienen un subíndice 1|* Hidrógeno, nitrógeno, oxígeno y los halógenos tienen un subíndice 2|* Otros no metales pueden tener diferentes subíndices"
      ],
      "example": [
        "nitrógeno",
        "N",
        "N/2"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "cancelled (not needed)"
    },
    "es-2-PRE-FN": {
      "id": "es-2-PRE-FN",
      "lang": "es",
      "kind": 2,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo correspondiente al subíndice del hidrógeno (si hay subíndice)",
        "_hidruro + de_",
        "Nombre del metal"
      ],
      "example": [
        "Au/H/3",
        "tri",
        "tri/hidruro/ de",
        "tri/hidruro/ de /oro"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "corrected"
    },
    "es-2-PRE-NF": {
      "id": "es-2-PRE-NF",
      "lang": "es",
      "kind": 2,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Símbolo del hidrógeno",
        "Subíndice correspondiente al prefijo de _hidruro_ (si hay prefijo)"
      ],
      "example": [
        "hidruro/ de/ litio",
        "Li",
        "Li/H",
        "Li/H"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "corrected"
    },
    "es-2-NOX-FN": {
      "id": "es-2-NOX-FN",
      "lang": "es",
      "kind": 2,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_hidruro + de_",
        "Nombre del metal",
        "Número de oxidación del metal en números romanos y entre paréntesis (si el metal tiene más de uno) (CONVINDRIA DIR QUE EL NOX ÉS EL CORRESPONENT AL SUBÍNDEX DE L'HIDROGEN)",
        ""
      ],
      "example": [
        "Au/H/3",
        "hidruro/ de",
        "hidruro/ de/ oro",
        "hidruro /de /oro/(III)",
        "Se escribe sin espacio"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "accepted (Stock is num-ox)"
    },
    "es-2-NOX-NF": {
      "id": "es-2-NOX-NF",
      "lang": "es",
      "kind": 2,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Símbolo del hidrógeno",
        "Subíndice correspondiente al número de oxidación del metal (si es +1, no se escribe)"
      ],
      "example": [
        "hidruro /de /litio",
        "Li",
        "Li/H",
        "Li/H"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "accepted (Stock is num-ox)"
    },
    "es-3-NOX-FN": {
      "id": "es-3-NOX-FN",
      "lang": "es",
      "kind": 3,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Raíz del nombre del no metal + _-uro_",
        "_de + hidrógeno_"
      ],
      "example": [
        "H/Cl",
        "clor/uro",
        "clor/uro /de /hidrógeno"
      ],
      "kind_full": "3.Hidràcids",
      "status": "NOT_YET_DONE"
    },
    "es-3-NOX-NF": {
      "id": "es-3-NOX-NF",
      "lang": "es",
      "kind": 3,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del hidrógeno",
        "Subíndice correspondiente al número de oxidación negativo del no metal",
        "Símbolo del no metal"
      ],
      "example": [
        "sulf/uro /de /hidrógeno",
        "H",
        "H/2",
        "H/2/S"
      ],
      "kind_full": "3.Hidràcids",
      "status": "accepted"
    },
    "es-3-TRA-FN": {
      "id": "es-3-TRA-FN",
      "lang": "es",
      "kind": 3,
      "namesys": "TRA",
      "mode": "FN",
      "steps": [
        "_ácido_",
        "Raíz del nombre del no metal + _-hídrico_"
      ],
      "example": [
        "H/Cl",
        "ácido",
        "ácido /clor/hídrico"
      ],
      "kind_full": "3.Hidràcids",
      "status": "NOT_YET_DONE"
    },
    "es-3-TRA-NF": {
      "id": "es-3-TRA-NF",
      "lang": "es",
      "kind": 3,
      "namesys": "TRA",
      "mode": "NF",
      "steps": [
        "Símbolo del hidrógeno",
        "Subíndice correspondiente al número de oxidación del no metal",
        "Símbolo del no metal"
      ],
      "example": [
        "ácido /sulf/hídrico",
        "H",
        "H/2",
        "H/2/S"
      ],
      "kind_full": "3.Hidràcids",
      "status": "NOT_YET_DONE"
    },
    "es-4-PRE-FN": {
      "id": "es-4-PRE-FN",
      "lang": "es",
      "kind": 4,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo correspondiente al subíndice del oxígeno (si no hay subíndice, es _mono-_)",
        "_óxido + de_",
        "Prefijo griego correspondiente al subíndice del metal (si hay subíndice)",
        "Nombre del metal"
      ],
      "example": [
        "Cu/2/O",
        "mono",
        "mon/óxido /de",
        "mon/óxido /de /di",
        "mon/óxido /de /di/cobre"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "es-4-PRE-NF": {
      "id": "es-4-PRE-NF",
      "lang": "es",
      "kind": 4,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Subíndice correspondiente al prefijo del metal (si hay prefijo)",
        "Símbolo del oxígeno",
        "Subíndice correspondiente al prefijo del oxígeno (si es _mono-_, no se escribe)"
      ],
      "example": [
        "mon/óxido /de /manganeso",
        "Mn",
        "Mn",
        "Mn/O",
        "Mn/O"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "es-4-NOX-FN": {
      "id": "es-4-NOX-FN",
      "lang": "es",
      "kind": 4,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_óxido + de_",
        "Nombre del metal",
        "Número de oxidación del metal en números romanos y entre paréntesis (si el metal tiene más de uno) (FALTA EXPLICAR COM ACONSEGUIR EL NOX)",
        "Se escribe sin espacio"
      ],
      "example": [
        "Cu/2/O",
        "óxido /de",
        "óxido /de /cobre",
        "óxido /de /cobre/(I)",
        "Se escribe sin espacio"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "es-4-NOX-NF": {
      "id": "es-4-NOX-NF",
      "lang": "es",
      "kind": 4,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Número de oxidación del oxígeno (en óxidos, siempre es −2)",
        "Símbolo del oxígeno",
        "Número de oxidación del metal",
        "Si es posible, se simplifican los subíndices"
      ],
      "example": [
        "óxido /de /manganeso/(II)",
        "Mn",
        "Mn/2",
        "Mn/2/O",
        "Mn/2/O/2",
        "MnO"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "es-5-PRE-FN": {
      "id": "es-5-PRE-FN",
      "lang": "es",
      "kind": 5,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo correspondiente al subíndice del oxígeno (si no hay subíndice, es _mono-_)",
        "_óxido + de_",
        "Prefijo griego correspondiente al subíndice del no metal (si hay subíndice)",
        "Nombre del no metal"
      ],
      "example": [
        "N/2/O/5",
        "penta",
        "penta/óxido /de",
        "penta/óxido /de /di",
        "penta/óxido /de /di/nitrógeno"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "es-5-PRE-NF": {
      "id": "es-5-PRE-NF",
      "lang": "es",
      "kind": 5,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del no metal",
        "Subíndice correspondiente al prefijo del no metal (si hay prefijo)",
        "Símbolo del oxígeno",
        "Subíndice correspondiente al prefijo del oxígeno (si es _mono-_, no se escribe)"
      ],
      "example": [
        "di/óxido /de /carbono",
        "C",
        "C",
        "C/O",
        "C/O/2"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "es-5-NOX-FN": {
      "id": "es-5-NOX-FN",
      "lang": "es",
      "kind": 5,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_óxido + de_",
        "Nombre del no metal",
        "Número de oxidación del no metal en números romanos y entre paréntesis (si el no metal tiene más de uno) (FALTA EXPLICAR COM ACONSEGUIR EL NOX)",
        "Se escribe sin espacio"
      ],
      "example": [
        "N/2/O/5",
        "óxido /de",
        "óxido /de /nitrógeno",
        "óxido /de /nitrógeno/(V)"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "es-5-NOX-NF": {
      "id": "es-5-NOX-NF",
      "lang": "es",
      "kind": 5,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Número de oxidación del oxígeno (en óxidos, siempre es −2)",
        "Símbolo del oxígeno",
        "Número de oxidación del metal",
        "Si es posible, se simplifican los subíndices",
        "",
        "Símbolo del no metal",
        "Subíndice correspondiente al número de oxidación del oxígeno",
        "Símbolo del oxígeno",
        "Subíndice correspondiente al número de oxidación del no metal",
        "Si es posible, se simplifican los subíndices"
      ],
      "example": [
        "óxido /de /manganeso/(II)",
        "Mn",
        "Mn/2",
        "Mn/2/O",
        "Mn/2/O/2",
        "MnO",
        "óxido /de /carbono/(IV)",
        "C",
        "C/2",
        "C/2/O",
        "C/2/O/4",
        "C/O/2"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "NOT_YET_DONE"
    },
    "es-6-PRE-FN": {
      "id": "es-6-PRE-FN",
      "lang": "es",
      "kind": 6,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo griego correspondiente al subíndice del halógeno (si hay subíndice) PER QUÈ DIGUEM 'si hay subíndice'? EN EL FULL DE SUBSTÀNCIES SEMPRE ÉS 2 (PER TANT 'di')?",
        "Nombre del halógeno + _-uro_",
        "_de_ + prefijo griego correspondiente al subíndice del oxígeno (si hay subíndice)",
        "_oxígeno_"
      ],
      "example": [
        "O/3/Br/2",
        "di",
        "di/brom/uro",
        "di/brom/uro /de /tri",
        "di/brom/uro /de /tri/oxígeno"
      ],
      "kind_full": "6.Halogenurs d’oxigen",
      "status": "created"
    },
    "es-6-PRE-NF": {
      "id": "ES-6-PRE-NF",
      "lang": "es",
      "kind": 6,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del oxígeno",
        "Subíndice correspondiente al prefijo del oxígeno (si hay prefijo)",
        "Símbolo del halógeno",
        "Subíndice correspondiente al prefijo del halógeno"
      ],
      "example": [
        "di/brom/uro /de /tri/oxígeno",
        "O",
        "O/3",
        "O/3/Br",
        "O/3/Br/2"
      ],
      "kind_full": "6.Halogenurs d’oxigen",
      "status": "created"
    },
    "es-7-PRE-FN": {
      "id": "es-7-PRE-FN",
      "lang": "es",
      "kind": 7,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo griego correspondiente al subíndice del no metal de la derecha (si hay subíndice)",
        "Raíz del nombre del no metal de la derecha + _-uro_",
        "_de_ + prefijo griego correspondiente al subíndice del no metal de la izquierda (si hay subíndice)",
        "Nombre del no metal de la izquierda"
      ],
      "example": [
        "N/Br/3",
        "tri",
        "tri/brom/uro",
        "tri/brom/uro /de",
        "tri/brom/uro /de /nitrógeno"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "corrected"
    },
    "es-7-PRE-NF": {
      "id": "es-7-PRE-NF",
      "lang": "es",
      "kind": 7,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del no metal que aparece al final del nombre",
        "Subíndice correspondiente al prefijo de dicho no metal (si hay prefijo)",
        "Símbolo del otro no metal",
        "Subíndice correspondiente al prefijo de dicho no metal"
      ],
      "example": [
        "tetra/clor/uro /de /carbono",
        "C",
        "C",
        "C/Cl",
        "C/Cl/4"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "corrected"
    },
    "es-7-NOX-FN": {
      "id": "es-7-NOX-FN",
      "lang": "es",
      "kind": 7,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Raíz del nombre del no metal de la derecha + _-uro_",
        "_de_ + nombre del no metal de la izquierda",
        "Número de oxidación del no metal de la izquierda en números romanos y entre paréntesis (si el no metal tiene más de uno)"
      ],
      "example": [
        "N/Br/3",
        "brom/uro",
        "brom/uro /de /nitrógeno",
        "brom/uro /de /nitrógeno/(III)"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "accepted"
    },
    "es-7-NOX-NF": {
      "id": "es-7-NOX-NF",
      "lang": "es",
      "kind": 7,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del no metal que aparece al final del nombre",
        "Subíndice correspondiente al estado de oxidación negativo del otro no metal (no se escribe si es −1)",
        "Símbolo del otro no metal",
        "Subíndice correspondiente al número de oxidación del no metal que aparece al final del nombre",
        "Si es posible, se simplifican los subíndices"
      ],
      "example": [
        "clor/uro /de /carbono/(IV)",
        "C",
        "C",
        "C/Cl",
        "C/Cl/4",
        "C/Cl/4"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "NOT_YET_DONE"
    },
    "es-8-PRE-FN": {
      "id": "es-8-PRE-FN",
      "lang": "es",
      "kind": 8,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo griego correspondiente al subíndice del no metal (si hay subíndice)",
        "Raíz del nombre del no metal + _-uro_",
        "_de_ + prefijo griego correspondiente al subíndice del metal (si hay subíndice)",
        "Nombre del metal"
      ],
      "example": [
        "Al/2/S/3",
        "tri",
        "tri/sulf/uro",
        "tri/sulf/uro /de /di",
        "tri/sulfuro /de /di/aluminio"
      ],
      "kind_full": "8.Sals binàries",
      "status": "corrected"
    },
    "es-8-PRE-NF": {
      "id": "es-8-PRE-NF",
      "lang": "es",
      "kind": 8,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Subíndice correspondiente al prefijo del metal (si hay prefijo)",
        "Símbolo del no metal",
        "Subíndice correspondiente al prefijo del no metal"
      ],
      "example": [
        "di/sulf/uro /de /plomo",
        "Pb",
        "Pb",
        "Pb/S",
        "Pb/S/2"
      ],
      "kind_full": "8.Sals binàries",
      "status": "corrected"
    },
    "es-8-NOX-FN": {
      "id": "es-8-NOX-FN",
      "lang": "es",
      "kind": 8,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Raíz del nombre del no metal + _-uro_",
        "_de_ + nombre del metal",
        "Número de oxidación del metal entre paréntesis y en números romanos (si el metal tiene más de uno)"
      ],
      "example": [
        "Al/2/S/3",
        "sulf/uro",
        "sulf/uro /de /aluminio",
        "sulf/uro /de /aluminio"
      ],
      "kind_full": "8.Sals binàries",
      "status": "NOT_YET_DONE"
    },
    "es-8-NOX-NF": {
      "id": "es-8-NOX-NF",
      "lang": "es",
      "kind": 8,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Subíndice correspondiente al estado de oxidación negativo del no metal (no se escribe si es −1)",
        "Símbolo del no metal",
        "Subíndice correspondiente al estado de oxidación del metal",
        "Si se puede, se simplifican los subíndices"
      ],
      "example": [
        "sulf/uro /de /plomo/(IV)",
        "Pb",
        "Pb/2",
        "Pb/2/S",
        "Pb/2/S/4",
        "Pb/S/2"
      ],
      "kind_full": "8.Sals binàries",
      "status": "NOT_YET_DONE"
    },
    "es-9-PRE-FN": {
      "id": "es-9-PRE-FN",
      "lang": "es",
      "kind": 9,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo correspondiente al subíndice del oxígeno",
        "_óxido + de_",
        "Prefijo correspondiente al subíndice del otro elemento",
        "Nombre del otro elemento"
      ],
      "example": [
        "H/2/O/2",
        "di",
        "di/óxido /de",
        "di/óxido /de /di",
        "di/óxido /de /di/hidrógeno"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "es-9-PRE-NF": {
      "id": "es-9-PRE-NF",
      "lang": "es",
      "kind": 9,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del metal o hidrógeno",
        "Subíndice correspondiente su prefijo (si hay prefijo)",
        "Símbolo del oxígeno",
        "Subíndice correspondiente al prefijo del oxígeno (si hay prefijo)"
      ],
      "example": [
        "di/óxido /de /di/cobre",
        "Cu",
        "Cu",
        "Cu/O",
        "Cu/O/2"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "es-9-NOX-FN": {
      "id": "es-9-NOX-FN",
      "lang": "es",
      "kind": 9,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_peróxido + de_",
        "Nombre del metal o hidrógeno",
        "Número de oxidación del metal o hidrógeno en números romanos y entre paréntesis (si tiene más de uno)"
      ],
      "example": [
        "H/2/O/2",
        "peróxido /de",
        "peróxido /de /hidrógeno",
        "peróxido /de /hidrógeno"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "es-9-NOX-NF": {
      "id": "es-9-NOX-NF",
      "lang": "es",
      "kind": 9,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del metal o hidrógeno",
        "Subíndice correspondiente al número de oxidación del grupo peróxido (−2)",
        "Símbolo del grupo peróxido",
        "Subíndice correspondiente al número de oxidación del metal o hidrógeno  (si es +1, no se escribe)",
        "Si es posible, se simplifican los subíndices"
      ],
      "example": [
        "peróxido /de /cobre/(II)",
        "Cu",
        "Cu/2",
        "Cu/2/O2",
        "Cu/2/(O2)/2",
        "Cu/O/2"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "es-10-PRE-FN": {
      "id": "es-10-PRE-FN",
      "lang": "es",
      "kind": 10,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefijo correspondiente al subíndice del grupo hidroxilo (si hay subíndice)",
        "_hidróxido + de_",
        "Nombre del metal"
      ],
      "example": [
        "Ca/(/OH/)2",
        "di",
        "di/hidróxido /de",
        "di/hidróxido /de /calcio"
      ],
      "kind_full": "10.Hidròxids",
      "status": "corrected"
    },
    "es-10-PRE-NF": {
      "id": "es-10-PRE-NF",
      "lang": "es",
      "kind": 10,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Grupo hidroxilo",
        "Subíndice correspondiente al prefijo de _hidróxido_, si hay (hay que poner paréntesis al grupo hidroxilo antes de añadir el subíndice)"
      ],
      "example": [
        "hidróxido /de /cobre",
        "Cu",
        "Cu/OH",
        "Cu/OH"
      ],
      "kind_full": "10.Hidròxids",
      "status": "corrected"
    },
    "es-10-NOX-FN": {
      "id": "es-10-NOX-FN",
      "lang": "es",
      "kind": 10,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_hidróxido + de_",
        "Nombre del metal",
        "Número de oxidación del metal en números romanos y entre paréntesis (si el metal tiene más de uno)"
      ],
      "example": [
        "Ca/(/OH/)2",
        "hidróxido /de",
        "hidróxido /de /calcio",
        "hidróxido /de /calcio"
      ],
      "kind_full": "10.Hidròxids",
      "status": "accepted"
    },
    "es-10-NOX-NF": {
      "id": "es-10-NOX-NF",
      "lang": "es",
      "kind": 10,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbolo del metal",
        "Grupo hidroxilo",
        "Subíndice correspondiente al número de oxidación del metal (hay que poner paréntesis al grupo hidroxilo antes de añadir el subíndice). Si es +1, no se escribe"
      ],
      "example": [
        "hidróxido /de /cobre/(I)",
        "Cu",
        "Cu/OH",
        "Cu/OH"
      ],
      "kind_full": "10.Hidròxids",
      "status": "NOT_YET_DONE"
    },
    "ca-1-PRE-FN": {
      "id": "ca-1-PRE-FN",
      "lang": "ca",
      "kind": 1,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix corresponent al subíndex de l’element",
        "Nom de l’element"
      ],
      "example": [
        "H/2",
        "di",
        "di/hidrogen"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "corrected"
    },
    "ca-1-PRE-NF": {
      "id": "ca-1-PRE-NF",
      "lang": "ca",
      "kind": 1,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol de l’element",
        "Subíndex corresponent al prefix"
      ],
      "example": [
        "di/nitrogen",
        "N",
        "N/2"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "corrected"
    },
    "ca-1-NOX-FN": {
      "id": "ca-1-NOX-FN",
      "lang": "ca",
      "kind": 1,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Nom de l’element"
      ],
      "example": [
        "H/2",
        "hidrogen"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "cancelled (not needed)"
    },
    "ca-1-NOX-NF": {
      "id": "ca-1-NOX-NF",
      "lang": "ca",
      "kind": 1,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol de l’element",
        "Subíndex |Per posar subíndexs cal saber que: |* Tots els metalls tenen un subíndex 1 |* Els gasos nobles tenen un subíndex 1 |* hidrogen, nitrogen, oxigeno i els halògens tenen un subíndex 2 |* Altres no-metalls poden tenir diferents subíndexs"
      ],
      "example": [
        "nitrogen",
        "N",
        "N/2"
      ],
      "kind_full": "1.Substàncies elementals",
      "status": "cancelled (not needed)"
    },
    "ca-2-PRE-FN": {
      "id": "ca-2-PRE-FN",
      "lang": "ca",
      "kind": 2,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix corresponent al subíndex de l’hidrogen, si n’hi ha",
        "_hidrur + de_",
        "Nom del metall"
      ],
      "example": [
        "Au/H/3",
        "tri",
        "tri/hidrur/ de",
        "tri/hidrur/ d’/or"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "corrected"
    },
    "ca-2-PRE-NF": {
      "id": "ca-2-PRE-NF",
      "lang": "ca",
      "kind": 2,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Símbol de l’hidrogen",
        "Subíndex corresponent al prefix d’_hidrur_, si n’hi ha"
      ],
      "example": [
        "hidrur/ de/ liti",
        "Li",
        "Li/H",
        "Li/H"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "corrected"
    },
    "ca-2-NOX-FN": {
      "id": "ca-2-NOX-FN",
      "lang": "ca",
      "kind": 2,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_hidrur + de_",
        "Nom del metall",
        "Nombre d’oxidació del metall en nombres romans i entre parèntesis, si el metall en té més d’un (CONVINDRIA DIR QUE EL NOX ÉS EL CORRESPONENT AL SUBÍNDEX DE L'HIDROGEN)",
        ""
      ],
      "example": [
        "Au/H/3",
        "hidrur/ de",
        "hidrur/ d’/or",
        "hidrur /d’/or/(III)",
        "S’escriu sense espai"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "NOT_YET_DONE"
    },
    "ca-2-NOX-NF": {
      "id": "ca-2-NOX-NF",
      "lang": "ca",
      "kind": 2,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Símbol de l’hidrogen",
        "Subíndex corresponent al nombre d’oxidació del metall (si és +1, no s’escriu)"
      ],
      "example": [
        "hidrur /de /liti",
        "Li",
        "Li/H",
        "Li/H"
      ],
      "kind_full": "2.Hidrurs metàl·lics",
      "status": "accepted (Stock is num-ox)"
    },
    "ca-3-NOX-FN": {
      "id": "ca-3-NOX-FN",
      "lang": "ca",
      "kind": 3,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Arrel del nom del no-metall + _-ur_",
        "_d’hidrogen_"
      ],
      "example": [
        "H/Cl",
        "clor/ur",
        "clor/ur /d’/hidrogen"
      ],
      "kind_full": "3.Hidràcids",
      "status": "NOT_YET_DONE"
    },
    "ca-3-NOX-NF": {
      "id": "ca-3-NOX-NF",
      "lang": "ca",
      "kind": 3,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol de l’hidrogen",
        "Subíndex corresponent al nombre d’oxidació negatiu del no-metall",
        "Símbol del no-metall"
      ],
      "example": [
        "sulf/ur /d’/hidrogen",
        "H",
        "H/2",
        "H/2/S"
      ],
      "kind_full": "3.Hidràcids",
      "status": "accepted"
    },
    "ca-3-TRA-FN": {
      "id": "ca-3-TRA-FN",
      "lang": "ca",
      "kind": 3,
      "namesys": "TRA",
      "mode": "FN",
      "steps": [
        "_àcid_",
        "Arrel del nom del no-metall + _-hídric_"
      ],
      "example": [
        "H/Cl",
        "àcid",
        "àcid /clor/hídric"
      ],
      "kind_full": "3.Hidràcids",
      "status": "NOT_YET_DONE"
    },
    "ca-3-TRA-NF": {
      "id": "ca-3-TRA-NF",
      "lang": "ca",
      "kind": 3,
      "namesys": "TRA",
      "mode": "NF",
      "steps": [
        "Símbol de l’hidrogen",
        "Subíndex corresponent al nombre d’oxidació del no-metall",
        "Símbol del no-metall"
      ],
      "example": [
        "àcid /sulf/hídric",
        "H",
        "H/2",
        "H/2/S"
      ],
      "kind_full": "3.Hidràcids",
      "status": "NOT_YET_DONE"
    },
    "ca-4-PRE-FN": {
      "id": "ca-4-PRE-FN",
      "lang": "ca",
      "kind": 4,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix corresponent al subíndex de l’oxigen; si no n’hi ha s’escriu _mono-_",
        "_òxid + de_",
        "Prefix grec corresponent al subíndex del metall, si n’hi ha",
        "Nom del metall"
      ],
      "example": [
        "Cu/2/O",
        "mono",
        "mon/òxid /de",
        "mon/òxid /de /di",
        "mon/òxid /de /di/coure"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "ca-4-PRE-NF": {
      "id": "ca-4-PRE-NF",
      "lang": "ca",
      "kind": 4,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Subíndex corresponent al prefix del metall, si n’hi ha",
        "Símbol de l’oxigen",
        "Subíndex corresponent al prefix de l’oxigen; si es _mono-_ no s’escriu"
      ],
      "example": [
        "mon/òxid /de /manganès",
        "Mn",
        "Mn",
        "Mn/O",
        "Mn/O"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "ca-4-NOX-FN": {
      "id": "ca-5-NOX-FN",
      "lang": "ca",
      "kind": 4,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_òxid + de_",
        "Nom del metall",
        "Nombre d’oxidació del metall en nombres romans i entre parèntesis, si el metall en té més d’un (FALTA EXPLICAR COM ACONSEGUIR EL NOX)",
        "S’escriu sense espai"
      ],
      "example": [
        "Cu/2/O",
        "òxid /de",
        "òxid /de /coure",
        "òxid /de /coure/(I)"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "ca-4-NOX-NF": {
      "id": "ca-4-NOX-NF",
      "lang": "ca",
      "kind": 4,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Nombre d’oxidació de l’oxigen, que en els òxids, siempre és −2",
        "Símbol de l’oxigen",
        "Nombre d’oxidació del metall",
        "Si és possible, se simplifiquen els subíndexs"
      ],
      "example": [
        "òxid /de /manganès/(II)",
        "Mn",
        "Mn/2",
        "Mn/2/O",
        "Mn/2/O/2",
        "MnO"
      ],
      "kind_full": "4.Òxids metàl·lics",
      "status": "corrected"
    },
    "ca-5-PRE-FN": {
      "id": "ca-5-PRE-FN",
      "lang": "ca",
      "kind": 5,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix corresponent al subíndex de l’oxigen; si no n’hi ha s’escriu _mono-_",
        "_òxid + de_",
        "Prefix grec corresponent al subíndex del no-metall, si n’hi ha",
        "Nom del no-metall"
      ],
      "example": [
        "N/2/O/5",
        "penta",
        "penta/òxid /de",
        "penta/òxid /de /di",
        "penta/òxid /de /di/nitrogen"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "ca-5-PRE-NF": {
      "id": "ca-5-PRE-NF",
      "lang": "ca",
      "kind": 5,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del no-metall",
        "Subíndex corresponent al prefix del no-metall, si n’hi ha",
        "Símbol de l’oxigen",
        "Subíndex corresponent al prefix de l’oxigen; si es _mono-_ no s’escriu"
      ],
      "example": [
        "di/òxid /de /carboni",
        "C",
        "C",
        "C/O",
        "C/O/2"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "ca-5-NOX-FN": {
      "id": "ca-5-NOX-FN",
      "lang": "ca",
      "kind": 5,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_òxid + de_",
        "Nom del no-metall",
        "Nombre d’oxidació del no-metall en nombres romans i entre parèntesis, si el no-metall en té més d’un (FALTA EXPLICAR COM ACONSEGUIR EL NOX)",
        ""
      ],
      "example": [
        "N/2/O/5",
        "òxid /de",
        "òxid /de /nitrogen",
        "òxid /de /nitrogen/(V)",
        "S’escriu sense espai"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "ca-5-NOX-NF": {
      "id": "ca-5-NOX-NF",
      "lang": "ca",
      "kind": 5,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del no-metall",
        "Subíndex corresponent al nombre d’oxidació de l’oxigen",
        "Símbol de l’oxigen",
        "Subíndex corresponent al nombre d’oxidació del no-metall",
        "Si és possible se simplifiquen els subíndexs"
      ],
      "example": [
        "òxid /de /carboni/(IV)",
        "C",
        "C/2",
        "C/2/O",
        "C/2/O/4",
        "C/O/2"
      ],
      "kind_full": "5.Òxids no metàl·lics",
      "status": "corrected"
    },
    "ca-6-PRE-FN": {
      "id": "ca-6-PRE-FN",
      "lang": "ca",
      "kind": 6,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix grec corresponent al subíndex del halògen, si n’hi ha -PER QUÈ DIGUEM 'si n’hi ha'? EN EL FULL DE SUBSTÀNCIES SEMPRE ÉS 2 (PER TANT 'di')?",
        "Nom del halògen + _-ur_",
        "_de_ + prefix grec corresponent al subíndex de l’oxigen, si n’hi ha",
        "_oxigen_"
      ],
      "example": [
        "O/3/Br/2",
        "di",
        "di/brom/ur",
        "di/brom/ur /de /tri",
        "di/brom/ur /de /tri/oxigen"
      ],
      "kind_full": "6.Halogenurs d’oxigen",
      "status": "created"
    },
    "ca-6-PRE-NF": {
      "id": "ca-6-PRE-NF",
      "lang": "ca",
      "kind": 6,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol de l’oxigen",
        "Subíndex corresponent al prefix de l’oxigen",
        "Símbol del halògen",
        "Subíndex corresponent al prefix del halògen"
      ],
      "example": [
        "di/brom/ur /de /tri/oxigen",
        "O",
        "O/3",
        "O/3/Br",
        "O/3/Br/2"
      ],
      "kind_full": "6.Halogenurs d’oxigen",
      "status": "created"
    },
    "ca-7-PRE-FN": {
      "id": "ca-7-PRE-FN",
      "lang": "ca",
      "kind": 7,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix grec corresponent al subíndex del no-metall de la dreta, si n’hi ha",
        "Arrel del nom del no-metall de la dreta + _-ur_",
        "_de_ + prefix grec corresponent al subíndex del no-metall de l’esquerra, si n’hi ha",
        "Nom del no-metall de l’esquerra"
      ],
      "example": [
        "N/Br/3",
        "tri",
        "tri/brom/ur",
        "tri/brom/ur /de",
        "tri/brom/ur /de /nitrogen"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "corrected"
    },
    "ca-7-PRE-NF": {
      "id": "ca-7-PRE-NF",
      "lang": "ca",
      "kind": 7,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del no-metall que es troba al final del nom",
        "Subíndex corresponent al prefix d’aquest no-metall, si n’hi ha",
        "Símbol de l’altre no-metall",
        "Subíndex corresponent al prefix d’aquest no-metall"
      ],
      "example": [
        "tetra/clor/ur /de /carboni",
        "C",
        "C",
        "C/Cl",
        "C/Cl/4"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "corrected"
    },
    "ca-7-NOX-FN": {
      "id": "ca-7-NOX-FN",
      "lang": "ca",
      "kind": 7,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Arrel del nom del no-metall de la dreta + _-ur_",
        "_de_ + nom del no-metall de l’esquerra",
        "Nombre d’oxidació del no-metall de l’esquerra en nombres romans i entre parèntesis, si el no-metall en té més d’un"
      ],
      "example": [
        "N/Br/3",
        "brom/ur",
        "brom/ur /de /nitrogen",
        "brom/ur /de /nitrogen/(III)"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "NOT_YET_DONE"
    },
    "ca-7-NOX-NF": {
      "id": "ca-7-NOX-NF",
      "lang": "ca",
      "kind": 7,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del no-metall que es troba al final del nom",
        "Subíndex corresponent al nombre d’oxidació negatiu de l’altre no-metall, que si és −1 no s’escriu",
        "Símbol de l’altre no-metall",
        "Subíndex corresponent al nombre d’oxidació del no-metall que es troba al final del nom",
        "Si és possible se simplifiquen els subíndexs"
      ],
      "example": [
        "clor/ur /de /carboni/(IV)",
        "C",
        "C",
        "C/Cl",
        "C/Cl/4",
        "C/Cl/4"
      ],
      "kind_full": "7.Compostos covalents no metàl·lics",
      "status": "NOT_YET_DONE"
    },
    "ca-8-PRE-FN": {
      "id": "ca-8-PRE-FN",
      "lang": "ca",
      "kind": 8,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix grec corresponent al subíndex del no-metall, si n’hi ha",
        "Arrel del nom del no-metall + _-ur_",
        "_de_ + prefix grec corresponent al subíndex del metall, si n’hi ha",
        "Nom del metall"
      ],
      "example": [
        "Al/2/S/3",
        "tri",
        "tri/sulf/ur",
        "tri/sulf/ur /de /di",
        "tri/sulfuro /de /di/alumini"
      ],
      "kind_full": "8.Sals binàries",
      "status": "corrected"
    },
    "ca-8-PRE-NF": {
      "id": "ca-8-PRE-NF",
      "lang": "ca",
      "kind": 8,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Subíndex corresponent al prefix del metall, si n’hi ha",
        "Símbol del no-metall",
        "Subíndex corresponent al prefix del no-metall, si n’hi ha"
      ],
      "example": [
        "di/sulf/ur /de /plom",
        "Pb",
        "Pb",
        "Pb/S",
        "Pb/S/2"
      ],
      "kind_full": "8.Sals binàries",
      "status": "corrected"
    },
    "ca-8-NOX-FN": {
      "id": "ca-8-NOX-FN",
      "lang": "ca",
      "kind": 8,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "Arrel del nom del no-metall + _-ur_",
        "_de_ + nom del metall",
        "Nombre d’oxidació del metall entre parèntesis i en nombres romans, si el metall en té més d’un"
      ],
      "example": [
        "Al/2/S/3",
        "sulf/ur",
        "sulf/ur /d’/alumini",
        "sulf/ur /d’/alumini"
      ],
      "kind_full": "8.Sals binàries",
      "status": "NOT_YET_DONE"
    },
    "ca-8-NOX-NF": {
      "id": "ca-8-NOX-NF",
      "lang": "ca",
      "kind": 8,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Subíndex corresponent a l’estat d’oxidació negatiu del no-metall, que si és −1 no s’escriu",
        "Símbol del no-metall",
        "Subíndex corresponent al nombre d’oxidació del metall",
        "Si es pot, se simplifiquen els subíndexs"
      ],
      "example": [
        "sulf/ur /de /plom/(IV)",
        "Pb",
        "Pb/2",
        "Pb/2/S",
        "Pb/2/S/4",
        "Pb/S/2"
      ],
      "kind_full": "8.Sals binàries",
      "status": "NOT_YET_DONE"
    },
    "ca-9-PRE-FN": {
      "id": "ca-9-PRE-FN",
      "lang": "ca",
      "kind": 9,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix corresponent al subíndex de l’oxigen",
        "_òxid + de_",
        "Prefix corresponent al subíndex de l’altre element",
        "Nom de l’altre element"
      ],
      "example": [
        "H/2/O/2",
        "di",
        "di/òxid /de",
        "di/òxid /de /di",
        "di/òxid /de /di/hidrogen"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "ca-9-PRE-NF": {
      "id": "ca-9-PRE-NF",
      "lang": "ca",
      "kind": 9,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del metall o hidrogen",
        "Subíndex corresponent al seu prefix, si n’hi ha",
        "Símbol de l’oxigen",
        "Subíndex corresponent al seu prefix"
      ],
      "example": [
        "di/òxid /de /di/hidrogen",
        "H",
        "H/2",
        "H/2/O",
        "H/2/O/2"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "ca-9-NOX-FN": {
      "id": "ca-9-NOX-FN",
      "lang": "ca",
      "kind": 9,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_peròxid + de_",
        "Nom del metall o hidrogen",
        "Nombre d’oxidació del metall o hidrogen en nombres romans i entre parèntesis, si en té més d’un"
      ],
      "example": [
        "H/2/O/2",
        "peròxid /de",
        "peròxid /de /hidrogen",
        "peròxid /de /hidrogen"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "ca-9-NOX-NF": {
      "id": "ca-9-NOX-NF",
      "lang": "ca",
      "kind": 9,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del metall o hidrogen",
        "Subíndex corresponent al nombre d’oxidació del grup peròxid (−2)",
        "Símbol del grup peròxid",
        "Subíndex corresponent al nombre d’oxidació del metall o hidrogen, que si és +1 no s’escriu",
        "Si és possible, se simplifiquen els subíndexs"
      ],
      "example": [
        "peròxid /de /coure/(II)",
        "Cu",
        "Cu/2",
        "Cu/2/O2",
        "Cu/2/(O2)/2",
        "Cu/O2"
      ],
      "kind_full": "9.Peròxids",
      "status": "created"
    },
    "ca-10-PRE-FN": {
      "id": "ca-10-PRE-FN",
      "lang": "ca",
      "kind": 10,
      "namesys": "PRE",
      "mode": "FN",
      "steps": [
        "Prefix corresponent al subíndex del grup hidroxil, si hi ha subíndex (FALTA REVISAR)",
        "_hidròxid + de_ (FALTA REVISAR)",
        "Nom del metall (FALTA REVISAR)"
      ],
      "example": [
        "Ca/(/OH/)2",
        "di",
        "di/hidròxid /de",
        "di/hidròxid /de /calci"
      ],
      "kind_full": "10.Hidròxids",
      "status": "suposat (falta vore què diu Albert)"
    },
    "ca-10-PRE-NF": {
      "id": "ca-10-PRE-NF",
      "lang": "ca",
      "kind": 10,
      "namesys": "PRE",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Grup hidroxil",
        "Subíndex corresponent al prefix d’_hidròxid_, si n’hi ha. En aquest cas, cal posar parèntesis al grup hidroxil"
      ],
      "example": [
        "hidròxid /de /coure",
        "Cu",
        "Cu/OH",
        "Cu/OH"
      ],
      "kind_full": "10.Hidròxids",
      "status": "NOT_YET_DONE"
    },
    "ca-10-NOX-FN": {
      "id": "ca-10-NOX-FN",
      "lang": "ca",
      "kind": 10,
      "namesys": "NOX",
      "mode": "FN",
      "steps": [
        "_hidròxid + de_",
        "Nom del metall",
        "Nombre d’oxidació del metall en nombres romans i entre parèntesis, si el metall en té més d’un"
      ],
      "example": [
        "Ca/(/OH/)2",
        "hidròxid /de",
        "hidròxid /de /calci",
        "hidròxid /de /calci"
      ],
      "kind_full": "10.Hidròxids",
      "status": "accepted"
    },
    "ca-10-NOX-NF": {
      "id": "ca-10-NOX-NF",
      "lang": "ca",
      "kind": 10,
      "namesys": "NOX",
      "mode": "NF",
      "steps": [
        "Símbol del metall",
        "Grup hidroxil",
        "Subíndex corresponent al nombre d’oxidació del metall, sempre que no sigui +1. Si es posa subíndex s’ha de posar parèntesis al grup hidroxil"
      ],
      "example": [
        "hidròxid /de /coure/(I)",
        "Cu",
        "Cu/OH",
        "Cu/OH"
      ],
      "kind_full": "10.Hidròxids",
      "status": "NOT_YET_DONE"
    }
  };

  // lib/literals.js
  var LITERALS = {
    "hidruro": {
      "es": "hidruro",
      "ca": "hidrur"
    },
    "óxido": {
      "es": "óxido",
      "ca": "òxid"
    },
    "uro": {
      "es": "uro",
      "ca": "ur"
    },
    "hidróxido": {
      "es": "hidróxido",
      "ca": "hidròxid"
    },
    "peróxido": {
      "es": "peróxido",
      "ca": "peròxid"
    }
  };

  // lib/chemhelplib.js
  function getElem(symb) {
    return ELEMENTS[symb] || ELEMENTS.find((elem) => elem.symb === symb);
  }
  function getLiteral(key, lang) {
    try {
      return LITERALS[key][lang];
    } catch (e) {
      console.error("Literal no trobat:", key, lang);
    }
  }
  function getNox(symb, num) {
    const elem = getElem(symb) || {};
    const onlyOne = ["H", "Si", "At"].includes(symb);
    if (onlyOne) {
      return "";
    }
    if (elem.nox?.includes("/")) {
      const nox = ROMANS[num];
      return nox || "(I)";
    }
    return "";
  }
  function getNoxObj(symb) {
    const elem = getElem(symb) || {};
    if (!elem.nox) {
      return {};
    }
    const noxs = elem.nox.replace("–", "-").split("/").map(Number);
    const negativeNox = noxs.find((n) => n < 0);
    let negative = negativeNox && String(Math.abs(negativeNox));
    if (negative === "1") {
      negative = "";
    }
    const len = noxs.length;
    const onlyOne = len === 1;
    const onlyNeg = len === 1 && negative;
    return { noxs, negative, len, onlyOne, onlyNeg };
  }
  function parseFmla(fmla, lang, kind) {
    let hasParenthesis = false;
    if (kind === "9") {
      hasParenthesis = fmla.includes("(O2)");
      fmla = fmla.replace("(O2)", "X").replace("O2", "X");
    } else if (kind === "10") {
      fmla = fmla.replace("(OH)", "X").replace("OH", "X");
    }
    const fmlaData = parseFmlaMonoBi(fmla, lang);
    return { ...fmlaData, hasParenthesis };
  }
  function parseFmlaMonoBi(fmla, lang) {
    const isUpperCase = (c) => isNaN(c) && c === c.toUpperCase();
    const isNumber = (c) => !isNaN(parseInt(c));
    const result = {
      symb1: "",
      sub1: "",
      name1: "",
      symb2: "",
      sub2: "",
      name2: ""
    };
    let current;
    fmla.split("").forEach((c) => {
      const cIsANumber = isNumber(c);
      const start = isUpperCase(c) || cIsANumber && current !== "sub1" && current !== "sub2";
      if (start) {
        if (current === void 0) {
          current = "symb1";
        } else if (current === "symb1") {
          if (cIsANumber) {
            current = "sub1";
          } else {
            current = "symb2";
          }
        } else if (current === "sub1") {
          current = "symb2";
        } else if (current === "symb2") {
          current = "sub2";
        } else if (current === "sub2") {
          result.error = "Fmla incorrecta";
        }
      }
      result[current] += c;
    });
    if (result.symb1) {
      const elem1 = getElem(result.symb1);
      if (elem1) {
        result.name1 = elem1[`name_${lang}`]?.toLowerCase();
      } else {
        result.error = "Element 1 no trobat";
      }
    }
    if (result.symb2) {
      const elem2 = getElem(result.symb2);
      if (elem2) {
        result.name2 = elem2[`name_${lang}`]?.toLowerCase();
      } else {
        result.error = "Element 2 no trobat";
      }
    } else if (!result.symb1) {
      result.error = "No s'ha trobat cap element";
    }
    return result;
  }
  function getGenitive(lang, symb, sub) {
    if (lang === "es") {
      return " de ";
    }
    if (lang === "ca") {
      if (sub) {
        if ("678".includes(sub)) {
          return " d’";
        } else {
          return " de ";
        }
      } else {
        const elem = getElem(symb);
        if (elem.apostrof) {
          return " d’";
        } else {
          return " de ";
        }
      }
    }
  }
  function getStem(lang, symb) {
    const elem = getElem(symb) || {};
    const stem = elem[`stem_${lang}`] || "stem_not_found";
    return stem.toLowerCase();
  }
  function getHelpCard({ lang, system, mode, kind, fmla }) {
    const fmlaData = parseFmla(fmla, lang, kind);
    if (fmlaData.error) {
      return { title: fmlaData.error, lines: [] };
    }
    const key = `${lang}-${kind}-${system}-${mode}`;
    const help = HELP[key]?.steps;
    if (!help) {
      return { title: "No s'ha trobat ajuda: " + key, lines: [] };
    }
    const title = key;
    const lines = kindsSwitcher({ kind, lang, system, mode, fmlaData, help }) || [];
    return { title, lines };
  }
  function kindsSwitcher({ kind, lang, system, mode, fmlaData, help }) {
    switch (kind) {
      case "1":
        return getElementary({ lang, system, mode, fmlaData, help });
      case "2":
        return getMetalHidr({ lang, system, mode, fmlaData, help });
      case "3":
        return getHydracids({ lang, system, mode, fmlaData, help });
      case "4":
        return getOxides({ lang, system, mode, fmlaData, help });
      case "5":
        return getOxides({ lang, system, mode, fmlaData, help });
      case "6":
        return getOxygenHalides({ lang, system, mode, fmlaData, help });
      case "7":
        return getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help });
      case "8":
        return getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help });
      case "9":
        return getPeroxides({ lang, system, mode, fmlaData, help });
      case "10":
        return getHydroxides({ lang, system, mode, fmlaData, help });
      default:
        return [{
          left: [{ text: "Not implemented", color: COL.red }],
          right: "<pre>" + JSON.stringify(fmlaData, null, 2) + "</pre>"
        }];
    }
  }
  function getElementary({ lang, system, mode, fmlaData, help }) {
    if (system != "PRE") {
      return [{
        left: [{ text: "Sistema invàlid", color: COL.red }],
        right: "PRE != " + system
      }];
    }
    if (!fmlaData.sub1) {
      return [{
        left: [{
          text: "No s'ha trobat el subíndex de l'element",
          color: COL.red
        }],
        right: "En les instruccions diu que sempre n'hi haurà."
      }];
    }
    switch (mode) {
      case "FN":
        return getElementaryFN({ lang, fmlaData, help });
      case "NF":
        return getElementaryNF({ lang, fmlaData, help });
    }
  }
  function getElementaryFN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1 } = fmlaData;
    const lines = [];
    const prefix = PREFIXES[sub1];
    lines.push({
      left: [
        { text: symb1, color: COL.red },
        { text: sub1, color: COL.orange }
      ],
      right: ""
    });
    lines.push({
      left: [{ text: prefix, color: COL.orange }],
      right: help[0]
    });
    lines.push({
      left: [
        { text: prefix, color: COL.orange },
        { text: name1, color: COL.red }
      ],
      right: help[1]
    });
    return lines;
  }
  function getElementaryNF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1 } = fmlaData;
    const lines = [];
    const prefix = PREFIXES[sub1];
    lines.push({
      left: [
        { text: prefix, color: COL.orange },
        { text: name1, color: COL.red }
      ],
      right: ""
    });
    lines.push({
      left: [{ text: symb1, color: COL.red }],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.red },
        { text: sub1, color: COL.orange }
      ],
      right: help[1]
    });
    return lines;
  }
  function getMetalHidr({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getMetalHidrPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getMetalHidrPRE_NF({ lang, fmlaData, help });
      case "NOX-FN":
        return getMetalHidrNOX_FN({ lang, fmlaData, help });
      case "NOX-NF":
        return getMetalHidrNOX_NF({ lang, fmlaData, help });
    }
  }
  function getMetalHidrPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix = sub2 ? PREFIXES[sub2] : "";
    const hydrideStr = getLiteral("hidruro", lang);
    const genitive = getGenitive(lang, symb1);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "H", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: ""
    });
    lines.push({
      left: [
        { text: prefix, color: COL.orange }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: prefix, color: COL.orange },
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: prefix, color: COL.orange },
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[2]
    });
    return lines;
  }
  function getMetalHidrPRE_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix = sub2 ? PREFIXES[sub2] : "";
    const hydrideStr = getLiteral("hidruro", lang);
    const genitive = getGenitive(lang, symb1);
    lines.push({
      left: [
        { text: prefix, color: COL.orange },
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: ""
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "H", color: COL.red }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "H", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getMetalHidrNOX_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const hydrideStr = getLiteral("hidruro", lang);
    const genitive = getGenitive(lang, symb1);
    const nox = getNox(symb1, sub2);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "H", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: "(FALTA REVISAR ELS TEXTOS)"
      // TODO
    });
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getMetalHidrNOX_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const hydrideStr = getLiteral("hidruro", lang);
    const genitive = getGenitive(lang, symb1);
    const nox = getNox(symb1, sub2);
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "H", color: COL.red }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "H", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getHydracids({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getHydracidsPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getHydracidsPRE_NF({ lang, fmlaData, help });
      case "NOX-FN":
        return getHydracidsNOX_FN({ lang, fmlaData, help });
      case "NOX-NF":
        return getHydracidsNOX_NF({ lang, fmlaData, help });
      case "TRA-NF":
        return getHydracidsTRA_NF({ lang, fmlaData, help });
      case "TRA-FN":
        return getHydracidsTRA_FN({ lang, fmlaData, help });
    }
  }
  function getHydracidsPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
  }
  function getHydracidsPRE_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
  }
  function getHydracidsNOX_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const stem2 = getStem(lang, symb2);
    const uroStr = getLiteral("uro", lang);
    const genitive = getGenitive(lang, symb1);
    lines.push({
      left: [
        { text: "H", color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[1]
    });
    return lines;
  }
  function getHydracidsNOX_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const stem2 = getStem(lang, symb2);
    const uroStr = getLiteral("uro", lang);
    const genitive = getGenitive(lang, symb1);
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: '(FALTA REVISAR, HE AFEGIT "negativo" EN EL PAS 2)'
    });
    lines.push({
      left: [
        { text: "H", color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: "H", color: COL.green },
        { text: sub1, color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: "H", color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red }
      ],
      right: help[2]
    });
    return lines;
  }
  function getHydracidsTRA_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
  }
  function getHydracidsTRA_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
  }
  function getOxides({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getOxidesPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getOxidesPRE_NF({ lang, fmlaData, help });
      case "NOX-FN":
        return getOxidesNOX_FN({ lang, fmlaData, help });
      case "NOX-NF":
        return getOxidesNOX_NF({ lang, fmlaData, help });
    }
  }
  function getOxidesPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix1 = sub1 ? PREFIXES[sub1] : "";
    const prefix2 = sub2 ? PREFIXES[sub2] : "mono";
    const prefix2Short = sub2 ? PREFIXES[sub2] : "mon";
    const oxidStr = getLiteral("óxido", lang);
    const genitive = getGenitive(lang, symb1, sub1);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: ""
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: prefix2Short, color: COL.orange },
        { text: oxidStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: prefix2Short, color: COL.orange },
        { text: oxidStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: prefix2Short, color: COL.orange },
        { text: oxidStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen },
        { text: name1, color: COL.green }
      ],
      right: help[3]
    });
    return lines;
  }
  function getOxidesPRE_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix1 = sub1 ? PREFIXES[sub1] : "";
    const prefix2Short = sub2 ? PREFIXES[sub2] : "mon";
    const oxidStr = getLiteral("óxido", lang);
    const genitive = getGenitive(lang, symb1, sub1);
    lines.push({
      left: [
        { text: prefix2Short, color: COL.orange },
        { text: oxidStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen },
        { text: name1, color: COL.green }
      ],
      right: ""
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[3]
    });
    return lines;
  }
  function getOxidesNOX_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const oxydeStr = getLiteral("óxido", lang);
    const genitive = getGenitive(lang, symb1);
    const subNox = sub1 ? sub2 : (sub2 || 1) * 2;
    const nox = getNox(symb1, subNox);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      // right: "(FALTA REVISAR, ESPECIALMENT INDICAR DE QUINS NOX PARLEM, ¿NOMÉS POSITIUS?)"  // TODO
      right: "FALTA REVISAR I COMPLETAR|• PARLEM DE NOX NOMÉS POSITIUS (?)|• ¿COM OBTINDRE EL NOX? CAL DETECTAR SI HI HA HAGUT SIMPLIFICACIÓ"
      // TODO
    });
    lines.push({
      left: [
        { text: oxydeStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: oxydeStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: oxydeStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getOxidesNOX_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const oxydeStr = getLiteral("óxido", lang);
    const genitive = getGenitive(lang, symb1);
    const subNox = sub1 ? sub2 : (sub2 || 1) * 2;
    const nox = getNox(symb1, subNox);
    lines.push({
      left: [
        { text: oxydeStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: "(FALTA REVISAR SIMPLIFICACIÓ DE SUBÍNDEXS)"
      // TODO,
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen },
        { text: "O", color: COL.red }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: subNox, color: COL.orange }
      ],
      right: help[3]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[4]
    });
    return lines;
  }
  function getOxygenHalides({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getOxygenHalidesPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getOxygenHalidesPRE_NF({ lang, fmlaData, help });
    }
  }
  function getOxygenHalidesPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const stem2 = getStem(lang, symb2);
    const uro = getLiteral("uro", lang);
    const genitive = getGenitive(lang, symb1, sub1);
    const prefix1 = PREFIXES[sub1] || "";
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: ""
    });
    lines.push({
      left: [
        { text: "di", color: COL.orange }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: "di", color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: "di", color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: "di", color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen },
        { text: name1, color: COL.green }
      ],
      right: help[3]
    });
    return lines;
  }
  function getOxygenHalidesPRE_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const stem2 = getStem(lang, symb2);
    const uro = getLiteral("uro", lang);
    const genitive = getGenitive(lang, symb1, sub1);
    const prefix1 = PREFIXES[sub1] || "";
    lines.push({
      left: [
        { text: "di", color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen },
        { text: name1, color: COL.green }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[3]
    });
    return lines;
  }
  function getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getOtherCovalOrBinSaltsPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getOtherCovalOrBinSaltsPRE_NF({ lang, fmlaData, help });
      case "NOX-FN":
        return getOtherCovalOrBinSaltsNOX_FN({ lang, fmlaData, help });
      case "NOX-NF":
        return getOtherCovalOrBinSaltsNOX_NF({ lang, fmlaData, help });
    }
  }
  function getOtherCovalOrBinSaltsPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix1 = sub1 ? PREFIXES[sub1] : "";
    const prefix2 = sub2 ? PREFIXES[sub2] : "";
    const stem2 = getStem(lang, symb2);
    const genitive = getGenitive(lang, symb1, sub1);
    const uro = getLiteral("uro", lang);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: ""
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen },
        { text: name1, color: COL.green }
      ],
      right: help[3]
    });
    return lines;
  }
  function getOtherCovalOrBinSaltsPRE_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix1 = sub1 ? PREFIXES[sub1] : "";
    const prefix2 = sub2 ? PREFIXES[sub2] : "";
    const stem2 = getStem(lang, symb2);
    const genitive = getGenitive(lang, symb1, sub1);
    const uro = getLiteral("uro", lang);
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: stem2, color: COL.red },
        { text: uro, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: prefix1, color: COL.lightGreen },
        { text: name1, color: COL.green }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[3]
    });
    return lines;
  }
  function getOtherCovalOrBinSaltsNOX_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const stem2 = getStem(lang, symb2);
    const uroStr = getLiteral("uro", lang);
    const genitive = getGenitive(lang, symb1);
    let subNox = sub2;
    const noxObj2 = getNoxObj(symb2);
    if (noxObj2.negative !== sub1) {
      const multiplier = noxObj2.negative || 1;
      subNox = (sub2 || 1) * multiplier;
    }
    const nox = getNox(symb1, subNox);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: "(FALTA REVISAR i EXPLICAR COM ACONSEGUIR EL NOX, ESPECIALMENT QUAN HI HA HAGUT SIMPLIFICACIONS: CS2, CSe2, CrS3, PbS2...)"
      // TODO
    });
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getOtherCovalOrBinSaltsNOX_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const stem2 = getStem(lang, symb2);
    const uroStr = getLiteral("uro", lang);
    const genitive = getGenitive(lang, symb1);
    const noxObj2 = getNoxObj(symb2);
    const subNox1 = noxObj2.negative;
    let subNox2 = sub2;
    if (noxObj2.negative !== sub1) {
      const multiplier = noxObj2.negative || 1;
      subNox2 = (sub2 || 1) * multiplier;
    }
    const nox = getNox(symb1, subNox2);
    lines.push({
      left: [
        { text: stem2, color: COL.red },
        { text: uroStr, color: COL.lilac },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: "(FALTA REVISAR)"
      // TODO
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: subNox1, color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: subNox1, color: COL.lightGreen },
        { text: symb2, color: COL.red }
      ],
      right: help[2]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: subNox1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: subNox2, color: COL.orange }
      ],
      right: help[3]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: symb2, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[4]
    });
    return lines;
  }
  function getPeroxides({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getPeroxidesPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getPeroxidesPRE_NF({ lang, fmlaData, help });
      case "NOX-FN":
        return getPeroxidesNOX_FN({ lang, fmlaData, help });
      case "NOX-NF":
        return getPeroxidesNOX_NF({ lang, fmlaData, help });
    }
  }
  function getPeroxidesPRE_FN({ lang, fmlaData, help }) {
    const { hasParenthesis } = fmlaData;
    if (hasParenthesis) {
      return [{
        left: [{ text: "FALTA SABER COM TRACTAR ELS PARÈNTESIS DELS PERÒXIDS EN PRE", color: COL.red }],
        // TODO
        right: ""
      }];
    }
    fmlaData.symb2 = "O";
    fmlaData.sub2 = "2";
    return getOxidesPRE_FN({ lang, fmlaData, help });
  }
  function getPeroxidesPRE_NF({ lang, fmlaData, help }) {
    const { hasParenthesis } = fmlaData;
    if (hasParenthesis) {
      return [{
        left: [{ text: "FALTA SABER COM TRACTAR ELS PARÈNTESIS DELS PERÒXIDS EN PRE", color: COL.red }],
        // TODO
        right: ""
      }];
    }
    fmlaData.symb2 = "O";
    fmlaData.sub2 = "2";
    return getOxidesPRE_NF({ lang, fmlaData, help });
  }
  function getPeroxidesNOX_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2, hasParenthesis } = fmlaData;
    const lines = [];
    const peroxideStr = getLiteral("peróxido", lang);
    const genitive = getGenitive(lang, symb1);
    let subNox = sub2;
    if (sub1 !== "2") {
      subNox = (sub2 || 1) * 2;
    }
    const nox = getNox(symb1, subNox);
    if (hasParenthesis) {
      lines.push({
        left: [
          { text: symb1, color: COL.green },
          { text: sub1, color: COL.lightGreen },
          { text: "(O", color: COL.red },
          { text: "2", color: COL.red },
          { text: ")", color: COL.red },
          { text: sub2, color: COL.orange }
        ],
        right: "(FALTA REVISAR, SOBRETOT SI EL NOX ÉS CORRECTE [s'ha intentat revertir la simplificació])"
        // TODO
      });
    } else {
      lines.push({
        left: [
          { text: symb1, color: COL.green },
          { text: sub1, color: COL.lightGreen },
          { text: "O", color: COL.red },
          { text: "2", color: COL.orange }
        ],
        right: "(FALTA REVISAR, SOBRETOT SI EL NOX ÉS CORRECTE [s'ha intentat revertir la simplificació])"
        // TODO
      });
    }
    lines.push({
      left: [
        { text: peroxideStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: peroxideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: peroxideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getPeroxidesNOX_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2, hasParenthesis } = fmlaData;
    const lines = [];
    const peroxideStr = getLiteral("peróxido", lang);
    const genitive = getGenitive(lang, symb1);
    let subNox = sub2;
    if (sub1 !== "2") {
      subNox = (sub2 || 1) * 2;
    }
    const nox = getNox(symb1, subNox);
    lines.push({
      left: [
        { text: peroxideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: "(FALTA REVISAR)"
      // TODO,
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: "2", color: COL.red }
      ],
      right: help[2]
    });
    if (hasParenthesis) {
      lines.push({
        left: [
          { text: symb1, color: COL.green },
          { text: "2", color: COL.lightGreen },
          { text: "(O", color: COL.red },
          { text: "2", color: COL.red },
          { text: ")", color: COL.red },
          { text: subNox, color: COL.orange }
        ],
        right: help[3]
      });
      lines.push({
        left: [
          { text: symb1, color: COL.green },
          { text: sub1, color: COL.lightGreen },
          { text: "(O", color: COL.red },
          { text: "2", color: COL.red },
          { text: ")", color: COL.red },
          { text: sub2, color: COL.orange }
        ],
        right: help[4]
      });
    } else {
      lines.push({
        left: [
          { text: symb1, color: COL.green },
          { text: "2", color: COL.lightGreen },
          { text: "(O", color: COL.red },
          { text: "2", color: COL.red },
          { text: ")", color: COL.red },
          { text: subNox, color: COL.orange }
        ],
        right: help[3]
      });
      lines.push({
        left: [
          { text: symb1, color: COL.green },
          { text: sub1, color: COL.lightGreen },
          { text: "O", color: COL.red },
          { text: "2", color: COL.red }
        ],
        right: help[4]
      });
    }
    return lines;
  }
  function getHydroxides({ lang, system, mode, fmlaData, help }) {
    switch (`${system}-${mode}`) {
      case "PRE-FN":
        return getHydroxidesPRE_FN({ lang, fmlaData, help });
      case "PRE-NF":
        return getHydroxidesPRE_NF({ lang, fmlaData, help });
      case "NOX-FN":
        return getHydroxidesNOX_FN({ lang, fmlaData, help });
      case "NOX-NF":
        return getHydroxidesNOX_NF({ lang, fmlaData, help });
    }
  }
  function getHydroxidesPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix2 = sub2 ? PREFIXES[sub2] : "";
    const hydroxideStr = getLiteral("hidróxido", lang);
    const hydroxideFmla = sub2 ? "(OH)" : "OH";
    const genitive = getGenitive(lang, symb1);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        // { text: sub1, color: COL.lightGreen },  // Mai n'hi ha
        { text: hydroxideFmla, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: hydroxideStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: hydroxideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[2]
    });
    return lines;
  }
  function getHydroxidesPRE_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix2 = sub2 ? PREFIXES[sub2] : "";
    const hydroxideStr = getLiteral("hidróxido", lang);
    const hydroxideFmla = sub2 ? "(OH)" : "OH";
    const genitive = getGenitive(lang, symb1);
    lines.push({
      left: [
        { text: prefix2, color: COL.orange },
        { text: hydroxideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "OH", color: COL.red }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: hydroxideFmla, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getHydroxidesNOX_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const hydroxideFmla = sub2 ? "(OH)" : "OH";
    const hydrideStr = getLiteral("hidróxido", lang);
    const genitive = getGenitive(lang, symb1);
    const nox = getNox(symb1, sub2);
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        // { text: sub1, color: COL.lightGreen },  // Mai n'hi ha
        { text: hydroxideFmla, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: "(FALTA REVISAR. CALDRIA DIR QUE EL NOX CORRESPON AL SUBÍNDEX DEL GRUP HIDROXIL)"
    });
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function getHydroxidesNOX_NF({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const hydroxideFmla = sub2 ? "(OH)" : "OH";
    const hydrideStr = getLiteral("hidróxido", lang);
    const genitive = getGenitive(lang, symb1);
    const nox = getNox(symb1, sub2);
    lines.push({
      left: [
        { text: hydrideStr, color: COL.red },
        { text: genitive, color: COL.grey },
        { text: name1, color: COL.green },
        { text: nox, color: COL.orange }
      ],
      right: "(FALTA REVISAR)"
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green }
      ],
      right: help[0]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "OH", color: COL.red }
      ],
      right: help[1]
    });
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: hydroxideFmla, color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[2]
    });
    return lines;
  }
  function addLibToGlobal() {
    globalThis.chemHelpLib = {
      version: "0.1.0",
      parseFmla,
      getHelpCard
    };
  }
  addLibToGlobal();
})();
