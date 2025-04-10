// src/App.js
import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import ChatRoom from './ChatRoom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = () => signOut(auth);

  return (
    <div className="App">
      {user ? (
        <>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <p>Welcome {user.isAnonymous ? "Guest" : user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <ChatRoom />
        </>
      ) : (
        <Login onLogin={() => console.log("Logged in!")} />
      )}
    </div>
  );
}

export default App;
