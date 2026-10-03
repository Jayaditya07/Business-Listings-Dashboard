from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func

from database import Base


class Listing(Base):
    __tablename__ = "listing_master"

    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(255), nullable=False)
    category = Column(String(100))
    city = Column(String(100))
    address = Column(Text)
    phone = Column(String(30))
    source = Column(String(100))
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())