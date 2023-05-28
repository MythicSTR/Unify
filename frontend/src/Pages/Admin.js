import React from 'react';

import "../styles/Admin.css";
import Header from "../components/Header";
import Navbar from '../components/Navbar';
import AddSchool from "../components/Admin/AddSchool";
import Room from '../components/Admin/Room';
import Student from '../components/Student/Student'
import Enrollment from '../components/Admin/Enrollment';
import Department from '../components/Admin/Department';
import Faculty from '../components/Admin/faculty'
import Building from '../components/Admin/Building';
import AddKuEvents from '../components/Admin/AddKuEvents';
import Course from '../components/Admin/Course';
import Coordinator from '../components/Coordinator';
function Admin(props) {
    return (
        <div>
            <Header />
            <Navbar />
            {props.school && <AddSchool/>}
            {props.department && <Department/>}
            {props.student && <Student/>}
            {props.room && <Room/>}
            {props.Faculty && <Faculty/>}
            {props.building && <Building/>}
            {props.enrollment && <Enrollment/>}
            {props.addKuEvents && <AddKuEvents/>}
            {props.Course && <Course/>}
            {props.coordinator && <Coordinator/>}









        </div>
    );
}

export default Admin;