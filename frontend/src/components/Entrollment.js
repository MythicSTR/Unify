import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";

function Enrollment() {
  const [enrollment_id, setEId] = useState();
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [enrollment_date, setEdate] = useState("");

  const navigate = useNavigate();

  const EnrollmentInfo = async () => {
    let formField = new FormData();

    formField.append("enrollment_id", enrollment_id);
    formField.append("student", student);
    formField.append("course", course);
    formField.append("enrollment_date", enrollment_date);

    try {
      axios
        .post("http://127.0.0.1:8000/api/entrollment/", formField, {
          headers: { "X-CSRFToken": getCookie("csrftoken") },
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
      <div className="form-group">
        <label for="exampleFormControlInput1" className="form-label">
          Enrollment ID
        </label>
        <input
          type="text"
          className="form-control w-100"
          placeholder="1"
          name="enrollment_id"
          value={enrollment_id}
          onChange={(e) => setEId(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Student
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Name"
          name="student"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="form-label">
          Course
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="Course Name"
          name="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea3" class="form-label">
          Date of Enrollment
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="YYY-MM-DD"
          name="Enrollment_date"
          value={enrollment_date}
          onChange={(e) => setEdate(e.target.value)}
        />
      </div>
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={EnrollmentInfo}
        />
      </div>
    </div>
  );
}

export default Enrollment;
