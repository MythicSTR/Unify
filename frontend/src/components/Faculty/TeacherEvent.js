import React from "react";
import Navbar from "./FacultyNavbar";
import MyCalendar from "../Calendar";
import AddDepartmentEvents from "./AddDepartmentEvents";
function TeacherEvent(){
    return(
        <div>
            <AddDepartmentEvents />
            <MyCalendar/>
        </div>
    );
}

export default TeacherEvent;

