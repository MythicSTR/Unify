import React, { useState, useEffect } from 'react';
import Navbar from "../components/FacultyNavbar";
import MyPopup from './Popup';
function FacultyClassroom() {
  
    return(
        <div>
            <Navbar />
            <div className="classroom">
               
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">MATH207</a>
                        <p className="class-author">Shyam Sundar Shah</p>
                    </div>

                </div>
                <div className="class-card">
                <div className="inner-card">
                    <a href="#" className="class-title">MATH207</a>
                    <p className="class-author">Shyam Sundar Shah</p>
                </div>

            </div>
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">MATH207</a>
                        <p className="class-author">Shyam Sundar Shah</p>
                    </div>
                </div>
                <div className="class-card">
                <div className="inner-card">
                    <a href="#" className="class-title">MATH207</a>
                    <p className="class-author">Shyam Sundar Shah</p>
                </div>
            </div>
                <div className="class-card">
                    <div className="inner-card">
                        <a href="#" className="class-title">MATH207</a>
                        <p className="class-author">Shyam Sundar Shah</p>
                    </div>
                </div>
                <MyPopup/>
                </div>
        </div>
    );
}

export default FacultyClassroom;