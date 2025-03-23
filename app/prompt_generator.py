# app/prompt_generator.py
import json
import httpx
import os
from dotenv import load_dotenv
from app.models import MCPClarificationResponse, MCPDecompositionResponse, UserStory

load_dotenv()

DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions"
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
MODEL = "deepseek/deepseek-r1"

SYSTEM_PROMPT = (
    "Ты помощник по анализу требований. Получив текст требования, разбей его на User Story в формате:\n"
    "- title: <заголовок>\n"
    "- description: <Как <роль>, я хочу ..., чтобы ...>\n\n"
    "Если информации недостаточно — задай уточняющий вопрос."
)

def generate_prompt(requirement_text: str) -> str:
    return f"Требование: {requirement_text}"

async def call_deepseek(prompt: str):
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(DEEPSEEK_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]

def parse_llm_response(llm_text: str):
    if "title" not in llm_text.lower():
        return MCPClarificationResponse(clarification_needed=llm_text)

    return MCPDecompositionResponse(user_stories=[
        UserStory(title="User Story", description=llm_text.strip())
    ])
