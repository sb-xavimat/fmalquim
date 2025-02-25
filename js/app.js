"use strict";
// MARK: Imports
import  { KINDS } from '../constants/kinds.js';
import { ELEMENTS } from '../constants/elements.js';
import { PREFIXES } from '../constants/prefixes.js';
import { HELP } from '../constants/help.js';
import { COLOR } from '../constants/colors.js';


// MARK: Elems
const mainBox = document.querySelector('main');
const kindsBox = document.querySelector('#kinds');
const elementsBox = document.querySelector('#elements-list');
const elemBox = document.querySelector('#elem-box');
const bottomBox = document.querySelector('#bottom-box');
const resultsBox = document.querySelector('#results');

// MARK: Globals
const kindButtons = [];
const elemsButtons = [];
let kind, elem;
let elems = [];

// MARK: Utils
function log(...t) { console.log(...t); }
function clearAll() {
    // Reset all kind buttons
    kindButtons.forEach(button => button.classList.remove('active'));
    clearElemButtons();
    elems = [];
    elemBox.innerHTML = '';
}

function clearElemButtons() {
    elemsButtons.forEach(button => button.classList.remove('active'));
}

// MARK: Logic
function selectKind(ev) {
    clearAll();
    // Set active button
    const button = ev.target;
    button.classList.add('active');
    kind = ev.target.dataset.kind;
}

function selectElement(ev) {
    switch (kind) {
        case undefined: return;
        // Compostos unaris
        case "1":
            elems = [];
            clearElemButtons();
            break;
    }

    const button = ev.target;
    button.classList.add('active');
    const elemSymb = button.dataset.elem;
    const elemAtomic = button.dataset.atomic;
    elem = ELEMENTS[elemAtomic - 1];
    fillElem(elem);
    elems.push(elemSymb);
    fillResults();
}

function fillResults() {
    resultsBox.innerHTML = '';
    const cards = createSwitcher();
    cards.forEach(card => {
        resultsBox.innerHTML += buildCard(card);
    });
}
function createSwitcher() {
    switch (kind) {
        case "1": return createElementarySubstances();
        default: return "Not implemented kind=" + kind;
    }
}

// MARK: creations
function createElementarySubstances() {
    const cards = []
    cards.push(getElementarySubstancePrefixesFN());
    cards.push(getElementarySubstancePrefixesNF());

    return cards;
}

function getElementarySubstanceUtils() {
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

function getElementarySubstancePrefixesFN() {
    const title = "PREFIJOS. Fmla > Nombre";
    const lines = [];
    const { subindex, name, prefix } = getElementarySubstanceUtils();

    const help = HELP["es-1-1-1"].steps;

    lines.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: subindex, color: 2 }
        ],
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

function getElementarySubstancePrefixesNF() {
    const title = "PREFIJOS. Fmla > Nombre";
    const lines = [];

    const { subindex, name, prefix } = getElementarySubstanceUtils();
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


// MARK: GUI
// Fill kinds list
function fillKindslist() {
    const kinds = Object.values(KINDS);
    kinds.forEach(kind => {
        const button = document.createElement('button');
        button.textContent = `${kind.id}. ${kind.kind}`;
        button.dataset.kind = kind.id;
        button.addEventListener('click', selectKind);
        kindsBox.appendChild(button);
        kindButtons.push(button);
    });
}

function fillElementsList() {
    ELEMENTS.forEach(elem => {
        const button = document.createElement('button');
        button.textContent = `${elem.AtomicNumber}.${elem.Symbol}`;
        button.dataset.elem = elem.Symbol;
        button.dataset.atomic = elem.AtomicNumber;
        elementsBox.appendChild(button);
        elemsButtons.push(button);
        button.addEventListener('click', selectElement);
    });
}

function fillElem(elem) {
    const elemData = [
        elem.Symbol,
        elem.AtomicNumber + ". " + elem.Name_es,
        elem.OxidationStates + ". " + elem.GroupBlock,
        elem.subst_elem_subindex
    ]
    elemBox.innerHTML = elemData.join('&nbsp;&nbsp;&nbsp;');
}


function buildCard(data) {
    let inn = "";
    inn += "<div class='card'>";
    inn += `<b>${data.title}</b>`;
    inn += buildTable(data.lines);
    inn += "</div>";
    return inn;
}

function buildTable(lines) {

    function buildSpan(data) {
        const isSub = data.text && !isNaN(data.text);
        const color = COLOR[data.color];
        const tag = isSub ? "sub" : "span";
        return `<${tag} style="color:${color}">${data.text}</${tag}>`;
    }

    let inn = "<table>";
    lines.forEach(line => {
        inn += "<tr>";
        // left
        inn += "<td>";
        line.left.forEach(part => inn += buildSpan(part));
        inn += "</td>";
        // right
        inn += `<td>${line.right}</td>`;
        inn += "</tr>";
    });
    inn += "</table>";
    return inn;
}



// MARK: Init
function init() {
    fillKindslist();
    fillElementsList();

    // Default
    kind = "1";
    elem = ELEMENTS[0];
    kindButtons[0].classList.add('active');
    elemsButtons[0].classList.add('active');
    fillElem(elem);
    fillResults();
}
init();