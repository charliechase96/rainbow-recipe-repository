import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import SignUp from './SignUp';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Login successful', userCredential);
        // Redirect or update UI
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        // Handle errors here
      });
  };

  function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result);
        navigate('/home');
        // Handle successful login
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login with Email and Password</h1>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      
      <Link to="/signup" element={<SignUp />}>New user? Create an account!</Link>

      <h3>Login with Google</h3>
      <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  );
}

export default Login;