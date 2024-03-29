from typing import List
import os
from langchain import LLMChain, PromptTemplate
from langchain.llms import LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

def get_hint_chain(description: str, code: str) -> dict:
    model = ChatOpenAI(model="gpt-3.5-turbo",temperature=0.5)

    # Define your desired data structure.
    class Hint(BaseModel):
        line: int = Field(description="the faulty line")
        hint: str = Field(description="a hint to fix the faulty line", max_length=50)
    # And a query intented to prompt a language model to populate the data structure.

    # Set up a parser + inject instructions into the prompt template.
    json_parser = JsonOutputParser(pydantic_object=Hint)

    prompt = PromptTemplate(
        template="What is wrong with the following two sum submission: {code}\n The code is not working, find a problem. Given numbers [2,7,11,15] and target = 9 the code is expected to produce:[0,1] produces:[0,7]. Remember to respond in JSON form that is very important. \n{format_instructions}\n Only provide the JSON response and nothing else!\njson\n",
        input_variables=["description", "code"],
        partial_variables={"format_instructions": json_parser.get_format_instructions()},
    )

    chain = prompt | model | json_parser

    return chain.invoke({"description": description, "code": code})