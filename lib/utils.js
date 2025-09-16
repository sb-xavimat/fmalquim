"use strict";
// Utils
// MARK: imports
import { ROMANS } from "./constants.js";
import { ELEMENTS } from "./elements.js";
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
    return null;
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
  // comptar)
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
  if (lang === "en" || lang === "eu") { return " "; }
}

/**
 * Obtindre l'arrel d'un element, segons la llengua.
 */
function getStem(lang, symb) {
  const elem = getElem(symb) || {};
  const stem = elem[`stem_${lang}`] || ""; //  "stem_not_found";  .dev.debug
  return stem.toLowerCase();
}

export {
  getElem, getLiteral, getNox, getNoxObj, parseFmla, getGenitive, getStem
};