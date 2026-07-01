# Issue Tracker - Backend

REST API for the Issue Tracker application built using Node.js, Express, MySQL, and JWT Authentication.

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Express Validator

## Prerequisites

- Node.js (v18 or above)
- MySQL Server
- npm

## Installation

```bash
git clone <backend-repository-url>
cd backend
npm install
```

## Environment Variables

Create a `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=issue_tracker

JWT_SECRET=your_secret_key
```

## Database Setup

1. Create a MySQL database.

```sql
CREATE DATABASE issue_tracker;
```

2. Execute the SQL scripts inside the `db` folder.

- schema.sql
- seed.sql (optional)

## Run the Server

```bash
npm run dev
```

or

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

## API Base URL

```
http://localhost:5000/api
```

## Features

- User Authentication
- JWT Authorization
- Issue CRUD
- Issue Assignment
- Status Management
- Comments
- Dashboard Statistics
- Input Validation
- Error Handling

## Folder Structure

```
src/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── routes/
 ├── services/
 ├── validators/
 ├── db/
 ├── app.js
 └── server.js
```


