from agents.generic_agent import GenericAgent


class AgentFactory:
    @staticmethod
    def create_agents(agent_names: list, intent: str, request_id: str) -> dict:
        agents = {}

        for agent_name in agent_names:
            agents[agent_name] = GenericAgent(
                name=agent_name,
                intent=intent,
                request_id=request_id
            )

        return agents
