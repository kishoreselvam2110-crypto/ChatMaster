from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    thread_id: Optional[str] = None

class UndoPayload(BaseModel):
    operation: str
    value: Any

class ActionLog(BaseModel):
    id: str
    table_name: str
    action_type: str
    undo_payload: UndoPayload
