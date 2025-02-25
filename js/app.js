"use strict";
// MARK: Imports
import { KINDS } from '../constants/kinds.js';
import { ELEMENTS } from '../constants/elements.js';
import { COLOR } from '../constants/colors.js';
import { createPeriodicTable } from './periodic.js';
import { createElementarySubstances } from './elementary.js';
import { createMetallicHidrures } from './methidrures.js';
import { log } from './utils.js';


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
const oxidStatesButtons = [];
let kind, elem, oxidState;
let elems = [];

// MARK: Utils
function clearAll() {
    // Reset all kind buttons
    kindButtons.forEach(button => button.classList.remove('active'));
    clearElemButtons();
    clearOxidStatesButtons();
    elems = [];
    elemBox.innerHTML = '';
    resultsBox.innerHTML = '';
    elem = null;
    oxidState = null;
}

function clearElemButtons() {
    elemsButtons.forEach(button => button.classList.remove('active'));
}

function clearOxidStatesButtons() {
    oxidStatesButtons.forEach(button => button.classList.remove('active'));
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
        // Compostos unaris o que només necessiten triar un element
        case "1":
        case "2":
            elems = [];
            clearElemButtons();
            break;
        default:
            log("Not implemented kind=" + kind);
    }

    const button = ev.currentTarget;
    button.classList.add('active');
    const elemSymb = button.dataset.elem;
    const elemAtomic = button.dataset.atomic;
    elem = ELEMENTS[elemAtomic - 1];
    fillElem(elem);
    elems.push(elemSymb);
    fillResults();
}

function selectOxid(ev) {
    const button = ev.target;
    oxidState = +button.dataset.oxid;
    bottomBox.querySelectorAll('button')
        .forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    fillResults();
}

function fillResults() {
    resultsBox.innerHTML = '';
    const cards = createSwitcher();
    cards.forEach(card => {
        resultsBox.innerHTML += buildCard(card);
    });
    resultsBox.innerHTML += `<pre>${JSON.stringify(cards, null, 2)}</pre>`;
}
function createSwitcher() {
    switch (kind) {
        case "1": return createElementarySubstances(elem);
        case "2": return createMetallicHidrures(elem, oxidState);
        default: return [{ title: "Not implemented kind=" + kind, lines: [] }]
    }
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
    elementsBox.appendChild(createPeriodicTable(selectElement, elemsButtons));
}

function fillElem(elem) {
    const elemData = [
        elem.Symbol,
        elem.AtomicNumber + ". " + elem.Name_es,
        elem.OxidationStates + ". " + elem.GroupBlock,
        elem.subst_elem_subindex
    ]
    elemBox.innerHTML = elemData.join('&nbsp;&nbsp;&nbsp;');
    // Oxidation States as buttons
    const oxidsStates = elem.OxidationStates.split(',')
        .map(oxid => oxid.trim())
        .map(Number);
    oxidState = oxidsStates[0];  // Default
    oxidsStates.forEach((oxid, i) => {
        const button = document.createElement('button');
        button.textContent = oxid < 0 ? oxid : `+${oxid}`;
        if (i === 0) { button.classList.add('active'); }
        button.dataset.oxid = oxid;
        button.addEventListener('click', selectOxid);
        elemBox.appendChild(button);
        oxidStatesButtons.push(button);
    });
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
        let rightText = line.right.split('|').join('<br>');
        if (rightText.includes("_")) {
            // Convertir el primer "_" en <i> y el segundo en </i>
            rightText = rightText.replace("_", "<i>").replace("_", "</i>");
        }
        inn += "<tr>";
        // left
        inn += "<td>";
        line.left.forEach(part => inn += buildSpan(part));
        inn += "</td>";
        // right
        inn += `<td>${rightText}</td>`;
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
    kind = "2";
    elem = ELEMENTS[78];
    oxidState = 3;
    kindButtons[1].classList.add('active');
    elemsButtons[78].classList.add('active');
    fillElem(elem);
    fillResults();
}
init();