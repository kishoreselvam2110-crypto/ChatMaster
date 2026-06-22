def perform_crud(supabase_client, table: str, action: str, data: dict = None, row_id: str = None):
    if action == "INSERT":
        # Insert record
        response = supabase_client.table(table).insert(data).execute()
        inserted_row = response.data[0]
        
        # Log for undo
        undo_payload = {"operation": "delete_where_id", "value": inserted_row["id"]}
        supabase_client.table("action_log").insert({
            "table_name": table,
            "action_type": "INSERT",
            "undo_payload": undo_payload
        }).execute()
        
        return inserted_row
        
    elif action == "UPDATE":
        # Fetch pre-mutation row
        old_row_response = supabase_client.table(table).select("*").eq("id", row_id).execute()
        old_row = old_row_response.data[0] if old_row_response.data else None
        
        if not old_row:
            return {"error": "Row not found"}
            
        # Perform update
        response = supabase_client.table(table).update(data).eq("id", row_id).execute()
        
        # Log for undo
        supabase_client.table("action_log").insert({
            "table_name": table,
            "action_type": "UPDATE",
            "undo_payload": old_row
        }).execute()
        
        return response.data[0]
        
    elif action == "DELETE":
        # Fetch pre-mutation row
        old_row_response = supabase_client.table(table).select("*").eq("id", row_id).execute()
        old_row = old_row_response.data[0] if old_row_response.data else None
        
        if not old_row:
            return {"error": "Row not found"}
            
        # Perform delete
        response = supabase_client.table(table).delete().eq("id", row_id).execute()
        
        # Log for undo
        supabase_client.table("action_log").insert({
            "table_name": table,
            "action_type": "DELETE",
            "undo_payload": old_row
        }).execute()
        
        return {"status": "deleted"}
        
    return {"error": "Invalid action"}
