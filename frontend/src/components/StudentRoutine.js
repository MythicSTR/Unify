import React from "react";
import Navbar from "../components/StudentNavbar"
import MyCalendar from "../components/Calendar";

function StudentRoutine(){
    return(
        <div>
            <Navbar/>
            student routine
            <MyCalendar/>
        </div>
    );
}

export default StudentRoutine;