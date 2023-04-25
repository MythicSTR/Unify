import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Admin from "./Pages/Admin";
import Faculty from './Pages/Faculty';
import LoginForm from "./Pages/Login";
import StudentHome from "./Pages/StudentHome";
import StudentEvent from "./components/StudentEvent";
import StudentRoutine from "./components/StudentRoutine";
import StudentFeedback from "./components/StudentFeedback";
import TeacherFeedback from "./components/TeacherFeedback";
import TeacherHome from "./Pages/TeacherHome";
import TeacherRoutine from "./components/TeacherRoutine"; 
import TeacherAttendance from "./components/TeacherAttendance";
import StudentAttendance from "./components/StudentAttendance";
import Enrollment from "./components/Entrollment";
import AdminEvents from "./components/AdminEvents";
import setAuthToken from './redux/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/utils/actions/authActions';
import store from './redux/utils/store';
import jwt_decode from 'jwt-decode';
import Feedback from "./components/messages";
import TeacherEvent from "./components/TeacherEvent";
import NotFound from "./components/Notfound/Notfound";
// import TeacherRoutine from "./components/TeacherRoutine";
//import withAuthorization from "./withAuthorization";

// const token = localStorage.jwtToken;
// const user = jwtDecode(token);
function App() {
  // Check for token to keep user logged in
  if (localStorage.getItem('jwtToken')) {
    const token = localStorage.getItem('jwtToken');
    //   // Set auth token header auth
         setAuthToken(token);
    //   // Decode token and get user info and exp
            const decoded = jwt_decode(token);
    //   // Set user and isAuthenticated
           store.dispatch(setCurrentUser(decoded)); // Check for expired token
         const currentTime = Date.now() / 1000; // to get in milliseconds
         if (decoded.exp < currentTime) {
    //     // Logout user
          store.dispatch(logoutUser()); // Redirect to login
           window.location.href = './login';
       }
     }

  return (
    <Router>
          <Routes>
              <Route exact path='/' element = {<LoginForm />}></Route>
              <Route exact path='/login' element = {<LoginForm />}></Route>
              
              <Route path='/admin' element = {<Admin />}></Route>
              <Route path='/admin/school' element = {<Admin school/>}></Route>
              <Route path='/admin/department' element = {<Admin department/>}></Route>
              <Route path='/admin/faculty' element = {<Admin faculty/>}></Route>
              <Route path='/admin/course' element = {<Admin course/>}></Route>
              <Route path='/admin/student' element = {<Admin student/>}></Route>
              <Route path='/admin/room' element = {<Admin room/>}></Route>
              <Route path='/admin/enrollment' element = {<Admin enrollment/>}></Route>
              <Route path='/admin/events' element = {<AdminEvents/>}></Route>  

              <Route path='/faculty' element = {<Faculty />}></Route>
              <Route path='/faculty/attendance' element = {<Faculty attendance/>}></Route>
              <Route path='/faculty/enroll' element = {<Enrollment />}></Route>
              <Route path='/faculty/events' element = {<TeacherEvent />}></Route>
              <Route path='/faculty/routine' element = {<TeacherRoutine />}></Route>
              {/* <Route path='/faculty/school' element = {<Admin school/>}></Route>
              <Route path='/faculty/department' element = {<Admin department/>}></Route>
              <Route path='/faculty/faculty' element = {<Admin faculty/>}></Route>
              <Route path='/faculty/course' element = {<Admin course/>}></Route>
              <Route path='/faculty/student' element = {<Admin student/>}></Route> */}

              {/* <Route path = '/student/home' element = {<StudentHome />}></Route> */}

              <Route path = '/teacher' element = {<TeacherHome />}></Route>
              <Route path = '/teacher/attendance' element = {<TeacherAttendance />}></Route>
              <Route path = '/teacher/events' element = {<TeacherEvent />}></Route>

              {/* <Route path = '/department/home' element = {<DepartmentHome />}></Route> */}
              <Route path = '/student' element = {<StudentHome />}></Route>
              <Route path = '/student/events' element = {<StudentEvent />}></Route>
              <Route path = '/student/routine' element = {<StudentRoutine />}></Route>
              <Route path = '/student/feedbacks' element = {<StudentFeedback />}></Route>
              <Route path = '/student/attendance' element = {<StudentAttendance />}></Route>
              <Route path = '/student/message' element = {<Feedback />}></Route>
              
              <Route path = '/teacher/feedback' element = {<TeacherFeedback />}></Route>
              <Route path="*" component={NotFound} />
            </Routes>
    </Router>
  );
}

export default App;
