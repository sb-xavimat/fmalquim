"use strict";

// MARK: Elems
const inputDataBox = document.querySelector('#input-data');
const mainBox = document.querySelector('main');
const form = document.querySelector('form');

// MARK: GUI
function refreshInputData(data) {
    inputDataBox.innerHTML = '';
    ["symb1", "sub1", "symb2", "sub2"].forEach(key => {
        const span = document.createElement('span');
        span.classList.add('input-data-part');
        span.innerHTML = `<small>${key}:</small><b>${data[key]}</b>`;
        inputDataBox.appendChild(span);
    });
}

function clearCards() { mainBox.innerHTML = ''; }

function addCard(cardData) {
    mainBox.innerHTML += buildCard(cardData);
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
        let rightText;
        try {
            rightText = line.right.split('|').join('<br>');

        } catch (error) {
            console.log({line});
            throw error;
        }
        if (rightText.includes("_")) {
            // Coloregem els "_-uro_" o "_-ur_".
            const lilac = COLOR.lilac;
            rightText = rightText
                .replace("_-uro_", `<span style='color:${lilac}'><i>-uro</i></span>`)
                .replace("_-ur_", `<span style='color:${lilac}'><i>-ur</i></span>`);
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
    const fmlaData = parseFmla(fmla, lang, kind);
    refreshInputData(fmlaData);
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
            const card = getHelpCard({ lang, system, mode, kind, fmla });
            addCard(card);
        });
    });
}

// MARK: Inint
gatherData(form);