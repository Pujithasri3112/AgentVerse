from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    message: str

class AnalyzeResponse(BaseModel):
    request_id: str
    clean_message: str
    status: str
