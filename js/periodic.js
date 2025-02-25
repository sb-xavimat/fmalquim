// Fill an HTML table with the elements of the periodic table

import { ELEMENTS } from "../constants/elements.js";
const BG_COLORS = {
    "Alkali metal": "#FFD700",
    "Alkaline earth metal": "#FFA500",
    "Transition metal": "#FFC0CB",
    "Post-transition metal": "#FF1493",
    "Metalloid": "#00FFFF",
    "Halogen": "#FF4444",
    "Noble gas": "#FF4500",
    "Lanthanide": "#FF00FF",
    "Actinide": "#FF69B4",
    "Nonmetal": "#66FF66",
}


export function createPeriodicTable(selectElement, elemsButtons) {
    const table = document.createElement('table');
    table.classList.add('periodic');

    for (let i = 1; i <= 9; i++) {
        const tr = document.createElement('tr');

        for (let j = 1; j <= 18; j++) {
            const td = document.createElement('td');
            const elem = ELEMENTS.find(e => e.Period === i && e.Group === j);
            if (elem) {
                const button = document.createElement('button');
                button.innerHTML = `<small>${elem.AtomicNumber}</small> ${elem.Symbol}`;
                button.dataset.elem = elem.Symbol;
                button.dataset.atomic = elem.AtomicNumber;
                button.style.backgroundColor = BG_COLORS[elem.GroupBlock];
                button.addEventListener('click', selectElement);
                td.appendChild(button);
                elemsButtons.push(button);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}
