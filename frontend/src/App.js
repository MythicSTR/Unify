import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Admin from "./Pages/Admin";
import LoginForm from "./Pages/Login";
import StudentHome from "./Pages/StudentHome";
import TeacherHome from "./Pages/TeacherHome";
import DepartmentHome from "./Pages/DepartmentHome"
import StudentEvent from "./components/StudentEvent";
import StudentRoutine from "./components/StudentRoutine";
import TeacherAttendance from "./components/TeacherAttendance";
import TeacherEvent from "./components/TeacherEvent";
import TeacherRoutine from "./components/TeacherRoutine";
import StudentFeedback from "./components/StudentFeedback";

function App() {
  return (
    <Router>
          <Routes>
              <Route exact path='/' element = {<LoginForm />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
