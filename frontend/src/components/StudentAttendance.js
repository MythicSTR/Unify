import React, { useEffect } from 'react';
import axios from 'axios';
import {getCookie} from '../utils.js';
import useGeolocation from '../hooks/useGeolocation';
import calculateDistance from '../hooks/calculateDistance';
import Navbar from "../components/StudentNavbar";
import jwtDecode from 'jwt-decode';

const _token = localStorage.getItem('jwtToken');
const token = jwtDecode(_token);
console.log(token);

function StudentAttendance(props) {
    const studentLocation = useGeolocation();

    const markPresent = async() => {
        console.log("pressed markPresent")
        const CurrentTime = new Date();
        const formField = new FormData();

        const attendanceSession = JSON.parse(localStorage.getItem('attendance'));
        const startTime = new Date(attendanceSession.time);
        const elapsedTime = new Date(CurrentTime - startTime) / (1000 * 60); // elapsed time in minutes
        const distance = calculateDistance(studentLocation, attendanceSession.location);

        formField.append('date', CurrentTime);
        formField.append('status', 'Present');
        formField.append('course_id', 1);
        formField.append('faculty_id', 1);
        formField.append('student_id', 'SUSSCS200049');

        if(elapsedTime <= 5 && distance <= 50) {
            try {
                axios.post("http://127.0.0.1:8000/attendance/student/", formField, {headers: {'X-CSRFToken': getCookie('csrftoken')}}).then((response) => {
                    console.log(response.data);
                })
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
        <Navbar/>
            <button class="btn btn-primary" type="submit" onClick={markPresent}>Mark Present</button>
        </div>
    )
}

export default StudentAttendance;