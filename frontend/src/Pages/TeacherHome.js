import React from "react";
import Navbar from "../components/TeacherNavbar"
import MyCalendar from "../components/Calendar";

function TeacherHome(){
    return(
        <div>
            <Navbar/>
            Teacher home
            <MyCalendar/>
        </div>
    );
}

export default TeacherHome;