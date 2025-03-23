# app/agent/agent_graph.py
from langgraph.graph import StateGraph, END
from app.agent.steps import step_generate_prompt, step_call_llm, step_parse_response
from app.agent.state import AgentState

def should_clarify(state: AgentState) -> str:
    return "clarification" if state.needs_clarification else "end"

def build_agent_graph():
    builder = StateGraph(AgentState)

    builder.add_node("generate_prompt", step_generate_prompt)
    builder.add_node("call_llm", step_call_llm)
    builder.add_node("parse_response", step_parse_response)
    builder.add_node("clarification", lambda x: x)

    builder.set_entry_point("generate_prompt")
    builder.add_edge("generate_prompt", "call_llm")
    builder.add_edge("call_llm", "parse_response")
    builder.add_conditional_edges("parse_response", should_clarify, {
        "clarification": "clarification",
        "end": END
    })

    return builder.compile()