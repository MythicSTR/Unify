import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getCookie} from '../../utils.js';
import useGeolocation from '../../hooks/useGeolocation';
import calculateDistance from '../../hooks/calculateDistance';
import Navbar from "../Student/StudentNavbar";
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
      latitude: 17.623662511889,
      longitude: 55.5414568443318,
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
            setSessionData(responseData[0]);

            console.log(sessionData[0].fields)

        } catch (error) {
            console.log(error);
        }
    }

    const markPresent = async() => {
        console.log("pressed markPresent")
        const CurrentDate = new Date();
        const CurrentTime = CurrentDate.toISOString().slice(11, -5);
        const formField = new FormData();

        const attendanceSession = JSON.parse(localStorage.getItem('attendance'));
        const date1 = new Date(`2000-01-01T${sessionData.start_time}Z`);
        const date2 = new Date(`2000-01-01T${CurrentTime}Z`);

        const diffInMilliseconds = date2 - date1;

        const elapsedTime = Math.floor(diffInMilliseconds / (1000 * 60));
        const distance = calculateDistance(studentLocation, sessionData.latitude, sessionData.longitude);

        formField.append('date', CurrentTime);
        formField.append('status', 'Present');
        formField.append('course_id', 1);
        formField.append('faculty_id', 1);
        formField.append('student_id', 'SUSSCS200049');

        const presenceData = {
            status: 'Present',
            course_id: '1',
            faculty_id: '1',
            student_id: 'SUSSCS200049'
        }

        if (elapsedTime < 5 && distance < 50) {
            console.log("Hw")
            try {
                const response = await fetch('http://localhost:8000/attendance/student/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(presenceData)
                })
            } catch (error) {
                console.log("Error sending data", error);
            }
        } else {
            console.log(sessionData.start_time)
        }
    }

    return (
        <div>
          <button class="btn btn-primary" type="submit" onClick={markPresent}>
            Mark Present
          </button>
          </div>
      );
    }
export default StudentAttendance;