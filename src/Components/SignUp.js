import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Login from './Login';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sign up successful', userCredential);
        navigate("/home");
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
        // Handle errors here
      });
  };

  return (
    <div className='signup-form'>
      <h1>Welcome to The Recipe App!</h1>
      <form onSubmit={handleSignUp}>
        <h3>Sign Up</h3>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          required
        />
        <button 
          type="submit"
          disabled={!email || !password}
        >
          Sign Up
        </button>
      </form>
      <br/>
      <Link to="/" element={<Login />}>Already have an account? Log In!</Link>
    </div>
  );
}

export default SignUp;