import React, { useState, useEffect } from 'react';
import Navbar from "../components/FacultyNavbar";
import MyPopup from './Popup';
import RenderTeacherClassroom from './RenderTeacherClassroom';
import "../styles/FacultyClassroom.css";
function FacultyClassroom() {
  
    return(
        <div>
        <Navbar />
        <div className='faculty_container'>
                <RenderTeacherClassroom/>
                <MyPopup/>
                </div>
                </div>
    );
}

export default FacultyClassroom;