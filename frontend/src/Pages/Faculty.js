import React from 'react';

import Navbar from "../components/Faculty/FacultyNavbar";
import Attendance from "../components/Faculty/Attendance";
import MyCalendar from "../components/Calendar";
function Faculty(props) {
    return (
        <div>
            {props.attendance && <Attendance />}
            <MyCalendar/>
        </div>
    )
}

export default Faculty;