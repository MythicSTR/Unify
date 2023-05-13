import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function RenderTeacherClassroom() {
  const token = localStorage.getItem('jwtToken');
  const [userId, setUserId] = useState('');
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const decodedToken = jwt_decode(token);
    setUserId(decodedToken.user_id);
  }, [token]);

  useEffect(() => {
    fetch('http://localhost:8000/get_teacher_classroom/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: userId }) 
    })
      .then(response => response.json())
      .then(data => setClassrooms(data))
      .catch(error => console.log(error));
  }, [userId]);

  return (
    <div>
      {classrooms.map(classroom => (
        <div key={classroom.course_code}>
          <h2>{classroom.course_code}</h2>
          <p>{classroom.program_id} - {classroom.batch}</p>
        </div>
      ))}
    </div>
  );
}

export default RenderTeacherClassroom;
