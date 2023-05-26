import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "../styles/attendance.css";

const token = localStorage.getItem('jwtToken')
const user = jwtDecode(token)

const AttendanceSheet = () => {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchAttendance();
    })

    const fetchAttendance = async () => {
        try {
            const response = await fetch('http://localhost:8000/get_attendance/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course_id: 1,
                    faculty_id: 1
                })
            })

            const _response = await response.json();
            
            const filteredResponse =  _response.map(({id, faculty, course, date, ...rest}) => rest)
            setAttendanceData(filteredResponse)
            console.log(filteredResponse)
        } catch (error) {
            console.log("Error sending data:", error);
        }
    }

    const countTotalAttendance = (attendanceData) => {
        const attendanceCountMap = new Map();

        attendanceData.forEach((attendance) => {
            const {student, status} = attendance;

            if(attendanceCountMap.has(student)) {
                const count = attendanceCountMap.get(student);
                attendanceCountMap.set(student, count + (status === 'Present' ? 1 : 0));
            } else {
                attendanceCountMap.set(student, status === 'Present' ? 1 : 0);
            }
        })

        return attendanceCountMap;
    }

    const totalAttendanceMap = countTotalAttendance(attendanceData);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Total Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(totalAttendanceMap).map(([student_id, totalAttendance]) => (
                        <tr key={student_id}>
                            <td>{student_id}</td>
                            <td>{totalAttendance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceSheet;