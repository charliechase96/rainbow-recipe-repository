import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();

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
        <h3>Login with Google</h3>
        <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  );
}

export default Login;