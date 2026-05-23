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

