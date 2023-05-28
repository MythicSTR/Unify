import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/Enrollment.css";
import Navbar from "../Faculty/FacultyNavbar";
import jwtDecode from "jwt-decode";

const tok = localStorage.getItem('jwtToken')
const token = jwtDecode(tok)

function Enrollment() {
  const [course_code, setCourse] = useState("");
  const [studentid, setStudent] = useState("");
  const [enrollment_date, setEdate] = useState("");

  const navigate = useNavigate();

  const EnrollmentInfo = async () => {
    let formField = new FormData();

    formField.append("student", studentid);
    formField.append("course", course_code);
    formField.append("enrollment_date", enrollment_date);

    try{
      const response = await fetch('http://localhost:8000/enrollment/',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        course_code : course_code,
        student_id : studentid,
        enroll_date : enrollment_date,
        teacher_id : token.user_id
      })
    });

    const get_response = await response.json();
    console.log(get_response);
    if(get_response.message==='already enrolled'){
      alert("Student is already enrolled in the class.")
    }
    if(get_response.message==='succesfully enrolled'){
      alert("Student sucessfully enrolled in the class.")
    }
    if(get_response.message==='Invalid'){
      alert("Error in enrollment. Please try again later. Thank you.")
    }
    }catch (error){
      console.log(error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Student Code
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="e.g. SUSSCS200010"
          name="student"
          value={studentid}
          onChange={(e) => setStudent(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea2" class="form-label">
          Course Code
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder="e.g. COMP 232"
          name="course"
          value={course_code}
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
          placeholder="YYYY-MM-DD"
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
    </div>
  );
}

export default Enrollment;
