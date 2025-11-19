# 🏠 HomeMate — Trusted Local Services

🔗 **Live Site:** [HomeMate](https://home-mate.netlify.app)  
👨‍💻 **Author:** [its-dev-naeem](https://github.com/its-dev-naeem) — md.abu.naeem786@gmail.com  

---

## 📖 Overview
**HomeMate** is a modern web application that connects users with trusted local service providers (electricians, plumbers, cleaners, etc.).  
Users can browse services, book appointments, and leave reviews, while service providers can manage their listings through a dedicated dashboard.

---

## ✨ Features
- 🔍 Search & filter services by category and price  
- 📅 Book appointments with local providers  
- ⭐ Leave ratings and reviews  
- 🔐 Firebase Authentication (Email/Google)  
- 🌓 Light/Dark mode toggle  
- 📱 Fully responsive UI  
- 🛠️ Provider dashboard with CRUD features  

---

## 🛠️ Tech Stack

| Section   | Technology |
|-----------|------------|
| Frontend  | React + Vite |
| Styling   | Tailwind CSS + DaisyUI |
| Routing   | React Router v7 |
| Icons     | React Icons + Lucide |
| Animation | Framer Motion |
| Auth + Backend | Firebase + MongoDB + Node.js / Express |

---

---

## ⚙️ Run on Local Machine

### ✅ Requirements
- Node.js (v16+)  
- Git  
- MongoDB Atlas / Local MongoDB  
- Firebase project  

---

## 🟩 1) Clone the Repository install packges

### Frontend
```bash
git clone https://github.com/its-dev-naeem/home-mate-client.git
cd home-mate-clientt
npm install
```
### Backend
```bash
git clone https://github.com/its-dev-naeem/home-mate-server.git
cd home-mate-server
npm install
```

## 🟩 2) Create .env file
### Frontend
```bash
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_API_BASE_URL=http://localhost:5000
```
### Backend
```brsh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```
## 🟩 3) Run the Projects
### Frontend 
```brsh
npm run dev
```
### Backend
```brsh
node index.js
```
## 🟩 4) Visit in Browser

- Frontend → http://localhost:5173
- Backend API → http://localhost:5000

## 🟩 5) Production Build

### Frontend 
```bresh
npm run build
```
---
## 🚑 Troubleshooting

| Issue   | Fix |
|-----------|------------|
| ❗ CORS error  | Add app.use(cors()) in backend |
| ❗ MongoDB error   | Add your IP → MongoDB Atlas IP Whitelist (0.0.0.0/0 for development) |
| ❗ Firebase not working   | All Vite env variables must start with VITE_ |
| ❗ Env not loading     | Restart server/client |

---

## 🙋 Contact
📧 Email: md.abu.naeem786@gmail.com 
💻 GitHub: [its-dev-naeem](https://github.com/its-dev-naeem)

✨ Built with ❤️ by Abu Naeem


