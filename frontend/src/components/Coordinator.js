import { useState } from 'react';
import axios from 'axios';

import { getCookie } from '../utils.js';

function Coordinator() {
    const school = [
        "School of Engineering",
        "School of Science",
      ];
      const department = {
    
        "School of Engineering": [
          "DOCHE",
          "DOCIE",
          "DOCSE",
          "DOEEE",
          "DOGEE",
          "DOMEE",
        ],
    
        "School of Science": [
          "DOBiT",
          "DOESE",
          "DOLSc",
          "DOMAT",
          "DOPHM",
          "DOPHY",
        ],
      };
<<<<<<< Updated upstream
      const [selectedschool, setSelectedschool] = useState("School of Science");
      const [selecteddepartment, setselecteddepartment] = useState("DOBiT");
  const [email, setEmail] = useState('');
=======
      const [selectedschool, setSelectedschool] = useState("School of Engineering");
      const [selecteddepartment, setselecteddepartment] = useState("DOCHE");
      const [email, setEmail] = useState('');
      const [first_name,setFirstName] = useState('');
      const [last_name,setLastName] = useState('');
>>>>>>> Stashed changes

  const CoordinatorInfo = async () => {
    const formField = new FormData();
    formField.append('email', email);
    formField.append('selectedschool', selectedschool);
    formField.append('selecteddepartment', selecteddepartment);

    console.log(formField)

    // try {
    //   const response = await axios.post(
    //     'http://127.0.0.1:8000/admin/coordinator/',
    //     formField,
    //     {
    //       headers: { 'X-CSRFToken': getCookie('csrftoken') },
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }

<<<<<<< Updated upstream
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/admin/addcoordinator/',
        formField,
        {
          headers: { 'X-CSRFToken': getCookie('csrftoken') },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
=======
    try{
      console.log(email,school,department,first_name,last_name)
      const response = await fetch('http://localhost:8000/addcoordinator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            school : selectedschool,
            department : selecteddepartment,
            first_name : first_name,
            last_name : last_name
        })
    });

    const responseData = await response.json()
    console.log(responseData)
} catch (error) {
    console.log("Error sending data:", error);
}
    
>>>>>>> Stashed changes
  };

  return (
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
    <div className="form-group">
        <label for="exampleFormControlInput1" className="form-label">Email</label>
        <input
            type="text"
            className="form-control w-100"
            placeholder=""
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
    </div>
    <div className="form-group">
        <label for="exampleFormControlInput1" className="form-label">First Name</label>
        <input
            type="text"
            className="form-control w-100"
            placeholder=""
            name="email"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
        />
    </div>
    <div className="form-group">
        <label for="exampleFormControlInput1" className="form-label">Last Name</label>
        <input
            type="text"
            className="form-control w-100"
            placeholder=""
            name="email"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
        />
    </div>
    <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          School
        </label>
        <select
          class="form-control w-100"
          value={selectedschool}
          onChange={(e) => {
            setSelectedschool(e.target.value);
          }}
        >
          {school.map((school) => {
            return <option>{school}</option>;
          })}
        </select>
        <label
          for="exampleFormControlTextarea1"
          class="form-label"
          placeholder="Department"
        >
          Program
        </label>
        {selectedschool && (
          <select class="form-control w-100" value={selecteddepartment} onChange={(e) => {
            setselecteddepartment(e.target.value);
          }}>
            {department[selectedschool].map((department) => {
              return <option>{department}</option>;
            })}
            {selectedschool=="School of Science" && selecteddepartment=="DOCHE"?(setselecteddepartment("DOBiT")):(selecteddepartment)}
          </select>
        )}
      </div>
    <div class="row mb-3 align-self-center">
        <input
            type="submit"
            class="col btn btn-primary m-0 align-self-center"
            value="Submit"
            onClick={CoordinatorInfo}   
        />
    </div>
</div>
);
}

export default Coordinator;
