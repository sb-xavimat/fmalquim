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
function parseFmla(fmla) {
    // Útils
    const isUpperCase = c => c === c.toUpperCase();
    const isNumber = c => !isNaN(parseInt(c));

    // Inicialització
    const result = { symb1: "", sub1: "", symb2: "", sub2: "" };
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

    if (result.symb1 && !getElem(result.symb1)) {
        result.error = "Element 1 no trobat";
    } else if (result.symb2 && !getElem(result.symb2)) {
        result.error = "Element 2 no trobat";
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
    const fmlaData = parseFmla(fmla);
    if (fmlaData.error) {
        return { title: fmlaData.error, lines: [] };
    }

    const key = `${lang}-${kind}-${system}-${mode}`;
    const help = HELP[key].steps;
    const title = key;
    let lines = [{ text: "Not implemented", color: COL.red }];

    switch (kind) {
        case "1":
            lines = getLines_elemSubst({ lang, system, mode, fmlaData, help });
            break;
        case "2":
            lines = getLines_metalHidr({ lang, system, mode, fmlaData, help });
            break;
    }
    return { title, lines };
}

function getLines_elemSubst({ lang, system, mode, fmlaData, help }) {
    // Comprovacions
    // No caldrien, perquè se suposa que totes les peticions seran vàlides,
    // però per ara les fem, per detectar errors en dev.
    if (system != "PRE") {
        return {
            title: "Sistema invàlid per a substàncies elementals: " + system,
            lines: []
        };
    }

    const { symb1, sub1 } = fmlaData;

    const lines = [];

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
        left: [{ text: PREFIXES[sub1], color: COL.orange }],
        right: help[0],
    });



    return lines;
}

function getLines_metalHidr() { } // TODO
