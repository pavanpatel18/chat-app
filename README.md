# 💬 Real-Time Chat App

A full-stack real-time chat application built using **React** and **Firebase**, designed to deliver seamless one-on-one messaging with modern UI features and responsive design.

### 🌐 Live Demo  
👉 [chat-app-302b9.web.app](https://chat-app-302b9.web.app)

---

## ✨ Features

- 🔐 Firebase Authentication (Email/Password and Anonymous login)
- 💬 Real-time chat powered by Firestore
- 😊 Emoji picker integrated in the message input
- 🌗 Light/Dark mode toggle with persistent styling
- 📱 Responsive UI for desktop and mobile devices
- 🚀 Deployed to Firebase Hosting

---

## 🧰 Technologies Used

- **React** (with Hooks)
- **Firebase** (Auth, Firestore, Hosting)
- **emoji-picker-react** for emoji selection
- **CSS-in-JS** styling with dynamic themes

---

## 🛠 Setup Instructions

```bash
git clone https://github.com/pavanpatel18/chat-app.git
cd chat-app
npm install
```

---

### 🔐 Firebase Setup

1. Create a Firebase project
2. Enable Firestore + Authentication (Email/Password & Anonymous)
3. Add your config to `.env`:
```
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
```

---

## ▶️ Run Locally

```bash
npm start
```

## 🚀 Deploy

```bash
npm run build
firebase deploy
```

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light Mode](link-to-light-screenshot) | ![Dark Mode](link-to-dark-screenshot) |

---

## 📄 License

MIT

---

## 🙋‍♂️ About the Developer

Built by [Pavan Patel](https://github.com/pavanpatel18) – aspiring software developer passionate about frontend and full-stack development.
