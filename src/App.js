import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import RecipesHome from './Components/RecipesHome';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<RecipesHome />} />
      </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
