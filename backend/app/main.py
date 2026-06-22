from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ChatMaster Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

from app.agents.supervisor import get_supervisor_agent

@app.post("/api/chat/stream")
async def chat_stream(request: Request):
    body = await request.json()
    messages = body.get("messages", [])
    
    # In a full implementation, we pass the messages to the supervisor agent
    # and stream the AG-UI protocol events back to CopilotKit.
    supervisor = get_supervisor_agent()
    
    async def event_generator():
        # Stub for streaming response
        yield "data: {\"type\": \"RUN_STARTED\"}\n\n"
        # supervisor processing logic...
        yield "data: {\"type\": \"RUN_COMPLETED\"}\n\n"
        
    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/api/undo")
async def undo_action():
    from app.tools.undo_redo import undo_last_action
    result = undo_last_action(supabase)
    return {"status": "success", "result": result}

@app.get("/api/health")
def health():
    return {"status": "ok", "supabase_connected": supabase is not None}
