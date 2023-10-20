from pydantic import BaseModel, Field

class HintRequest(BaseModel):
    description: str = Field(..., example="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.")
    code: str = Field(..., example="...")
