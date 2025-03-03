"use strict";
// Library for generating help cards for chemistry formulations
/*!
(c) 2025 Learning Bits S.L.
Author: Xavimat
Codi generat automàticament amb esbuild (https://esbuild.github.io/)
*/
const VERSION = "0.15.0";

// MARK: Imports
import { COL, PREFIXES, ROMANS } from "./constants.js";
import { ELEMENTS } from "./elements.js";
import { HELP } from "./help.js";
import { LITERALS } from "./literals.js";


// MARK: Utils
/**
 * Obtindre les dades d'un element a partir del seu símbol.
 * Funciona tant si ELEMENTS és un array com si és un objecte amb els símbols
 * com a claus.
 * @param {string} symb Símbol del element
 * @returns Objecte amb les dades de l'element
 */
function getElem(symb) {
  return ELEMENTS[symb] || ELEMENTS.find(elem => elem.symb === symb);
}

function getLiteral(key, lang) {
  try {
    return LITERALS[key][lang];
  } catch (e) {
    console.error("Literal no trobat:", key, lang);
  }
}

/**
 * Retorna el nombre d'oxidació d'un element, si l'element en té més d'un.
 * @param {string} symb
 * @param {string | undefined} num
 * @returns string
 */
function getNox(symb, num) {
  const elem = getElem(symb) || {};

  // Hidrogen, silici i àstat han de comptar com si només tingueren un nox.
  // (només en tenen 1 de positiu; encara que tinguen un negatiu, no ha de
  // comptar... crec)
  const onlyOne = ["H", "Si", "At"].includes(symb);
  if (onlyOne) { return ""; }

  if (elem.nox?.includes("/")) {
    // Si hi ha un separador en elem.nox, és que té més d'un nombre d'oxidació.
    const nox = ROMANS[num];
    return nox || "(I)";
  }
  return "";
}

/**
 * Retorna un objecte amb diverses infos dels nombres d'oxidació de l'element.
 * @param {string} symb
 * @returns {Object} Dades dels nombres d'oxidació de l'element
 */
function getNoxObj(symb) {
  const elem = getElem(symb) || {};
  if (!elem.nox) { return {}; }
  const noxs = elem.nox.replace("–", "-").split("/").map(Number);
  const negativeNox = noxs.find(n => n < 0);
  let negative = negativeNox && String(Math.abs(negativeNox));
  if (negative === "1") { negative = ""; }
  const len = noxs.length;
  const onlyOne = len === 1;
  const onlyNeg = len === 1 && negative;
  return { noxs, negative, len, onlyOne, onlyNeg };
}

// MARK: *parseFmla
/**
 * Parseja una fórmula amb dos elements i dos subíndexs.
 * @param {string} fmla
 */
function parseFmla(fmla, lang, kind) {
  let hasParenthesis = false;
  if (kind === "9") {  // Peroxids
    // Convertim "(O2)" en "X" per poder usar el parsejador de mono/bi.
    // Les dades del grup O2 (nom) ja les tenim a la funció.
    hasParenthesis = fmla.includes('(O2)');
    fmla = fmla.replace('(O2)', 'X').replace('O2', 'X');

  } else if (kind === "10") {  // Hidròxids
    // Convertim "OH" en "X" per poder usar el parsejador de mono/bi.
    // Les dades del grup OH (nom) ja les tenim a la funció.
    fmla = fmla.replace('(OH)', 'X').replace('OH', 'X');
  }

  const fmlaData = parseFmlaMonoBi(fmla, lang);

  return { ...fmlaData, hasParenthesis };
}

