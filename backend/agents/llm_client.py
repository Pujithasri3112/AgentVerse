import os
import requests
import json

HF_API_KEY = os.getenv("HF_API_KEY")
ROUTER_URL = "https://router.huggingface.co/v1/chat/completions"
MODEL_NAME = "meta-llama/Llama-3.1-8B-Instruct"


def call_llm(system_prompt: str, user_input: str):

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.5
    }

    response = requests.post(
        ROUTER_URL,
        headers=headers,
        json=payload,
        timeout=120
    )

    data = response.json()
    return data["choices"][0]["message"]["content"]