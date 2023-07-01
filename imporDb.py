import 
import json

csv_file = "district.csv"
json_file = "district.json"

data = []
with open(csv_file, "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

with open(json_file, "w") as file:
    json.dump(data, file)
