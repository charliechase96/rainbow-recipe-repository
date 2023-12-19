import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function LogoutButton() {
    const navigate = useNavigate();

    function logout() {
        signOut(auth)
          .then(() => {
            console.log('User logged out successfully');
            navigate('/');
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