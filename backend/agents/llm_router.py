import os
import requests
import json

HF_API_KEY = os.getenv("HF_API_KEY")

ROUTER_URL = "https://router.huggingface.co/v1/chat/completions"
MODEL_NAME = "meta-llama/Llama-3.1-8B-Instruct"


SYSTEM_PROMPT = """
You are an AI system that analyzes a user's idea
and decides which specialized agents are needed.

Return STRICT JSON only.

Example:
{
    "intent": "idea_analysis",
    "agents": ["idea_clarity_agent", "market_agent", "risk_agent"]
}
"""

def ai_route_decision(message: str) -> dict:
    if not HF_API_KEY:
        return fallback_decision(message, reason="HF_API_KEY missing")

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": message}
        ],
        "temperature": 0.3
    }

    try:
        response = requests.post(
            ROUTER_URL,
            headers=headers,
            json=payload,
            timeout=20
        )

        if response.status_code != 200:
            return fallback_decision(
                message,
                reason=f"HF error {response.status_code}"
            )

        data = response.json()
        content = data["choices"][0]["message"]["content"]

        # LLM MUST return JSON
        return json.loads(content)

    except Exception as e:
        return fallback_decision(message, reason=str(e))


def fallback_decision(message: str, reason: str) -> dict:
    """
    Safe fallback if LLM fails
    """
    return {
        "intent": "general_query",
        "agents": ["general_agent"],
        "fallback": True,
        "reason": reason
    }
