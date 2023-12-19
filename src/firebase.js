// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC47TQQVuMd7wNB6xF2SYNhVJM6VZ0Ems8",
  authDomain: "recipe-app-charliechase96.firebaseapp.com",
  projectId: "recipe-app-charliechase96",
  storageBucket: "recipe-app-charliechase96.appspot.com",
  messagingSenderId: "1056025742449",
  appId: "1:1056025742449:web:b0e22c86e90934656c5fd0",
  measurementId: "G-JS057YYK74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