function parseFmlaMonoBi(fmla, lang) {
  // Útils
  const isUpperCase = c => (isNaN(c)) && (c === c.toUpperCase());
  const isNumber = c => !isNaN(parseInt(c));

  // Inicialització
  const result = {
    symb1: "", sub1: "", name1: "",
    symb2: "", sub2: "", name2: "",
  };
  let current;

  // Parsejat
  fmla.split("").forEach(c => {
    // Comença dada nova:
    // - si és majúscula
    // - si és un número i no s'estava parsejant un número
    const cIsANumber = isNumber(c);
    const start = (
      isUpperCase(c)
      || (cIsANumber && current !== "sub1" && current !== "sub2")
    );
    // Si comença dada nova:
    if (start) {
      if (current === undefined) { current = "symb1" }
      else if (current === "symb1") {
        if (cIsANumber) { current = "sub1"; }
        else { current = "symb2"; }
      }
      else if (current === "sub1") { current = "symb2"; }
      else if (current === "symb2") { current = "sub2"; }
      else if (current === "sub2") { result.error = "Fmla incorrecta"; }
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

// MARK: *getGenitive
/**
 * En català, retorna "d'" si cal:
 * - Si hi ha prefix que necessita apòstrof (6, 7, 8).
 * - Si no hi ha prefix i l'element necessita apòstrof.
 * @returns string
 */
function getGenitive(lang, symb, sub) {
  if (lang === "es") { return " de "; }
  if (lang === "ca") {
    if (sub) {
      if ("678".includes(sub)) { return " d’"; }
      else { return " de "; }
    } else {
      const elem = getElem(symb);
      if (elem.apostrof) { return " d’"; }
      else { return " de "; }
    }
  }
}

/**
 * Obtindre l'arrel d'un element, segons la llengua.
 */
function getStem(lang, symb) {
  const elem = getElem(symb) || {};
  const stem = elem[`stem_${lang}`] || "stem_not_found";
  return stem.toLowerCase();
}


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
    case "1": return getElementary({ lang, system, mode, fmlaData, help });
    case "2": return getMetalHidr({ lang, system, mode, fmlaData, help });
    case "3": return getHydracids({ lang, system, mode, fmlaData, help });
    case "4": return getOxides({ lang, system, mode, fmlaData, help });
    case "5": return getOxides({ lang, system, mode, fmlaData, help });
    case "6": return getOxygenHalides({ lang, system, mode, fmlaData, help });
    case "7": return getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help });
    case "8": return getOtherCovalOrBinSalts({ lang, system, mode, fmlaData, help });
    case "9": return getPeroxides({ lang, system, mode, fmlaData, help });
    case "10": return getHydroxides({ lang, system, mode, fmlaData, help });
    default: return [{
      left: [{ text: "Not implemented", color: COL.red }],
      right: '<pre>' + JSON.stringify(fmlaData, null, 2) + '</pre>'
    }];
  }
}

// MARK: 1. Elementary substances
function getElementary({ lang, system, mode, fmlaData, help }) {
  // Comprovacions
  // No caldrien, perquè se suposa que totes les peticions seran vàlides,
  // però per ara les fem, per detectar errors en dev.
  if (system != "PRE") {
    return [{
      left: [{ text: "Sistema invàlid", color: COL.red }],
      right: "PRE != " + system
    }];
  }
  if (!fmlaData.sub1) {
    return [{
      left: [{
        text: "No s'ha trobat el subíndex de l'element", color: COL.red
      }],
      right: "En les instruccions diu que sempre n'hi haurà."
    }]
  }

  switch (mode) {
    case "FN": return getElementaryFN({ lang, fmlaData, help });
    case "NF": return getElementaryNF({ lang, fmlaData, help });
  }
}

function getElementaryFN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1 } = fmlaData;
  const lines = [];
  const prefix = PREFIXES[sub1];

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.red },
      { text: sub1, color: COL.orange }
    ],
    right: ""
  })

  // Pas 1
  lines.push({
    left: [{ text: prefix, color: COL.orange }],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: prefix, color: COL.orange },
      { text: name1, color: COL.red }
    ],
    right: help[1],
  });

  return lines;
}

function getElementaryNF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1 } = fmlaData;
  const lines = [];
  const prefix = PREFIXES[sub1];

  // Línia inicial
  lines.push({
    left: [
      { text: prefix, color: COL.orange },
      { text: name1, color: COL.red }
    ],
    right: "",
  });

  // Pas 1
  lines.push({
    left: [{ text: symb1, color: COL.red }],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.red },
      { text: sub1, color: COL.orange }
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
  const prefix = sub2 ? PREFIXES[sub2] : "";
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "H", color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: ""
  });

  // Pas 1
  lines.push({
    left: [
      { text: prefix, color: COL.orange }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: prefix, color: COL.orange },
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: prefix, color: COL.orange },
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green }
    ],
    right: help[2],
  });

  return lines;
}

function getMetalHidrPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix = sub2 ? PREFIXES[sub2] : "";
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);

  // Línia inicial
  lines.push({
    left: [
      { text: prefix, color: COL.orange },
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green }
    ],
    right: "",
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "H", color: COL.red },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "H", color: COL.red },
      { text: sub2, color: COL.orange },
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

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "H", color: COL.red },
      { text: sub2, color: COL.orange },
    ],
    right: "(FALTA REVISAR ELS TEXTOS)" // TODO
  });

  // Pas 1
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange },
    ],
    right: help[2],
  });

  return lines;
}

function getMetalHidrNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const hydrideStr = getLiteral("hidruro", lang);
  const genitive = getGenitive(lang, symb1);
  const nox = getNox(symb1, sub2);

  // Línia inicial
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange },
    ],
    right: "(FALTA REVISAR)",
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0]
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "H", color: COL.red },
    ],
    right: help[1]
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "H", color: COL.red },
      { text: sub2, color: COL.orange },
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
  // TODO: cal crear les fitxes d'ajuda 3-PRE per a hidràcids (hi ha 3-NOX)
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
}

function getHydracidsPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
} // TODO

function getHydracidsNOX_FN({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1);

  // Línia inicial
  lines.push({
    left: [
      { text: "H", color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
    ],
    right: "(FALTA REVISAR)"
  });

  // Pas 1
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: help[1],
  });

  return lines;
}

function getHydracidsNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const stem2 = getStem(lang, symb2);
  const uroStr = getLiteral("uro", lang);
  const genitive = getGenitive(lang, symb1);

  // Línia inicial
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: "(FALTA REVISAR, HE AFEGIT \"negativo\" EN EL PAS 2)",
  });

  // Pas 1
  lines.push({
    left: [
      { text: "H", color: COL.green },
    ],
    right: help[0]
  });

  // Pas 2
  lines.push({
    left: [
      { text: "H", color: COL.green },
      { text: sub1, color: COL.lightGreen },
    ],
    right: help[1]
  });

  // Pas 3
  lines.push({
    left: [
      { text: "H", color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
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
  const prefix1 = sub1 ? PREFIXES[sub1] : "";
  const prefix2 = sub2 ? PREFIXES[sub2] : "mono";
  const prefix2Short = sub2 ? PREFIXES[sub2] : "mon";
  const oxidStr = getLiteral("óxido", lang);
  const genitive = getGenitive(lang, symb1, sub1);

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: "O", color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: ""
  });

  // Pas 1
  lines.push({
    left: [
      { text: prefix2, color: COL.orange }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: prefix2Short, color: COL.orange },
      { text: oxidStr, color: COL.red },
      { text: genitive, color: COL.grey }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: prefix2Short, color: COL.orange },
      { text: oxidStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen }
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: prefix2Short, color: COL.orange },
      { text: oxidStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
      { text: name1, color: COL.green }
    ],
    right: help[3],
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

  // Línia inicial
  lines.push({
    left: [
      { text: prefix2Short, color: COL.orange },
      { text: oxidStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
      { text: name1, color: COL.green }
    ],
    right: "",
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: "O", color: COL.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: "O", color: COL.red },
      { text: sub2, color: COL.orange },
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
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: "O", color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    // right: "(FALTA REVISAR, ESPECIALMENT INDICAR DE QUINS NOX PARLEM, ¿NOMÉS POSITIUS?)"  // TODO
    right: "FALTA REVISAR I COMPLETAR|• PARLEM DE NOX NOMÉS POSITIUS (?)|• ¿COM OBTINDRE EL NOX? CAL DETECTAR SI HI HA HAGUT SIMPLIFICACIÓ"  // TODO
  });

  // Pas 1
  lines.push({
    left: [
      { text: oxydeStr, color: COL.red },
      { text: genitive, color: COL.grey }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: oxydeStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: oxydeStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange }
    ],
    right: help[2],
  });

  return lines;
}

