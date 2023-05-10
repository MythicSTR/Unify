import React, { useState, useEffect } from "react";
import Navbar from "./FacultyNavbar.js";
import { getCookie } from "../utils.js";
import axios from "axios";
import "../styles/StudentRoutine.css";

function TeacherRoutine() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const periods = [
    { start: "7:00 AM", end: "8:00 AM" },
    { start: "8:00 AM", end: "9:00 AM" },
    { start: "9:00 AM", end: "10:00 AM" },
    { start: "10:00 AM", end: "11:00 AM" },
    { start: "11:00 AM", end: "12:00 PM" },
    { start: "12:00 PM", end: "1:00 PM" },
    { start: "1:00 PM", end: "2:00 PM" },
    { start: "2:00 PM", end: "3:00 PM" },
    { start: "3:00 PM", end: "4:00 PM" },
  ];

  const [schedule, setSchedule] = useState({});
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await axios.post('http://localhost:8000/faculty/TeacherRoutine', { email });
        setSchedule(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoutine();
  }, [email]);

  const getSubject = (day, period) => {
    const subject = schedule[day]?.find(
      (s) => s.start_time === period.start && s.end_time === period.end
    );
    if (subject) {
      const startHour = parseInt(period.start.split(":")[0], 10);
      const endHour = parseInt(period.end.split(":")[0], 10);
      const hourDiff = endHour - startHour;
      if (hourDiff === 1) {
        return (
          <td>
            {subject.course}
            <br />
            <small>{subject.block}</small>
          </td>
        );
      } else {
        return (
          <td colSpan={hourDiff}>
            {subject.course}
            <br />
            <small>{subject.block}</small>
          </td>
        );
      }
    } else {
      return <td></td>;
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container ">
        <h1>Teacher Class Schedule</h1>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Time</th>
              {periods.map((period) => (
                <th key={period.start}>{`${period.start} - ${period.end}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                {periods.map((period) => getSubject(day, period))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TeacherRoutine;
