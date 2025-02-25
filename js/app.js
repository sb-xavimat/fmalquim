"use strict";
// MARK: Imports
import  { KINDS } from '../constants/kinds.js';
import { ELEMENTS } from '../constants/elements.js';
import { COLOR } from '../constants/colors.js';
import { createElementarySubstances } from './elementary.js';


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
        case "1": return createElementarySubstances(elem);
        default: return "Not implemented kind=" + kind;
    }
}

// MARK: creations


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
        const rightText = line.right.split('|').join('<br>');
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
    kind = "1";
    elem = ELEMENTS[0];
    kindButtons[0].classList.add('active');
    elemsButtons[0].classList.add('active');
    fillElem(elem);
    fillResults();
}
init();