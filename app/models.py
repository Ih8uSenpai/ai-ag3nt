# app/models.py
from pydantic import BaseModel
from typing import List, Optional, Union

class UserStory(BaseModel):
    title: str
    description: str

class MCPContext(BaseModel):
    session_id: str

class MCPInput(BaseModel):
    text: Optional[str] = None
    file: Optional[str] = None

class MCPRequest(BaseModel):
    type: str
    input: MCPInput
    context: Optional[MCPContext] = None

class MCPClarificationResponse(BaseModel):
    clarification_needed: str

class MCPDecompositionResponse(BaseModel):
    user_stories: List[UserStory]

MCPResponse = Union[MCPClarificationResponse, MCPDecompositionResponse]