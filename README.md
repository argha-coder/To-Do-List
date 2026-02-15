# MERN To-Do App with Authentication

A full-stack implementation of a To-Do application using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Secure register and login using JWT and Bcrypt.
- **Private Todos**: Each user has their own private list of tasks.
- **Dashboard**: Add, view, delete, and toggle completion status of todos.
- **Clean UI**: Minimalist design using Tailwind CSS.
- **Responsive**: Works on desktop and mobile.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT.

## Setup Instructions

### Prerequisites

- Node.js installed.
- MongoDB installed and running locally on default port (`27017`).

### 1. Backend Setup

```bash
cd server
npm install
# Create .env file with PORT and MONGO_URI (already created)
npm run start
# Server runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

## Folder Structure

```
/client       # React Frontend
  /src
    /components
    /context
    /pages
/server       # Node.js Backend
  /config
  /controllers
  /middleware
  /models
  /routes
```
