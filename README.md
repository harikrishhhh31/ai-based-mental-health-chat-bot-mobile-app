
# MindCare AI

MindCare AI is a full-stack mobile application designed to provide conversational mental health support, mood tracking, and mindfulness resources.
The system consists of a **React Native mobile client** and a **Node.js/Express backend API** integrated with **Google Gemini** for conversational responses.

The backend manages authentication, data persistence, and AI communication, while the mobile client provides the user interface and handles user interaction.

---

# System Architecture

The repository contains two main modules:

| Module      | Description                                       |
| ----------- | ------------------------------------------------- |
| `frontend/` | React Native mobile application built with Expo   |
| `backend/`  | REST API built with Node.js, Express, and MongoDB |

The mobile client communicates with the backend through HTTP requests.
The backend processes requests, interacts with the database, and sends prompts to the Gemini API when AI responses are required.

---

# Features

## Mobile Client

* Conversational interface for interacting with the AI assistant
* Mood logging with simple daily tracking
* Access to basic mindfulness and breathing resources
* User authentication (login and registration)
* Persistent login using JWT tokens
* Mobile UI built with React Native components and Expo libraries

## Backend API

* RESTful API built with Express
* Integration with Google Gemini for AI-generated responses
* MongoDB database for storing users and chat sessions
* Password hashing using bcrypt
* JWT authentication and protected routes
* Middleware for request validation and error handling

---

# Technology Stack

## Frontend

| Component        | Technology                         |
| ---------------- | ---------------------------------- |
| Framework        | React Native (Expo)                |
| Navigation       | Expo Router                        |
| State Management | Zustand                            |
| Networking       | Axios                              |
| Icons            | Material Community Icons, Ionicons |

## Backend

| Component      | Technology                |
| -------------- | ------------------------- |
| Runtime        | Node.js                   |
| Framework      | Express                   |
| Database       | MongoDB Atlas             |
| ORM            | Mongoose                  |
| AI Integration | Google Gemini API         |
| Security       | bcrypt, JWT, Helmet, CORS |

---

# Setup

## Prerequisites

Install the following before running the project:

* Node.js (LTS recommended)
* Expo Go mobile application
* MongoDB Atlas account
* Google AI Studio API key

---

# Backend Setup

Navigate to the backend directory:

```
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:

```
node server.js
```

The API will run on:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to the frontend directory:

```
cd frontend
npm install
```

Update the API base URL in:

```
frontend/src/api/client.js
```

Example:

```javascript
const BASE_URL = "http://192.168.x.x:5000/api";
```

Start the Expo development server:

```
npx expo start --clear
```

Scan the QR code using Expo Go to run the application.

---

# Project Structure

```
root
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   │
│   └── server.js
│
├── frontend
│   ├── app
│   ├── src
│   │   ├── screens
│   │   ├── store
│   │   └── api
│   │
│   └── README.md
│
└── .gitignore
```

---

# Data Security

* User passwords are hashed using bcrypt before storage.
* Authentication is handled using JSON Web Tokens.
* All API communication occurs over HTTP requests with standard security middleware (Helmet, CORS).
* Sensitive configuration values are stored in environment variables.

---

# Future Improvements

Potential areas for extension:

* Conversation context memory improvements
* Mood analytics and visualization
* Push notifications for check-ins
* Therapist or emergency resource integration
* Deployment using containerized services


