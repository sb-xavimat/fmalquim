"use strict";
// ELEMENTS
const mainBox = document.querySelector('main');
const kindsBox = document.querySelector('#kinds');
const elementsBox = document.querySelector('#elements-list');
const elemBox = document.querySelector('#elem-box');
const rightBox = document.querySelector('#bottom-box');
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
    const { result1, result2 } = createSwitcher();
    resultsBox.innerHTML = result1;
    resultsBox.innerHTML += `<pre>${JSON.stringify(result2)}</pre>`;

    log(result2);
}
function createSwitcher() {
    switch (kind) {
        case "1": return createElementarySubstances();
        default: return "Not implemented kind=" + kind;
    }
}

// MARK: creations
function createElementarySubstances() {
    let result1 = "";
    let result2 = [];
    result1 += "<b>PREFIJOS:</b><br>";
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
    const help = HELP["es-1-1-1"].steps;

    result1 += "<b>Fmla > Nombre</b><br>";
    result1 += "<table style='margin:0;'><tr><td>";
    result1 += `${elem.Symbol}<sub>${subindex}</sub>`;
    result2.push({
        left: [
            { text: elem.Symbol, color: 1 },
            { text: subindex, color: 2 }
        ]
    });
    result1 += "</td><td></td></tr><tr><td>";
    const prefix = PREFIXES[subindex];
    result1 += `${prefix}</td><td>`;
    result1 += help[0] + "</td></tr><tr><td>";
    result1 += `${prefix}${name}`;
    result1 += "</td><td>";
    result1 += help[1]
    result1 += "</td></tr></table>";

    result1 += "<b>Nombre > Fmla</b><br>";
    const help2 = HELP["es-1-1-2"].steps;
    result1 += "<table style='margin:0;'><tr><td>";
    result1 += `${prefix}${name}`;
    result1 += "</td><td></td></tr><tr><td>";
    result1 += `${elem.Symbol}`;
    result1 += "</td><td>";
    result1 += help2[0];
    result1 += "</td></tr><tr><td>";
    result1 += `${elem.Symbol}<sub>${subindex}</sub>`;
    result1 += "</td><td>";
    result1 += help2[1];
    result1 += "</td></tr></table>";

    return { result1, result2 }
}


// GUI
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


// MARK: Init
function init() {
    fillKindslist();
    fillElementsList();
}
init();