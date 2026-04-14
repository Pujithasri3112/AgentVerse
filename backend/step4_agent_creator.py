from agents.agent_factory import AgentFactory
import asyncio

async def create_dynamic_agents(step3_output: dict, input_message: str, context=None) -> dict:
    """
    STEP-4: Dynamic Agent Creation
    Creates agent instances based on routing decision
    """

    request_id = step3_output["request_id"]
    intent = step3_output["intent"]
    agent_names = step3_output["agents"]

    agents = AgentFactory.create_agents(
        agent_names=agent_names,
        intent=intent,
        request_id=request_id
    )

    execution_results = []

    # Prepare memory context text
    memory_text = ""

    if context:
        for m in context:
            query = m.get("query")
            answer = m.get("answer")

            if query and answer:
                memory_text += f"Previous Query: {query}\n"
                memory_text += f"Previous Answer: {answer}\n\n"

    for agent in agents.values():

        agent_input = {
            "input": input_message
        }

        if memory_text:
            agent_input["memory_context"] = memory_text

        result = await agent.execute(agent_input)

        execution_results.append(result)

    return {
        "request_id": request_id,
        "intent": intent,
        "agents_executed": agent_names,
        "results": execution_results,
        "status": "completed"
    }