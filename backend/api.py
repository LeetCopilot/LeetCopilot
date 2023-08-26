import logging
import os
import random
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from typing import Optional
from langchain.llms import OpenAI
from langchain import PromptTemplate, LLMChain

# Configure logging
logging.basicConfig(level=logging.INFO)

class HintRequest(BaseModel):
    description: str = Field(..., example="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.")
    code: str = Field(..., example="class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]\n        return []")

class HintResponse(BaseModel):
    hint: str

hint_prompt_template = '''Problem Description:
  {description}

  Code:
  {code}

  I'm stuck on this LeetCode problem and don't know why my code isn't working. Whats wrong?'''

# hint_prompt_template = '''Problem Description:
#   {description}

#   Code:
#   {code}

#   I'm stuck on this LeetCode problem and don't know why my code isn't working. Can you give me a hint that is in the spirit of an interview? Only bring up one issue/optimization. Avoid providing explicit solutions but point out general areas of improvement or potential issues in the code.

#   Keep the response short ideally two sentences, one paragraph max. No matter what do not quote any code from the user. Do not tell them what lines to change and what to change them to. Things like "this incorrect code" should be "correct code" should not be in the response.'''

hint_prompt = PromptTemplate.from_template(template=hint_prompt_template)

fact_index = 0

# Create the FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
    "chrome-extension://joecpfmckhoobfipcmmhhkkmohhjebmm"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create the main endpoint
@app.get("/")
async def root() -> str:
    return "Welcome to LeetCopilot!"

@app.get('/fact')
async def health() -> str:
    global fact_index
    fact_index += 1
    return ['LeetCopilot will be a huge hit! Guaranteed🪓', 
            'LeetCopilots founder, Ridha, is very cool😎', 
            'LeetCopilots developers are certified stinky👃'][fact_index % 3]

# LLM Dependency injection
def get_llm() -> OpenAI:
    # load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    return OpenAI(openai_api_key=openai_api_key, temperature=0.5, max_tokens=1024)

# Endpoint to get a leetcode hint
@app.post("/hint", response_model=str)
async def get_hint(promptData: HintRequest):
    """
    Endpoint to get a hint for a specific problem.
    
    Takes in a problem with name, description, and code, then gets a hint 
    using the OpenAI API. The hint is then sent back to the frontend.
    
    Parameters:
    - **name**: The name of the problem
    - **description**: A description of the problem
    - **code**: The source code for the problem
    """
    
    logging.log(logging.INFO, f"Received request for hint for problem: {promptData.description[:15]}...")
    
    llm = get_llm()
    hint_chain = LLMChain(llm=llm, prompt=hint_prompt)
    hint = hint_chain.run(description=promptData.description, code=promptData.code).strip()
    
    logging.log(logging.INFO, f"Hint: {hint[:15]}...")
    
    return hint
