import React, { useEffect, useState } from 'react';
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
    const initialState = [
  {
    model: 'main.session',
    pk: 1,
    fields: {
      faculty_id: '1',
      program_id: 'CS',
      batch: 2020,
      latitude: 27.61892318584409,
      longitude: 85.53885644191998,
      start_time: '07:19:29.040',
    },
  },
];
    const [sessionData, setSessionData] = useState(initialState);
    const studentLocation = useGeolocation();

    useEffect(() => {
        fetchSession();
    }, [])

    const fetchSession = async() => {
        const requestData = {
            faculty_id: 1,
            program_id: "CS",
            batch: 2020
        }
        
        try {
            const response = await fetch('http://localhost:8000/get_session/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            setSessionData(responseData);

            console.log(responseData)
        } catch (error) {
            console.log(error);
        }
    }

    const markPresent = async() => {
        console.log("pressed markPresent")
        const CurrentTime = new Date();
        const formField = new FormData();

        const attendanceSession = JSON.parse(localStorage.getItem('attendance'));
        const startTime = new Date(sessionData[0].start_time);
        const elapsedTime = new Date(CurrentTime - startTime) / (1000 * 60); // elapsed time in minutes
        const distance = calculateDistance(studentLocation, sessionData[0].latitude, sessionData[0].longitude);

        formField.append('date', CurrentTime);
        formField.append('status', 'Present');
        formField.append('course_id', 1);
        formField.append('faculty_id', 1);
        formField.append('student_id', 'SUSSCS200049');

        if(true) {
            try {
                console.log("hello")
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
          <Navbar />
          <button class="btn btn-primary" type="submit" onClick={markPresent}>
            Mark Present
          </button>
          </div>
      );
    }
export default StudentAttendance;