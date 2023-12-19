import React from 'react';

function AuthNavigation({ isLogin, setIsLogin }) {
  return (
    <div>
      {isLogin ? (
        <p>
          Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button>
        </p>
      ) : (
        <p>
          Already have an account? <button onClick={() => setIsLogin(true)}>Login</button>
        </p>
      )}
    </div>
  );
}

export default AuthNavigation;