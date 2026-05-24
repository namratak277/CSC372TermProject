# Daily Diary — CSC372 Term Project

Daily Diary is a lightweight journaling app with user accounts, journal CRUD, habit tracking, and daily motivational quotes.

Demo video: https://uncg-my.sharepoint.com/:v:/r/personal/n_karki_uncg_edu/Documents/TermProjectDemo.mp4?csf=1&web=1&e=2SdPwX

---

## What this repo contains
- `frontend/` — Next.js application (UI)
- root — Express backend (`server.js`) and supporting routes/models

Environment (.env or platform envs) for backend (important):
- `PORT` (optional, default 4000)
- `DATABASE_URL` (Postgres connection string)
- `JWT_SECRET` (JWT signing secret)
- `SESSION_SECRET` (express-session secret)
- `FRONTEND_URL` (frontend origin, e.g. https://your-frontend.vercel.app — no trailing slash)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` (for OAuth)
- `NODE_ENV=production` (set in production)

Frontend environment (set in Vercel or local `.env.local` — `frontend/.env.local` is gitignored):

- `NEXT_PUBLIC_API_BASE` — full backend base URL (e.g. `https://your-backend.onrender.com`)
- `NEXT_PUBLIC_QUOTE_API` — optional quote endpoint

## Deployment notes (what I used)

- Backend: Render (service URL example `https://dailydiary-gxrn.onrender.com`)
- Frontend: Vercel (set Project Root Directory to `frontend`)

For Vercel:
- Set **Root Directory** to `frontend` (so Vercel detects Next.js correctly).
- Set Environment Variables before building: `NEXT_PUBLIC_API_BASE` to your backend URL.
- Install Command: `npm install`
- Build Command: `npm run build`

For Render (backend service):
- Create a Web Service and set `START` to `npm start` (or use the `npm run dev:backend` for staging).
- Set environment variables on Render: `DATABASE_URL`, `FRONTEND_URL` (no trailing slash), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`, `JWT_SECRET`, `SESSION_SECRET`, `NODE_ENV=production`.

Important: `FRONTEND_URL` must exactly match the origin Vercel uses (no trailing slash) so CORS and OAuth origins align.

---

## Recent fixes & troubleshooting (what I struggled with and how I resolved them)

This section documents problems encountered during deployment and the fixes applied — useful when debugging or onboarding.

- ERR_CONNECTION_REFUSED on `/api/auth/debug` (local): backend not running. Fix: run `npm install` then `npm run dev:backend` and verify with `curl http://localhost:4000/api/auth/debug`.

- `nodemon` missing: root `npm install` required (added to `devDependencies`).

- Vercel prerender build errors complaining about React hooks (`useState`/`useContext`) during SSR: caused by client-only code running at build-time. Fix: make pages and components that use browser-only hooks client-only using `next/dynamic(..., { ssr: false })` (applied to several pages and `Header` in `frontend/pages/_app.js`).

- CORS mismatch in production: backend sent `Access-Control-Allow-Origin` with a trailing slash because `FRONTEND_URL` had one. Fix: normalized `FRONTEND_URL` in `server.js` (strip trailing slash) so the header matches browser Origin exactly.

- Vercel not detecting Next.js or running wrong install commands: caused by having `next`/`react`/`react-dom` in repo root and by `vercel.json` containing root-level `cd frontend` install/build overrides. Fixes applied:
	- Removed `next`, `react`, and `react-dom` from root `package.json` so the `frontend/package.json` owns Next.
	- Removed `cd frontend` overrides from `vercel.json` and set the Vercel Project Root Directory to `frontend`.

- Committed `frontend/.env.local` with `NEXT_PUBLIC_API_BASE=http://localhost:4000` caused production builds to use localhost API. Fix: removed the tracked `frontend/.env.local` and added `frontend/.gitignore` to ignore local env files.

Lessons learned:

- Vercel builds are affected by both repository layout and dashboard settings, makesure the project root and env vars are set before building.
- Environment variables used by Next (`NEXT_PUBLIC_*`) are injected at build time — set them in Vercel before building production.
- Small differences (trailing slashes) in origin strings break CORS and OAuth redirects; normalize values in the server to be robust.
- When debugging failing builds, check both code (hook usage during SSR) and CI/deploy config (install/build commands, root directory).


## Files/locations I changed while stabilizing deployments

- `server.js` — normalize `FRONTEND_URL` and use it for CORS.
- `frontend/pages/_app.js` — load `Header` with `dynamic(..., { ssr: false })`.
- Multiple `frontend/pages/*.js` — exported pages as client-only using `dynamic(..., { ssr: false })` to avoid SSR hook errors.
- `vercel.json` — removed root-level `cd frontend` overrides and kept rewrites/env only.
- Root `package.json` — removed Next/React deps from root so frontend package owns them.
- Removed tracked `frontend/.env.local` and added `frontend/.gitignore`.

---

## Project Overview

Short structure summary for Daily Diary:

- `server.js` — Express backend entry (CORS, sessions, passport, route mounting).
- `package.json` (root) — backend scripts and helper scripts to run frontend tasks.
- `vercel.json` — Vercel rewrites and frontend env passthrough.
- `frontend/` — Next.js application (UI): pages, components, styles, and its own `package.json`.
- `auth/` — passport configuration and auth helpers.
- `routes/` — Express routers: `auth`, `journals`, `habits`, `quotes`.
- `controllers/` — controller logic used by routes.
- `models/` — DB model modules using `pg`.
- `scripts/` — small helper scripts (e.g., `seed.js`).
- Docs: `README.md`, `SETUP_GUIDE.md`, `CHECKLIST.md` (some may be removed).

Notes:
- Backend and frontend are split: frontend is a Next.js app under `frontend/` and must own Next/React dependencies.
- Environment variables for production must be set in Vercel (frontend) and Render (backend). `NEXT_PUBLIC_*` variables are baked at build time.

---

## File Purposes

This section lists the main files and what they do.

- `server.js`: Express app setup (CORS normalization, sessions, passport init, route mounting, DB init, error handler).
- `package.json` (root): backend dependencies and cross-root scripts (`npm --prefix frontend` used to call frontend commands).
- `vercel.json`: production rewrites for `/api/*` to backend and optional env keys for build.
- `auth/passport.js`: configures `passport-google-oauth20` strategy and serialization.
- `routes/auth.js`: auth endpoints: `/debug`, `/google`, `/google/callback`, `/login`, `/signup`.
- `controllers/authController.js`: handlers for signup/login and token creation.
- `models/*.js`: DB wrappers around `pg` Pool for users, journals, habits, quotes.
- `routes/journals.js` + `controllers/journalController.js` + `models/journalModel.js`: CRUD for journal entries.
- `frontend/package.json`: Next.js app deps and scripts.
- `frontend/pages/*`: Next pages — `_app.js` (global layout), `index.js`, `login.js`, `journals/*`, `reset/*`, etc.
- `frontend/components/*`: UI components (`Header.js`, `JournalEntry.js`, `Quote.js`).
- `frontend/styles/*`: CSS for the frontend.
- `scripts/seed.js`: seeds sample data for development.

---

## Restart scaffold

If you were to restart the project, create these minimal files and contents.

1) `package.json` (root) — scripts and backend deps

