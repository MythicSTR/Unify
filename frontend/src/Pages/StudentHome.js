import React from "react";

import Navbar from "../components/StudentNavbar";
import MyCalendar from "../components/Calendar";

function StudentHome(){
    return( 
        <div>
            <Navbar/>   
            <MyCalendar/> 
        </div>
    );
}

export default StudentHome;