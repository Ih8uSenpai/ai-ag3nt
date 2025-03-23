# main.py
from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

from app.models import MCPRequest
from app.mcp_handler import handle_mcp_logic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/mcp")
async def mcp_endpoint(request: Request):
    data = await request.json()
    mcp = MCPRequest(**data)
    return await handle_mcp_logic(mcp)