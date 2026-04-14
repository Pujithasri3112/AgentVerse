from agents.base_agent import BaseAgent
from agents.llm_client import call_llm


class GenericAgent(BaseAgent):

    async def execute(self, context: dict) -> dict:

        role_prompts = {
            "market_agent": "You are a market research expert. Analyze market demand, competition, and customer segments.",
            "financial_agent": "You are a financial analyst. Estimate costs, revenue potential, break-even, and risks.",
            "logistics_agent": "You are an operations expert. Suggest supply chain, inventory, and staffing requirements.",
            "regulatory_agent": "You are a compliance expert. Suggest licenses, permits, and regulatory requirements."
        }

        system_prompt = f"""
        You are a {self.name} expert.
        Analyze the user request and return a SHORT structured output.
        Rules:
        - Maximum 3 bullet points
        - Each point ≤ 15 words
        - No paragraphs
        Return format:
        • Insight 1
        • Insight 2
        • Insight 3
        • Total summary
        """

        analysis = call_llm(system_prompt, context["input"])

        return {
            "agent_name": self.name,
            "analysis": analysis,
            "status": "completed"
        }