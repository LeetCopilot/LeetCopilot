from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List

from langchain.llms import OpenAI
from langchain import PromptTemplate

from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os

class HintRequest(BaseModel):
    name: str = Field(..., example="Two Sum")
    description: str = Field(..., example="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.")
    examples: List[str] = Field(..., example=["Input: nums = [2,7,11,15], target = 9", "Output: [0,1]", "Output: Because nums[0] + nums[1] == 9, we return [0, 1]."])
    code: str = Field(..., example="class Solution:\n\tdef twoSum(self, nums: List[int], target: int) -> List[int]:\n\t\tfor i in range(len(nums)):\n\t\t\tfor j in range(i + 1, len(nums)):\n\t\t\t\tif nums[i] + nums[j] == target:\n\t\t\t\t\treturn [i, j]\n\t\treturn []")

hint_prompt_template = '''Problem:
  {{ problem }}

  Code:
  {{ code }}

  I'm stuck on this LeetCode problem and don't know why my code isn't working. Can you give me a hint that is in the spirit of an interview? Only bring up one issue/optimization. Avoid providing explicit solutions but point out general areas of improvement or potential issues in the code.

  Keep the response short ideally two sentences, one paragraph max. No matter what do not quote any code from the user. Do not tell them what lines to change and what to change them to. Things like "this incorrect code" should be "correct code" should not be in the response.'''
hint_prompt = PromptTemplate.from_template(hint_prompt_template)

# A lifespan event that handles start up and shutdown code
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup the LLM
    load_dotenv()
    openai_api_key = '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'
    print(openai_api_key)

    app.llm = OpenAI(openai_api_key=openai_api_key, temperature=0.5, max_tokens = 10)

    yield # Everything before the yield is run on startup and everything after is run on shutdown
    print("Shutting down...")

# Create the FastAPI app
app = FastAPI(lifespan=lifespan)

# Create the main endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to LeetCopilot!"}

# Endpoint to get a leetcode hint
@app.get("/hint", response_model=str)
def get_hint(problem: HintRequest):
    """
    Endpoint to get a hint for a specific problem.

    Takes in a problem with name, description, examples, and code, then gets a hint using the OpenAI API.
    The hint is then sent back to the frontend.

    - **name**: The name of the problem
    - **description**: A description of the problem
    - **examples**: A list of examples for the problem
    - **code**: The source code for the problem
    """
    # Create the prompt
    formatted_prompt = hint_prompt.format(problem=problem.description, code=problem.code)

    # Send it over to the LLM
    hint = app.llm.predict(formatted_prompt, max_tokens=64, temperature=0.5, top_p=1, frequency_penalty=0, presence_penalty=0.5, stop=["\n\n"])

    return hint