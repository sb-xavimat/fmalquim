# Transformació de l'arxiu JSON d'elements, afegint l'eusquera.
# - Llegir l'arxiu `elements.json` i guardarlo en una llista de diccionaris.
# - Llegir l'arxiu `elem_eu.txt`, amb els noms en euskera.
# - Afegir els camps `name_eu` i `stem_eu` a cada element
#   - `name_eu`: prové del fitxer `elem_eu.txt`.
#   - `stem_eu`: Si el camp no està buit en les altres llengues, posar "??".
# - Guardar l'arxiu `elements2.json`.

import json

# Llegir l'arxiu elements.json
with open('elements.json', 'r', encoding='utf-8') as f:
    elements = json.load(f)

# Llegir l'arxiu elem_eu.txt
names_eu = []
with open('elem_eu.txt', 'r', encoding='utf-8') as f:
    for line in f:
        names_eu.append(line.strip())

# Afegir els camps name_eu i stem_eu
for i, elem in enumerate(elements):
    if elem['symb'] == "X":
        continue  # Saltar l'element amb símbol "X"
    elem['name_eu'] = names_eu[i]
    if elem['stem_es']:
        elem['stem_eu'] = "??"
    else:
        elem['stem_eu'] = ""

elements2 = []
# Afegir els nous elements amb un orde fixe:
for elem in elements:
    if elem['symb'] == "X":
        elements2.append(elem)
    else:
        # "name_ca": "Hidrogen",
        # "name_es": "Hidrógeno",
        # "name_en": "Hydrogen",
        # "name_eu": "Hidrogenoa",
        # "symb": "H",
        # "Z": "1",
        # "A": "1,008",
        # "kind": "no-metall",
        # "nox": "–1/+1",
        # "order_en_nm": "11",
        # "apostrof": true,
        # "stem_ca": "Hidr",
        # "stem_es": "Hidr",
        # "stem_en": "Hydr",
        # "stem_eu": "??"

        elem2 = {
            "name_ca": elem["name_ca"],
            "name_es": elem["name_es"],
            "name_en": elem["name_en"],
            "name_eu": elem["name_eu"],
            "symb": elem["symb"],
            "Z": elem["Z"],
            "A": elem["A"],
            "kind": elem["kind"],
            "nox": elem["nox"],
            "order_en_nm": elem["order_en_nm"],
            "apostrof": elem["apostrof"],
            "stem_ca": elem["stem_ca"],
            "stem_es": elem["stem_es"],
            "stem_en": elem["stem_en"],
            "stem_eu": elem["stem_eu"]
        }
        elements2.append(elem2)


# Guardar l'arxiu elements2.json
with open('elements2.json', 'w', encoding='utf-8') as f:
    json.dump(elements2, f, ensure_ascii=False, indent=4)
print("Arxiu elements2.json creat amb èxit.")