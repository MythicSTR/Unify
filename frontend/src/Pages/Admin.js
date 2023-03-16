import React from 'react';

import "../styles/Admin.css";
import Header from "../components/Header";
import Navbar from "../components/AdminNavbar";
import AddSchool from "../components/AddSchool";
import Room from '../components/Room';
import Student from '../components/Student'
import Enrollment from '../components/Entrollment';
import Department from '../components/Department';
import Course from '../components/Course'
import Building from '../components/Building';


function Admin(props) {
    return (
        <div>
            <Header />
            <Navbar />
            {props.school && <AddSchool/>}
            {props.department && <Department/>}
            {props.student && <Student/>}
            {props.room && <Room/>}
            {props.course && <Course/>}
            {props.building && <Building/>}
            {props.enrollment && <Enrollment/>}







        </div>
    );
}

export default Admin;