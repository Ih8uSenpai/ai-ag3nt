import httpx
from app.llm.base import LLMClient

class LMStudioClient(LLMClient):
    async def complete(self, prompt: str) -> str:
        payload = {
            "model": "local-model",  # имя модели внутри LM Studio
            "messages": [
                {"role": "system", "content": "Ты помощник, который превращает требования в user stories."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2
        }

        async with httpx.AsyncClient() as client:
            response = await client.post("http://localhost:1234/v1/chat/completions", json=payload, timeout=60)
            response.raise_for_status()
            content = response.json()
            return content["choices"][0]["message"]["content"]
