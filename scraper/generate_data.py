import csv
import random

cities = [
    "Indore",
    "Bhopal",
    "Pune",
    "Mumbai",
    "Delhi",
    "Jaipur",
    "Ahmedabad",
    "Surat",
    "Nagpur",
    "Udaipur"
]

categories = [
    "Restaurant",
    "Cafe",
    "Hotel",
    "Hospital",
    "IT Services",
    "Gym",
    "Salon",
    "Clothing Store",
    "Electronics Store",
    "Bakery"
]

business_names = [
    "Royal",
    "City",
    "Green",
    "Sunrise",
    "Blue Star",
    "Sharma",
    "Modern",
    "New",
    "Golden",
    "Central"
]

records = []

for i in range(1, 501):
    city = random.choice(cities)
    category = random.choice(categories)
    name = random.choice(business_names)

    record = {
        "business_name": f"{name} {category} {i}",
        "category": category,
        "city": city,
        "address": f"Main Road, {city}",
        "phone": f"9{random.randint(100000000, 999999999)}",
        "source": "Sample Data"
    }

    records.append(record)

with open("listings_500.csv", "w", newline="", encoding="utf-8") as file:
    fieldnames = [
        "business_name",
        "category",
        "city",
        "address",
        "phone",
        "source"
    ]

    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(records)

print("500 sample listings generated successfully!")