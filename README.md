# Rocket Elevators Dashboard

An internal admin dashboard for the Rocket Elevators company. Provides authenticated access to agent management and transaction management with data visualization.

## Features

- **Authentication** — Cookie-based session login with protected routes
- **Agent Management** — View, search, create, update, and delete agents
- **Transaction Management** — Full CRUD for transactions with Chart.js data visualization
- **Protected routes** — All management pages require an active session

## Tech Stack

**Client**
- React 19 + Vite
- React Bootstrap 5
- Chart.js + react-chartjs-2
- React Router v7

**Server**
- Node.js + Express
- MongoDB + Mongoose
- Cookie-based session authentication

## Project Structure

```
client/     React frontend (Vite)
server/     Express API + MongoDB connection
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB instance)

### Server Setup

```bash
cd server
npm install
```

Create `server/.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

```bash
npm start
```

### Client Setup

```bash
cd client
npm install
```

Create `client/.env`:

```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

## Live Demo

Deployed on Render: https://module-eight-rocket-elevators.onrender.com/login

**Demo credentials**
- Email: `demo@rocketelevators.com`
- Password: `password123`

> Render free-tier services spin down after inactivity. The first request may take 30–60 seconds to wake up.

## Portfolio Updates vs. Original Assignment

This project was originally built as a Module 8 assignment focused on MERN stack fundamentals. The following changes were made for portfolio deployment:

| Change | Why |
|--------|-----|
| Replaced plaintext password storage with **bcrypt hashing** | Passwords must never be stored in plaintext — this is a baseline production security requirement |
| Added `bcrypt.compare` to session login | Consistent with the hash-on-create change above |
| Removed hardcoded `localhost` from CORS fallback | In production `CLIENT_URL` is always set; the fallback was masking a misconfiguration |
| Created `.env.example` for both server and client | Makes the repo usable by others without exposing real credentials |
| Fixed `Alert` component to respect the `show` prop | The component always rendered regardless of state, causing a success toast to appear on every page load |
| Created `client/.env.production` pointing to the Render API | The dev `.env` pointed to `localhost` — login silently failed in production |
| Removed stale "Demo Mode" placeholder text from login page | Left over from early development; misleading in a production context |

## API Overview

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/session` | — | Login |
| GET | `/session/validate_token` | — | Validate session |
| GET | `/agents` | ✓ | Get all agents |
| POST | `/agents` | ✓ | Create agent |
| PUT | `/agents/:id` | ✓ | Update agent |
| DELETE | `/agents/:id` | ✓ | Delete agent |
| GET | `/transaction-data` | ✓ | Get all transactions |
| POST | `/transaction` | ✓ | Create transaction |
| DELETE | `/transaction/:id` | ✓ | Delete transaction |