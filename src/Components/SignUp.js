import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function register(e) {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => console.log(authUser))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <form onSubmit={register}>
        <h1>Sign Up</h1>
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
        <button type="submit">Sign Up</button>
        <Link to="/">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default SignUp;