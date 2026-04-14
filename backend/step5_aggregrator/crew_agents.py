import os
from crewai import Agent, LLM

llm = LLM(
    model="huggingface/meta-llama/Llama-3.1-8B-Instruct",
    api_key=os.getenv("HF_API_KEY"),
    temperature=0.7
)

aggregator_agent = Agent(
    role="Aggregation Specialist",
    goal="Combine outputs from different agents into one final report",
    backstory="Expert AI analyst skilled at merging insights from multiple sources.",
    llm=llm,
    verbose=True
)