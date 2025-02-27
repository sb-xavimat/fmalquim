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

// MARK: Utils
/**
 * Parseja una fórmula amb dos elements i dos subíndexs
 * @param {string} fmla
 */
function parseFmla(fmla, lang) {
    // Útils
    const isUpperCase = c => c === c.toUpperCase();
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
        const start = (
            isUpperCase(c)
            || (isNumber(c) && current !== "sub1" && current !== "sub2")
        );
        // Si comença dada nova:
        if (start) {
            if (current === undefined) { current = "symb1" }
            else if (current === "symb1") { current = "sub1"; }
            else if (current === "sub1") { current = "symb2"; }
            else if (current === "symb2") { current = "sub2"; }
            else if (current === "sub2") { result.error = "Fmla incorrecta"; }
        }
        result[current] += c;
    });

    if (result.symb1) {
        const elem1 = getElem(result.symb1);
        if (elem1) { result.name1 = elem1[`name_${lang}`]?.toLowerCase(); }
        else { result.error = "Element 1 no trobat"; }
    } else if (result.symb2) {
        const elem2 = getElem(result.symb2);
        if (elem2) { result.name2 = elem2[`name_${lang}`]?.toLowerCase(); }
        else { result.error = "Element 2 no trobat"; }
    } else if (!result.symb1) {
        result.error = "No s'ha trobat cap element";
    }
    return result;
}

/**
 * Obtindre les dades d'un element a partir del seu símbol
 * @param {string} symb Símbol del element
 * @returns Objecte amb les dades de l'element
 */
function getElem(symb) {
    return ELEMENTS.find(elem => elem.symb === symb);
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
    if (!lines) {
        lines = [{
            left: [{ text: "Not implemented", color: COL.red }],
            right: ""
        }];
    }
    return { title, lines };
}

function getElementary({ lang, system, mode, fmlaData, help }) {
    // Comprovacions
    // No caldrien, perquè se suposa que totes les peticions seran vàlides,
    // però per ara les fem, per detectar errors en dev.
    if (system != "PRE") {
        return {
            title: "Sistema invàlid per a substàncies elementals: " + system,
            lines: []
        };
    }

    switch (mode) {
        case "FN": return getElementaryFN({ lang, fmlaData, help });
        case "NF": return getElementaryNF({ lang, fmlaData, help });
        default: return { title: "Mode invàlid: " + mode, lines: [] };
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

function getMetalHidr() { } // TODO
