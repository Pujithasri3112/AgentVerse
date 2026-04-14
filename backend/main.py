from fastapi import FastAPI
from pydantic import BaseModel
from schemas import AnalyzeRequest
from handlers.processor import process_input
from handlers.handle_request import handle_request
from agents.orchestrate import orchestrate
from step4_agent_creator import create_dynamic_agents
from database.rub_step5 import run_step5
from database.pinecone_client import search_memory
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()


app = FastAPI()

users = {}

class User(BaseModel):
    name: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

@app.post("/signup")
def signup(user: User):
    if user.email in users:
        raise HTTPException(status_code=400, detail="User already exists")
    
    users[user.email] = user.password
    return {"message": "User created"}

@app.post("/login")
def login(user: LoginUser):
    if user.email not in users:
        raise HTTPException(status_code=404, detail="User not found")
    
    if users[user.email] != user.password:
        raise HTTPException(status_code=401, detail="Wrong password")

    return {"access_token": "dummy_token"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    try:

        user_query = request.message

        memory = search_memory(user_query)

        # CASE 1: Almost same query
        if memory and memory[0]["score"] > 0.9:
            return {
                "source": "memory",
                "message": "Exact result from memory",
                "response": memory[0]["answer"]
            }

        context = None

        # CASE 2: Similar query (give context to agents)
        if memory and memory[0]["score"] > 0.7:
            context = memory

        step1_output = process_input(user_query)

        step2_output = handle_request(step1_output)

        step3_output = orchestrate(step2_output)
        
        print("MEMORY CONTEXT:", context)
        # pass context to agents
        step4_output = await create_dynamic_agents(
            step3_output,
            step2_output["cleaned_message"],
            context
        )

        step5_output = run_step5(
            step3_output,
            step4_output["results"],
            step2_output["cleaned_message"]
        )

        return {
            "step_1": step1_output,
            "step_2": step2_output,
            "step_3": step3_output,
            "step_4": step4_output,
            "step_5": step5_output,
            "agents": step4_output["results"]
        }

    except Exception as e:
        print("ERROR OCCURRED:", e)
        return {"error": str(e)}