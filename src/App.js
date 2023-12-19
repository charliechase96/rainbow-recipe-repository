import './App.css';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AuthNavigation from './Components/AuthNavigation';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {isLogin ? <Login onLogin={setUser} /> : <SignUp />}
          <AuthNavigation isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      )}
    </div>
  );
}

export default App;