from app.agents.supervisor import Agent
from app.tools.crud import perform_crud
from app.tools.undo_redo import undo_last_action

crud_agent = Agent(
    name="CRUDAgent",
    instructions="You are a standard application agent. Handle standard CRUD mutations, fetch data, and manage state tracking.",
    tools=[perform_crud, undo_last_action]
)
