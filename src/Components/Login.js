import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        onLogin(authUser);
        navigate('/home');
      })
      .catch((error) => {
        alert(error.message);
      });
}

  return (
    <div>
      <form onSubmit={signIn}>
        <h1>Login</h1>
        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} placeholder="Email"
        />
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default Login;