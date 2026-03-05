# MindCare AI - Mobile Application 🧘‍♂️💬

MindCare AI is a modern, empathic mental health companion built with **React Native** and **Expo**. It provides users with a safe space to track their mood, access mindfulness resources, and talk to an AI therapist powered by Google Gemini.

## ✨ Key Features

- **Empathic AI Chat:** Real-time conversation with an AI tuned for mental wellness support.
- **Mood Tracking:** Visualize your daily emotional state with an intuitive mood selector.
- **Mindfulness Resources:** Quick access to breathing exercises and stress management articles.
- **Secure Authentication:** JWT-based login and registration system.
- **Beautiful UI/UX:** Clean, modern design with smooth animations and a soothing color palette.
- **Session Persistence:** Remembers your login so you don't have to sign in every time.

## 🛠️ Tech Stack

- **Framework:** React Native (Expo SDK 54)
- **Navigation:** Expo Router (File-based routing)
- **State Management:** Zustand (Global store with persist)
- **Networking:** Axios with Interceptors for JWT auth
- **Icons:** Material Community Icons & Ionicons (Expo Vector Icons)
- **Styling:** Vanilla StyleSheet with Linear Gradients

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Expo Go](https://expo.dev/expo-go) app installed on your physical device (iOS/Android)
- **Backend API Running:** Ensure the [MindCare Backend](..) is running and accessible.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Backend IP:
   Open `src/api/client.js` and update the `BASE_URL` with your local IP address:
   ```javascript
   const BASE_URL = 'http://192.168.x.x:5000/api'; // Replace with your IPv4
   ```

### Running the App

Start the Expo development server:
```bash
npx expo start --clear
```

- Scan the QR code in your terminal with the **Expo Go** app.
- Press `a` to run on an Android Emulator.
- Press `w` to run on a Web Browser.

## 📁 Project Structure

```text
frontend/
├── app/                # Expo Router pages (_layout, index, home, chat, etc.)
├── src/
│   ├── api/            # Axios client and API services
│   ├── store/          # Zustand global state (auth, chat)
│   ├── screens/        # Core UI screen components (Reusable)
│   ├── assets/         # Images, fonts, and local resources
├── package.json        # Dependencies and scripts
└── app.json            # Expo configuration
```

## 🔒 Security

MindCare AI prioritizes user privacy. All chat data is transmitted over secure connections and stored with encryption on the backend. The mobile app uses `AsyncStorage` to securely store authentication tokens locally.

---
*Created for your peace of mind. 🌿*