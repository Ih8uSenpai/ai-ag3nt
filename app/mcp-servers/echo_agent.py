# echo_agent.py
from mcp import mcp_handler, run_mcp_server
from fastapi import FastAPI

app = FastAPI()

@app.post("/mcp")
async def mcp_echo(request: dict):
    text = request.get("input", {}).get("text", "")
    return {
        "clarification_needed": f"Эхо-агент принял ваш текст: '{text}'"
    }

run_mcp_server(app, port=8001)
