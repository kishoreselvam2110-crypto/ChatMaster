from app.agents.supervisor import Agent
from app.tools.analytics import forecast_metric

analytics_agent = Agent(
    name="AnalyticsAgent",
    instructions="You are a data analyst. Handle all analytics, statistics, and regression forecasting tasks.",
    tools=[forecast_metric]
)
