import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Admin from "./Pages/Admin";
import Faculty from './Pages/Faculty';
import LoginForm from "./Pages/Login";
import StudentHome from "./Pages/StudentHome";
import StudentEvent from "./components/Student/StudentEvent";
import StudentRoutine from "./components/Student/StudentRoutine";
import StudentFeedback from "./components/Student/StudentFeedback";
import TeacherFeedback from "./components/Faculty/TeacherFeedback";
import TeacherHome from "./Pages/TeacherHome";
import TeacherRoutine from "./components/Faculty/TeacherRoutine"; 
import ForgotForm from "./Pages/forgotpassword";  
import ChangeForm from "./Pages/changepassword";
import StudentAttendance from "./components/Student/StudentAttendance";
import TeacherMessage from "./components/Faculty/messages";
import Enrollment from "./components/Faculty/Enrollment";
import AdminEvents from "./components/Admin/AdminEvents";
import setAuthToken from './redux/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/utils/actions/authActions';
import store from './redux/utils/store';
import jwt_decode from 'jwt-decode';
import Feedback from "./components/Faculty/messages";
import TeacherEvent from "./components/Faculty/TeacherEvent";
import Coordinator from "./components/Coordinator";
import NotFound from "./components/Notfound/Notfound";
import StudentClassroom from "./components/Student/StudentClassroom";
import CreateRoutine from "./components/Faculty/CreateRoutine";
import FacultyClassroom from "./components/Faculty/FacultyClassroom"
import StudentMessages from "./components/Student/StudentMessages"
import Base from "./components/Base";
// import TeacherRoutine from "./components/TeacherRoutine";
//import withAuthorization from "./withAuthorization";
import styled from 'styled-components';

const token = localStorage.jwtToken;
const user = jwt_decode(token);

function App() {
	const Container = styled.div`
    margin: 2rem 8rem;
	`;

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
    //      if (decoded.exp < currentTime) {
    // //     // Logout user
    //       store.dispatch(logoutUser()); // Redirect to login
    //        window.location.href = './login';
    //    }
     }

  return (
    <Router>
          <Navbar user={user}/>
          <Container>
          <Routes>
              <Route exact path='/' element = {<LoginForm />}></Route>
              <Route exact path='/login' element = {<LoginForm />}></Route>
              <Route exact path='/forgotpassword' element={<ForgotForm/>}></Route>
              <Route exact path='/changepassword' element={<ChangeForm/>}></Route>
              
              {user.isAdmin && <Route path='/admin' element = {<Admin />}></Route> }
              {user.isAdmin && <Route path='/admin/school' element = {<Admin school/>}></Route>}
              {user.isAdmin && <Route path='/admin/department' element = {<Admin department/>}></Route>}
              {user.isAdmin && <Route path='/admin/faculty' element = {<Admin Faculty/>}></Route>}
              {user.isAdmin && <Route path='/admin/course' element = {<Admin Course/>}></Route>}
              {user.isAdmin && <Route path='/admin/student' element = {<Admin student/>}></Route>}
              {user.isAdmin && <Route path='/admin/room' element = {<Admin room/>}></Route>}
              {user.isAdmin && <Route path='/admin/enrollment' element = {<Admin enrollment/>}></Route>}
              {user.isAdmin && <Route path='/admin/events' element = {<Admin addKuEvents/>}></Route>}
              {user.isAdmin && <Route path='/admin/coordinator' element = {<Admin coordinator/>}></Route>}

              {user.isFaculty && <Route path='/faculty' element = {<Faculty />}></Route>}
              {user.isFaculty && <Route path='/faculty/attendance' element = {<Faculty attendance/>}></Route>}
              {user.isFaculty && <Route path='/faculty/enroll' element = {<Enrollment />}></Route>}
              {user.isFaculty && <Route path='/faculty/events' element = {<TeacherEvent />}></Route>}
              {user.isFaculty && <Route path='/faculty/routine' element = {<CreateRoutine />}></Route>}
              {user.isFaculty && <Route path='/faculty/report' element = {<TeacherMessage />}></Route>}
              {user.isFaculty && <Route path = '/faculty/classroom' element = {<FacultyClassroom />}></Route>}
              {user.isFaculty && <Route path = '/faculty/classroom/:course_code' element = {<Base />}></Route>}
             
              {/* <Route path='/faculty/school' element = {<Admin school/>}></Route>
              <Route path='/faculty/department' element = {<Admin department/>}></Route>
              <Route path='/faculty/faculty' element = {<Admin faculty/>}></Route>
              <Route path='/faculty/course' element = {<Admin course/>}></Route>
              <Route path='/faculty/student' element = {<Admin student/>}></Route> */}

              {/* <Route path = '/student/home' element = {<StudentHome />}></Route> */}
              {/* {user.isFaculty && <Route path = '/teacher' element = {<TeacherHome />}></Route>}
              {user.isFaculty && <Route path = '/teacher/attendance' element = {<TeacherAttendance />}></Route>}
              {user.isFaculty && <Route path = '/teacher/events' element = {<TeacherEvent />}></Route>} */}
 

              {/* <Route path = '/department/home' element = {<DepartmentHome />}></Route> */}
              {user.isStudent && <Route path = '/student' element = {<StudentHome />}></Route>}
              {user.isStudent && <Route path = '/student/events' element = {<StudentEvent />}></Route>}
              {user.isStudent && <Route path = '/student/routine' element = {<StudentRoutine />}></Route>}
              {user.isStudent && <Route path = '/student/feedbacks' element = {<StudentFeedback />}></Route>}
              {user.isStudent && <Route path = '/student/attendance' element = {<StudentAttendance />}></Route>}
              {/* {user.isStudent && <Route path = '/student/messages' element = {<Feedback />}></Route>} */}
             

              {user.isStudent && <Route path = '/student/classroom' element = {<StudentClassroom />}></Route>}
              {user.isStudent && <Route path = '/student/classroom/:course_code' element = {<Base />}></Route>}
              {user.isStudent && <Route path = '/student/messages' element = {<StudentMessages />}></Route>}
              
              
              <Route path = '/teacher/feedback' element = {<TeacherFeedback />}></Route>
              <Route path="*" component={NotFound} />
            </Routes>
            </Container>
    </Router>
  );
}

export default App;
