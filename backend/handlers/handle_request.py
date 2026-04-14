import uuid
from datetime import datetime

def handle_request(step1_output: dict) -> dict:
    """
    Step-2: Request Handler
    - Accepts Step-1 structured output
    - Generates request metadata
    """

    if not step1_output.get("received"):
        raise ValueError("Invalid input from step-1")

    clean_message = step1_output["user_message"]

    return {
        "request_id": str(uuid.uuid4()),
        "cleaned_message": clean_message,
        "status": "accepted",
        "timestamp": datetime.utcnow().isoformat()
    }