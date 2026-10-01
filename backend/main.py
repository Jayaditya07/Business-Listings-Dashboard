from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Business Listings Dashboard API is running"
    }
