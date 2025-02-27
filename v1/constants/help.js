const HELP = {
    "es-1-1-1": {
        "id": "es-1-1-1",
        "lang": "es",
        "kind": 1,
        "namesys": 1,
        "mode": 1,
        "steps": [
            "Prefijo correspondiente al subíndice del elemento",
            "Nombre del elemento"
        ],
        "example": [
            "H/2",
            "di",
            "di/hidrógeno"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "1.Prefixos",
        "status": "corrected"
    },
    "es-1-1-2": {
        "id": "es-1-1-2",
        "lang": "es",
        "kind": 1,
        "namesys": 1,
        "mode": 2,
        "steps": [
            "Símbolo del elemento",
            "Subíndice correspondiente al prefijo"
        ],
        "example": [
            "di/nitrógeno",
            "N",
            "N/2"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "1.Prefixos",
        "status": "corrected"
    },
    "es-1-2-1": {
        "id": "es-1-2-1",
        "lang": "es",
        "kind": 1,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Nombre del elemento"
        ],
        "example": [
            "H/2",
            "hidrógeno"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "2.Stock",
        "status": "accepted (Stock is num-ox)"
    },
    "es-1-2-2": {
        "id": "es-1-2-2",
        "lang": "es",
        "kind": 1,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del elemento",
            "Subíndice|Para poner subíndices hay que saber que:|* Todos los metales tienen un subíndice 1|* Los gases nobles tienen un subíndice 1|* Hidrógeno, nitrógeno, oxígeno y los halógenos tienen un subíndice 2|* Otros no metales pueden tener diferentes subíndices"
        ],
        "example": [
            "nitrógeno",
            "N",
            "N/2"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "2.Stock",
        "status": "accepted (Stock is num-ox)"
    },
    "es-2-1-1": {
        "id": "es-2-4-1",
        "lang": "es",
        "kind": 2,
        "namesys": 1,
        "mode": 1,
        "steps": [
            "Prefijo correspondiente al subíndice del hidrógeno (si hay subíndice)",
            "_hidruro + de_",
            "Nombre del metal"
        ],
        "example": [
            "Au/H/3",
            "tri",
            "tri/hidruro/ de",
            "tri/hidruro/ de /oro"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "1.Prefixos",
        "status": "corrected"
    },
    "es-2-1-2": {
        "id": "es-2-4-2",
        "lang": "es",
        "kind": 2,
        "namesys": 1,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Símbolo del hidrógeno",
            "Subíndice correspondiente al prefijo de _hidruro_ (si hay prefijo)"
        ],
        "example": [
            "hidruro/ de/ litio",
            "Li",
            "Li/H",
            "Li/H"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "1.Prefixos",
        "status": "corrected"
    },
    "es-2-2-1": {
        "id": "es-2-2-1",
        "lang": "es",
        "kind": 2,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "_hidruro + de_",
            "Nombre del metal",
            "Número de oxidación del metal en números romanos y entre paréntesis (si el metal tiene más de uno)",
            ""
        ],
        "example": [
            "Au/H/3",
            "hidruro/ de",
            "hidruro/ de/ oro",
            "hidruro /de /oro/(III)",
            "Se escribe sin espacio"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "2.Stock",
        "status": "accepted (Stock is num-ox)"
    },
    "es-2-2-2": {
        "id": "es-2-2-2",
        "lang": "es",
        "kind": 2,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Símbolo del hidrógeno",
            "Subíndice correspondiente al número de oxidación del metal (si es +1, no se escribe)"
        ],
        "example": [
            "hidruro /de /litio",
            "Li",
            "Li/H",
            "Li/H"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "2.Stock",
        "status": "accepted (Stock is num-ox)"
    },
    "es-3-2-1": {
        "id": "es-3-2-1",
        "lang": "es",
        "kind": 3,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Raíz del nombre del no metal + _-uro_",
            "_de + hidrógeno_"
        ],
        "example": [
            "H/Cl",
            "clor/uro",
            "clor/uro /de /hidrógeno"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-3-2-2": {
        "id": "es-3-2-2",
        "lang": "es",
        "kind": 3,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del hidrógeno",
            "Subíndice correspondiente al número de oxidación del no metal",
            "Símbolo del no metal"
        ],
        "example": [
            "sulf/uro /de /hidrógeno",
            "H",
            "H/2",
            "H/2/S"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-3-3-1": {
        "id": "es-3-3-1",
        "lang": "es",
        "kind": 3,
        "namesys": 3,
        "mode": 1,
        "steps": [
            "_ácido_",
            "Raíz del nombre del no metal + _-hídrico_"
        ],
        "example": [
            "H/Cl",
            "ácido",
            "ácido /clor/hídrico"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "3.Tradicional",
        "status": "NOT YET DONE"
    },
    "es-3-3-2": {
        "id": "es-3-3-2",
        "lang": "es",
        "kind": 3,
        "namesys": 3,
        "mode": 2,
        "steps": [
            "Símbolo del hidrógeno",
            "Subíndice correspondiente al número de oxidación del no metal",
            "Símbolo del no metal"
        ],
        "example": [
            "ácido /sulf/hídrico",
            "H",
            "H/2",
            "H/2/S"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "3.Tradicional",
        "status": "NOT YET DONE"
    },
    "es-5-4-1": {
        "id": "es-5-4-1",
        "lang": "es",
        "kind": 5,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefijo correspondiente al subíndice del oxígeno (si no hay subíndice, es _mono-_)",
            "_óxido + de_",
            "Prefijo griego correspondiente al subíndice del metal (si hay subíndice)",
            "Nombre del metal",
            "",
            "Prefijo correspondiente al subíndice del oxígeno",
            "_óxido + de_",
            "Prefijo correspondiente al subíndice del no metal",
            "Nombre del no metal"
        ],
        "example": [
            "Cu/2/O",
            "mono",
            "mon/óxido /de",
            "mon/óxido /de /di",
            "mon/óxido /de /di/cobre",
            "N/2/O/5",
            "penta",
            "penta/óxido /de",
            "penta/óxido /de /di",
            "penta/óxido /de /di/nitrógeno"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-5-4-2": {
        "id": "es-5-4-2",
        "lang": "es",
        "kind": 5,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Subíndice correspondiente al prefijo del metal (si hay prefijo)",
            "Símbolo del oxígeno",
            "Subíndice correspondiente al prefijo del oxígeno (si es _mono-_, no se escribe)",
            "",
            "Símbolo del no metal",
            "Subíndice correspondiente al prefijo del no metal (si hay prefijo)",
            "Símbolo del oxígeno",
            "Subíndice correspondiente al prefijo del oxígeno (si es _mono-_, no se escribe)"
        ],
        "example": [
            "mon/óxido /de /manganeso",
            "Mn",
            "Mn",
            "Mn/O",
            "Mn/O",
            "di/óxido /de /carbono",
            "C",
            "C",
            "C/O",
            "C/O/2"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-5-2-1": {
        "id": "es-5-2-1",
        "lang": "es",
        "kind": 5,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "_óxido + de_",
            "Nombre del metal",
            "Número de oxidación del metal en números romanos y entre paréntesis (si el metal tiene más de uno)",
            "",
            "",
            "_óxido + de_",
            "Nombre del no metal",
            "Número de oxidación del no metal en números romanos y entre paréntesis (si el no metal tiene más de uno)",
            ""
        ],
        "example": [
            "Cu/2/O",
            "óxido /de",
            "óxido /de /cobre",
            "óxido /de /cobre/(I)",
            "Se escribe sin espacio",
            "N/2/O/5",
            "óxido /de",
            "óxido /de /nitrógeno",
            "óxido /de /nitrógeno/(V)",
            "Se escribe sin espacio"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-5-2-2": {
        "id": "es-5-2-2",
        "lang": "es",
        "kind": 5,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Número de oxidación del oxígeno (en óxidos, siempre es −2)",
            "Símbolo del oxígeno",
            "Número de oxidación del metal",
            "Si es posible, se simplifican los subíndices",
            "",
            "Símbolo del no metal",
            "Subíndice correspondiente al número de oxidación del oxígeno",
            "Símbolo del oxígeno",
            "Subíndice correspondiente al número de oxidación del no metal",
            "Si es posible, se simplifican los subíndices"
        ],
        "example": [
            "óxido /de /manganeso/(II)",
            "Mn",
            "Mn/2",
            "Mn/2/O",
            "Mn/2/O/2",
            "MnO",
            "óxido /de /carbono/(IV)",
            "C",
            "C/2",
            "C/2/O",
            "C/2/O/4",
            "C/O/2"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-7-4-1": {
        "id": "es-7-4-1",
        "lang": "es",
        "kind": 7,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefijo griego correspondiente al subíndice del no metal de la derecha (si hay subíndice)",
            "Raíz del nombre del no metal de la derecha + _-uro_",
            "_de_ + prefijo griego correspondiente al subíndice del no metal de la izquierda (si hay subíndice)",
            "Nombre del no metal de la izquierda"
        ],
        "example": [
            "N/Br/3",
            "tri",
            "tri/brom/uro",
            "tri/brom/uro /de",
            "tri/brom/uro /de /nitrógeno"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-7-4-2": {
        "id": "es-7-4-2",
        "lang": "es",
        "kind": 7,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbolo del no metal que aparece al final del nombre",
            "Subíndice correspondiente al prefijo de dicho no metal (si hay prefijo)",
            "Símbolo del otro no metal",
            "Subíndice correspondiente al prefijo de dicho no metal"
        ],
        "example": [
            "tetra/clor/uro /de /carbono",
            "C",
            "C",
            "C/Cl",
            "C/Cl/4"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-7-2-1": {
        "id": "es-7-2-1",
        "lang": "es",
        "kind": 7,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Raíz del nombre del no metal de la derecha + _-uro_",
            "_de_ + nombre del no metal de la izquierda",
            "Número de oxidación del no metal de la izquierda en números romanos y entre paréntesis (si el no metal tiene más de uno)"
        ],
        "example": [
            "N/Br/3",
            "brom/uro",
            "brom/uro /de /nitrógeno",
            "brom/uro /de /nitrógeno/(III)"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-7-2-2": {
        "id": "es-7-2-2",
        "lang": "es",
        "kind": 7,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del no metal que aparece al final del nombre",
            "Subíndice correspondiente al estado de oxidación del otro no metal (no se escribe si es −1)",
            "Símbolo del otro no metal",
            "Subíndice correspondiente al número de oxidación del no metal que aparece al final del nombre",
            "Si es posible, se simplifican los subíndices"
        ],
        "example": [
            "clor/uro /de /carbono/(IV)",
            "C",
            "C",
            "C/Cl",
            "C/Cl/4",
            "C/Cl/4"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-8-4-1": {
        "id": "es-8-4-1",
        "lang": "es",
        "kind": 8,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefijo griego correspondiente al subíndice del no metal (si hay subíndice)",
            "Raíz del nombre del no metal + _-uro_",
            "_de_ + prefijo griego correspondiente al subíndice del metal (si hay subíndice)",
            "Nombre del metal"
        ],
        "example": [
            "Al/2/S/3",
            "tri",
            "tri/sulf/uro",
            "tri/sulf/uro /de /di",
            "tri/sulfuro /de /di/aluminio"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-8-4-2": {
        "id": "es-8-4-2",
        "lang": "es",
        "kind": 8,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Subíndice correspondiente al prefijo del metal (si hay prefijo)",
            "Símbolo del no metal",
            "Subíndice correspondiente al prefijo del no metal"
        ],
        "example": [
            "di/sulf/uro /de /plomo",
            "Pb",
            "Pb",
            "Pb/S",
            "Pb/S/2"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-8-2-1": {
        "id": "es-8-2-1",
        "lang": "es",
        "kind": 8,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Raíz del nombre del no metal + _-uro_",
            "_de_ + nombre del metal",
            "Número de oxidación del metal entre paréntesis y en números romanos (si el metal tiene más de uno)"
        ],
        "example": [
            "Al/2/S/3",
            "sulf/uro",
            "sulf/uro /de /aluminio",
            "sulf/uro /de /aluminio"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-8-2-2": {
        "id": "es-8-2-2",
        "lang": "es",
        "kind": 8,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Subíndice correspondiente al estado de oxidación del no metal (no se escribe si es −1)",
            "Símbolo del no metal",
            "Subíndice correspondiente al estado de oxidación del metal",
            "Si se puede, se simplifican los subíndices"
        ],
        "example": [
            "sulf/uro /de /plomo/(IV)",
            "Pb",
            "Pb/2",
            "Pb/2/S",
            "Pb/2/S/4",
            "Pb/S/2"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-10-4-1": {
        "id": "es-10-4-1",
        "lang": "es",
        "kind": 10,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefijo correspondiente al subíndice del grupo hidroxilo (si hay subíndice)",
            "_hidróxido + de_",
            "Nombre del metal"
        ],
        "example": [
            "Ca/(/OH/)2",
            "di",
            "di/hidróxido /de",
            "di/hidróxido /de /calcio"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-10-4-2": {
        "id": "es-10-4-2",
        "lang": "es",
        "kind": 10,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Grupo hidroxilo",
            "Subíndice correspondiente al prefijo de _hidróxido_, si hay (hay que poner paréntesis al grupo hidroxilo antes de añadir el subíndice)"
        ],
        "example": [
            "hidróxido /de /cobre",
            "Cu",
            "Cu/OH",
            "Cu/OH"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "es-10-2-1": {
        "id": "es-10-2-1",
        "lang": "es",
        "kind": 10,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "_hidróxido + de_",
            "Nombre del metal",
            "Número de oxidación del metal en números romanos y entre paréntesis (si el metal tiene más de uno)"
        ],
        "example": [
            "Ca/(/OH/)2",
            "hidróxido /de",
            "hidróxido /de /calcio",
            "hidróxido /de /calcio"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "es-10-2-2": {
        "id": "es-10-2-2",
        "lang": "es",
        "kind": 10,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbolo del metal",
            "Grupo hidroxilo",
            "Subíndice correspondiente al número de oxidación del metal (hay que poner paréntesis al grupo hidroxilo antes de añadir el subíndice)"
        ],
        "example": [
            "hidróxido /de /cobre/(I)",
            "Cu",
            "Cu/OH",
            "Cu/OH"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-1-4-1": {
        "id": "ca-1-4-1",
        "lang": "ca",
        "kind": 1,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefix corresponent al subíndex de l'element",
            "Nom de l'element"
        ],
        "example": [
            "H/2",
            "di",
            "di/hidrogen"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-1-4-2": {
        "id": "ca-1-4-2",
        "lang": "ca",
        "kind": 1,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbol de l'element",
            "Subíndex corresponent al prefix"
        ],
        "example": [
            "di/nitrogen",
            "N",
            "N/2"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-1-2-1": {
        "id": "ca-1-2-1",
        "lang": "ca",
        "kind": 1,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Nom de l'element"
        ],
        "example": [
            "H/2",
            "hidrogen"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-1-2-2": {
        "id": "ca-1-2-2",
        "lang": "ca",
        "kind": 1,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol de l'element",
            "Subíndex |Per posar subíndexs cal saber que: |* Tots els metalls tenen un subíndex 1 |* Els gasos nobles tenen un subíndex 1 |* hidrogen, nitrogen, oxigeno i els halògens tenen un subíndex 2 |* Altres no-metalls poden tenir diferents subíndexs"
        ],
        "example": [
            "nitrogen",
            "N",
            "N/2"
        ],
        "kind_full": "1.Substàncies elementals",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-2-4-1": {
        "id": "ca-2-4-1",
        "lang": "ca",
        "kind": 2,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefix corresponent al subíndex de l'hidrogen, si n'hi ha",
            "_hidrur + de_",
            "Nom del metall"
        ],
        "example": [
            "Au/H/3",
            "tri",
            "tri/hidrur/ de",
            "tri/hidrur/ d'/or"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-2-4-2": {
        "id": "ca-2-4-2",
        "lang": "ca",
        "kind": 2,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Símbol de l'hidrogen",
            "Subíndex corresponent al prefix d'_hidrur_, si n'hi ha"
        ],
        "example": [
            "hidrur/ de/ liti",
            "Li",
            "Li/H",
            "Li/H"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-2-2-1": {
        "id": "ca-2-2-1",
        "lang": "ca",
        "kind": 2,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "_hidrur + de_",
            "Nom del metall",
            "Nombre d'oxidació del metall en nombres romans i entre parèntesis, si el metall en té més d'un",
            ""
        ],
        "example": [
            "Au/H/3",
            "hidrur/ de",
            "hidrur/ d'/or",
            "hidrur /d'/or/(III)",
            "S'escriu sense espai"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-2-2-2": {
        "id": "ca-2-2-2",
        "lang": "ca",
        "kind": 2,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Símbol de l'hidrogen",
            "Subíndex corresponent al nombre d'oxidació del metall (si és +1, no s'escriu)"
        ],
        "example": [
            "hidrur /de /liti",
            "Li",
            "Li/H",
            "Li/H"
        ],
        "kind_full": "2.Hidrurs metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-3-2-1": {
        "id": "ca-3-2-1",
        "lang": "ca",
        "kind": 3,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Arrel del nom del no-metall + _-ur_",
            "_d'hidrogen_"
        ],
        "example": [
            "H/Cl",
            "clor/ur",
            "clor/ur /d'/hidrogen"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-3-2-2": {
        "id": "ca-3-2-2",
        "lang": "ca",
        "kind": 3,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol de l'hidrogen",
            "Subíndex corresponent al nombre d'oxidació del no-metall",
            "Símbol del no-metall"
        ],
        "example": [
            "sulf/ur /d'/hidrogen",
            "H",
            "H/2",
            "H/2/S"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-3-3-1": {
        "id": "ca-3-3-1",
        "lang": "ca",
        "kind": 3,
        "namesys": 3,
        "mode": 1,
        "steps": [
            "_àcid_",
            "Arrel del nom del no-metall + _-hídric_"
        ],
        "example": [
            "H/Cl",
            "àcid",
            "àcid /clor/hídric"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "3.Tradicional",
        "status": "NOT YET DONE"
    },
    "ca-3-3-2": {
        "id": "ca-3-3-2",
        "lang": "ca",
        "kind": 3,
        "namesys": 3,
        "mode": 2,
        "steps": [
            "Símbol de l'hidrogen",
            "Subíndex corresponent al nombre d'oxidació del no-metall",
            "Símbol del no-metall"
        ],
        "example": [
            "àcid /sulf/hídric",
            "H",
            "H/2",
            "H/2/S"
        ],
        "kind_full": "3.Hidràcids",
        "namesys_full": "3.Tradicional",
        "status": "NOT YET DONE"
    },
    "ca-5-4-1": {
        "id": "ca-5-4-1",
        "lang": "ca",
        "kind": 5,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefix corresponent al subíndex de l'oxigen; si no n’hi ha s’escriu _mono-_",
            "_òxid + de_",
            "Prefix grec corresponent al subíndex del metall, si n'hi ha",
            "Nom del metall",
            "",
            "Prefix corresponent al subíndex de l'oxigen",
            "_òxid + de_",
            "Prefix corresponent al subíndex del no-metall",
            "Nom del no-metall"
        ],
        "example": [
            "Cu/2/O",
            "mono",
            "mon/òxid /de",
            "mon/òxid /de /di",
            "mon/òxid /de /di/coure",
            "N/2/O/5",
            "penta",
            "penta/òxid /de",
            "penta/òxid /de /di",
            "penta/òxid /de /di/nitrogen"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-5-4-2": {
        "id": "ca-5-4-2",
        "lang": "ca",
        "kind": 5,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Subíndex corresponent al prefix del metall, si n'hi ha",
            "Símbol de l'oxigen",
            "Subíndex corresponent al prefix de l'oxigen; si es _mono-_ no s'escriu",
            "",
            "Símbol del no-metall",
            "Subíndex corresponent al prefix del no-metall, si n'hi ha",
            "Símbol de l'oxigen",
            "Subíndex corresponent al prefix de l'oxigen; si es _mono-_ no s'escriu"
        ],
        "example": [
            "mon/òxid /de /manganès",
            "Mn",
            "Mn",
            "Mn/O",
            "Mn/O",
            "di/òxid /de /carboni",
            "C",
            "C",
            "C/O",
            "C/O/2"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-5-2-1": {
        "id": "ca-5-2-1",
        "lang": "ca",
        "kind": 5,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "_òxid + de_",
            "Nom del metall",
            "Nombre d'oxidació del metall en nombres romans i entre parèntesis, si el metall en té més d'un",
            "",
            "",
            "_òxid + de_",
            "Nom del no-metall",
            "Nombre d'oxidació del no-metall en nombres romans i entre parèntesis, si el no-metall en té més d'un",
            ""
        ],
        "example": [
            "Cu/2/O",
            "òxid /de",
            "òxid /de /coure",
            "òxid /de /coure/(I)",
            "S'escriu sense espai",
            "N/2/O/5",
            "òxid /de",
            "òxid /de /nitrogen",
            "òxid /de /nitrogen/(V)",
            "S'escriu sense espai"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-5-2-2": {
        "id": "ca-5-2-2",
        "lang": "ca",
        "kind": 5,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Nombre d'oxidació de l'oxigen, que en els òxids, siempre és −2",
            "Símbol de l'oxigen",
            "Nombre d'oxidació del metall",
            "Si és possible, se simplifiquen els subíndexs",
            "",
            "Símbol del no-metall",
            "Subíndex corresponent al nombre d'oxidació de l'oxigen",
            "Símbol de l'oxigen",
            "Subíndex corresponent al nombre d'oxidació del no-metall",
            "Si és possible se simplifiquen els subíndexs"
        ],
        "example": [
            "òxid /de /manganès/(II)",
            "Mn",
            "Mn/2",
            "Mn/2/O",
            "Mn/2/O/2",
            "MnO",
            "òxid /de /carboni/(IV)",
            "C",
            "C/2",
            "C/2/O",
            "C/2/O/4",
            "C/O/2"
        ],
        "kind_full": "5.Òxids no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-7-4-1": {
        "id": "ca-7-4-1",
        "lang": "ca",
        "kind": 7,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefix grec corresponent al subíndex del no-metall de la dreta, si n'hi ha",
            "Arrel del nom del no-metall de la dreta + _-ur_",
            "_de_ + prefix grec corresponent al subíndex del no-metall de l'esquerra, si n'hi ha",
            "Nom del no-metall de l'esquerra"
        ],
        "example": [
            "N/Br/3",
            "tri",
            "tri/brom/ur",
            "tri/brom/ur /de",
            "tri/brom/ur /de /nitrogen"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-7-4-2": {
        "id": "ca-7-4-2",
        "lang": "ca",
        "kind": 7,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbol del no-metall que es troba al final del nom",
            "Subíndex corresponent al prefix d'aquest no-metall, si n'hi ha",
            "Símbol de l'altre no-metall",
            "Subíndex corresponent al prefix d'aquest no-metall"
        ],
        "example": [
            "tetra/clor/ur /de /carboni",
            "C",
            "C",
            "C/Cl",
            "C/Cl/4"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-7-2-1": {
        "id": "ca-7-2-1",
        "lang": "ca",
        "kind": 7,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Arrel del nom del no-metall de la dreta + _-ur_",
            "_de_ + nom del no-metall de l'esquerra",
            "Nombre d'oxidació del no-metall de l'esquerra en nombres romans i entre parèntesis, si el no-metall en té més d'un"
        ],
        "example": [
            "N/Br/3",
            "brom/ur",
            "brom/ur /de /nitrogen",
            "brom/ur /de /nitrogen/(III)"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-7-2-2": {
        "id": "ca-7-2-2",
        "lang": "ca",
        "kind": 7,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol del no-metall que es troba al final del nom",
            "Subíndex corresponent al nombre d'oxidació de l'altre no-metall, que si és −1 no s'escriu",
            "Símbol de l'altre no-metall",
            "Subíndex corresponent al nombre d'oxidació del no-metall que es troba al final del nom",
            "Si és possible se simplifiquen els subíndexs"
        ],
        "example": [
            "clor/ur /de /carboni/(IV)",
            "C",
            "C",
            "C/Cl",
            "C/Cl/4",
            "C/Cl/4"
        ],
        "kind_full": "7.Compostos covalents no metàl·lics",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-8-4-1": {
        "id": "ca-8-4-1",
        "lang": "ca",
        "kind": 8,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefix grec corresponent al subíndex del no-metall, si n'hi ha",
            "Arrel del nom del no-metall + _-ur_",
            "_de_ + prefix grec corresponent al subíndex del metall, si n'hi ha",
            "Nom del metall"
        ],
        "example": [
            "Al/2/S/3",
            "tri",
            "tri/sulf/ur",
            "tri/sulf/ur /de /di",
            "tri/sulfuro /de /di/alumini"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-8-4-2": {
        "id": "ca-8-4-2",
        "lang": "ca",
        "kind": 8,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Subíndex corresponent al prefix del metall, si n'hi ha",
            "Símbol del no-metall",
            "Subíndex corresponent al prefix del no-metall, si n'hi ha"
        ],
        "example": [
            "di/sulf/ur /de /plom",
            "Pb",
            "Pb",
            "Pb/S",
            "Pb/S/2"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-8-2-1": {
        "id": "ca-8-2-1",
        "lang": "ca",
        "kind": 8,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "Arrel del nom del no-metall + _-ur_",
            "_de_ + nom del metall",
            "Nombre d'oxidació del metall entre parèntesis i en nombres romans, si el metall en té més d'un"
        ],
        "example": [
            "Al/2/S/3",
            "sulf/ur",
            "sulf/ur /d'/alumini",
            "sulf/ur /d'/alumini"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-8-2-2": {
        "id": "ca-8-2-2",
        "lang": "ca",
        "kind": 8,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Subíndex corresponent a l'estat d'oxidació del no-metall, que si és −1 no s'escriu",
            "Símbol del no-metall",
            "Subíndex corresponent al nombre d'oxidació del metall",
            "Si es pot, se simplifiquen els subíndexs"
        ],
        "example": [
            "sulf/ur /de /plom/(IV)",
            "Pb",
            "Pb/2",
            "Pb/2/S",
            "Pb/2/S/4",
            "Pb/S/2"
        ],
        "kind_full": "8.Sals binàries",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-10-4-1": {
        "id": "ca-10-4-1",
        "lang": "ca",
        "kind": 10,
        "namesys": 4,
        "mode": 1,
        "steps": [
            "Prefix corresponent al subíndex del grup hidroxil, si hi ha subíndex",
            "_hidròxid + de_",
            "Nom del metall"
        ],
        "example": [
            "Ca/(/OH/)2",
            "di",
            "di/hidròxid /de",
            "di/hidròxid /de /calci"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-10-4-2": {
        "id": "ca-10-4-2",
        "lang": "ca",
        "kind": 10,
        "namesys": 4,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Grup hidroxil",
            "Subíndex corresponent al prefix d'_hidròxid_, si n’hi ha. En aquest cas, cal posar parèntesis al grup hidroxil"
        ],
        "example": [
            "hidròxid /de /coure",
            "Cu",
            "Cu/OH",
            "Cu/OH"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "4.Sistemàtic",
        "status": "NOT YET DONE"
    },
    "ca-10-2-1": {
        "id": "ca-10-2-1",
        "lang": "ca",
        "kind": 10,
        "namesys": 2,
        "mode": 1,
        "steps": [
            "_hidròxid + de_",
            "Nom del metall",
            "Nombre d'oxidació del metall en nombres romans i entre parèntesis, si el metall en té més d'un"
        ],
        "example": [
            "Ca/(/OH/)2",
            "hidròxid /de",
            "hidròxid /de /calci",
            "hidròxid /de /calci"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    },
    "ca-10-2-2": {
        "id": "ca-10-2-2",
        "lang": "ca",
        "kind": 10,
        "namesys": 2,
        "mode": 2,
        "steps": [
            "Símbol del metall",
            "Grup hidroxil",
            "Subíndex corresponent al nombre d'oxidació del metall, sempre que no sigui +1. Si es posa subíndex s’ha de posar parèntesis al grup hidroxil"
        ],
        "example": [
            "hidròxid /de /coure/(I)",
            "Cu",
            "Cu/OH",
            "Cu/OH"
        ],
        "kind_full": "10.Hidròxids",
        "namesys_full": "2.Stock",
        "status": "NOT YET DONE"
    }
};
