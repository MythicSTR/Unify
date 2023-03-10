import React from "react";
import Navbar from "../components/DepartmentNavbar"
import MyCalendar from "../components/Calendar";

function DepartmentHome(){
    return(
        <div>
            <Navbar/>
            Department home 
            <MyCalendar/>
        </div>
    );
}

export default DepartmentHome;