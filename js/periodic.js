// Fill an HTML table with the elements of the periodic table

import { ELEMENTS } from "../constants/elements.js";

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