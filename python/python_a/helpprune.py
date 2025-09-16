# Delete unused attributes in help.json
# json is an object of objects
# Only attribute used in objects is 'steps'

import json

with open('help.json', 'r', encoding="utf-8") as f:
    data = json.load(f)
    result = {}
    for key in data:
        if "-1-NOX-" in key:
            continue
        result[key] = data[key]['steps']

with open('help2.json', 'w', encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=4)

