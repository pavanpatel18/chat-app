import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import EmojiPicker from 'emoji-picker-react';

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {msg.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <span
                    style={{ fontSize: "0.75rem", fontWeight: "bold" }}
                  >
                    {msg.email}
                  </span>
                </div>

                <div>{msg.text}</div>

                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#555",
                    marginTop: "4px",
                    textAlign: "right",
                  }}
                >
                  {msg.createdAt?.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        {showPicker && (
          <EmojiPicker
            onEmojiClick={(event, emojiObject) =>
              setMessage((prev) => prev + emojiObject.emoji)
            }
          />
        )}

        <form
          onSubmit={handleSend}
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            style={{
              padding: "0.5rem",
              fontSize: "1.2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            😊
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSend(e);
              }
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 16px",
              borderRadius: "20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}