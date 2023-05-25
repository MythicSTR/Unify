import React, { useState, useEffect } from 'react';
import Navbar from "../components/StudentNavbar";
import StudentAttendance from './StudentAttendance';
import RenderStudentClassroom from './RenderStudentClassroom';
import "../styles/classroom.css";


function StudentClassroom() {
    return(
        <>

            <Navbar />
            <StudentAttendance />
            <div className='Student-classroom-container-temp'>
            <RenderStudentClassroom />
            </div>

        </>
    );
}

export default StudentClassroom;