# Load 'substances.csv'
# Manage it to create dictionary of sets:
#   - The keys are the field 'kind_id'
#   - The values of the sets come from the field 'fmla'
#   - All the other fields are ignored
# Export the resulting dictionary to a file 'exemples.json'

import csv
import json

def process_substances_csv(csv_filepath, json_filepath):
    """
    Loads 'substances.csv', processes it to create a dictionary of sets,
    and exports the dictionary to 'exemples.json'.

    Args:
        csv_filepath (str): The path to the input CSV file ('substances.csv').
        json_filepath (str): The path to the output JSON file ('exemples.json').
    """
    substances_dict = {}

    try:
        with open(csv_filepath, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                kind_id = row['kind_id']
                fmla = row['fmla']

                if kind_id not in substances_dict:
                    substances_dict[kind_id] = set()
                substances_dict[kind_id].add(fmla)

    except FileNotFoundError:
        print(f"Error: CSV file '{csv_filepath}' not found.")
        return
    except KeyError as e:
        print(f"Error: Column '{e}' not found in CSV file. Please ensure 'kind_id' and 'fmla' columns exist.")
        return
    except Exception as e:
        print(f"An unexpected error occurred while processing the CSV file: {e}")
        return

    try:
        with open(json_filepath, mode='w', encoding='utf-8') as jsonfile:
            json.dump(substances_dict, jsonfile, indent=2)  # indent for pretty printing
        print(f"Successfully exported dictionary to '{json_filepath}'.")
    except Exception as e:
        print(f"Error exporting to JSON file '{json_filepath}': {e}")

if __name__ == "__main__":
    csv_file = 'substances.csv'  # Path to your CSV file
    json_file = 'exemples.json'   # Path to your JSON output file
    process_substances_csv(csv_file, json_file)
    print(f"Processing completed. Check '{json_file}'.")
