from typing import List

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
model = ChatOpenAI(model="gpt-3.5-turbo",temperature=0.5)

# Define your desired data structure.
class Hint(BaseModel):
    line: int = Field(description="the faulty line")
    hint: str = Field(description="a hint to fix the faulty line")
# And a query intented to prompt a language model to populate the data structure.
description = '''
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
'''

code = '''
1 class Solution:
2   def twoSum(self, nums: List[int], target: int) -> List[int]:
3       prevMap = \{\}  # val -> index
4       for i in range(len(nums)):
5           n = nums[i]
6           diff = target - n
7           if diff in prevMap:
8               return [prevMap[diff], i]
9           prevMap[n] = i
'''
model = ChatOpenAI(model="gpt-3.5-turbo",temperature=0.5)
# Set up a parser + inject instructions into the prompt template.
json_parser = JsonOutputParser(pydantic_object=Hint)

string_parser = StrOutputParser()

prompt = PromptTemplate(
    template="Help the user solve their problem, this is a leetcode environment so dont worry about things like imports.\n{format_instructions}\n{description}\n{code}\nRemember to respond in JSON form that is very important. Only provide the JSON response and nothing else!",
    input_variables=["description", "code"],
    partial_variables={"format_instructions": json_parser.get_format_instructions()},
)

chain = prompt | model | json_parser

print(chain.invoke({"description": description, "code": code}))