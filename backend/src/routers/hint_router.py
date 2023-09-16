from fastapi import APIRouter, Depends
from .models import HintRequest
from .services.langchain_service import get_hint_chain

hint_router = APIRouter()

@hint_router.get("/")
async def root() -> str:
    return "Welcome to LeetCopilot!"

@hint_router.post("/hint", response_model=str)
async def get_hint(promptData: HintRequest):
    hint = get_hint_chain(description=promptData.description, code=promptData.code)
    return hint
