import React from 'react';

import Navbar from "../components/FacultyNavbar";
import Attendance from "../components/Attendance";
import MyCalendar from "../components/Calendar";
function Faculty(props) {
    return (
        <div>
            <Navbar />
            {props.attendance && <Attendance />}
            <MyCalendar/>
        </div>
    )
}

export default Faculty;