# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Frontend (Next.js)
```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
```

### Backend (FastAPI)
```bash
python -m venv venv && source venv/bin/activate  # Create/activate virtual env
pip install -r requirements.txt                   # Install Python dependencies
uvicorn api.index:app --reload --host 0.0.0.0 --port 8000  # Start dev server
```

### Vercel Deployment
```bash
vercel deploy        # Deploy to preview
vercel --prod        # Deploy to production
```

## Architecture

This is a lead capture chatbot platform with a Next.js 14 frontend and Python FastAPI backend, using Google Gemini AI for conversational lead qualification.

### Frontend Structure
- **App Router** (`app/`): Next.js 14 pages using the App Router pattern
- **Layout** (`app/layout.tsx`): Root layout includes Navbar, Footer, and ChatWidget globally
- **Components** (`components/`): React components organized by feature (layout/, chat/)
- **Path aliases**: Use `@/*` for imports from project root (configured in tsconfig.json)

### Backend Structure
- **Single file API** (`api/index.py`): All FastAPI endpoints in one file
- **Mangum adapter**: Wraps FastAPI for Vercel serverless deployment
- **Data persistence**:
  - SQLite (`chat_history.db`): Stores all chat messages
  - Excel (`leads_locales.xlsx`): Stores captured leads with timestamps

### Key Integration Pattern
The ChatWidget (`components/chat/ChatWidget.tsx`) communicates with the backend:
1. Sends messages to `/api/chat` with conversation history
2. Backend passes conversation to Gemini with system instruction for lead capture
3. When Gemini detects all 3 lead fields (nombre, email, empresa), it outputs `LEAD_CAPTURED:{json}`
4. Backend parses this pattern, strips it from response, returns `lead_captured` object
5. Frontend auto-saves lead by calling `/api/lead`

### API Endpoints
- `GET /api/health` - Health check
- `POST /api/chat` - Chat with Gemini (accepts message + history, returns response + optional lead_captured)
- `POST /api/lead` - Save lead to Excel (nombre, email, empresa)

## Configuration

- **Tailwind**: Custom colors use `primary-*` and `neutral-*` naming
- **TypeScript**: Strict mode enabled
- **Vercel**: Routes `/api/*` to `api/index.py` via `vercel.json`

## Slash Commands

### `/test-deploy`
Verifica que el deployment funciona correctamente: health check, endpoints, CORS headers, accesibilidad del frontend.

### `/test-leads`
Testea el flujo completo de captura de leads: simula conversación multi-turn, verifica patrón `LEAD_CAPTURED:{json}`, persistencia y edge cases.

## Skills

### `gemini-api`
Documentación actualizada de Google Gemini API (Enero 2026). Incluye setup, modelos, Interactions API, multimodal, function calling, embeddings y pricing.

**Importante**: El proyecto actualmente usa el SDK legacy (`google.generativeai`) con modelo `gemini-flash-latest`. La skill documenta el SDK actual (`google-genai`) y modelos recomendados (`gemini-2.5-flash`, `gemini-2.5-pro`).

## Hooks

### `Stop`
Reproduce sonido `Glass.aiff` cuando el asistente termina de responder (notificación audible).
