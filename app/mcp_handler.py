# app/mcp_handler.py
from app.models import MCPRequest, MCPResponse, MCPClarificationResponse, MCPDecompositionResponse
from app.agent.agent_graph import build_agent_graph
from app.agent.state import AgentState

graph = build_agent_graph()

async def handle_mcp_logic(mcp: MCPRequest) -> MCPResponse:
    session_id = mcp.context.session_id if mcp.context else None
    is_followup = session_id is not None

    initial_state = AgentState(
        requirement_text=mcp.input.text,
        is_clarification_reply=is_followup,
        session_id=session_id
    )

    result_state = await graph.ainvoke(initial_state)
    state = AgentState(**result_state)

    if state.user_stories:
        return MCPDecompositionResponse(user_stories=state.user_stories)
    else:
        return MCPClarificationResponse(clarification_needed=state.clarification_needed)
