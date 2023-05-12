import React, { useState, useEffect } from "react";
import Navbar from "../components/StudentNavbar";
import { getCookie } from "../utils.js";
import axios from "axios";
import "../styles/StudentRoutine.css";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem('jwtToken');
const user = jwtDecode(token);

function StudentRoutine() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    const fetchRoutine = async () => {
      const requestData = {
        user_id : user.user_id,
        batch: 2020,
        program_id: "CS"
      };

      try {
        const response = await fetch('http://localhost:8000/get_routine/', {
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
        setRoutineData(responseData);
        
        console.log(responseData)
      } catch (error) {
        console.error(error);
      }
  };

  fetchRoutine();
  }, [])

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  }

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]

  const timeInHours = [7, 8, 9, 10, 11, 12, 13, 14, 15]

  const getCellData = (day, time) => {
    const cell = routineData.find(
      (item) =>
        item.week_day === day && item.start_time <= time && item.end_time >= time + 1
    );

    return cell ? cell.course : "---";
  }

  const mergeCells = (rowData) => {
    const mergedCells = [];

    let currentCell = null;
    let spanCount = 1;

    for (let i = 0; i < rowData.length; i++) {
      const cellValue = rowData[i];

      if (currentCell === null) {
        currentCell = {
          value: cellValue,
          span: 1,
        };
      } else if (currentCell.value === cellValue) {
        currentCell.span += 1;
        spanCount = currentCell.span;
      } else {
        mergedCells.push(currentCell);
        currentCell = {
          value: cellValue,
          span: 1,
        };
      }

      if (i === rowData.length - 1) {
        mergedCells.push(currentCell);
      }
    }

    // Update the span of the last merged cell to cover remaining columns
    if (spanCount !== timeInHours.length) {
      mergedCells[mergedCells.length - 1].span += timeInHours.length - spanCount;
    }

    return mergedCells;
  }

  const getRowData = (day) => {
  const rowData = []; // Array to store the course values or '---'

  for (let i = 0; i < routineData.length; i++) {
    const timetableItem = routineData[i];

    if (timetableItem.week_day === day) {
      const startHour = timetableItem.start_time;
      const endHour = timetableItem.start_time + timetableItem.hours;

      for (let hour = startHour; hour < endHour; hour++) {
        const course = timetableItem.course;
        rowData[hour - 7] = course;
      }
    }
  }

  // Fill any empty time periods with '---'
  for (let i = 0; i < timeInHours.length; i++) {
    if (!rowData[i]) {
      rowData[i] = '---';
    }
  }

  return rowData;
}

  return (
    <>
      <Navbar />
      <div class="table100 ver5 m-b-110">
        <table data-vertable="ver5">
          <thead>
            <tr class="row100 head">
              <th className={'column100 column1'}></th>
              {timeInHours.map((time, index) => (
                <th className={`column100 column${index + 2}`}>{time} - {time + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, rowIndex) => {
        const rowData = getRowData(day);
        const mergedCells = mergeCells(rowData);

        return (
          <tr className="row100">
            <td className={`column100 column${rowIndex + 1}`}>{day}</td>
            {mergedCells.map((cell, cellIndex) => (
              <td
                className={`column100 column${cellIndex + 2}`}
                colSpan={cell.span}
              >
                {cell.value}
              </td>
            ))}
          </tr>
        );
      })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentRoutine;
