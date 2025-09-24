import json
import csv

SYS = {
    "PRE": "prefijos",
    "NOX": "núms. de oxid.",
}
MODE = {
    "FN": "fmla > nombre",
    "NF": "nombre > fmla",
}
LANGS = ['es', 'ca', 'en', 'eu']
URL = "https://sb-xavimat.github.io/fmalquim/?"
EXAMPLES = {
    "1": "Br2", "2": "SbH5", "3": "H2Se", "4": "Co2O3", "5": "As2O3",
    "6": "O7Cl2", "7": "P2Se3", "8": "AuI3", "9": "FeO2", "10": "Ni(OH)3",
}

with open('csv/help.jsonc', 'r', encoding='utf-8') as f:
    content = f.read()
    # Remove comments (// ...) from JSONC
    content = '\n'.join(line for line in content.splitlines() if not line.strip().startswith('//'))
    data = json.loads(content)

with open('csv/literals.jsonc', 'r', encoding='utf-8') as f:
    content = f.read()
    # Remove comments (// ...) from JSONC
    content = '\n'.join(line for line in content.splitlines() if not line.strip().startswith('//'))

    literals = json.loads(content)

# Create the CSV content
csv_lines = []
header = ['ficha', 'es', 'ca', 'en', 'eu']

for kindkey, kind_names in literals.items():
    for syskey, sysname in SYS.items():
        for modekey, modename in MODE.items():
            card = f"{kind_names['es']} - {sysname} - {modename}"
            row1 = {'ficha': card, 'es': '', 'ca': '', 'en': '', 'eu': ''}
            rows = []
            for lang in LANGS:
                key = f"{lang}-{kindkey}-{syskey}-{modekey}"
                if key in data:
                    for i, line in enumerate(data[key]):
                        if i >= len(rows):
                            rows.append({'ficha': '' , 'es': '', 'ca': '', 'en': '', 'eu': ''})
                        rows[i][lang] = line
            if rows:
                fmla = EXAMPLES[kindkey]
                rows.append({
                    'ficha': '' ,
                    'es': f'{URL}lang=es&kind={kindkey}&fmla={fmla}',
                    'ca': f'{URL}lang=ca&kind={kindkey}&fmla={fmla}',
                    'en': f'{URL}lang=en&kind={kindkey}&fmla={fmla}',
                    'eu': f'{URL}lang=eu&kind={kindkey}&fmla={fmla}'
                    })
                # Empty line between cards
                rows.append({'ficha': '' , 'es': '', 'ca': '', 'en': '', 'eu': ''})
                csv_lines.append(row1)
                csv_lines.extend(rows)







# Write to CSV file
with open('csv/help.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=header)
    writer.writeheader()
    writer.writerows(csv_lines)