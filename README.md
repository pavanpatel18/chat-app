# 📱 Chat App

A real-time chat application built with **React** and **Firebase**, featuring:
- 🔐 Email & Anonymous Authentication  
- 💬 One-on-One Global Chat  
- 😊 Emoji Support  
- 🌙 Light/Dark Mode Toggle  
- 🚀 Deployed on Firebase Hosting

---

## 🚀 Live Demo

👉 [https://chat-app-302b9.web.app](https://chat-app-302b9.web.app)

---

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Firebase (Auth + Firestore + Hosting)](https://firebase.google.com/)
- [Emoji Picker React](https://www.npmjs.com/package/emoji-picker-react)

---

## 📦 Features

- 🔑 Email/Password & Guest Login (Firebase Auth)
- 💬 Real-time Messaging (Firestore)
- 😊 Emoji Picker Integration
- 🌗 Toggle Light/Dark Mode
- 📲 Clean, responsive UI
- 🚀 Firebase Hosting Deployment

---

## 📁 Project Setup (Local)

```bash
git clone https://github.com/pavanpatel18/chat-app.git
cd chat-app
npm install
```

---

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Enable **Authentication** (Email/Password + Anonymous)
4. Enable **Firestore Database**
5. Create a `.env` file in the root with the following:

```
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
```

---

## ▶️ Run the App

```bash
npm start
```

---

## 🚀 Deploy to Firebase

```bash
npm run build
firebase deploy
```

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues or suggest features.

---

## 📄 License

MIT