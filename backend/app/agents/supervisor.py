# Stub implementation of google.antigravity for hackathon demo
class Agent:
    def __init__(self, name, instructions, tools=None, team=None):
        self.name = name
        self.instructions = instructions
        self.tools = tools or []
        self.team = team

class Team:
    def __init__(self, agents):
        self.agents = agents
        
    def delegate(self, task, target_agent):
        print(f"Delegating task to {target_agent.name}: {task}")
        # In actual implementation, this invokes the target agent
        pass

from app.agents.db_agent import db_agent
from app.agents.analytics_agent import analytics_agent
from app.agents.crud_agent import crud_agent

def get_supervisor_agent():
    # Initialize a root Agent from google.antigravity with a team parameter
    # Explicitly instantiates DBAgent, AnalyticsAgent, and CRUDAgent
    team = Team([db_agent, analytics_agent, crud_agent])
    
    supervisor = Agent(
        name="ChatMaster Supervisor",
        instructions="""You are the root supervisor agent. 
        Analyze the user's request and delegate to the appropriate sub-agent using agent.team.delegate(task, target_agent).
        - For SQL/DDL operations, delegate to db_agent.
        - For data processing/forecasting, delegate to analytics_agent.
        - For standard CRUD mutations, delegate to crud_agent.""",
        team=team
    )
    
    return supervisor
