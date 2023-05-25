import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../components/FacultyNavbar";
import { getCookie } from '../utils.js';
import "../styles/StudentRoutine.css";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem("jwtToken")
const user = jwtDecode(token)

function CreateRoutine() {
    const [departments, setDepartments] = useState([]);
    const [selectivePrograms, setSelectivePrograms] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [blockNumber, setBlockNumber] = useState("");

    const [selectedCells, setSelectedCells] = useState([]);

    const [routine, setRoutine] = useState([]);
    const [preRoutine, setPreRoutine] = useState([]);

    const isEqual = (obj1, obj2) => {
        for (let key in obj1) {
            if (obj1[key] !== obj2[key]) {
            return false;
            }
        }
        return true;
    };

    const handleCellClick = (rowIndex, columnIndex) => {
        const clickedCell = { rowIndex, columnIndex };

        if (isSelected(clickedCell)) {
            setSelectedCells(selectedCells.filter(cell => !isEqual(cell, clickedCell)));
        } else {
            const lastSelectedCell = selectedCells[selectedCells.length - 1];
            const isContinuous =
            lastSelectedCell &&
            lastSelectedCell.rowIndex === rowIndex &&
            Math.abs(lastSelectedCell.columnIndex - columnIndex) === 1;

            setSelectedCells(isContinuous ? [...selectedCells, clickedCell] : [clickedCell]);
        }
    };

    const isSelected = (cell) => {
        return selectedCells.some((selectedCell) => isEqual(selectedCell, cell));
    };

    const getRowCells = (rowIndex) => {
        return timeInHours.map((time, columnIndex) => ({
            rowIndex,
            columnIndex,
        }));
    };

    const handleCellMouseEnter = (rowIndex, columnIndex) => {
        if (selectedCells.length === 1) {
            const startRowIndex = selectedCells[0].rowIndex;
            const startColumnIndex = selectedCells[0].columnIndex;

            const selectedRange = [];

            // Check if cells are in the same row and within the range of the start and current cell
            if (rowIndex === startRowIndex) {
                const start = Math.min(startColumnIndex, columnIndex);
                const end = Math.max(startColumnIndex, columnIndex);

                for (let i = start; i <= end; i++) {
                    selectedRange.push({ rowIndex, columnIndex: i });
                }
            }

            setSelectedCells(selectedRange);
        }
    };

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ]

    const timeInHours = [7, 8, 9, 10, 11, 12, 13, 14, 15]

    const fetchRoutine = async() => {
        const requestData = {
            dept_id: selectedDepartment,
            batch: selectedBatch,
            program_id: selectedProgram,
            user_id : user.user_id,
            dept_id : user.dept_id
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
            setPreRoutine(responseData);
            
            console.log(responseData)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/departmentlist/")
            .then(response => {
                setDepartments(response.data);
                console.log(response.data);
            })      
            .catch(error => {
                console.error('Error fetching departments:', error);
            });

        axios.get("http://127.0.0.1:8000/programlist/")
            .then(response => {
                setPrograms(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching programs:', error);
            });

    }, [])

    useEffect(() => {
        setSelectivePrograms(programs.filter(program => program.dept_id === (departments.find(dept => dept.name === selectedDepartment)).department_id));
    }, [selectedDepartment])

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    }

    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);
    }

    const handleBatchChange = (event) => {
        setSelectedBatch(event.target.value)
    }

    const calculateSelectedPeriod = () => {
        const selectedRows = new Set();
        const selectedColumns = new Set();

        selectedCells.forEach((cell) => {
            selectedRows.add(cell.rowIndex);
            selectedColumns.add(cell.columnIndex);
        });

        const minRowIndex = Math.min(...selectedRows);
        const maxRowIndex = Math.max(...selectedRows);

        const minColumnIndex = Math.min(...selectedColumns);
        const maxColumnIndex = Math.max(...selectedColumns);

        const startTime = timeInHours[minColumnIndex];
        const endTime = timeInHours[maxColumnIndex] + 1;

        const day = daysOfWeek[minRowIndex];

        return {
            day: day,
            start_time: startTime,
            end_time: endTime,
        };
    };

    const handleSubmit = (event) => {
        const timeData = calculateSelectedPeriod();
        setRoutine([...routine, {
            week_day: timeData.day,
            start_time: timeData.start_time,
            end_time: timeData.end_time,
            course: courseCode
        }])
    
        console.log(routine)
    }

    const saveRoutine = async (event) => {
        const routineData = {
            _routine: routine,
            dept_id: (departments.find(dept => dept.name === selectedDepartment)).department_id,
            program_id: (programs.find(program => program.name === selectedProgram)).id,
            batch: selectedBatch,
            block_no: blockNumber
        }

        console.log(programs)

        try {
            const response = await fetch('http://localhost:8000/routine/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(routineData)
            });
        } catch (error) {
            console.log("Error sending data:", error);
        }
    }

    const deleteRoutine = async (event) => {
        const cellData = calculateSelectedPeriod();

        try {
            const response = await fetch('http://localhost:8000/updateRoutine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    department: selectedDepartment,
                    program: selectedProgram,
                    batch: selectedBatch,
                    day: cellData.day,
                    start_time: cellData.start_time,
                    end_time: cellData.end_time
                })
            });
        } catch (error) {
            console.log("Error sending data:", error);
        }
    }
