# Daily Diary — CSC372 Term Project

Demo link: https://uncg-my.sharepoint.com/:v:/r/personal/n_karki_uncg_edu/Documents/TermProjectDemo.mp4?csf=1&web=1&e=2SdPwX

This repository is a scaffold for "Daily Diary", an application for busy students and employees to quickly journal their thoughts and get motivational quotes.

Core features:
- Login / logout
- Sign up
- Create, edit, delete journal entries
- Get motivational quotes via an external API

Tech stack:
- Frontend: Next.js (in `frontend/`)
- Backend: Node.js + Express (in `backend/`)
- Database: Neon
- Deployment: github (frontend) and a node host for backend

Quick start (development):

1. Start backend
npm install 
npm run dev

The backend runs on `http://localhost:4000` and the frontend on `http://localhost:3000` by default. The backend currently uses an in-memory store; a PostgreSQL integration can be added next.

Database (Neon/Postgres)
- This project can use Neon (serverless Postgres). Create a Neon project and copy the `DATABASE_URL` connection string.
- Put the connection string into a `.env` file at repo root with the key `DATABASE_URL`.

Example `.env`:
```dotenv
PORT=4000
DATABASE_URL=postgres://<user>:<password>@<host>:5432/<database>
JWT_SECRET=replace-with-secret
FRONTEND_URL=http://localhost:3000
```
When using Neon or other hosted Postgres on Vercel, set the `DATABASE_URL` environment variable in the Vercel project settings.

Frontend environment
- Create `frontend/.env` (you can copy `frontend/.env.example`) and set:
	- `NEXT_PUBLIC_API_BASE` — backend base URL (e.g. `http://localhost:4000`)
	- `NEXT_PUBLIC_QUOTE_API` — optional external quote API (defaults to `https://nodejs-quoteapp.herokuapp.com/quote`).

Quotes in the UI
- The app shows a motivational quote at the top of the Journals page. The `Quote` component uses `NEXT_PUBLIC_QUOTE_API` by default to fetch quotes directly from the external service. If that API has CORS restrictions, set `NEXT_PUBLIC_QUOTE_API` to your backend proxy (for example `${NEXT_PUBLIC_API_BASE}/api/quotes/random`).


Core Features:
• Login/log out functionality
• Sign up option
• Create, edit, delete journal entries
• Get motivational quotes through Random motivational quotes API
Technologies and tools:
• Frontend: Next.js
• Backend: Node.js, Express
• Database: PostgreSQL
• APIs: Random motivational quotes API
• Deployment: Vercel
Wireframes/Sketches of the App layout
