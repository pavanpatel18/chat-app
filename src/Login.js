// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // Register if user doesn't exist
        await createUserWithEmailAndPassword(auth, email, password);
        onLogin();
      } else {
        console.error("Login error:", error);
        alert(error.message);
      }
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      onLogin();
    } catch (error) {
      console.error("Anonymous login error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
