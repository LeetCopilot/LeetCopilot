import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.settings import origins
from src.routers.hint_router import hint_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(hint_router)
