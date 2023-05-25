import React, { useState, useEffect } from 'react';
import Navbar from "../components/FacultyNavbar";
import MyPopup from './Popup';
import { Link } from 'react-router-dom';
import RenderTeacherClassroom from './RenderTeacherClassroom';
import "../styles/FacultyClassroom.css";
function FacultyClassroom() {
  
    return(
        <div>
        <Navbar />
            <div className='faculty_container'> 
            <RenderTeacherClassroom/>
            </div>
            <MyPopup/>
        </div>
    );
}

export default FacultyClassroom;