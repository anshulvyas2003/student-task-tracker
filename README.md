# 📚 Student Task Tracker

A MERN stack application to manage daily internship and study tasks.
Built for JIET Open Innovations Labs - Internship Task 1.

---

## Features

- Add, edit, delete tasks
- Filter by status and priority
- Search tasks by title
- Dashboard showing Total, Pending, Completed, and Overdue counts
- Overdue task detection
- Responsive and animated UI
- Input validation on both frontend and backend

---

## Tech Stack

- **MongoDB Atlas** — cloud database
- **Express.js** — REST API
- **React.js** — frontend UI
- **Node.js** — server runtime

---

## Folder Structure

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/task-tracker.git
cd task-tracker
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

Start the server:
```bash
node index.js
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
npm start
```

The app will open at `http://localhost:3000`

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Backend port (default: 5000) |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (supports ?search, ?status, ?priority) |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

## Screenshots

> See `/screenshots` folder in the repository.

---

## AI Usage

Claude AI (Anthropic) was used to assist with:
- Generating boilerplate code structure
- Debugging configuration issues (MongoDB connection, package.json)
- Explaining MERN concepts during development

