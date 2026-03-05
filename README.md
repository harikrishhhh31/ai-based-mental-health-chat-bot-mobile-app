# MindCare AI: Full-Stack Mental Health Companion 🧘‍♂️💬

MindCare AI is a comprehensive, empathic mental health platform featuring a **React Native (Expo)** mobile application and a **Node.js/Express** backend. It leverages the **Google Gemini Pro API** to provide users with real-time, supportive AI conversations, mood tracking, and mindfulness resources.

---

## 🏗️ Project Architecture

The project is divided into two main components:

- **`/frontend`**: React Native mobile app built with Expo, using Expo Router for navigation and Zustand for state management.
- **`/backend`**: Node.js API using Express and MongoDB (Atlas), providing secure authentication, chat history persistence, and Gemini AI integration.

---

## ✨ Key Features

### Mobile Application (Frontend)
- **Empathic AI Chat:** Real-time, streaming-ready interface for deep conversations.
- **Mood Tracking:** Visual mood selector with daily logging.
- **Mindfulness Hub:** Access to curated stress-relief and breathing resources.
- **Secure Auth:** Integrated Login/Register flow with JWT persistence.
- **Premium UI:** Glassmorphism-inspired design with smooth animations and linear gradients.

### API & Engine (Backend)
- **AI Integration:** Custom-tuned Google Gemini Pro for mental health context.
- **Authentication:** Secure password hashing (Bcrypt) and JWT-based session management.
- **Database:** MongoDB Atlas integration for user profiles and chat session history.
- **Middleware:** Robust error handling, data validation, and protected routing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React Native (Expo SDK 54)
- **Navigation:** Expo Router (File-based)
- **State:** Zustand (Auth & Chat Stores)
- **Networking:** Axios with Interceptors
- **Icons:** Material Community Icons & Ionicons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose)
- **AI:** Google Gemini SDK
- **Security:** Helmet, CORS, Bcrypt, JSON Web Tokens (JWT)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (LTS)
- [Expo Go](https://expo.dev/expo-go) app on your phone.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.
- A [Google AI Studio](https://aistudio.google.com/) API Key.

### 2. Backend Setup
```bash
cd backend
npm install
```
**Configure `.env` in `/backend`:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
GEMINI_API_KEY=your_google_gemini_key
```
**Start Server:**
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
**Configure API Client in `/frontend/src/api/client.js`:**
Set your local IPv4 address (found via `ipconfig`):
```javascript
const BASE_URL = 'http://192.168.x.x:5000/api';
```
**Start App:**
```bash
npx expo start --clear
```

---

## 📁 Folder Structure

```text
.
├── backend/                # Node.js Express API
│   ├── src/
│   │   ├── controllers/    # Route logic (Auth, Chat)
│   │   ├── models/         # MongoDB Schemas (User, Session)
│   │   ├── routes/         # API Endpoint definitions
│   │   └── services/       # External integrations (Gemini)
│   └── server.js           # Entry point
├── frontend/               # React Native Expo App
│   ├── app/                # Expo Router pages
│   ├── src/
│   │   ├── screens/        # UI Screen components
│   │   ├── store/          # Zustand global state
│   │   └── api/            # Axios client
│   └── README.md           # Mobile-specific docs
└── .gitignore              # Root exclusion rules
```

## 🔒 Security & Privacy
The app uses industry-standard 256-bit encryption for data in transit and hashes all user passwords. Personal data is never stored in plain text, and AI conversations are session-isolated for privacy.

---
*Developed with care for a healthier mind. 🌿*
