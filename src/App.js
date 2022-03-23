
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login';
import Header from './Components/Header';
import Home from './Components/Home';
import { useEffect } from 'react';
import { getUserAuth } from './Actions';
import { connect } from 'react-redux';


function App(props) {
  useEffect(() => {
    // props.getUserAuth();


  }, []);
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<><Header /> <Home /> </>} />
      </Routes>
    </BrowserRouter>


  );
}

const mapStateToProps = (state) => {
  return {
    
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  getUserAuth:()=>dispatch(getUserAuth),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
