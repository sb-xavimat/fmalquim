"use strict";
// MARK: Imports
import { COLOR } from "./constants.js";
import { HELP } from "./help.js";
import {
  getGenitive,
  getLiteral,
  getNox,
  getNoxObj,
  getStem,
  parseFmla,
  getPrefix
} from "./utils.js";


// MARK: Main
/**
 * Obté una targeta d'ajuda per a una fórmula química segons els paràmetres.
 * - `lang`: llengua (ca, en, es, eu)
 * - `system`: sistema de nomenclatura (PRE, NOX, TRA, SIS)
 * - `mode`: de fórmula a nom (FN) o de nom a fórmula (NF)
 * - `kind`: tipus de substància (1-14)
 * - `fmla`: string amb la fórmula química
 * @param {object} param0
 * @returns object
 */
function getCardData({ lang, system, mode, kind, fmla }, debug = false) {
  const fmlaData = parseFmla(fmla, lang, kind);
  if (fmlaData.error) {
    return { title: { key: fmlaData.error }, lines: [] };
  }

  const key = `${lang}-${kind}-${system}-${mode}`;
  const help = HELP[key];
  if (!help) {
    return { title: { key: "No s'ha trobat ajuda: " + key }, lines: [] };
  }
  const topStr = getLiteral("Tipo de sustancia:", lang);
  const kindStr = getLiteral(`kind${kind}`, lang);
  const title = { key, topStr, kindStr };
  const lines = kindsSwitcher(
    { kind, lang, system, mode, fmlaData, help },
    debug
  ) || [];
  return { title, lines };
}

function kindsSwitcher({ kind, lang, system, mode, fmlaData, help }, debug) {
  switch (kind) {
    case "1": return getElementary({ lang, system, mode, fmlaData, help }, debug);
    case "2": return getMetalHidr({ lang, system, mode, fmlaData, help });
    case "3": return getHydracids({ lang, system, mode, fmlaData, help });
    case "4": return getOxides({ lang, system, mode, fmlaData, help });
    case "5": return getOxides({ lang, system, mode, fmlaData, help });
    case "6": return getOxygenHalides({ lang, system, mode, fmlaData, help });
    case "7": return getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help });
    case "8": return getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help });
    case "9": return getPeroxides({ lang, system, mode, fmlaData, help });
    case "10": return getHydroxides({ lang, system, mode, fmlaData, help });
    default:
      if (debug) {
        return [{
          left: [{ text: "Not implemented", color: COLOR.red }],
          right: '<pre>' + JSON.stringify(fmlaData, null, 2) + '</pre>'
        }];
      } else {
        return [];
      }
  }
}

// MARK: 1. Elementary substances
function getElementary({ lang, system, mode, fmlaData, help }, debug) {
  // Comprovacions
  // No caldrien, perquè se suposa que totes les peticions seran vàlides,
  // però per ara les fem, per detectar errors en dev.
  if (system != "PRE") {
    if (!debug) { return []; }
    return [{
      left: [{ text: "Sistema invàlid", color: COLOR.red }],
      right: "PRE != " + system
    }];
  }
  if (!fmlaData.sub1) {
    if (!debug) { return []; }
    return [{
      left: [{
        text: "No s'ha trobat el subíndex de l'element", color: COLOR.red
      }],
      right: "En les instruccions diu que sempre n'hi haurà."
    }]
  }

  // En euskera, el nom va en un cas amb "-a".
  if (lang === "eu") {
    if (fmlaData.name1 === "Fluor") { fmlaData.name1 = "Fluorra"; }
    else if (fmlaData.name1 === "Zilar") { fmlaData.name1 = "Zilarra"; }
    else { fmlaData.name1 += "a"; }
  }

  switch (mode) {
    case "FN": return getElementaryFN({ lang, fmlaData, help });
    case "NF": return getElementaryNF({ lang, fmlaData, help });
  }
}

