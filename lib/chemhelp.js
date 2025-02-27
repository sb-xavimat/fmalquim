// Library for generating help cards for chemistry formulations
// MARK: Constants
const COL = {
    red: "red",
    orange: "orange",
    green: "green",
    lightGreen: "lightGreen",
    lilac: "lilac",
    grey: "grey",
};
const PREFIXES = {
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
const ROMANS = {
    "1": "(I)",
    "2": "(II)",
    "3": "(III)",
    "4": "(IV)",
    "5": "(V)",
    "6": "(VI)",
    "7": "(VII)",
    "8": "(VIII)",
    "9": "(IX)",
};

// MARK: parseFmla
/**
 * Parseja una fórmula amb dos elements i dos subíndexs
 * @param {string} fmla
 */
function parseFmla(fmla, lang) {
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
    } else if (result.symb2) {
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

// MARK: Utils
/**
 * Obtindre les dades d'un element a partir del seu símbol
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
        return;
    }
}

function getGenitive({ lang, symb1 }) {
    if (lang === "es") { return " de "; }
    if (lang === "ca") {
        const elem = getElem(symb1);
        if (elem.apostrof) return " d’";
        else return " de ";
    }
}


// MARK: Main
function getHelpCard({ lang, system, mode, kind, fmla }) {
    const fmlaData = parseFmla(fmla, lang);
    if (fmlaData.error) {
        return { title: fmlaData.error, lines: [] };
    }

    const key = `${lang}-${kind}-${system}-${mode}`;
    const help = HELP[key]?.steps;
    if (!help) {
        return { title: "No s'ha trobat ajuda: " + key, lines: [] };
    }
    const title = key;
    let lines = [];

    switch (kind) {
        case "1":
            lines = getElementary({ lang, system, mode, fmlaData, help });
            break;
        case "2":
            lines = getMetalHidr({ lang, system, mode, fmlaData, help });
            break;
        default:
            lines = null;
    }
    if (mode !== "FN" && mode !== "NF") {
        lines = [{
            left: [{ text: "Mode invàlid", color: COL.red }],
            right: mode
        }];
    } else if (!lines) {
        lines = [{
            left: [{ text: "Not implemented", color: COL.red }],
            right: '<pre>' + JSON.stringify(fmlaData, null, 2) + '</pre>'
        }];
    }
    return { title, lines };
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
            right: "En les instruccions diu que sempre hi haurà."
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

function getElementaryNF({ lang, fmlaData, help }) { } // TODO


// MARK: 2. Metallic hydrides
function getMetalHidr({ lang, system, mode, fmlaData, help }) {
    // Comprovacions (no les fem per ara)
    // - 2 elements, el primer és un metall, el segon és sempre hidrogen
    // - l'hidrogen por portar subíndex

    const selector = `${system}-${mode}`;

    switch (selector) {
        case "PRE-FN": return getMetalHidrPRE_FN({ lang, fmlaData, help });
        // case "PRE-NF": return getMetalHidrPRE_NF({ lang, fmlaData, help });
        // case "NOX-FN": return getMetalHidrNOX_FN({ lang, fmlaData, help });
        // case "NOX-NF": return getMetalHidrNOX_NF({ lang, fmlaData, help });
    }
}

function getMetalHidrPRE_FN({ lang, fmlaData, help }) {
    const { symb1, sub1, name1, symb2, sub2, name2 } = fmlaData;
    const lines = [];
    const prefix = sub2 ? PREFIXES[sub2] : "";
    const hydrideStr = getLiteral("hidruro", lang);
    const genitive = getGenitive({ lang, symb1 });

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


// MARK: 3. Hydrides

// MARK: 4. Metallic oxides

// MARK: 5. Non-metallic oxides

// MARK: 6. Oxygen halides

// MARK: 7. Other covalents

// MARK: 8. Binary salts

// MARK: 9. Peroxides

// MARK: 10. Hydroxides


