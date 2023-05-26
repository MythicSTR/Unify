// import React, { useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import '../styles/Popup.css';
// import jwt_decode from 'jwt-decode';

//   const ClassroomCodeEnroll = () => {
//     const token = localStorage.getItem('jwtToken');
//     const decodedToken = jwt_decode(token);
//     const userId = decodedToken.user_id;
//     const code = "your_code_value"; // Replace "your_code_value" with the actual code
  
//     const handleSubmit = async () => {
//       // Prepare the data to be sent
//       const data = {
//         code: code,
//         user_id: userId
//       };
  
//       // Send the request to the backend API
//       try {
//         const response = await fetch("http://127.0.0.1:8000/enroll/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(data)
//         });
  
//         if (response.ok) {
//           // Enrollment successful
//           console.log("Enrollment successful");
//         } else {
//           // Error occurred
//           console.error("Enrollment failed");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
  
  
 
//   return (
//     <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position="center center">
//       <div className="popup-content">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="course_code">Course Code:</label>
//             <input
//               type="text"
//               id="code"
//               name="code"
//               className="form-control"
//               value={formData.code}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary" >
//             Join
//           </button>
//         </form>
//       </div>
//     </Popup>
//   );
// };

// export default ClassroomCodeEnroll;

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/Popup.css';
import jwt_decode from 'jwt-decode';

const ClassroomCodeEnroll = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.user_id;
  const [code, setCode] = useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const data = {
      code: code,
      user_id: userId
    };
    console.log(data);

    // Send the request to the backend API
    try {
      const response = await fetch('http://127.0.0.1:8000/enroll/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 400) {
        // Enrollment successful
        window.alert('Enrollment successful');
        window.location.href = "/student/classroom/"
      } else if(response.status === 401){
        window.alert("You are already enrolled in this classroom")
      } else{
        // Error occurred
        window.alert('Enrollment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position='center center'>
      <div className='popup-content'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='course_code'>Course Code:</label>
            <input
              type='text'
              id='code'
              name='code'
              className='form-control'
              value={code}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Join
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default ClassroomCodeEnroll;

