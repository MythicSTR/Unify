import React from 'react';
import {getCookie} from '../../utils.js';
import axios from 'axios';

import Header from "../Header.js";
import Navbar from "./FacultyNavbar.js";
import useGeolocation from '../../hooks/useGeolocation.js';
import AttendanceSheet from './AttendanceSheet.js';
import "../styles/attendance.css";

function Attendance() {
    const location = useGeolocation();
    

    const attendanceSession = async() => {
        console.log(location)
        const dateObj = new Date();
        const sessionData = {
            faculty_id: 1,
            program_id: 'CS',
            batch: 2020,
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
            start_time: dateObj
        }

        try {
            const response = await fetch('http://localhost:8000/start_session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionData)
            });
        } catch (error) {
            console.log("Error sending data", error);
        }
    }

    return (
        <div>
            {/* {location.loaded ? JSON.stringify(location) : "location data not available!"} */}
            <button class="btn btn-primary" type="submit" onClick={attendanceSession}>Start Session</button>
            <div className="attendance-sheet-container">
                <AttendanceSheet />
            </div>
        </div>
    )
}

export default Attendance;