import json

def undo_last_action(supabase_client):
    # Fetch the last action from action_log
    response = supabase_client.table("action_log").select("*").order("created_at", desc=True).limit(1).execute()
    
    if not response.data:
        return {"status": "error", "message": "No actions to undo."}
        
    last_action = response.data[0]
    action_id = last_action["id"]
    table_name = last_action["table_name"]
    undo_payload = last_action["undo_payload"]
    
    # Process the undo payload
    if undo_payload.get("operation") == "delete_where_id":
        row_id = undo_payload.get("value")
        supabase_client.table(table_name).delete().eq("id", row_id).execute()
    else:
        # For DELETE or UPDATE, undo_payload is the full pre-mutation row object
        # We perform an UPSERT to restore the previous state
        supabase_client.table(table_name).upsert(undo_payload).execute()
        
    # Remove the action from the log after successfully undoing
    supabase_client.table("action_log").delete().eq("id", action_id).execute()
    
    return {"status": "success", "message": f"Undid action on table {table_name}"}

def redo_last_action(supabase_client):
    # Redo implementation would require a separate redo_log or similar.
    # For this hackathon, we only focus on undo_last_action as specified.
    pass
