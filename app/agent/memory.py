# app/agent/memory.py
from typing import Dict, List
from collections import defaultdict

session_history: Dict[str, List[str]] = defaultdict(list)

def add_clarification(session_id: str, clarification: str):
    session_history[session_id].append(clarification)

def get_clarification_history(session_id: str) -> List[str]:
    return session_history.get(session_id, [])