function getElementaryFN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1 } = fmlaData;
  const lines = [];
  const prefix = getPrefix(lang, sub1);
  if (!prefix) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.red },
      { text: sub1, color: COLOR.orange }
    ],
    right: ""
  })

  // Pas 1
  lines.push({
    left: [{ text: prefix, color: COLOR.orange }],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: prefix, color: COLOR.orange },
      { text: name1, color: COLOR.red }
    ],
    right: help[1],
  });

  return lines;
}

function getElementaryNF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1 } = fmlaData;
  const lines = [];
  const prefix = getPrefix(lang, sub1);
  if (!prefix) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: prefix, color: COLOR.orange },
      { text: name1, color: COLOR.red }
    ],
    right: "",
  });

  // Pas 1
  lines.push({
    left: [{ text: symb1, color: COLOR.red }],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.red },
      { text: sub1, color: COLOR.orange }
    ],
    right: help[1],
  });

  return lines;
}


// MARK: 2. Metallic hydrides
function getMetalHidr({ lang, system, mode, fmlaData, help }) {
  // Instruccions
  // - 2 elements, el primer és un metall, el segon és sempre hidrogen
  // - l'hidrogen por portar subíndex
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getMetalHidrPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getMetalHidrPRE_NF({ lang, fmlaData, help });
    case "NOX-FN": return getMetalHidrNOX_FN({ lang, fmlaData, help });
    case "NOX-NF": return getMetalHidrNOX_NF({ lang, fmlaData, help });
  }
}

function getMetalHidrPRE_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix = sub2 ? getPrefix(lang, sub2) : "";
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);
  if (!hydrideStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "H", color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: ""
  });

  // L'orde depén de la llengua
  if (lang == "eu") {
    // Pas 1
    lines.push({
      left: [{ text: name1, color: COLOR.green }],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix, color: COLOR.orange },
        { text: hydrideStr, color: COLOR.red },
      ],
      right: help[2],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: prefix, color: COLOR.orange }
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix, color: COLOR.orange },
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey }
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix, color: COLOR.orange },
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green }
      ],
      right: help[2],
    });
  }

  return lines;
}

function getMetalHidrPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix = sub2 ? getPrefix(lang, sub2) : "";
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);
  if (!hydrideStr) { return []; }

  // Línia inicial, l'orde depén de la llengua
  if (lang == "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix, color: COLOR.orange },
        { text: hydrideStr, color: COLOR.red },
      ],
      right: "",
    });

  } else {
    lines.push({
      left: [
        { text: prefix, color: COLOR.orange },
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green }
      ],
      right: "",
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "H", color: COLOR.red },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "H", color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: help[2],
  });

  return lines;
}

function getMetalHidrNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);
  const nox = getNox(symb1, sub2);
  if (!hydrideStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "H", color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: "" //(FALTA REVISAR ELS TEXTOS)" // TODO
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: hydrideStr, color: COLOR.red },
      ],
      right: help[2],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[2],
    });
  }

  return lines;
}

function getMetalHidrNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);
  const nox = getNox(symb1, sub2);
  if (!hydrideStr) { return []; }

  // Línia inicial, l'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: hydrideStr, color: COLOR.red },
      ],
      right: "",
    });
  } else {
    lines.push({
      left: [
        { text: hydrideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: "" // (FALTA REVISAR)",
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0]
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "H", color: COLOR.red },
    ],
    right: help[1]
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "H", color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: help[2]
  });

  return lines;
}


// MARK: 3. Hydracids
function getHydracids({ lang, system, mode, fmlaData, help }) {
  // Instruccions
  // - 2 elements: el primer és SEMPRE H, el 2n un no-metall
  // - El no-metall pot portar subíndex 2, o no dur-ne (crec que hi ha un ERROR, és l'hidrogen el que pot portar subíndex)
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getHydracidsPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getHydracidsPRE_NF({ lang, fmlaData, help });
    case "NOX-FN": return getHydracidsNOX_FN({ lang, fmlaData, help });
    case "NOX-NF": return getHydracidsNOX_NF({ lang, fmlaData, help });
    case "TRA-NF": return getHydracidsTRA_NF({ lang, fmlaData, help });
    case "TRA-FN": return getHydracidsTRA_FN({ lang, fmlaData, help });
  }
}

