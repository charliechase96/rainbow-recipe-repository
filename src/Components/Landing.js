import React, { useState } from 'react';
import Login from './Login'; 
import SignUp from './SignUp'; 

function Landing() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
        {showLogin ? (
        <div>
          <Login />
        </div>)    : (
        <div>
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default Landing;