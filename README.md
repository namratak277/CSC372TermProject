# Daily Diary — CSC372 Term Project

This repository is a scaffold for "Daily Diary", an application for busy students and employees to quickly journal their thoughts and get motivational quotes.

Core features:
- Login / logout
- Sign up
- Create, edit, delete journal entries
- Get motivational quotes via an external API

Tech stack:
- Frontend: Next.js (in `frontend/`)
- Backend: Node.js + Express (in `backend/`)
- Database: PostgreSQL (planned)
- Deployment: Vercel (frontend) and a node host for backend

Quick start (development):

1. Start backend

```powershell
cd backend
npm install
npm run dev
```

2. Start frontend

```powershell
cd frontend
npm install
npm run dev
```

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

See `README.backend.md` and `frontend/README.md` for more details.
