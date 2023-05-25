import React, { useState, useEffect } from 'react';
import Navbar from "../components/StudentNavbar";
import RenderStudentClassroom from './RenderStudentClassroom';
import "../styles/classroom.css";


function StudentClassroom() {
    return(
        <>

            <Navbar />
            <div className='Student-classroom-container-temp'>
            <RenderStudentClassroom />
            </div>

        </>
    );
}

export default StudentClassroom;