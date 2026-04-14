from database.pinecone_client import index
from embeddings.embedder import get_embedding


def retrieve_memory(query):

    vector = get_embedding(query)

    results = index.query(
        vector=vector,
        top_k=3,
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