function getHydracidsPRE_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1, sub1);
  const prefix1 = sub1 ? getPrefix(lang, sub1) : "";
  if (!stem2 || !uroStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
    ],
    right: ""
  });

  // L'orde depén de la llengua
  if (lang == "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: help[2],
    });

  } else {
    // Pas 1
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: help[2],
    });
  }

  return lines;
}

function getHydracidsPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1, sub1);
  const prefix1 = sub1 ? getPrefix(lang, sub1) : "";
  if (!stem2 || !uroStr) { return []; }

  // Línia inicial, depén de la llengua
  if (lang == "eu") {
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: ""
    });

  } else {
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: ""
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
    ],
    right: help[2],
  });

  return lines;
}

function getHydracidsNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1);
  if (!stem2 || !uroStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
    ],
    right: "" // (FALTA REVISAR)
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: help[1],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });
  }

  return lines;
}

function getHydracidsNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1);
  if (!stem2 || !uroStr) { return []; }

  // Línia inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: ""
    });
  } else {
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
      ],
      right: "" // (FALTA REVISAR, HE AFEGIT \"negativo\" EN EL PAS 2)",
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
    ],
    right: help[0]
  });

  // Pas 2
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
    ],
    right: help[1]
  });

  // Pas 3
  lines.push({
    left: [
      { text: "H", color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
    ],
    right: help[2]
  });

  return lines;
}

function getHydracidsTRA_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
} // TODO
function getHydracidsTRA_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
} // TODO

// MARK: 4/5. Òxids (metàl·lics i no metàl·lics)
function getOxides({ lang, system, mode, fmlaData, help }) {
  // Instruccions
  // 2 elements: el primer és un metall, el segon SEMPRE és oxigen
  // Pintem el metall de verd, i l’oxigen de vermell.
  // El metall pot no tenir subíndex o tenir un 2
  // L’oxígen pot no tenir subíndex o ser 3, 5 o 7
  // El subíndex del metall en verd clar, el de  l’oxigen, en taronja.
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getOxidesPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getOxidesPRE_NF({ lang, fmlaData, help });
    case "NOX-FN": return getOxidesNOX_FN({ lang, fmlaData, help });
    case "NOX-NF": return getOxidesNOX_NF({ lang, fmlaData, help });
  }
}

function getOxidesPRE_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix1 = sub1 ? getPrefix(lang, sub1) : "";
  const prefix2 = sub2 ? getPrefix(lang, sub2) : "mono";
  const prefix2Short = sub2 ? getPrefix(lang, sub2) : "mon";
  const oxidStr = getLiteral("óxido", lang);
  const genitive = getGenitive(lang, symb1, sub1);
  if (!oxidStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: ""
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
      ],
      right: help[2],
    });

    // Pas 4
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2Short, color: COLOR.orange },
        { text: oxidStr, color: COLOR.red },
      ],
      right: help[3],
    });
  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange }
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix2Short, color: COLOR.orange },
        { text: oxidStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey }
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix2Short, color: COLOR.orange },
        { text: oxidStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen }
      ],
      right: help[2],
    });

    // Pas 4
    lines.push({
      left: [
        { text: prefix2Short, color: COLOR.orange },
        { text: oxidStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green }
      ],
      right: help[3],
    });
  }

  return lines;
}

function getOxidesPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix1 = sub1 ? getPrefix(lang, sub1) : "";
  const prefix2Short = sub2 ? getPrefix(lang, sub2) : "mon";
  const oxidStr = getLiteral("óxido", lang);
  const genitive = getGenitive(lang, symb1, sub1);
  if (!oxidStr) { return []; }

  // Línia inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2Short, color: COLOR.orange },
        { text: oxidStr, color: COLOR.red },
      ],
      right: "",
    });
  } else {
    lines.push({
      left: [
        { text: prefix2Short, color: COLOR.orange },
        { text: oxidStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green }
      ],
      right: "",
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: help[3],
  });

  return lines;
}

function getOxidesNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const oxydeStr = getLiteral("óxido", lang);
  const genitive = getGenitive(lang, symb1);
  if (!oxydeStr) { return []; }

  // El nombre d'oxidació no és directament el sub2, perquè pot haver-hi una
  // simplificació:
  // - Si sub1=2, aleshores no hi ha hagut simplificació.
  // - si sub1="", aleshores cal multiplicar sub2 per 2.
  // - Pot ser que sub2="", per tant, cal substituir-lo per 1.
  const subNox = sub1 ? sub2 : (sub2 || 1) * 2;
  const nox = getNox(symb1, subNox);

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    // right: "(FALTA REVISAR, ESPECIALMENT INDICAR DE QUINS NOX PARLEM, ¿NOMÉS POSITIUS?)"  // .dev.
    right: ""// FALTA REVISAR I COMPLETAR|• PARLEM DE NOX NOMÉS POSITIUS (?)|• ¿COM OBTINDRE EL NOX? CAL DETECTAR SI HI HA HAGUT SIMPLIFICACIÓ"  // .dev.
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: oxydeStr, color: COLOR.red },
      ],
      right: help[2],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: oxydeStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey }
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: oxydeStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green }
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: oxydeStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange }
      ],
      right: help[2],
    });
  }

  return lines;
}

function getOxidesNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const oxydeStr = getLiteral("óxido", lang);
  const genitive = getGenitive(lang, symb1);
  if (!oxydeStr) { return []; }

  // El nombre d'oxidació no és directament el sub2, perquè pot haver-hi una
  // simplificació:
  // - Si sub1=2, aleshores no hi ha hagut simplificació.
  // - si sub1="", aleshores cal multiplicar sub2 per 2.
  // - Pot ser que sub2="", per tant, cal substituir-lo per 1.
  const subNox = sub1 ? sub2 : (sub2 || 1) * 2;
  const nox = getNox(symb1, subNox);

  // Línia inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: oxydeStr, color: COLOR.red },
      ],
      right: ""
    });
  } else {
    lines.push({
      left: [
        { text: oxydeStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange }
      ],
      right: ""// (FALTA REVISAR SIMPLIFICACIÓ DE SUBÍNDEXS)"  // .dev.
    });
  }
  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "2", color: COLOR.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "2", color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "2", color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
      { text: subNox, color: COLOR.orange },
    ],
    right: help[3],
  });

  // Pas 5
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: help[4],
  });

  return lines;
}


// MARK: 6. Oxygen halides
function getOxygenHalides({ lang, system, mode, fmlaData, help }) {
  // Característiques:
  // - 2 elements: el primer és SEMPRE oxigen, el segon és SEMPRE un halogen: F, Cl,
  // - Pintem l’oxigen de verd, i l’halogen de vermell.
  // - L’oxigen pot no tenir subíndex o que sigui 3, 5 o 7
  // - L’halogen té sempre subíndex 2
  // - El subíndex de l’oxigen en verd clar, el de l’halogen, en taronja.
  // - Només sistema PRE
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getOxygenHalidesPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getOxygenHalidesPRE_NF({ lang, fmlaData, help });
  }
}

function getOxygenHalidesPRE_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uro = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1, sub1);
  const prefix1 = getPrefix(lang, sub1) || "";
  if (!stem2 || !uro) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: ""
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: "di", color: COLOR.orange },
      ],
      right: help[2],
    });

    // Pas 4
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: "di", color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
      ],
      right: help[3],
    });
  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: "di", color: COLOR.orange }
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: "di", color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac }
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: "di", color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen }
      ],
      right: help[2],
    });

    // Pas 4
    lines.push({
      left: [
        { text: "di", color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green }
      ],
      right: help[3],
    });
  }
  return lines;
}

function getOxygenHalidesPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uro = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1, sub1);
  const prefix1 = getPrefix(lang, sub1) || "";
  if (!stem2 || !uro) { return []; }

  // Línia inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: "di", color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
      ],
      right: ""
    });
  } else {
    lines.push({
      left: [
        { text: "di", color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green }
      ],
      right: "" // (FALTA REVISAR)",  .dev.
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red }
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: help[3],
  });

  return lines;
}


// MARK: 7/8. Other covalents / Binary salts
function getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help }) {
  // Característiques:
  // - 2 elements, no metalls o metaloides: el segon és més electronegatiu que
  //   el primer.
  // - Pintem el primer de verd, i el segon de vermell.
  // - Tots poden tenir subíndexs o no
  // - El subíndex del primer en verd clar, el del segon, en taronja.
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getOtherCovalOrBinSaltsPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getOtherCovalOrBinSaltsPRE_NF({ lang, fmlaData, help });
    case "NOX-FN": return getOtherCovalOrBinSaltsNOX_FN({ lang, fmlaData, help });
    case "NOX-NF": return getOtherCovalOrBinSaltsNOX_NF({ lang, fmlaData, help });
  }
}

function getOtherCovalOrBinSaltsPRE_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix1 = sub1 ? getPrefix(lang, sub1) : "";
  const prefix2 = sub2 ? getPrefix(lang, sub2) : "";
  const stem2 = getStem(lang, symb2);
  const genitive = getGenitive(lang, symb1, sub1);
  const uro = getLiteral("uro", lang);
  if (!stem2 || !uro) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: ""
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
      ],
      right: help[2],
    });

    // Pas 4
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
      ],
      right: help[3],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
      ],
      right: help[2],
    });

    // Pas 4
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: help[3],
    });
  }

  return lines;
}

function getOtherCovalOrBinSaltsPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix1 = sub1 ? getPrefix(lang, sub1) : "";
  const prefix2 = sub2 ? getPrefix(lang, sub2) : "";
  const stem2 = getStem(lang, symb2);
  const genitive = getGenitive(lang, symb1, sub1);
  const uro = getLiteral("uro", lang);
  if (!stem2 || !uro) { return []; }

  // Pas inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
      ],
      right: ""
    });
  } else {
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
        { text: stem2, color: COLOR.red },
        { text: uro, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: prefix1, color: COLOR.lightGreen },
        { text: name1, color: COLOR.green },
      ],
      right: "" // (FALTA REVISAR)",
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: help[3],
  });

  return lines;
}

function getOtherCovalOrBinSaltsNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1);
  // El nox pot dependre de simplificacions. Caldrà fer operacions amb els
  // nombres d'oxidació dels elements per revertir l'eventual simplificació.
  let subNox = sub2;
  const noxObj2 = getNoxObj(symb2);
  if (noxObj2.negative !== sub1) {
    // Hi ha hagut simplificació, cal revertir-la multiplicant
    const multiplier = noxObj2.negative || 1;
    subNox = (sub2 || 1) * multiplier;
  }
  const nox = getNox(symb1, subNox);
  if (!stem2 || !uroStr) { return []; }

  // First line
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: "" // (FALTA REVISAR i EXPLICAR COM ACONSEGUIR EL NOX, ESPECIALMENT QUAN HI HA HAGUT SIMPLIFICACIONS: CS2, CSe2, CrS3, PbS2...)" // .dev.
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: help[2],
    });
  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[2],
    });
  }

  return lines;
}

function getOtherCovalOrBinSaltsNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1);
  // El nox pot dependre de simplificacions. Caldrà fer operacions amb els
  // nombres d'oxidació dels elements per revertir l'eventual simplificació.
  const noxObj2 = getNoxObj(symb2);
  const subNox1 = noxObj2.negative;
  let subNox2 = sub2;
  if (noxObj2.negative !== sub1) {
    // Hi ha hagut simplificació, cal revertir-la multiplicant
    const multiplier = noxObj2.negative || 1;
    subNox2 = (sub2 || 1) * multiplier;
  }
  const nox = getNox(symb1, subNox2);
  if (!stem2 || !uroStr) { return []; }

  // First line, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
      ],
      right: ""
    });
  } else {
    lines.push({
      left: [
        { text: stem2, color: COLOR.red },
        { text: uroStr, color: COLOR.lilac },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: "" // (FALTA REVISAR)" // .dev.
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: subNox1, color: COLOR.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: subNox1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: subNox1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: subNox2, color: COLOR.orange },
    ],
    right: help[3],
  });

  // Pas 5
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: sub1, color: COLOR.lightGreen },
      { text: symb2, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: help[4],
  });

  return lines;
}


