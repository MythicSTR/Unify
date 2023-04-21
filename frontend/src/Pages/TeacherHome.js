import React from "react";
import Header from "../components/Header";
import Navbar from "../components/TeacherNavbar";
import MyCalendar from "../components/Calendar";
import TeacherAttendance from "../components/TeacherAttendance";

function TeacherHome(){
    return(
        <div>
            <TeacherAttendance/>
        </div>
    );
}

export default TeacherHome;