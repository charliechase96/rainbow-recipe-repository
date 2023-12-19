import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyC47TQQVuMd7wNB6xF2SYNhVJM6VZ0Ems8",
    authDomain: "recipe-app-charliechase96.firebaseapp.com",
    projectId: "recipe-app-charliechase96",
    storageBucket: "recipe-app-charliechase96.appspot.com",
    messagingSenderId: "1056025742449",
    appId: "1:1056025742449:web:b0e22c86e90934656c5fd0",
    measurementId: "G-JS057YYK74"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <p></p>
  );
}

export default App;
