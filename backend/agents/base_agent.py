class BaseAgent:
    def __init__(self, name: str, intent: str, request_id: str):
        self.name = name
        self.intent = intent
        self.request_id = request_id

    def metadata(self) -> dict:
        return {
            "agent_name": self.name,
            "intent": self.intent,
            "request_id": self.request_id,
            "status": "initialized"
        }
    async def execute(self, context: dict) -> dict:
        """
        Every agent must override this method.
        """
        raise NotImplementedError(
            f"{self.name} must implement execute() method"
        )
