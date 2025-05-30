"use strict";
import { createHTMLCard, VERSION } from "../lib/index.js";

// MARK: Elems
// const inputDataBox = document.querySelector('#input-data');
const mainBox = document.querySelector('main');
const form = document.querySelector('form');
const versionTag = document.querySelector('#version-tag');
const examplesBox = document.querySelector('#examples');


// MARK: GUI
// function refreshInputData(data) {
//     inputDataBox.innerHTML = '';
//     ["symb1", "sub1", "symb2", "sub2"].forEach(key => {
//         const span = document.createElement('span');
//         span.classList.add('input-data-part');
//         span.innerHTML = `<small>${key}:</small><b>${data[key]}</b>`;
//         inputDataBox.appendChild(span);
//     });
// }

function showFmlaExamples(kind) {
    if (EXAMPLES[kind]) {
        const examplesStr = EXAMPLES[kind].join(", ");
        examplesBox.innerHTML = `<b>Exemples:</b> `;

        EXAMPLES[kind].forEach(fmla => {
            const btn = document.createElement('button');
            btn.classList.add('example');

            btn.innerHTML = formatFmla(fmla);
            btn.onclick = () => {
                form[4].value = fmla;
                gatherData(form);
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
    // OLD
    // mainBox.innerHTML += buildCard(cardData);

    // NEW
    const card = createHTMLCard(cardData, true);
    if (card?.error) { mainBox.appendChild(infoCard(card)); }
    else { mainBox.appendChild(card); }
}

// function buildCard(data) {
//     let inn = "";
//     inn += "<div class='card'>";
//     inn += `<b>${data.title}</b>`;
//     inn += buildTable(data.lines);
//     inn += "</div>";
//     return inn;
// }

// function buildTable(lines) {

//     function buildSpan(data) {
//         const isSub = data.text && !isNaN(data.text);
//         const color = COLOR[data.color];
//         const tag = isSub ? "sub" : "span";
//         return `<${tag} style="color:${color}">${data.text}</${tag}>`;
//     }

//     let inn = "<table>";
//     lines.forEach(line => {
//         let rightText;
//         try {
//             rightText = line.right.split('|').join('<br>');

//         } catch (error) {
//             console.log({ line });
//             throw error;
//         }
//         if (rightText.includes("_")) {
//             // Coloregem els "_‑uro_" o "_‑ur_".
//             const lilac = COLOR.lilac;
//             rightText = rightText
//                 .replace("_‑uro_", `<span style='color:${lilac}'><i>‑uro</i></span>`)
//                 .replace("_‑ur_", `<span style='color:${lilac}'><i>‑ur</i></span>`);
//             // Convertir el primer "_" en <i> y el segundo en </i>
//             rightText = rightText.replace("_", "<i>").replace("_", "</i>");
//         }
//         inn += "<tr>";
//         // left
//         inn += "<td>";
//         line.left.forEach(part => inn += buildSpan(part));
//         inn += "</td>";
//         // right
//         inn += `<td>${rightText}</td>`;
//         inn += "</tr>";
//     });
//     inn += "</table>";
//     return inn;
// }


function formatFmla(fmla) {
    let result = "";
    fmla.split("").forEach(char => {
        if (!isNaN(char)) { result += `<sub>${char}</sub>`; }
        else { result += char; }
    });
    return result;
}

// MARK: Logic
function changeForm(ev, form) {
    ev.preventDefault();
    gatherData(form);
    return false;
}

function gatherData(form) {
    const lang = form[0].value;
    // const system = form[1].value;
    // const mode = form[2].value;
    const kind = form[3].value;
    const fmla = form[4].value;
    // const fmlaData = chemHelpLib.parseFmla(fmla, lang, kind);
    // Object.entries(fmlaData).forEach(([key, value]) => log({ [key]: value }));
    // console.table(fmlaData);
    // refreshInputData(fmlaData);
    showFmlaExamples(kind);
    clearCards();

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
    const ALL_MODES = ["FN", "NF"];

    const systems = VALID_SYSTEMS[kind];
    systems.forEach(system => {
        ALL_MODES.forEach(mode => {
            addCard({ lang, system, mode, kind, fmla });
        });
    });
}

// MARK: Inint
function init() {
    form.oninput = (ev) => changeForm(ev, form);
    versionTag.textContent = VERSION;
    gatherData(form);
}
init();