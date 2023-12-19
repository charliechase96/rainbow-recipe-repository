import './App.css';
import { useEffect } from 'react';
import { auth } from './firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import RecipesHome from './Components/RecipesHome';
import IngredientList from './Components/IngredientList';



function App() {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(user);
      } else {
        // No user is signed in.
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<RecipesHome />} />
        <Route path="/ingredient-list" element={<IngredientList />} />
      </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
