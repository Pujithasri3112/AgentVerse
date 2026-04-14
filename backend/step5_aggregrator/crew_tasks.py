from crewai import Task
from .crew_agents import aggregator_agent


def create_aggregation_task(agent_results):

    combined = "\n\n".join(
        f"{r['agent_name']}:\n{r['analysis']}"
        for r in agent_results
    )

    task = Task(
        description=f"""
You are an AI system that organizes outputs from multiple agents.

Do NOT rewrite everything into a report.

Instead, present the results grouped by agent.

Format strictly like this:

Agent Name:
- key point
- key point
- key point

Agent Name:
- key point
- key point

Final Conclusion:
2 concise sentences summarizing the overall insights.

Agent Outputs:
{combined}
""",
        agent=aggregator_agent,
        expected_output="Agent-wise structured summary"
    )

    return task