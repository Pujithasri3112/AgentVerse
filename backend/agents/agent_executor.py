import asyncio


class AgentExecutor:

    async def execute(self, agents: list, context: dict):

        tasks = [
            agent.execute(context)
            for agent in agents
        ]

        results = await asyncio.gather(*tasks)

        return results