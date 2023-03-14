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
              <Route exact path='/login_user' element = {<LoginForm />}></Route>

              <Route path='/admin' element = {<Admin />}></Route>
              <Route path='/admin/school' element = {<Admin school/>}></Route>
              <Route path='/admin/department' element = {<Admin department/>}></Route>
              <Route path='/admin/faculty' element = {<Admin faculty/>}></Route>
              <Route path='/admin/course' element = {<Admin course/>}></Route>
              <Route path='/admin/student' element = {<Admin student/>}></Route>

              <Route path = '/student/home' element = {<StudentHome />}></Route>

              <Route path = '/teacher/home' element = {<TeacherHome />}></Route>
              <Route path = '/teacher/attendance' element = {<TeacherAttendance />}></Route>
              <Route path = '/teacher/events' element = {<TeacherEvent />}></Route>
              <Route path = '/teacher/routine' element = {<TeacherRoutine />}></Route>

              <Route path = '/department/home' element = {<DepartmentHome />}></Route>

              <Route path = '/student/events' element = {<StudentEvent />}></Route>
              <Route path = '/student/routine' element = {<StudentRoutine />}></Route>
              <Route path = '/student/feedbacks' element = {<StudentFeedback />}></Route>
            </Routes>
    </Router>
  );
}

export default App;