// MARK: 9. Peroxides
function getPeroxides({ lang, system, mode, fmlaData, help }) {
  // Característiques:
  // - 2 elements: el primer és un metall, el segon SEMPRE és oxigen
  // - Pintem el metall de verd, i l’oxigen de vermell.
  // - El metall pot no tenir subíndex o tenir un 2
  // - L’oxígen pot no tenir subíndex o ser 3, 5 o 7
  // - El subíndex del metall en verd clar, el de  l’oxigen, en taronja.

  // En sistema PRE, és idèntic als òxids.
  // En sistema NOX, caldrà fer una fitxa diferent.
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getPeroxidesPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getPeroxidesPRE_NF({ lang, fmlaData, help });
    case "NOX-FN": return getPeroxidesNOX_FN({ lang, fmlaData, help });
    case "NOX-NF": return getPeroxidesNOX_NF({ lang, fmlaData, help });
  }
}

function getPeroxidesPRE_FN({ lang, fmlaData, help }) {
  const { hasParenthesis } = fmlaData;
  if (hasParenthesis) {
    return [];
    // return [{
    //   left: [{ text: "FALTA SABER COM TRACTAR ELS PARÈNTESIS DELS PERÒXIDS EN PRE", color: COLOR.red }], // TODO
    //   right: ""
    // }];  .dev.
  }

  // Si no hi ha paréntesis, és com un òxid normal.
  fmlaData.symb2 = "O";
  fmlaData.sub2 = "2";

  return getOxidesPRE_FN({ lang, fmlaData, help });
}

function getPeroxidesPRE_NF({ lang, fmlaData, help }) {
  const { hasParenthesis } = fmlaData;
  if (hasParenthesis) {
    return [];
    // return [{
    //   left: [{ text: "FALTA SABER COM TRACTAR ELS PARÈNTESIS DELS PERÒXIDS EN PRE", color: COLOR.red }], // TODO
    //   right: ""
    // }];  .dev.
  }

  // Si no hi ha paréntesis, és com un òxid normal.
  fmlaData.symb2 = "O";
  fmlaData.sub2 = "2";

  return getOxidesPRE_NF({ lang, fmlaData, help });
}

function getPeroxidesNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2, hasParenthesis } = fmlaData;
  const lines = [];
  const peroxideStr = getLiteral("peróxido", lang);
  const genitive = getGenitive(lang, symb1);
  // El nox pot dependre de simplificacions. Caldrà fer operacions amb els
  // nombres d'oxidació dels elements per revertir l'eventual simplificació.
  let subNox = sub2;
  if (sub1 !== "2") {
    // Si el sub1 no és 2, aleshores hi ha hagut una simplificació
    // Cal multiplicar el sub1 per 2 (si el sub1="", substituir-lo per 1)
    subNox = (sub2 || 1) * 2;
  }
  const nox = getNox(symb1, subNox);
  if (!peroxideStr) { return []; }

  // Línia inicial
  if (hasParenthesis) {
    lines.push({
      left: [
        { text: symb1, color: COLOR.green },
        { text: sub1, color: COLOR.lightGreen },
        { text: "(O", color: COLOR.red },
        { text: "2", color: COLOR.red },
        { text: ")", color: COLOR.red },
        { text: sub2, color: COLOR.orange }
      ],
      right: "" // (FALTA REVISAR, SOBRETOT SI EL NOX ÉS CORRECTE [s'ha intentat revertir la simplificació])"  // .dev.
    });

  } else {
    // Si no hi ha paréntesis, l'oxigen té sempre un 2.
    lines.push({
      left: [
        { text: symb1, color: COLOR.green },
        { text: sub1, color: COLOR.lightGreen },
        { text: "O", color: COLOR.red },
        { text: "2", color: COLOR.orange }
      ],
      right: "" // (FALTA REVISAR, SOBRETOT SI EL NOX ÉS CORRECTE [s'ha intentat revertir la simplificació])"  // .dev.
    });
  }

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: peroxideStr, color: COLOR.red },
      ],
      right: help[2],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: peroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey }
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: peroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green }
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: peroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange }
      ],
      right: help[2],
    });
  }

  return lines;
}

function getPeroxidesNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2, hasParenthesis } = fmlaData;
  const lines = [];
  const peroxideStr = getLiteral("peróxido", lang);
  const genitive = getGenitive(lang, symb1);
  // El nox pot dependre de simplificacions. Caldrà fer operacions amb els
  // nombres d'oxidació dels elements per revertir l'eventual simplificació.
  let subNox = sub2;
  if (sub1 !== "2") {
    // Si el sub1 no és 2, aleshores hi ha hagut una simplificació
    // Cal multiplicar el sub1 per 2 (si el sub1="", substituir-lo per 1)
    subNox = (sub2 || 1) * 2;
  }
  const nox = getNox(symb1, subNox);
  if (!peroxideStr) { return []; }

  // Línia inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: peroxideStr, color: COLOR.red },
      ],
      right: ""
    });
  } else {
    lines.push({
      left: [
        { text: peroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange }
      ],
      right: "" // (FALTA REVISAR)"  // .dev.
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "2", color: COLOR.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "2", color: COLOR.lightGreen },
      { text: "O", color: COLOR.red },
      { text: "2", color: COLOR.red },
    ],
    right: help[2],
  });

  if (hasParenthesis) {
    // Pas 4
    lines.push({
      left: [
        { text: symb1, color: COLOR.green },
        { text: "2", color: COLOR.lightGreen },
        { text: "(O", color: COLOR.red },
        { text: "2", color: COLOR.red },
        { text: ")", color: COLOR.red },
        { text: subNox, color: COLOR.orange },
      ],
      right: help[3],
    });

    // Pas 5
    lines.push({
      left: [
        { text: symb1, color: COLOR.green },
        { text: sub1, color: COLOR.lightGreen },
        { text: "(O", color: COLOR.red },
        { text: "2", color: COLOR.red },
        { text: ")", color: COLOR.red },
        { text: sub2, color: COLOR.orange }
      ],
      right: help[4],
    });

  } else {
    // Pas 4
    lines.push({
      left: [
        { text: symb1, color: COLOR.green },
        { text: "2", color: COLOR.lightGreen },
        { text: "(O", color: COLOR.red },
        { text: "2", color: COLOR.red },
        { text: ")", color: COLOR.red },
        { text: subNox, color: COLOR.orange },
      ],
      right: help[3],
    });

    // Pas 5
    lines.push({
      left: [
        { text: symb1, color: COLOR.green },
        { text: sub1, color: COLOR.lightGreen },
        { text: "O", color: COLOR.red },
        { text: "2", color: COLOR.red }
      ],
      right: help[4],
    });
  }

  return lines;
}


// MARK: 10. Hydroxides
function getHydroxides({ lang, system, mode, fmlaData, help }) {
  // Característiques (TODO: FALTEN)
  switch (`${system}-${mode}`) {
    case "PRE-FN": return getHydroxidesPRE_FN({ lang, fmlaData, help });
    case "PRE-NF": return getHydroxidesPRE_NF({ lang, fmlaData, help });
    case "NOX-FN": return getHydroxidesNOX_FN({ lang, fmlaData, help });
    case "NOX-NF": return getHydroxidesNOX_NF({ lang, fmlaData, help });
  }
}

