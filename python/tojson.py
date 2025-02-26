
import csv
import json

# En el CSV origen: Canviats els noms dels camps a mà:
# name_ca,name_es,symb,Z,A,kind,nox,order_en_nm,apostrof,stem_ca,stem_es

# En el JSON destí:
# Canviats a mà "TRUE" per true i "FALSE" per false

def csv_to_json(csv_file, json_file):
    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    with open(json_file, 'w') as f:
        json.dump(rows, f, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    csv_to_json('elements.csv', 'elements.json')