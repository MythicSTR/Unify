import React from "react";
import Navbar from "./TeacherNavbar"
import MyCalendar from "./Calendar";

function TeacherEvent(){
    return(
        <div>
            <Navbar/>
            <MyCalendar/>
        </div>
    );
}

export default TeacherEvent;

