# app/llm/deepseek.py
import os
import httpx
from dotenv import load_dotenv
from app.llm.base import LLMClient

load_dotenv()

class DeepSeekClient(LLMClient):
    API_URL = "https://openrouter.ai/api/v1/chat/completions"
    API_KEY = os.getenv("DEEPSEEK_API_KEY")
    MODEL = "deepseek/deepseek-r1"

    async def complete(self, prompt: str) -> str:
        headers = {
            "Authorization": f"Bearer {self.API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.MODEL,
            "messages": [
                {"role": "system", "content": (
                    "Ты помощник по анализу требований. Получив текст требования, "
                    "разбей его на User Story или задай уточняющий вопрос."
                )},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(self.API_URL, json=payload, headers=headers)
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]