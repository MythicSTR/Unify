import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/Popup.css';
import jwt_decode from 'jwt-decode';


const ClassroomCodeEnroll = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.user_id;
  const [formData, setFormData] = useState({
    code: '',
    user_id: userId // add user_id to the initial state
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/createclassroom/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if(data.message === "working"){
          const response = window.confirm(`${formData.course_code} class for ${formData.program_id} ${formData.batch} created`);
          if(response){
            window.location.href = "/student/classroom";
                    }          
        }
        else
        window.alert(`Error while joining class`);
      })
      .catch(error => console.error(error));
  
  };
  
 
  return (
    <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position="center center">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="course_code">Course Code:</label>
            <input
              type="text"
              id="code"
              name="code"
              className="form-control"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" >
            Join
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default ClassroomCodeEnroll;
