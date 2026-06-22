from app.agents.supervisor import Agent
from app.tools.db_design import design_database

db_agent = Agent(
    name="DBAgent",
    instructions="You are a database architect. Handle all SQL DDL operations and schema design.",
    tools=[design_database]
)
