import React from 'react';

import Header from "../components/Header";
import Navbar from "../components/FacultyNavbar";
// import useGeolocation from '../hooks/useGeolocation';

function Attendance() {
    const location = useGeolocation();
    return (
        <div>
            {/* {location.loaded ? JSON.stringify(location) : "location data not available!"} */}
        </div>
    )
}

export default Attendance;