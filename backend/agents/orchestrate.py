from agents.llm_router import ai_route_decision

def orchestrate(step2_output: dict) -> dict:
    message = step2_output["cleaned_message"]

    try:
        routing = ai_route_decision(message)
    except Exception as e:
        return {
            "request_id": step2_output["request_id"],
            "status": "orchestrator_failed",
            "error": str(e)
        }
    return {
        "request_id": step2_output["request_id"],
        "intent": routing.get("intent"),
        "agents": routing.get("agents", []),
        "status": "routed"
    }
