import React from "react";
import Navbar from "../components/TeacherNavbar"
import MyCalendar from "../Calendar";
import StudentList from '../components/StudentList';

function TeacherAttendance(){
    const students = [
        { id: 1, name: 'John Doe', rollNumber: '01' },
        { id: 2, name: 'Jane Doe', rollNumber: '02' },
        { id: 3, name: 'Bob Smith', rollNumber: '03' },
        { id: 4, name: 'Emily Brown', rollNumber: '04' },
        { id: 5, name: 'Jack Johnson', rollNumber: '05' },
        { id: 6, name: 'Sarah Lee', rollNumber: '06' },
        { id: 7, name: 'Mike Davis', rollNumber: '07' },
        { id: 8, name: 'Lisa Kim', rollNumber: '08' },
        { id: 9, name: 'David Lee', rollNumber: '09' },
        { id: 10, name: 'Amy Nguyen', rollNumber: '10' },
        { id: 11, name: 'Matt Johnson', rollNumber: '11' },
        { id: 12, name: 'Lucy Chen', rollNumber: '12' },
        { id: 13, name: 'Andrew Davis', rollNumber: '13' },
        { id: 14, name: 'Olivia Lee', rollNumber: '14' },
        { id: 15, name: 'Ethan Wilson', rollNumber: '15' },
        { id: 16, name: 'Isabella Nguyen', rollNumber: '16' },
        { id: 17, name: 'Michael Smith', rollNumber: '17' },
        { id: 18, name: 'Grace Davis', rollNumber: '18' },
        { id: 19, name: 'Christopher Brown', rollNumber: '19' },
        { id: 20, name: 'Sophia Chen', rollNumber: '20' },
        { id: 21, name: 'William Wilson', rollNumber: '21' },
        { id: 22, name: 'Victoria Lee', rollNumber: '22' },
        { id: 23, name: 'Daniel Davis', rollNumber: '23' },
        { id: 24, name: 'Chloe Kim', rollNumber: '24' },
        { id: 25, name: 'Alex Jones', rollNumber: '25' },
        { id: 26, name: 'Natalie Johnson', rollNumber: '26' },
        { id: 27, name: 'Kevin Smith', rollNumber: '27' },
        { id: 28, name: 'Samantha Lee', rollNumber: '28' },
        { id: 29, name: 'Jacob Nguyen', rollNumber: '29' },
        { id: 30, name: 'Alice Jones', rollNumber: '30' },
      ];
      
    
     
    return(
        <div>
            <Navbar/>
            <div>
            <h2>Student List</h2>
            <StudentList students={students} />
          </div>
            <MyCalendar/>
        </div>
    );
}

export default TeacherAttendance;