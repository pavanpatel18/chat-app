// src/ChatRoom.js
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
import EmojiPicker from "emoji-picker-react";
import "./ChatRoom.css";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
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

    inputRef.current?.focus();
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
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
      <div className="chat-box">
        <div className="chat-header">
          <div>
            Welcome {auth.currentUser.email || "Guest"}
          </div>
          <div>
            <button onClick={() => setDarkMode(!darkMode)} className="toggle-button">
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
            <button onClick={() => auth.signOut()} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="messages-list">
          {messages.map((msg) => {
            const isMine = msg.uid === auth.currentUser.uid;
            return (
              <div key={msg.id} className={`message-wrapper ${isMine ? "mine" : "theirs"}`}>
                <div className={`message-bubble ${isMine ? "message-mine" : "message-other"}`}>
                  <div className="message-meta">
                    <div className="message-avatar">
                      {msg.email?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <span>{msg.email}</span>
                  </div>
                  <div>{msg.text}</div>
                  <div className="message-time">
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

        {isTyping && (
          <div className="typing-indicator">You’re typing...</div>
        )}

        {showPicker && (
          <EmojiPicker
            onEmojiClick={(emojiObject) =>
              setMessage((prev) => prev + emojiObject.emoji)
            }
          />
        )}

        <form className="chat-form" onSubmit={handleSend}>
          <button
            type="button"
            className="emoji-button"
            onClick={() => setShowPicker(!showPicker)}
          >
            😊
          </button>

          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(true);
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false);
              }, 2000);
            }}
          />

          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
