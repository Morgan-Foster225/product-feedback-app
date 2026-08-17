# Product Feedback App

A full-stack feedback board where users can browse feature/bug suggestions, filter them by category, and submit new ones. Built as a graded project for AnnieCannons' "Product Feedback App — AI-Assisted Track" course.

**Live app:** https://productfeedbackapp-morgan.netlify.app
**API:** https://product-feedback-app-a6ds.onrender.com

## Tech stack

**Frontend**
- React 19 + Vite
- React Router
- Plain CSS (no UI framework)

**Backend**
- Express 5
- PostgreSQL (via `pg`)
- CORS restricted to the deployed frontend origin

**Deployment**
- Frontend: Netlify (SPA redirect via `public/_redirects`)
- Backend + DB: Render

## Project structure

```
.
├── src/            # React frontend (Vite root)
├── server/         # Express + Postgres API
│   ├── src/app.js         # routes + validation
│   ├── src/db.js          # Postgres pool
│   ├── src/migrate.js     # runs migrations
│   ├── src/seed.js        # seeds sample suggestions
│   └── src/migrations/    # SQL migration files
└── public/         # static assets, Netlify redirect rule
```

## API endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/get-all-suggestions` | All suggestions, newest first |
| GET | `/get-suggestions-by-category/:category` | Suggestions filtered by category (`UI`, `UX`, `Enhancement`, `Bug`, `Feature`) |
| POST | `/add-one-suggestion` | Create a suggestion (`title`, `category`, `description`) |

## Running locally

Requires Node and a local or hosted PostgreSQL database.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `server/.env` to your Postgres connection string (`PORT` and `FRONTEND_ORIGIN` default to `3001` and `http://localhost:5173`).

```bash
npm run migrate   # create the suggestions table
npm run seed      # optional: add sample data
npm run dev        # starts the API on http://localhost:3001
```

### 2. Frontend

From the project root, in a separate terminal:

```bash
npm install
cp .env.example .env
```

`VITE_API_BASE_URL` defaults to `http://localhost:3001`, matching the backend above.

```bash
npm run dev        # starts the app on http://localhost:5173
```

## Linting

```bash
npm run lint       # oxlint, run from root or server/
```