function getOxidesNOX_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const oxydeStr = getLiteral("óxido", lang);
  const genitive = getGenitive(lang, symb1);

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
      { text: oxydeStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange }
    ],
    right: "(FALTA REVISAR SIMPLIFICACIÓ DE SUBÍNDEXS)"  // TODO,
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "2", color: COL.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "2", color: COL.lightGreen },
      { text: "O", color: COL.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "2", color: COL.lightGreen },
      { text: "O", color: COL.red },
      { text: subNox, color: COL.orange },
    ],
    right: help[3],
  });

  // Pas 5
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: "O", color: COL.red },
      { text: sub2, color: COL.orange }
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
  const prefix1 = PREFIXES[sub1] || "";

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: ""
  });

  // Pas 1
  lines.push({
    left: [
      { text: "di", color: COL.orange }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: "di", color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: "di", color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen }
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: "di", color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
      { text: name1, color: COL.green }
    ],
    right: help[3],
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

  // Línia inicial
  lines.push({
    left: [
      { text: "di", color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
      { text: name1, color: COL.green }
    ],
    right: "(FALTA REVISAR)",
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red }
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: sub2, color: COL.orange }
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
  const prefix1 = sub1 ? PREFIXES[sub1] : "";
  const prefix2 = sub2 ? PREFIXES[sub2] : "";
  const stem2 = getStem(lang, symb2);
  const genitive = getGenitive(lang, symb1, sub1);
  const uro = getLiteral("uro", lang);

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: ""
  });

  // Pas 1
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
      { text: name1, color: COL.green },
    ],
    right: help[3],
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

  // Pas inicial
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: stem2, color: COL.red },
      { text: uro, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: prefix1, color: COL.lightGreen },
      { text: name1, color: COL.green },
    ],
    right: "(FALTA REVISAR)",
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: sub2, color: COL.orange },
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

  // First line
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: sub2, color: COL.orange },
    ],
    right: "(FALTA REVISAR i EXPLICAR COM ACONSEGUIR EL NOX, ESPECIALMENT QUAN HI HA HAGUT SIMPLIFICACIONS: CS2, CSe2, CrS3, PbS2...)" // TODO
  });

  // Pas 1
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange },
    ],
    right: help[2],
  });


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

  // First line
  lines.push({
    left: [
      { text: stem2, color: COL.red },
      { text: uroStr, color: COL.lilac },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange },
    ],
    right: "(FALTA REVISAR)" // TODO
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: subNox1, color: COL.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: subNox1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
    ],
    right: help[2],
  });

  // Pas 4
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: subNox1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: subNox2, color: COL.orange },
    ],
    right: help[3],
  });

  // Pas 5
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: sub1, color: COL.lightGreen },
      { text: symb2, color: COL.red },
      { text: sub2, color: COL.orange }
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
    return [{
      left: [{ text: "FALTA SABER COM TRACTAR ELS PARÈNTESIS DELS PERÒXIDS EN PRE", color: COL.red }], // TODO
      right: ""
    }];
  }

  // Si no hi ha paréntesis, és com un òxid normal.
  fmlaData.symb2 = "O";
  fmlaData.sub2 = "2";

  return getOxidesPRE_FN({ lang, fmlaData, help });
}

