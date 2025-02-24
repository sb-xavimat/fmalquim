// ELEMENTS
const mainBox = document.querySelector('main');
const kindsBox = document.querySelector('#kinds');
const elementsBox = document.querySelector('#elements-list');
const elemBox = document.querySelector('#elem-box');
const resultsBox = document.querySelector('#results');

// MARK: Globals
const kindButtons = [];
const elemsButtons = [];
let kind, elem;
let elems = [];

// MARK: Utils
function clearAll() {
    // Reset all kind buttons
    kindButtons.forEach(button => button.classList.remove('active'));
    clearElemButtons();
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
    const button = ev.target;
    button.classList.add('active');
    const elemSymb = button.dataset.elem;
    const elemAtomic = button.dataset.atomic;
    elem = ELEMENTS[elemAtomic - 1];

    elemBox.innerHTML = JSON.stringify(elem, null, 2);
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
        button.textContent = elem.Symbol;
        button.dataset.elem = elem.Symbol;
        button.dataset.atomic = elem.AtomicNumber;
        elementsBox.appendChild(button);
        elemsButtons.push(button);
        button.addEventListener('click', selectElement);
    });
}




// MARK: Init
function init() {
    fillKindslist();
    fillElementsList();
}
init();