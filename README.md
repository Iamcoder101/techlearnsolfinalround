# TechLearn Final Round Project

An interactive full-stack coding exercise platform built with Node.js (Express), MongoDB, and Redis. Features user authentication, live code editing, and progress saving functionality.

---

## 🚀 Live Demo

[🔗 Live App Link (Render)]([https://your-live-deployment-link.com](https://techlearnsolfinalround.onrender.com))
https://techlearnsolfinalround.onrender.com

---

## 📁 Folder Structure

techlearnsolfinalround/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── data/
│ ├── redisClient.js
│ ├── server.js
│ └── .env (not uploaded)
│ ├── static/
│ └── protected


## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Redis (local installation or cloud Redis)

### 1. Clone the Repository


git clone https://github.com/your-username/techlearnsolfinalround.git
cd techlearnsolfinalround
2. Backend Setup

cd backend
npm install
Create a .env file in /backend:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start backend:npm start

🛠 Tech Stack
Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

Caching & Session: Redis

Authentication: JWT (email-based)

Deployment: [Your platform: Render, Vercel, etc.]

👨‍💻 Team Members
Ayesha -itsayesha66@gmail.com
Vedika -vedikasingh948@gmail.com

✅ Features
🔐 Secure sign-up / sign-in

🧑‍💻 Coding exercises with live editor

💾 Save & resume progress (Redis + Mongo)

📦 Clean structure & modular code

📡 RESTful API with protected routes
