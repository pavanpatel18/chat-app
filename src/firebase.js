// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.AIzaSyCLirwSHuq_3ffyBp-l8mtCsE6jH9OS0tw,
  authDomain: process.env.chat-app-302b9.firebaseapp.com,
  projectId: process.env.chat-app-302b9,
  storageBucket: process.env.chat-app-302b9.firebasestorage.app,
  messagingSenderId: process.env.783695018343,
  appId: process.env.1:783695018343:web:276b362435dbab4d27d7c2,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
