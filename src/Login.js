import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUserToFirestore = async (user, isGuest = false) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: isGuest ? "Guest" : user.email,
      createdAt: serverTimestamp(),
    });
  };

  const handleEmailLogin = async () => {
    try {
      // Try sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(userCredential.user);
      onLogin();
    } catch (loginError) {
      console.warn("Login failed, trying to register:", loginError.message);
      try {
        // Fallback: try register instead
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(userCredential.user);
        onLogin();
      } catch (registerError) {
        console.error("Registration failed:", registerError.message);
        alert(`Registration failed: ${registerError.message}`);
      }
    }
  };  

  const handleAnonymousLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      await saveUserToFirestore(userCredential.user, true);
      onLogin();
    } catch (error) {
      console.error("Anonymous login error:", error);
      alert(`Anonymous login error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleEmailLogin}>Login / Register</button>
      <br /><br />
      <button onClick={handleAnonymousLogin}>Continue as Guest</button>
    </div>
  );
}
