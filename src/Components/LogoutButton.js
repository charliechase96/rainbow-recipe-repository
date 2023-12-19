import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function LogoutButton() {
    const navigate = useNavigate();

    function logout() {
        auth.signOut()
          .then(() => {
            console.log('User logged out successfully');
            navigate('/login');
          })
          .catch((error) => {
            console.error('Logout Error:', error);
          });
      };

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default LogoutButton;