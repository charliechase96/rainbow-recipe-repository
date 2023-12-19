import React from 'react';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {

  function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result);
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