function getPeroxidesPRE_NF({ lang, fmlaData, help }) {
  const { hasParenthesis } = fmlaData;
  if (hasParenthesis) {
    return [{
      left: [{ text: "FALTA SABER COM TRACTAR ELS PARÈNTESIS DELS PERÒXIDS EN PRE", color: COL.red }], // TODO
      right: ""
    }];
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

  // Línia inicial
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
      right: "(FALTA REVISAR, SOBRETOT SI EL NOX ÉS CORRECTE [s'ha intentat revertir la simplificació])"  // TODO
    });

  } else {
    // Si no hi ha paréntesis, l'oxigen té sempre un 2.
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: "2", color: COL.orange }
      ],
      right: "(FALTA REVISAR, SOBRETOT SI EL NOX ÉS CORRECTE [s'ha intentat revertir la simplificació])"  // TODO
    });
  }

  // Pas 1
  lines.push({
    left: [
      { text: peroxideStr, color: COL.red },
      { text: genitive, color: COL.grey }
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: peroxideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green }
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: peroxideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange }
    ],
    right: help[2],
  });

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

  // Línia inicial
  lines.push({
    left: [
      { text: peroxideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange }
    ],
    right: "(FALTA REVISAR)"  // TODO,
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "2", color: COL.lightGreen },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "2", color: COL.lightGreen },
      { text: "O", color: COL.red },
      { text: "2", color: COL.red },
    ],
    right: help[2],
  });

  if (hasParenthesis) {
    // Pas 4
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen },
        { text: "(O", color: COL.red },
        { text: "2", color: COL.red },
        { text: ")", color: COL.red },
        { text: subNox, color: COL.orange },
      ],
      right: help[3],
    });

    // Pas 5
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "(O", color: COL.red },
        { text: "2", color: COL.red },
        { text: ")", color: COL.red },
        { text: sub2, color: COL.orange }
      ],
      right: help[4],
    });

  } else {
    // Pas 4
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: "2", color: COL.lightGreen },
        { text: "(O", color: COL.red },
        { text: "2", color: COL.red },
        { text: ")", color: COL.red },
        { text: subNox, color: COL.orange },
      ],
      right: help[3],
    });

    // Pas 5
    lines.push({
      left: [
        { text: symb1, color: COL.green },
        { text: sub1, color: COL.lightGreen },
        { text: "O", color: COL.red },
        { text: "2", color: COL.red }
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
  const prefix2 = sub2 ? PREFIXES[sub2] : "";
  const hydroxideStr = getLiteral("hidróxido", lang);
  const hydroxideFmla = sub2 ? "(OH)" : "OH";
  const genitive = getGenitive(lang, symb1);  // Mai n'hi ha 'sub1'

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      // { text: sub1, color: COL.lightGreen },  // Mai n'hi ha
      { text: hydroxideFmla, color: COL.red },
      { text: sub2, color: COL.orange },
    ],
    right: "(FALTA REVISAR)"
  });

  // Pas 1
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: hydroxideStr, color: COL.red },
      { text: genitive, color: COL.grey },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: hydroxideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: help[2],
  });

  return lines;
}

function getHydroxidesPRE_NF({ lang, fmlaData, help }) {
  const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
  const lines = [];
  const prefix2 = sub2 ? PREFIXES[sub2] : "";
  const hydroxideStr = getLiteral("hidróxido", lang);
  const hydroxideFmla = sub2 ? "(OH)" : "OH";
  const genitive = getGenitive(lang, symb1);  // Mai n'hi ha 'sub1'

  // Línia inicial
  lines.push({
    left: [
      { text: prefix2, color: COL.orange },
      { text: hydroxideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: "(FALTA REVISAR)",
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "OH", color: COL.red },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: hydroxideFmla, color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: help[2],
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

  // Línia inicial
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      // { text: sub1, color: COL.lightGreen },  // Mai n'hi ha
      { text: hydroxideFmla, color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: "(FALTA REVISAR. CALDRIA DIR QUE EL NOX CORRESPON AL SUBÍNDEX DEL GRUP HIDROXIL)"
  });

  // Pas 1
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange },
    ],
    right: help[2],
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

  // Línia inicial
  lines.push({
    left: [
      { text: hydrideStr, color: COL.red },
      { text: genitive, color: COL.grey },
      { text: name1, color: COL.green },
      { text: nox, color: COL.orange }
    ], right: "(FALTA REVISAR)"
  });

  // Pas 1
  lines.push({
    left: [
      { text: symb1, color: COL.green },
    ],
    right: help[0],
  });

  // Pas 2
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: "OH", color: COL.red },
    ],
    right: help[1],
  });

  // Pas 3
  lines.push({
    left: [
      { text: symb1, color: COL.green },
      { text: hydroxideFmla, color: COL.red },
      { text: sub2, color: COL.orange }
    ],
    right: help[2],
  });

  return lines;
}

export { VERSION, parseFmla, getHelpCard }
