import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import RecipesHome from './Components/RecipesHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/home" element={<RecipesHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
