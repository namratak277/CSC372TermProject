# Daily Diary — CSC372 Term Project

Demo link: https://uncg-my.sharepoint.com/:v:/r/personal/n_karki_uncg_edu/Documents/TermProjectDemo.mp4?csf=1&web=1&e=2SdPwX

Daily Diary is a fast, lightweight journaling application designed for busy students and employees to quickly record their thoughts and stay motivated with daily inspirational quotes.

Features
Authentication
* Sign up for a new account
* Log in / Log out with secure JWT authentication

Journal Management
* Create new journal entries
* Edit existing entries
* Delete entries
* View all journal entries in a clean UI

Motivational Quotes
* Tried to use external api

Tools and web used

Frontend:
* Next.js
* Deployed on Vercel

Backend:
* Node.js and Express
* Authentication using JWT
* Deployed on a Node hosting provider (Render, Railway, Fly.io, etc.)

Database:
* PostgreSQL using Neon

External API:
* Random Motivational Quotes API

REPOSITORY STRUCTURE

/frontend    – Next.js client
/backend     – Express server
.env         – Root environment config


SETUP INSTRUCTIONS
1. Clone the repository:

git clone <your-repo-url>
cd daily-diary

2. BACKEND SETUP (Express)
cd backend
npm install
npm run dev

Backend runs on:
[http://localhost:4000](http://localhost:4000)

Create a .env file at the root of the repo:
PORT=4000
DATABASE_URL=postgres://<user>:<password>@<host>:5432/<database>
JWT_SECRET=replace-with-secret
FRONTEND_URL=[http://localhost:3000](http://localhost:3000)

Using Neon:
* Create a Neon project
* Copy the connection string
* Paste it into DATABASE_URL

3. FRONTEND SETUP (Next.js)
cd frontend
npm install
npm run dev

Deployed  URLS
Frontend (Vercel): https://csc-372-term-project.vercel.app/
Backend: https://csc372termproject-production.up.railway.app/

Database

users:
* id (primary key)
* email
* password_hash
* created_at

journals:
* id (primary key)
* user_id (foreign key → users.id)
* title
* content
* created_at
* updated_at

Design tool

Frontend (Next.js)
Backend (Express)
Database (PostgreSQL + Neon)

Challanges
* Trying to use an external API
* Small changes to the code would break the entire project
* Authentication and connecting it to the database
* Getting the frontend and backend to worktogether 

Learning Outcomes
* Understanding of full-stack architecture
* Working with REST APIs
* Authtication methods and applications
* Deploying frontend and backend separately
* Creating and manipulating databases
* Git

Future ideas
* Tagging or categories for journal entries
* Add images or media to entries
* Dark mode
* Mobile app version
