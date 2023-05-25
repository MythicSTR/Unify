import React, { useState, useEffect } from 'react';
import Navbar from "../components/StudentNavbar";
import RenderStudentClassroom from './RenderStudentClassroom';
import "../styles/classroom.css";


function StudentClassroom() {
    return(
        <div>

            <Navbar />

            <div className='Student-classroom-container-temp'>
            <RenderStudentClassroom />

            <div className="classroom">
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">MATH207</a>
                        <p className="class-author">Shyam Sundar Shah</p>
                    </div>
                </div>
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">COMP204</a>
                        <p className="class-author">Preynita Karki</p>
                    </div>
                </div>
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">Comp231</a>
                        <p className="class-author">Hari K.C</p>
                    </div>
                </div>
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">COMP232</a>
                        <p className="class-author">Santosh Khanal</p>
                    </div>
                </div>
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">MCSC202</a>
                        <p className="class-author">Gokul K.C</p>
                    </div>
                </div>

            </div>
            </div>
        
    );
}

export default StudentClassroom;