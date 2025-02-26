// Hidrurs metàl·lics
function getMetHidrConstants(elem, oxidState) {
    let subindex = oxidState;
    let roman = ROMANS[oxidState];
    const name = elem.Name_es.toLowerCase();
    let prefix = PREFIXES[subindex];
    if (subindex === 1) {
        subindex = "";
        prefix = "";
    }
    // Si el metal solo tiene un estado de oxidación, no se pone numeral romano
    if (!elem.OxidationStates.includes(",")) {
        roman = "";
    }
    return { subindex, name, prefix, roman };
}

function getMetallicHidrurePrefixesFN(elem, oxidState) {
    const card = {
        title: "PREFIXES. Fórmula > Nombre",
        lines: []
    };
    const { subindex, name, prefix } = getMetHidrConstants(elem, oxidState);
    const help = HELP["es-2-1-1"].steps;

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: "H", color: 3 },
            { text: subindex, color: 2 },
        ],
        right: "",
    });

    card.lines.push({
        left: [{ text: prefix, color: 2 }],
        right: help[0],
    });

    card.lines.push({
        left: [
            { text: prefix, color: 2 },
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
        ],
        right: help[1],
    });

    card.lines.push({
        left: [
            { text: prefix, color: 2 },
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
            { text: name, color: 1 },
        ],
        right: help[2],
    });

    return card;
}


function getMetallicHidrurePrefixesNF(elem, oxidState) {
    const card = {
        title: "PREFIXES. Nombre > Fórmula",
        lines: [],
    }
    const { subindex, name, prefix } = getMetHidrConstants(elem, oxidState);
    const help = HELP["es-2-1-2"].steps;

    card.lines.push({
        left: [
            { text: prefix, color: 2 },
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
            { text: name, color: 1 },
        ],
        right: "",
    });

    card.lines.push({
        left: [{ text: elem.Symbol, color: 1 }],
        right: help[0],
    });

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: "H", color: 3 },
        ],
        right: help[1],
    });

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: "H", color: 3 },
            { text: subindex, color: 2 },
        ],
        right: help[2],
    });

    return card;
}

function getMetallicHidrureNumOxFN(elem, oxidState) {
    const card = {
        title: "NÚMEROS DE OXIDACIÓN. Fórmula > Nombre",
        lines: [],
    }
    const { subindex, name, roman } = getMetHidrConstants(elem, oxidState);
    const help = HELP["es-2-2-1"].steps;

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: "H", color: 3 },
            { text: subindex, color: 2 },
        ],
        right: "",
    });

    card.lines.push({
        left: [
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
        ],
        right: help[0],
    });

    card.lines.push({
        left: [
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
            { text: name, color: 1 },
        ],
        right: help[1],
    });

    card.lines.push({
        left: [
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
            { text: name, color: 1 },
            { text: roman, color: 2 },
        ],
        right: help[2],
    });

    return card;
}

function getMetallicHidrureNumOxNF(elem, oxidState) {
    const card = {
        title: "NÚMEROS DE OXIDACIÓN. Nombre > Fórmula",
        lines: [],
    }
    const { subindex, name, roman } = getMetHidrConstants(elem, oxidState);
    const help = HELP["es-2-2-2"].steps;

    card.lines.push({
        left: [
            { text: "hidruro", color: 3 },
            { text: " de ", color: 0 },
            { text: name, color: 1 },
            { text: roman, color: 2 },
        ],
        right: "",
    });

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
        ],
        right: help[0],
    });

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: "H", color: 3 },
        ],
        right: help[1],
    });

    card.lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: "H", color: 3 },
            { text: subindex, color: 2 },
        ],
        right: help[2],
    });

    return card;
}

function createMetallicHidrures(elem, oxidState) {
    const cards = []
    cards.push(getMetallicHidrurePrefixesFN(elem, oxidState));
    cards.push(getMetallicHidrurePrefixesNF(elem, oxidState));
    cards.push(getMetallicHidrureNumOxFN(elem, oxidState));
    cards.push(getMetallicHidrureNumOxNF(elem, oxidState));
    return cards;
}