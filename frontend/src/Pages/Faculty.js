import React from 'react';

import Header from "../components/Header";
import Navbar from "../components/FacultyNavbar";
import Attendance from "../components/Attendance";

function Faculty(props) {
    return (
        <div>
            <Header />
            <Navbar />
            {props.attendance && <Attendance />}
        </div>
    )
}

export default Faculty;