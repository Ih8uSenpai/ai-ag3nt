from langchain_gigachat import GigaChat
from app.llm.base import LLMClient
import os

class GigaChatClient(LLMClient):
    def __init__(self):
        self.model = GigaChat(
            credentials=os.getenv("GIGACHAT_TOKEN"),
            scope="GIGACHAT_API_PERS",
            verify_ssl_certs=False,
            model="GigaChat"
        )

    async def complete(self, prompt: str) -> str:
        response = self.model.invoke(prompt)
        return str(response.content)  # ✅ здесь обязательно .content
