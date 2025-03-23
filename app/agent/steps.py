# app/agent/steps.py
from app.agent.state import AgentState
from app.llm.factory import get_llm_client
from app.prompt_generator import generate_prompt, parse_llm_response
from app.agent.memory import get_clarification_history, add_clarification

llm = get_llm_client()

async def step_generate_prompt(state: AgentState) -> AgentState:
    base = state.requirement_text
    if state.session_id:
        history = get_clarification_history(state.session_id)
        if history:
            base += "\n\nДополнительно:\n" + "\n".join(history)
    state.prompt = generate_prompt(base)
    state.is_clarification_reply = False
    return state

async def step_call_llm(state: AgentState) -> AgentState:
    state.llm_response = await llm.complete(state.prompt)
    return state

async def step_parse_response(state: AgentState) -> AgentState:
    result = parse_llm_response(state.llm_response)
    if hasattr(result, 'user_stories') and result.user_stories:
        state.user_stories = result.user_stories
        state.needs_clarification = False
    elif hasattr(result, 'clarification_needed'):
        state.clarification_needed = result.clarification_needed
        state.needs_clarification = True
        if state.session_id:
            add_clarification(state.session_id, state.requirement_text)
    return state