// Library for generating help cards for chemistry formulations
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
    let helpCard = {
        title: JSON.stringify(
            Object.values({ lang, system, mode, kind, fmla })
        ),
        lines: [{ text: "Not implemented kind=" + kind, color: 6 }]
    }

    switch (kind) {
        case "1":
            helpCard = getCard_elemSubst({ lang, system, mode, fmla });
            break;
        case "2":
            helpCard = getCard_metalHidr({ lang, system, mode, fmla });
            break;
    }
    return helpCard;
}

function getCard_elemSubst({lang, system, mode, fmla}) {
    if (system != "PRE")  {
        return {
            title: "Sistema invàlid per a substàncies elementals: " + system,
            lines: []
        };
    }
    const fmlaData = parseFmla(fmla);

}