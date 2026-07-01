# Issue Tracker System

A full-stack issue tracking application with user authentication, issue management, comments, and a dashboard.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MySQL, JWT, bcrypt, mysql2

## Project Structure

```
issue-tracker/
├── backend/          # Express REST API
└── frontend/         # React app (Phase 6+)
```

## Backend Setup (Phase 1)

### Prerequisites

- Node.js 18+
- MySQL 8+

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials and a secure `JWT_SECRET`.

### 3. Create the database

Run the schema script against your MySQL server:

```bash
mysql -u root -p < src/db/schema.sql
```

Or paste the contents of `backend/src/db/schema.sql` into your MySQL client.

### 4. Start the server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The API runs at `http://localhost:5000`.

### 5. Verify

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{ "status": "ok", "message": "API is running" }
```

## API Endpoints (planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/users` | List users |
| GET/POST | `/api/issues` | List / create issues |
| GET/PUT/DELETE | `/api/issues/:id` | Issue CRUD |
| GET/POST | `/api/issues/:id/comments` | Comments |
| GET | `/api/dashboard/stats` | Issue counts by status |

## Build Phases

1. ✅ Backend scaffold, DB schema, env config
2. ✅ Auth (register, login, JWT middleware)
3. ✅ Issues CRUD + assignment + status
4. Comments
5. Dashboard stats endpoint
6. Frontend auth + routing
7. Issue list/detail/create/edit UI
8. Comments UI + dashboard page
