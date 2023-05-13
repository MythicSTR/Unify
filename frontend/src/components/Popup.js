// import React from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import '../styles/Popup.css'

// const MyPopup = () => {


//     return(
//         <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position="center center" >
  
//         <div className="popup-content">
//         <form>
//       <div class="form-group">
//         <label for="batch">Batch:</label>
      
//         <select id="year" name="year" class="form-control">
//       <option value="2017">2017</option>
//       <option value="2018">2018</option>
//       <option value="2019">2019</option>
//       <option value="2020">2020</option>
//       <option value="2021">2021</option>
//       <option value="2022">2022</option>
      
//     </select>
//       </div>
//       <div class="form-group">
//         <label for="program">Program:</label>
//         <input type="text" id="program" name="program" class="form-control" />
//       </div>
    
//       <div class="form-group">
//         <label for="course-code">Course Code:</label>
//         <input type="text" id="course-code" name="course-code" class="form-control" />
//       </div>
//       <button type="submit" class="btn btn-primary">Create</button>
//     </form>
    
//         </div>
//       </Popup>
//     );
  
//     };

// export default MyPopup;



// import React, { useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import '../styles/Popup.css';

// const MyPopup = () => {
//   const [formData, setFormData] = useState({
//     batch: '',
//     program_id: '',
//     course_code: ''
//   });

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     fetch('http://127.0.0.1:8000/createclassroom/', {
//       method: 'POST',
//       body: JSON.stringify(formData),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.error(error));
//   };
  
 
//   return (
//     <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position="center center">
//       <div className="popup-content">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="batch">Batch:</label>
//             <select
//               id="year"
//               name="year"
//               className="form-control"
//               value={formData.year}
//               onChange={handleChange}
//             >
//               <option value="2017">2017</option>
//               <option value="2018">2018</option>
//               <option value="2019">2019</option>
//               <option value="2020">2020</option>
//               <option value="2021">2021</option>
//               <option value="2022">2022</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="program">Program:</label>
//             <input
//               type="text"
//               id="program"
//               name="program"
//               className="form-control"
//               value={formData.program}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="course-code">Course Code:</label>
//             <input
//               type="text"
//               id="course-code"
//               name="courseCode"
//               className="form-control"
//               value={formData.courseCode}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Create
//           </button>
//         </form>
//       </div>
//     </Popup>
//   );
// };

// export default MyPopup;

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/Popup.css';
import jwt_decode from 'jwt-decode';


const MyPopup = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.user_id;
  const [formData, setFormData] = useState({
    batch: '',
    course_code: '',
    program_id: '',
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
        'Authorization': `Bearer ${token}` // include the JWT token in the headers
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
  
 
  return (
    <Popup trigger={<button className='popup-plus'><span className='literallyplus'>+</span></button>} position="center center">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="batch">Batch:</label>
            <select
              id="batch"
              name="batch"
              className="form-control"
              value={formData.batch}
              onChange={handleChange}
            >
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="program">Program:</label>
            <input
              type="text"
              id="program_id"
              name="program_id"
              className="form-control"
              value={formData.program_id}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="course_code">Course Code:</label>
            <input
              type="text"
              id="course_code"
              name="course_code"
              className="form-control"
              value={formData.course_code}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default MyPopup;
