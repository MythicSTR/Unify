import { useState } from 'react';
import axios from 'axios';

import { getCookie } from '../utils.js';

function Course() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const CourseInfo = async () => {
    const formField = new FormData();
    formField.append('course_id', id);
    formField.append('course_name', name);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/admin/course/',
        formField,
        {
          headers: { 'X-CSRFToken': getCookie('csrftoken') },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
    <div className="form-group">
        <label for="exampleFormControlInput1" className="form-label">Course Name</label>
        <input
            type="text"
            className="form-control w-100"
            placeholder=""
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </div>
    <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">Code</label>
        <input
            type="text"
            class="form-control w-100"
            placeholder=""
            
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
        />
    </div>
    <div class="row mb-3 align-self-center">
        <input
            type="submit"
            class="col btn btn-primary m-0 align-self-center"
            value="Submit"
            onClick={CourseInfo}   
        />
    </div>
</div>
);
}

export default Course;
