# ChatMaster Ecosystem

A stateful AI agent ecosystem built for a national hackathon.

## Tech Stack
- **Backend**: FastAPI, `google-antigravity` (Agent Orchestration), `google-genai`
- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui, CopilotKit
- **Database**: Supabase (PostgreSQL, Realtime)

## Setup Instructions

### 1. Database (Supabase)
1. Create a new Supabase project.
2. Run the `seed.sql` script in the SQL Editor to initialize the tables, RLS policies, and Realtime publications.
3. Note your Supabase URL, Service Role Key, and Anon Key.

### 2. Environment Variables
Create `.env` files in both `frontend/` and `backend/`.

**Backend (`backend/.env`)**:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (`frontend/.env.local`)**:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Running Locally
Using Docker Compose:
```bash
docker-compose up --build
```

Or manually:
**Backend**:
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```
