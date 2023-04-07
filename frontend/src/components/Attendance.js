import React from 'react';
import {getCookie} from '../utils.js';
import axios from 'axios';

import Header from "../components/Header";
import Navbar from "../components/FacultyNavbar";
import useGeolocation from '../hooks/useGeolocation';

function Attendance() {
    const location = useGeolocation();
    

    const attendanceSession = async() => {
        const currentTime = new Date();
        let formField = new FormData()

        const attendance = {time: currentTime, location};
        localStorage.setItem('attendance', JSON.stringify(attendance));

        formField.append('faculty_id', 1)
        formField.append('lat', location.coordinates.lat)
        formField.append('lng', location.coordinates.lng)

        try {
            axios.post("http://127.0.0.1:8000/attendance/faculty/", formField, {headers: {'X-CSRFToken': getCookie('csrftoken')}}).then((response) => {
                console.log(response.data)
            })
        } catch(error) {
            console.log(error)
        }

        return attendance;
    }

    return (
        <div>
            {/* {location.loaded ? JSON.stringify(location) : "location data not available!"} */}
            <button class="btn btn-primary" type="submit" onClick={attendanceSession}>Start Session</button>
        </div>
    )
}

export default Attendance;