
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login';
import Header from './Components/Header';
import Home from './Components/Home';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<><Header /> <Home /> </>} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
