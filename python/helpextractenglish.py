# Preparar un CSV per revisar l'anglés.
# 1. Llegir help3.json
# 2. Iterar les keys
# 3. Crear un CSV amb les següents columnes:
#    - key
#    - castellà
#    - català
#    - anglès
# 4. Exportar el CSV com help4.csv

import json
import csv

# Llegir el fitxer JSON
with open('help3.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
# Preparar les dades per al CSV
csv_data = []
for key, value in data.items():
    if not key.startswith('en-'):
        continue
    key_es = key.replace('en-', 'es-')
    key_ca = key.replace('en-', 'ca-')
    csv_data.append({
        'key': key,
        'es': "\n".join(data.get(key_es, '')),
        'ca': "\n".join(data.get(key_ca, '')),
        'en': "\n".join(value)
    })

# Exportar a CSV
with open('help4.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['key', 'es', 'ca', 'en']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for row in csv_data:
        writer.writerow({
            'key': row['key'],
            'es': row['es'],
            'ca': row['ca'],
            'en': row['en']
        })

print("CSV help4.csv creat amb èxit.")