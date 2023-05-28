import React, { useState, useEffect } from 'react';
import StudentAttendance from './StudentAttendance';
import RenderStudentClassroom from '../RenderStudentClassroom';
import ClassroomCodeEnroll from "../ClassroomCodeEnroll"
import "../../styles/classroom.css";


function StudentClassroom() {
    return(
        <>

            <StudentAttendance />
            <div className='Student-classroom-container-temp'>
            <RenderStudentClassroom />
            <div className='EnrollPlusButton'></div>
            <ClassroomCodeEnroll />
            </div>

        </>
    );
}

export default StudentClassroom;