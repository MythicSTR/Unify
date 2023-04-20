import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";
function TeacherFeedback() {
  const [comment, setComment] = useState("");
  const [setTopic] = useState("");
  const [Student, setStudent] = useState("");

  const topic = ["", "Grade", "Behaviour", "Assignment", "Attendence"];

  const [selectedtopic, setSelectedtopic] = useState("");
  console.log(selectedtopic);

  const TeacherFeedbackInfo = async () => {
    let formField = new FormData();

    formField.append("topic", topic);
    formField.append("comment", comment);
    formField.append("student", Student);

    try {
      const response = await fetch("http://localhost:8000/Teacherfeedback/", {
        method: "POST",
        headers: "application/json",
        body: JSON.stringify({
          topic: topic,
          comment: comment,
          student: Student,
        }),
      });
      const get_response = response.json();
      console.log(get_response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border w-25 p-4 position-absolute top-50 start-50 translate-middle">
      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Student Code
        </label>
        <input
          type="text"
          class="form-control w-100"
          placeholder=""
          name="student"
          value={Student}
          onChange={(e) => setStudent(e.target.value)}
        />
      </div>

      {/* <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          School
        </label>
        <select
          class="form-control w-100"
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
          Department
        </label>
        {selectedschool && (
          <select class="form-control w-100">
            {department[selectedschool].map((department) => {
              return <option>{department}</option>;
            })}
          </select>
        )}
      </div> */}

      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Topic
        </label>
        <select
          class="form-control w-100"
          onChange={(e) => {
            setSelectedtopic(e.target.value);
          }}
        >
          {topic.map((topic) => {
            return <option>{topic}</option>;
          })}
        </select>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1" class="form-label">
          Feedback
        </label>
        <div className="comment">
          <textarea
            name="message"
            rows="7"
            placeholder=""
            required
            class="form-control w-100"
          ></textarea>
        </div>
      </div>
      <div class="row mb-3 align-self-center">
        <input
          type="submit"
          class="col btn btn-primary m-0 align-self-center"
          value="Submit"
          onClick={TeacherFeedbackInfo}
        />
      </div>
    </div>
  );
}

export default TeacherFeedback;
