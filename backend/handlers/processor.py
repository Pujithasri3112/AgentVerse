def process_input(message: str) -> dict:
    """
    Step-1: Input Processor
    - Validates input
    - Normalizes message
    - Confirms receipt
    """

    if not message or not message.strip():
        return {
            "received": False,
            "user_message": "",
            "error": "Empty input received"
        }

    cleaned_message = message.strip()

    return {
        "received": True,
        "user_message": cleaned_message
    }

