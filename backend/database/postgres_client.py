import psycopg2


def store_request(data):

    conn = psycopg2.connect(
        host="localhost",
        database="agentverse_db",
        user="postgres",
        password="yourpassword",
        port=5432
    )

    cur = conn.cursor()

    query = """
    INSERT INTO requests
    (request_id, user_query, intent, final_output)
    VALUES (%s,%s,%s,%s)
    """

    cur.execute(query, (
        data["request_id"],
        data["query"],
        data["intent"],
        data["output"]
    ))

    conn.commit()

    cur.close()
    conn.close()