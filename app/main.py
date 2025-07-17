from fastapi import FastAPI
from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.database import Base, engine, get_db
from app.models import kancelaria, user # Import models to ensure they are registered with SQLAlchemy

Base.metadata.create_all(bind=engine) # Create database tables

app = FastAPI(
    title="Kancelaria API",
    description="API for managing law firms and clients.",
    version="1.0.0",
    openapi_url="/api/v1/openapi.json"
)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.v1.endpoints import kancelarie, users
app.include_router(kancelarie.router, prefix="/api/v1/kancelarie", tags=["kancelarie"])
app.include_router(kancelarie.router, prefix="/api/v1/law-firms", tags=["law-firms"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to Kancelaria API!"}