/*
    const mergeCells = (rowData) => {

  let currentCell = null;
  let spanCount = 1;

  for (let i = 0; i < rowData.length; i++) {
    const cellValue = rowData[i];

    if (currentCell === null) {
      currentCell = {
        value: cellValue,
        span: 1,
      };
    } else if (currentCell.value === cellValue && cellValue !== '---') {
      currentCell.span += 1;
      spanCount = currentCell.span;
    } else {
      mergedCells.push(currentCell);
      currentCell = {
        value: cellValue,
        span: 1,
      };
    }

    // Handle last column separately to avoid skipping
    if (i === rowData.length - 1) {
      if (cellValue === currentCell.value && cellValue !== '---') {
        currentCell.span += 1;
      } else if (cellValue !== '---') {
        mergedCells.push(currentCell);
        currentCell = {
          value: cellValue,
          span: 1,
        };
      }
      mergedCells.push(currentCell);
    }
  }

  // Update the span of the last merged cell to cover remaining columns
  if (spanCount !== timeInHours.length && currentCell !== null && currentCell.value !== '---') {
    currentCell.span += timeInHours.length - spanCount;
  }

  return mergedCells;
};
*/

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

    for (let i = 0; i < preRoutine.length; i++) {
        const timetableItem = preRoutine[i];

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
            <div className="create-routine-container">
                <div className="dropdown-container">
                    <select className="dropdown" id="Department" value={selectedDepartment} onChange={handleDepartmentChange}>
                        <option value="">--Select Department--</option>
                        {departments.map((department, index) => (
                            <option value={department.name}>{department.name}</option>
                        ))}
                    </select>

                    <select className="dropdown" id="Program" value={selectedProgram} onChange={handleProgramChange}>
                        <option value="">--Select Program--</option>
                        {selectivePrograms.map((program, index) => (
                            <option value={program.name}>{program.name}</option>
                        ))}
                    </select>

                    <select className="dropdown" id="Batch" value={selectedBatch} onChange={handleBatchChange}>
                        <option value="">--Select Batch--</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                    <button onClick={() => fetchRoutine()}>Load</button>
                </div>
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
                                <tr className="row100" key={rowIndex}>
                                    <td className={`column100 column${rowIndex + 1}`}>{day}</td>
                                    {mergedCells.map((cell, columnIndex) => {
                                            const cellKey = `${rowIndex} - ${columnIndex}`
                                            const isSelectedCell = isSelected({rowIndex, columnIndex})
                                            const isFirstMergedCell = columnIndex === cell.startIndex;

                                            return (
                                                <td
                                                    key={cellKey}
                                                    className={`column100 column${columnIndex + 2}
                                                                ${isSelectedCell ? "selected" : ""}
                                                                 ${isFirstMergedCell ? "merged" : ""}`}
                                                    colSpan={cell.span}
                                                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                                                >
                                                    {cell.value}
                                                </td>
                                            )
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                </div>
                <div className="class-form-field-container">
                        <input
                            type="text"
                            value={courseCode}
                            placeholder="e.g. COMP 207"
                            onChange={(e) => setCourseCode(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            value={blockNumber}
                            placeholder="e.g. 9"
                            onChange={(e) => setBlockNumber(e.target.value)}
                        />
                        <button onClick={() => handleSubmit()}>Create</button>

                        <button onClick={() => saveRoutine()}>Save</button>
                </div>
            </div>
        </>
    )
}

export default CreateRoutine;