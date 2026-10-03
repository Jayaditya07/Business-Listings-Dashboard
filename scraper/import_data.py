import csv
import requests

API_URL = "http://127.0.0.1:8000/listings/bulk"

with open("listings_500.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    listings = list(reader)

response = requests.post(API_URL, json=listings)

print("Status Code:", response.status_code)
print("Response:", response.json())