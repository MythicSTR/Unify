import React from "react";
import Navbar from "../components/StudentNavbar";
import { getCookie } from "../utils.js";
import axios from "axios";
import "../styles/StudentRoutine.css";

function StudentRoutine() {
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
    { start: "7:00 AM", end: "9:00 AM" },
    { start: "9:00 AM", end: "10:00 AM" },
    { start: "10:00 AM", end: "11:00 AM" },
    { start: "11:00 AM", end: "12:00 PM" },
    { start: "12:00 AM", end: "1:00 PM" },
    { start: "1:00 AM", end: "2:00 PM" },
  ];

  const subjects = [
    "MATH207",
    "MCSC202",
    "COMP204",
    "COMP231",
    "COMP232",
    "COMP207",
  ];
  try {
    axios
      .post("http://127.0.0.1:8000/student/routine/", {
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      })
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.log(error);
  }

  const schedule = {
    Sunday: [
      { period: periods[0], subject: subjects[0] },
      { period: periods[1], subject: "Break" },
      { period: periods[2], subject: subjects[1] },
      { period: periods[3], subject: subjects[1] },
    ],
    Monday: [
      { period: periods[0], subject: subjects[0] },
      { period: periods[1], subject: "Break" },
      { period: periods[2], subject: "Break" },

      { period: periods[3], subject: subjects[2] },
      { period: periods[4], subject: subjects[2] },
    ],
    Tuesday: [
      { period: periods[0], subject: subjects[3] },
      { period: periods[1], subject: "Break" },

      { period: periods[2], subject: subjects[4] },
      { period: periods[3], subject: subjects[4] },
      { period: periods[4], subject: subjects[1] },
      { period: periods[5], subject: subjects[1] },
    ],
    Wednesday: [
      { period: periods[0], subject: subjects[0] },
      { period: periods[1], subject: "Break" },

      { period: periods[2], subject: "Break" },

      { period: periods[3], subject: subjects[4] },
      { period: periods[4], subject: subjects[4] },
    ],
    Thursday: [
      { period: periods[0], subject: subjects[3] },
      { period: periods[1], subject: "Break" },
      { period: periods[2], subject: "Break" },

      { period: periods[3], subject: subjects[2] },
      { period: periods[4], subject: subjects[2] },
    ],
    Friday: [
      { period: periods[0], subject: subjects[5] },
    { period: periods[1], subject: subjects[5] },
    { period: periods[2], subject: subjects[5] },
    { period: periods[3], subject: subjects[5] },
    { period: periods[4], subject: subjects[5] },
    { period: periods[5], subject:subjects[5] },
    ],
    Saturday: [],
  };

  return (
    <>
      <Navbar />
      <div className="container ">
        <h1>Student Class Schedule</h1>
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
                {periods.map((period) => {
                  const subject = schedule[day].find(
                    (s) =>
                      s.period.start === period.start &&
                      s.period.end === period.end
                  );
                  return (
                    <td key={`${day}-${period.start}`}>
                      {subject ? subject.subject : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentRoutine;
