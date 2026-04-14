from crewai import Crew
from .crew_tasks import create_aggregation_task


def aggregate_agent_outputs(agent_results):

    task = create_aggregation_task(agent_results)

    crew = Crew(
        agents=[task.agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()

    return str(result)