import React from "react";
import Header from "../components/Header";
import Navbar from "../components/TeacherNavbar";
import MyCalendar from "../components/Calendar";

function TeacherHome(){
    return(
        <div>
            <Header />
            <Navbar />
        </div>
    );
}

export default TeacherHome;