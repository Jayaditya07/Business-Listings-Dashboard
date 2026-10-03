from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from sqlalchemy import func

from database import Base, engine

from dependencies import get_db

from models import Listing

from schemas import ListingCreate


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Business Listings Dashboard API is running"
    }


@app.post("/listings/bulk")
def create_listings(
    listings: list[ListingCreate],
    db: Session = Depends(get_db)
):
    new_listings = []

    for listing in listings:
        new_listing = Listing(
            business_name=listing.business_name,
            category=listing.category,
            city=listing.city,
            address=listing.address,
            phone=listing.phone,
            source=listing.source
        )

        db.add(new_listing)
        new_listings.append(new_listing)

    db.commit()

    return {
        "message": "Listings added successfully",
        "count": len(new_listings)
    }


@app.get("/stats/city")
def city_wise_count(db: Session = Depends(get_db)):
    results = (
        db.query(
            Listing.city,
            func.count(Listing.id).label("count")
        )
        .group_by(Listing.city)
        .all()
    )

    return [
        {
            "city": city,
            "count": count
        }
        for city, count in results
    ]

@app.get("/stats/category")
def category_wise_count(db: Session = Depends(get_db)):
    results = (
        db.query(
            Listing.category,
            func.count(Listing.id).label("count")
        )
        .group_by(Listing.category)
        .all()
    )

    return [
        {
            "category": category,
            "count": count
        }
        for category, count in results
    ]

@app.get("/stats/source")
def source_wise_count(db: Session = Depends(get_db)):
    results = (
        db.query(
            Listing.source,
            func.count(Listing.id).label("count")
        )
        .group_by(Listing.source)
        .all()
    )

    return [
        {
            "source": source,
            "count": count
        }
        for source, count in results
    ]