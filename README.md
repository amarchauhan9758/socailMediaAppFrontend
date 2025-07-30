# 📝 Full Stack Social Post App

This is a full-stack web application where users can sign up, log in, create posts, view all posts, update profile and search posts. It mimics core social platform features in a simplified way.

---

## 🚀 Features

- 🔐 **Authentication**

  - User Sign Up
  - User Login
  - Secure password hashing (using bcrypt)
  - JWT-based session handling

- 🏠 **Home Page**

  - Displays all user posts
  - Posts are sorted by most recent
  - Each post shows:
    - Owner name
    - Time since created
    - Post title and content

- ✍️ **Create Post**

  - Authenticated users can create new posts
  - Posts contain a title and content

- 🔍 **Search Post**

  - Real-time search functionality
  - Filters posts by matching title or content text

- 💬 **UI Components**
  - Responsive and mobile-friendly layout
  - Like/Comment/Share/Report buttons (static for now, UI only)
  - Custom loader/spinner for actions
  - Reusable modal component
  - Navigation bar with logout/settings dropdown

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (JSON Web Tokens), bcrypt
- **Tooling:** Vite, dotenv

---

## ⚙️ Local Setup Instructions

📦 Prerequisites
Node.js (v16 or later)

MongoDB Atlas account (or local MongoDB)

Yarn or npm

Git

## ✅ 1. Clone the Repository

bash
Copy
Edit
git clone https://github.com/amarchauhan9758/socailMediaAppFrontend
cd social-post-app

## ✅ 2. Setup Frontend

cd ../frontend
🔧 Install Dependencies

npm install

# or

yarn install
🗝️ Create .env file

touch .env
Add:

## 3 VITE_BASE_URL=http://localhost:7777

▶️ Run Frontend Dev Server

npm run dev

# or

yarn dev
It will start on http://localhost:5173.
