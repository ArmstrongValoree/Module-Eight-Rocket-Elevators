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