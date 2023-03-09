import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import LoginForm from "./Pages/Login";
import StudentHome from "./Pages/StudentHome";
function App() {
  return (
    <Router>
          <Routes>
              <Route exact path='/' element = {<LoginForm />}></Route>
              <Route path="/student" element = {<StudentHome />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
