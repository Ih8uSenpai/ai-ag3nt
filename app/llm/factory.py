# app/llm/factory.py
import os
from app.llm.deepseek import DeepSeekClient
from app.llm.lmstudio import LMStudioClient


# from app.llm.lmstudio import LMStudioClient

def get_llm_client():
    provider = os.getenv("LLM_PROVIDER", "deepseek")
    if provider == "deepseek":
        return DeepSeekClient()
    elif provider == "lmstudio":
        return LMStudioClient()
    # elif provider == "lmstudio":
    #     return LMStudioClient()
    else:
        raise ValueError(f"Unknown LLM provider: {provider}")
