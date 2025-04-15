// src/ChatRoom.js
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      uid: auth.currentUser.uid,
      email: auth.currentUser.isAnonymous ? "Guest" : auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "left" }}>
      <h2>Chat Room</h2>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg) => {
          const isMine = msg.uid === auth.currentUser.uid;
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
                padding: "4px 0",
              }}
            >
              <div
                style={{
                  maxWidth: "60%",
                  background: isMine ? "#DCF8C6" : "#F1F0F0",
                  color: "#000",
                  padding: "10px",
                  borderRadius: "15px",
                  borderBottomRightRadius: isMine ? "0" : "15px",
                  borderBottomLeftRadius: isMine ? "15px" : "0",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  {msg.email}
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "70%", marginRight: "1rem" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
