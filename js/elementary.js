import { HELP } from "../constants/help.js";
import { PREFIXES } from "../constants/prefixes.js";

function getElementarySubstanceUtils(elem) {
    let subindex = "";
    if (elem.GroupBlock === "Noble gas") { subindex = ""; }
    else if (["H", "N", "O", "F", "Cl", "Br", "I"].includes(elem.Symbol)) {
        subindex = "2";
    }
    else if (elem.GroupBlock === "Halogen") { subindex = "2"; }
    else if ([
        "Alkali metal",
        "Alkaline earth metal",
        "Post-transition metal",
        "Transition metal",
        "Metalloid",
    ].includes(elem.GroupBlock)) { subindex = ""; }
    else { subindex = elem.subst_elem_subindex; }

    const name = elem.Name_es.toLowerCase();
    const prefix = PREFIXES[subindex];

    return { subindex, name, prefix };
}

function getElementarySubstancePrefixesFN(elem) {
    const title = "PREFIJOS. Fmla > Nombre";
    const lines = [];
    const { subindex, name, prefix } = getElementarySubstanceUtils(elem);
    const help = HELP["es-1-1-1"].steps;

    lines.push({
        left: [{ text: elem.Symbol, color: 1 }, { text: subindex, color: 2 }],
        right: "",
    });


    lines.push({
        left: [{ text: prefix, color: 2 }],
        right: help[0],
    })

    lines.push({
        left: [{ text: prefix, color: 2 }, { text: name, color: 1 }],
        right: help[1],
    });

    return { title, lines };
}

function getElementarySubstancePrefixesNF(elem) {
    const title = "PREFIJOS. Fmla > Nombre";
    const lines = [];
    const { subindex, name, prefix } = getElementarySubstanceUtils(elem);
    const help = HELP["es-1-1-2"].steps;

    lines.push({
        left: [{ text: prefix, color: 2 }, { text: name, color: 1 }],
        right: "",
    });

    lines.push({
        left: [{ text: elem.Symbol, color: 1 }],
        right: help[0],
    });

    lines.push({
        left: [{ text: elem.Symbol, color: 1 }, { text: subindex, color: 2 }],
        right: help[1],
    });

    return { title, lines };
}

function getElementarySubstanceNumOxFN(elem) {
    const title = "NÚMEROS DE OXIDACIÓN. Fmla > Nombre";
    const lines = [];
    const { subindex, name, prefix } = getElementarySubstanceUtils(elem);
    const help = HELP["es-1-2-1"].steps;

    lines.push({
        left: [{ text: elem.Symbol, color: 1 }, { text: subindex, color: 2 }],
        right: "",
    });

    lines.push({
        left: [{ text: name, color: 1 }],
        right: help[0],
    })

    return { title, lines };
}

function getElementarySubstanceNumOxNF(elem) {
    const title = "NÚMEROS DE OXIDACIÓN. Nombre > Fmla";
    const lines = [];
    const { subindex, name } = getElementarySubstanceUtils(elem);
    const help = HELP["es-1-2-2"].steps;

    lines.push({
        left: [{ text: name, color: 1 }],
        right: "",
    });

    lines.push({
        left: [{ text: elem.Symbol, color: 1 }],
        right: help[0],
    });

    lines.push({
        left: [{ text: elem.Symbol, color: 1 }, { text: subindex, color: 2 }],
        right: help[1],
    });

    return { title, lines };
}

export function createElementarySubstances(elem) {
    const cards = []
    cards.push(getElementarySubstancePrefixesFN(elem));
    cards.push(getElementarySubstancePrefixesNF(elem));
    cards.push(getElementarySubstanceNumOxFN(elem));
    cards.push(getElementarySubstanceNumOxNF(elem));
    return cards;
}

