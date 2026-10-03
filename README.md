Business Listings Dashboard

1. Project Overview

Business Listings Dashboard is a full-stack web application developed to collect, store, process, and visualize business listing data.

The application provides a centralized dashboard where business listings can be analyzed based on city, category, and data source.

The project is built using React.js for the frontend, FastAPI for the backend, and MySQL for data storage.

2. Objectives

The main objectives of this project are:

Build a full-stack business listing management application.

Store business listing data in a structured MySQL database.

Develop REST APIs using FastAPI.

Display city-wise, category-wise, and source-wise statistics.

Create an interactive dashboard using React.js.

Generate and import sample business listing data.

Maintain a clean and modular project structure.

3. Features

The application provides the following features:

Business listing data management.

Bulk insertion of business listings.

City-wise listing statistics.

Category-wise listing statistics.

Source-wise listing statistics.

Interactive charts and visualizations.

MySQL database integration.

REST API integration between frontend and backend.

CSV-based sample data generation and import.

API documentation using Swagger UI.

4. Technology Stack

Technology

Purpose

React.js

Frontend development

FastAPI

Backend REST APIs

Python

Backend and data processing

SQLAlchemy

Database ORM

MySQL

Database

Axios

API communication

Recharts

Data visualization

HTML

Web structure

CSS

Web styling

JavaScript

Frontend functionality

Git

Version control

GitHub

Source code repository

5. System Architecture

Business Listings Dashboard
|
v
React Frontend
|
v
REST APIs
|
v
FastAPI Backend
|
v
SQLAlchemy ORM
|
v
MySQL Database
|
v
listing_master

The frontend communicates with the FastAPI backend through REST APIs. The backend uses SQLAlchemy to interact with the MySQL database. The stored business listing data is processed and returned to the React dashboard for visualization.

6. Project Structure

Business-Listings-Dashboard/
|
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── ...
│ ├── package.json
│ └── ...
|
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── dependencies.py
│ ├── models.py
│ ├── schemas.py
│ └── ...
|
├── scraper/
│ ├── generate_data.py
│ ├── import_data.py
│ ├── sample_data.py
│ └── listings_500.csv
|
├── database/
│ └── business_listings.sql
|
├── .gitignore
└── README.md

The project is organized into separate frontend, backend, data-processing, and database components to maintain a clean and modular structure.

The local backend/.env file contains database configuration and is excluded from version control.

7. Database Design

Database

business_listings

Main Table

listing_master

Table Schema

Column

Type

Description

id

INT

Primary key

business_name

VARCHAR(255)

Name of the business

category

VARCHAR(100)

Business category

city

VARCHAR(100)

Business city

address

TEXT

Business address

phone

VARCHAR(30)

Contact number

source

VARCHAR(100)

Data source

created_at

TIMESTAMP

Record creation time

The listing_master table stores the business listing records used by the application.

8. API Documentation

Health Check

GET /

Returns the current API status.

Example Response

{
"message": "Business Listings Dashboard API is running"
}

Bulk Insert Listings

POST /listings/bulk

This endpoint is used to insert multiple business listings into the database.

City-wise Statistics

GET /stats/city

Returns the number of listings grouped by city.

Category-wise Statistics

GET /stats/category

Returns the number of listings grouped by category.

Source-wise Statistics

GET /stats/source

Returns the number of listings grouped by source.

9. Data Generation and Import

The project includes a Python-based workflow for generating and importing business listing data.

Generate Sample Data

The generate_data.py script generates 500 business listing records across multiple cities and business categories.

Run:

cd scraper
python generate_data.py

The script generates:

listings_500.csv

The CSV file contains:

Business name

Category

City

Address

Phone number

Source

Import Data

The generated CSV records are imported into the MySQL database through the FastAPI bulk insertion endpoint.

Make sure the FastAPI backend is running before starting the import.

Run:

cd scraper
python import_data.py

Import Workflow

generate_data.py
|
v
listings_500.csv
|
v
import_data.py
|
v
POST /listings/bulk
|
v
FastAPI
|
v
SQLAlchemy
|
v
MySQL

