# app/agent/state.py
from pydantic import BaseModel
from typing import Optional, List
from app.models import UserStory

class AgentState(BaseModel):
    requirement_text: str
    prompt: Optional[str] = None
    llm_response: Optional[str] = None
    user_stories: Optional[List[UserStory]] = None
    clarification_needed: Optional[str] = None
    needs_clarification: bool = False
    is_clarification_reply: bool = False
    session_id: Optional[str] = None
    clarification_history: List[str] = []
