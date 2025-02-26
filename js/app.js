"use strict";

// MARK: Elems
const inputDataBox = document.querySelector('#input-data');
const mainBox = document.querySelector('main');

// MARK: GUI
function refreshInputData(data) {
    inputDataBox.innerHTML = '';
    ["symb1", "sub1", "symb2", "sub2"].forEach(key => {
        const span = document.createElement('span');
        span.classList.add('input-data-part');
        log(key, data[key]);
        span.innerHTML = `<small>${key}:</small><b>${data[key]}</b>`;
        inputDataBox.appendChild(span);
    });
}

function clearCards() { mainBox.innerHTML = ''; }

function createCard(lines) {
    const card = document.createElement('div');
    card.classList.add('card');
    lines.forEach(line => {
        const div = document.createElement('div');
        div.innerHTML = line;
        card.appendChild(div);
    });
    mainBox.appendChild(card);
}

// MARK: Logic
function changeForm(ev, form) {
    ev.preventDefault();
    gatherData(form);
    return false;
}

function gatherData(form) {
    const lang = form[0].value;
    const system = form[1].value;
    const mode = form[2].value;
    const kind = form[3].value;
    const fmla = form[4].value;
    const fmlaData = parseFmla(fmla);
    refreshInputData(fmlaData);
    clearCards();

    const card = getHelpCard({ lang, system, mode, kind, fmla });
}