```json
{
	"name": "daily-diary",
	"private": true,
	"scripts": {
		"dev:backend": "nodemon server.js",
		"dev:frontend": "npm --prefix frontend run dev",
		"dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
		"start": "node server.js",
		"build": "npm --prefix frontend run build"
	}
}
```

2) `server.js` (minimal)

```js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const FRONTEND = (process.env.FRONTEND_URL||'http://localhost:3000').replace(/\/+$/,'');
app.use(cors({ origin: FRONTEND, credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/journals', require('./routes/journals'));

app.listen(process.env.PORT||4000, ()=> console.log('listening'));
```

3) `auth/passport.js` — configure GoogleStrategy and serialize user. See passport docs.

4) `routes/auth.js` — router that exposes `/debug`, `/google`, `/google/callback`, `/login`, `/signup`.

5) `models/userModel.js` — a tiny wrapper around `pg` Pool with `findById`, `create`, and `findOrCreateFromGoogle`.

6) `frontend/` — create Next app with `npx create-next-app frontend` and add pages/components listed above.

7) `.env.example` — include `DATABASE_URL`, `JWT_SECRET`, `SESSION_SECRET`, `FRONTEND_URL`, `GOOGLE_*` keys.

Notes: use small modules (routes → controllers → models) and keep `NEXT_PUBLIC_*` env vars set in Vercel before building.

---

## Deploy notes (quick checklist)

- Frontend (Vercel):
	- Set Project Root Directory = `frontend`.
	- Set `NEXT_PUBLIC_API_BASE` to your backend URL before building.
	- Install Command: `npm install`
	- Build Command: `npm run build`

- Backend (Render):
	- Set `START` to `npm start`.
	- Env vars: `DATABASE_URL`, `FRONTEND_URL` (no trailing slash), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`, `JWT_SECRET`, `SESSION_SECRET`, `NODE_ENV=production`.

Important tips:
- `NEXT_PUBLIC_*` vars are baked at build time — set them in Vercel.
- Normalize `FRONTEND_URL` in `server.js` to avoid trailing slash CORS problems.
- Remove committed `.env.local` files from repo to prevent local values leaking into production builds.


