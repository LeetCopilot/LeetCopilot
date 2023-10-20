import os
from langchain.llms import OpenAI
from langchain import LLMChain, PromptTemplate

hint_prompt_template = '''...'''
hint_prompt = PromptTemplate.from_template(template=hint_prompt_template)

def get_llm() -> OpenAI:
    openai_api_key = os.getenv("OPENAI_API_KEY")
    return OpenAI(openai_api_key=openai_api_key, temperature=0.5, max_tokens=1024)
    
def get_hint_chain(description: str, code: str) -> str:
    llm = get_llm()
    hint_chain = LLMChain(llm=llm, prompt=hint_prompt)
    hint = hint_chain.run(description=description, code=code).strip()
    return hint
