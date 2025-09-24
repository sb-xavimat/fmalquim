"use strict";
import { createHTMLCard, VERSION } from "../lib/index.js";

// MARK: Elems
// const inputDataBox = document.querySelector('#input-data');
const mainBox = document.querySelector('main');
const versionTag = document.querySelector('#version-tag');
const examplesBox = document.querySelector('#examples');
const form = document.querySelector('form');
const langSelector = document.querySelector('#select-lang');
const kindSelector = document.querySelector('#select-kind');
const inputFmla = document.querySelector('#input-fmla');


// MARK: Consts
const ALL_MODES = ["FN", "NF"];
const VALID_SYSTEMS = {
    // Array de sistemes vàlids per a cada tipus (kind)
    // 3r ESO
    "1": ["PRE"],
    "2": ["PRE", "NOX"],
    "3": ["PRE", "NOX", "TRA"],
    "4": ["PRE", "NOX"],
    "5": ["PRE", "NOX"],
    "6": ["PRE"],
    "7": ["PRE", "NOX"],
    "8": ["PRE", "NOX"],
    "9": ["PRE", "NOX"],
    "10": ["PRE", "NOX"],
    // 4t ESO
    "12": ["SIS", "TRA"],
    "13": ["SIS", "TRA"],
    "14": ["SIS", "TRA"],
};
const VALID_LANGS = ["ca", "es", "en", "eu"];
const VALID_KINDS = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "13", "14"
];


// MARK: GUI
function showFmlaExamples(kind) {
    if (EXAMPLES[kind]) {
        examplesBox.innerHTML = `<b>Exemples:</b> `;

        EXAMPLES[kind].forEach(fmla => {
            const btn = document.createElement('button');
            btn.classList.add('example');

            btn.innerHTML = formatFmla(fmla);
            btn.onclick = () => {
                inputFmla.value = fmla;
                gatherData();
            };
            examplesBox.appendChild(btn);
        });
    }
}

function infoCard(data) {
    const infoCard = document.createElement('div');
    infoCard.classList.add('info-card');
    infoCard.innerHTML = JSON.stringify(data.title);
    return infoCard;
}

function clearCards() { mainBox.innerHTML = ''; }

function addCard(cardData) {
    const card = createHTMLCard(cardData, true);
    if (card?.error) { mainBox.appendChild(infoCard(card)); }
    else { mainBox.appendChild(card); }
}

function formatFmla(fmla) {
    let result = "";
    fmla.split("").forEach(char => {
        if (!isNaN(char)) { result += `<sub>${char}</sub>`; }
        else { result += char; }
    });
    return result;
}

// MARK: Logic
function changeForm(ev) {
    ev.preventDefault();
    gatherData();
    return false;
}

function gatherData() {
    const lang = langSelector.value;
    const kind = kindSelector.value;
    const fmla = inputFmla.value;
    showFmlaExamples(kind);
    clearCards();

    const systems = VALID_SYSTEMS[kind];
    systems.forEach(system => {
        ALL_MODES.forEach(mode => {
            addCard({ lang, system, mode, kind, fmla });
        });
    });
}

// MARK: Init
function init() {
    // Get params from URL, if present: lang, kind, fmla
    // And set the form values accordingly
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    const kind = urlParams.get('kind');
    const fmla = urlParams.get('fmla');
    if (lang && VALID_LANGS.includes(lang)) { langSelector.value = lang; }
    if (kind && VALID_KINDS.includes(kind)) { kindSelector.value = kind; }
    if (fmla) { inputFmla.value = fmla; }

    form.oninput = (ev) => changeForm(ev);
    versionTag.textContent = VERSION;
    document.title = `FMLAQUIM - ${VERSION}`;
    gatherData();
}
init();