The database was verified after the import and contains more than 500 business listing records.

10. Frontend Dashboard

The frontend of the application is developed using React.js.

The dashboard fetches statistical data from the FastAPI backend using Axios and displays the results using interactive charts.

The dashboard includes the following sections:

Total Listings

Total Cities

Total Categories

City-wise Listings

Category-wise Listings

Source-wise Listings

The dashboard uses Recharts for data visualization.

Frontend API integration:

GET /stats/city
GET /stats/category
GET /stats/source

The dashboard dynamically updates the displayed statistics based on the data returned by the backend APIs.

11. Setup and Installation

Prerequisites

Make sure the following software is installed:

Python 3.13 or later

Node.js

npm

MySQL

Git

Backend Setup

Open the project in VS Code and open a terminal.

Navigate to the backend folder:

cd backend

Create a Python virtual environment:

python -m venv .venv

Activate the virtual environment:

.venv\Scripts\activate

Install the required backend packages:

pip install fastapi uvicorn sqlalchemy mysql-connector-python python-dotenv requests

Start the FastAPI server:

python -m uvicorn main:app

The backend will run at:

http://127.0.0.1:8000

Frontend Setup

Open another terminal and navigate to the frontend folder:

cd frontend

Install frontend dependencies:

npm install

Start the React development server:

npm run dev

The frontend will run at:

http://localhost:5173

Database Setup

Create a MySQL database named:

business_listings

Create the required table using the SQL file available in the database folder:

database/business_listings.sql

The backend database configuration is stored in the local .env file.

The .env file is excluded from Git version control for security.

12. Running the Application

The application requires both the FastAPI backend and React frontend to be running.

Start Backend

Open a terminal:

cd backend
.venv\Scripts\activate
python -m uvicorn main:app

Backend URL:

http://127.0.0.1:8000

Start Frontend

Open another terminal:

cd frontend
npm run dev

Frontend URL:

http://localhost:5173

Open the frontend URL in a browser to access the Business Listings Dashboard.

API Documentation

FastAPI provides Swagger UI for testing the available API endpoints.

Open:

http://127.0.0.1:8000/docs

13. API Testing and Verification

The backend APIs were tested using FastAPI Swagger UI.

The following endpoints were verified:

GET /

POST /listings/bulk

GET /stats/city

GET /stats/category

GET /stats/source

The health-check endpoint confirmed that the backend was running successfully.

The bulk insertion endpoint was tested with business listing data and returned a successful response.

The statistics endpoints were verified to return listing counts grouped by city, category, and source.

The frontend was connected to these APIs using Axios and successfully displayed the returned statistics.

14. Data and Project Verification

The project was verified after completing the backend, frontend, database, and data-import workflow.

The verification included:

MySQL database connection.

listing_master table creation.

FastAPI server startup.

FastAPI Swagger documentation.

REST API testing.

React frontend startup.

Axios API communication.

Dashboard statistics.

Chart rendering using Recharts.

CSV data generation.

CSV data import.

SQL database dump creation.

Git repository configuration.

The database contains more than 500 business listing records after the sample data import.

The SQL database dump is available in:

database/business_listings.sql

The project source code is maintained using Git and hosted on GitHub.

15. Future Improvements and Conclusion

Future Improvements

The project can be further enhanced with the following features:

Integration with additional business listing sources.

Real-time data collection from permitted sources.

Advanced search and filtering.

Pagination for large datasets.

Business listing detail pages.

Authentication and user management.

Export dashboard data to CSV or Excel.

Advanced analytics and reporting.

Improved dashboard responsiveness.

Deployment to a cloud platform.

Automated data collection and scheduled updates.

Conclusion

Business Listings Dashboard demonstrates a complete full-stack development workflow using React.js, FastAPI, SQLAlchemy, and MySQL.

The project covers data generation, database storage, REST API development, frontend API integration, and data visualization.

The modular architecture allows the application to be extended with additional data sources, analytics features, and production-ready functionality.

The project also demonstrates practical experience with Git, GitHub, REST APIs, database integration, React.js, Python, and full-stack application development.
