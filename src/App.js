// src/App.js
import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';

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
        <div>
          <h2>Welcome {user.isAnonymous ? "Guest" : user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={() => console.log("Logged in!")} />
      )}
    </div>
  );
}

export default App;