function getHydroxidesPRE_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix2 = sub2 ? getPrefix(lang, sub2) : "";
  const hydroxideStr = getLiteral("hidróxido", lang);
  const hydroxideFmla = sub2 ? "(OH)" : "OH";
  const genitive = getGenitive(lang, symb1);  // Mai n'hi ha 'sub1'
  if (!hydroxideStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      // { text: sub1, color: COL.lightGreen },  // Mai n'hi ha
      { text: hydroxideFmla, color: COLOR.red },
      { text: sub2, color: COLOR.orange },
    ],
    right: "" // (FALTA REVISAR)" .dev.
  });

  // L'orde depén de la llengua
  if (lang == "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
        { text: hydroxideStr, color: COLOR.red },
      ],
      right: help[2],
    });

  } else {
    // Pas 1
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
        { text: hydroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: prefix2, color: COLOR.orange },
        { text: hydroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
      ],
      right: help[2],
    });
  }

  return lines;
}

function getHydroxidesPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix2 = sub2 ? getPrefix(lang, sub2) : "";
  const hydroxideStr = getLiteral("hidróxido", lang);
  const hydroxideFmla = sub2 ? "(OH)" : "OH";
  const genitive = getGenitive(lang, symb1);  // Mai n'hi ha 'sub1'
  if (!hydroxideStr) { return []; }

  // Línia inicial, depén de la llengua
  if (lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: genitive, color: COLOR.grey },
        { text: prefix2, color: COLOR.orange },
        { text: hydroxideStr, color: COLOR.red },
      ],
      right: ""
    });

  } else {
  lines.push({
    left: [
      { text: prefix2, color: COLOR.orange },
      { text: hydroxideStr, color: COLOR.red },
      { text: genitive, color: COLOR.grey },
      { text: name1, color: COLOR.green },
    ],
    right: "" // (FALTA REVISAR)", .dev.
  });}

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "OH", color: COLOR.red },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: hydroxideFmla, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: help[2],
  });

  return lines;
}

function getHydroxidesNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const hydroxideFmla = sub2 ? "(OH)" : "OH";
  const hydroxideStr = getLiteral("hidróxido", lang);
  const genitive = getGenitive(lang, symb1);
  const nox = getNox(symb1, sub2);
  if (!hydroxideStr) { return []; }

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      // { text: sub1, color: COL.lightGreen },  // Mai n'hi ha
      { text: hydroxideFmla, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: "" // (FALTA REVISAR. CALDRIA DIR QUE EL NOX CORRESPON AL SUBÍNDEX DEL GRUP OH)" .dev.
  });

  // L'orde depén de la llengua
  if (lang === "en" || lang === "eu") {
    // Pas 1
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: hydroxideStr, color: COLOR.red },
      ],
      right: help[2],
    });

  } else { // Altres llengües
    // Pas 1
    lines.push({
      left: [
        { text: hydroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
      ],
      right: help[0],
    });

    // Pas 2
    lines.push({
      left: [
        { text: hydroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
      ],
      right: help[1],
    });

    // Pas 3
    lines.push({
      left: [
        { text: hydroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
      ],
      right: help[2],
    });
  }
  return lines;
}

function getHydroxidesNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const hydroxideFmla = sub2 ? "(OH)" : "OH";
  const hydroxideStr = getLiteral("hidróxido", lang);
  const genitive = getGenitive(lang, symb1);
  const nox = getNox(symb1, sub2);
  if (!hydroxideStr) { return []; }

  // Línia inicial, depén de la llengua
  if (lang === "en" || lang === "eu") {
    lines.push({
      left: [
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange },
        { text: genitive, color: COLOR.grey },
        { text: hydroxideStr, color: COLOR.red },
      ], right: ""
    });
  } else {
    lines.push({
      left: [
        { text: hydroxideStr, color: COLOR.red },
        { text: genitive, color: COLOR.grey },
        { text: name1, color: COLOR.green },
        { text: nox, color: COLOR.orange }
      ], right: "" // (FALTA REVISAR)" .dev.
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: "OH", color: COLOR.red },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COLOR.green },
      { text: hydroxideFmla, color: COLOR.red },
      { text: sub2, color: COLOR.orange }
    ],
    right: help[2],
  });

  return lines;
}

export { getCardData };