from step5_aggregrator.aggregrator import aggregate_agent_outputs
from database.postgres_client import store_request
from database.pinecone_client import store_embedding
from database.pinecone_client import store_embedding, search_memory


def run_step5(step3, agent_results, query):
    
    memory = search_memory(query)

    # if exact same query already exists
    if memory and memory[0]["score"] > 0.9:
        return memory[0]["answer"]
    
    final_output = aggregate_agent_outputs(agent_results)

    data = {
        "request_id": step3["request_id"],
        "query": query,
        "intent": step3["intent"],
        "output": final_output
    }

    store_request(data)

    store_embedding(step3["request_id"], 
                    query,
                    final_output
                    )

    return final_output