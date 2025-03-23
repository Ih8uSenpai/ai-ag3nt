#llm_client.py
import httpx
import json
from app.models import MCPDecompositionResponse, MCPClarificationResponse, UserStory, MCPResponse

LM_STUDIO_URL = "http://localhost:1234/v1/chat/completions"

HEADERS = {
    "Content-Type": "application/json"
}

async def call_llm_and_parse(prompt: str) -> MCPResponse:
    payload = {
        "model": "local-model",  # название модели из LM Studio
        "messages": [
            {"role": "system", "content": "Ты помощник, который превращает требования в user stories."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(LM_STUDIO_URL, headers=HEADERS, json=payload, timeout=60)
            content = response.json()
            raw_text = content['choices'][0]['message']['content']
            parsed = json.loads(raw_text)

            user_stories = [UserStory(**story) for story in parsed]
            return MCPDecompositionResponse(user_stories=user_stories)

        except Exception as e:
            return MCPClarificationResponse(clarification_needed=f"Не удалось обработать ответ от LLM: {str(e)}")
