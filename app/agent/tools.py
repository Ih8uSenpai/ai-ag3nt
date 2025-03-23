from langchain_core.tools import tool

@tool
def echo_tool(text: str) -> str:
    """Повторяет сообщение обратно."""
    return f"🔊 Echo Tool получил: {text}"
