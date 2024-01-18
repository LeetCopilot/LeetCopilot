import os
from langchain import LLMChain, PromptTemplate
from langchain.llms import LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler


# hint_prompt = PromptTemplate.from_template(template=hint_prompt_template)

MODEL_PATH = "C:/LlamaModels/llama-2-7b-chat.Q2_K.gguf"

def load_model() -> LlamaCpp:
    callback: CallbackManager = CallbackManager([StreamingStdOutCallbackHandler()])

    llama_model: LlamaCpp = LlamaCpp(
        model_path=MODEL_PATH,
        temperature=0.5,
        max_tokens=500,
        top_p = 1,
        callback_manager=callback,
        verbose=True
    )

    return llama_model

def get_hint_chain(description: str, code: str) -> str:
    print(description, code)
    llm = load_model()
    hint_prompt_template = f'''
You are an programming instructor named Cody who will help me with problems!
I'm stuck on this LeetCode problem and don't know why my code isn't working. Can you tell me whats wrong?

Problem Description:
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

Code:
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = dict()  # val -> index
        for i in range(len(nums)):
            n = nums[i]
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[i] = n

            
Response:'''
    hint = llm.generate([hint_prompt_template])
    return hint
