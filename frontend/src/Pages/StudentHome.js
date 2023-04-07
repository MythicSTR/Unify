import React from "react";
import Navbar from "../components/StudentNavbar"
import MyCalendar from "../components/Calendar";
import StudentAttendance from "../components/StudentAttendance";

function StudentHome(){
    return(
        <div>
            <Navbar/>
            {/* student home
            <MyCalendar/> */}
            <StudentAttendance />
        </div>
    );
}

export default StudentHome;