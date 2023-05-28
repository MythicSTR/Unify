import React from 'react';
import "../styles/StudentList.css"

const StudentList = ({ students }) => {
  return (
    <table className="student-table">
      <thead>
        <tr>
        <th>Roll No</th>
          <th>Name</th>
          
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.rollNumber}>
          <td>{student.rollNumber}</td>
            <td>{student.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
