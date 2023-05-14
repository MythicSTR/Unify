import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import IndividualClassroom from "../components/IndividualClassroom";

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

  console.log(classrooms);
 
  return (
    <div>
    {classrooms.map((item, index) => (
      <IndividualClassroom 
        course_code={item.course_code}
        program_id={item.program_id}
        batch={item.batch}
      />
    ))}
    </div>
  );
}

export default RenderTeacherClassroom;
