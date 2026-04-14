import os
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv()

model = SentenceTransformer("all-MiniLM-L6-v2")

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index(
    host="https://agentverse-byf7ewd.svc.aped-4627-b74a.pinecone.io"
)

def store_embedding(request_id, query, answer):

    embedding = model.encode(query).tolist()

    index.upsert([
        (
            request_id,
            embedding,
            {
                "query": query,
                "answer": answer
            }
        )
    ])
# SEARCH MEMORY
def search_memory(query):

    embedding = model.encode(query).tolist()

    results = index.query(
        vector=embedding,
        top_k=5,
        include_metadata=True
    )

    memories = []

    for match in results["matches"]:

        metadata = match.get("metadata", {})

        memories.append({
            "score": match.get("score", 0),
            "query": metadata.get("query"),
            "answer": metadata.get("answer")
        })

    return memories