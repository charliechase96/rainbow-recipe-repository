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
        navigate(`/user-profile/${userCredential.user.uid}`);
        // Redirect or update UI
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        window.alert('Error logging in:', error.message); // Handle errors here
        setEmail("");
        setPassword("");
      });
  };

  function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result);
        navigate(`/user-profile/${result.user.uid}`);
        // Handle successful login
      })
      .catch((error) => {
        console.error(error);
        window.alert('Error:', error); // Handle errors
      });
  };

  return (
    <div className='login-form'>
      <h1>Welcome to The Recipe App</h1>
      <form onSubmit={handleLogin}>
        <h3>Login with Email and Password</h3>
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
          Login
        </button>
      </form>
      <br/>
      <Link to="/signup" element={<SignUp />}>New user? Create an account!</Link>

      <h3>Login with Google</h3>
      <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  );
}

export default Login;