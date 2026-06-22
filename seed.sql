-- Supabase Seed Script for ChatMaster

-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: inventory (Example dataset for demoing)
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name TEXT NOT NULL,
    category TEXT,
    price NUMERIC(10, 2),
    stock_quantity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: conversation_memory (Agent state persistence)
CREATE TABLE conversation_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: action_log (Command pattern log for Undo/Redo)
CREATE TABLE action_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    action_type TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    undo_payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: user_profiles (For presence and real-time collaboration)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    avatar_url TEXT,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Explicitly add Realtime publication for tables
-- This ensures that Supabase Realtime emits change events to subscribed clients.
ALTER PUBLICATION supabase_realtime ADD TABLE inventory, conversation_memory, action_log, user_profiles;

-- Enable Row Level Security (RLS) on tables (optional for local dev, but good practice)
-- Since this is an AI agent backend leveraging the SERVICE_ROLE key, 
-- it can bypass RLS, but frontend clients should be restricted if querying directly.
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create default policies allowing public read access (for demo purposes)
CREATE POLICY "Public Read Access" ON inventory FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON conversation_memory FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON action_log FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON user_profiles FOR SELECT USING (true);

-- Create some dummy data
INSERT INTO inventory (product_name, category, price, stock_quantity) VALUES
('Quantum Keyboard', 'Electronics', 129.99, 45),
('Ergonomic Mouse', 'Electronics', 59.99, 120),
('Standing Desk', 'Furniture', 499.00, 15);
