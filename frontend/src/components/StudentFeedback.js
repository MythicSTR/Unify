import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Navbar from "./AdminNavbar";
import { getCookie } from "../utils.js";
function StudentFeedback() {
  const [setSchool] = useState("");
  const [comment, setComment] = useState("");
  const [setdepartment] = useState("");
  const [setTopic] = useState("");

  const topic = ["Lecture", "Grade", "Assignment", "Attendence"];
  const school = [
    "School of Arts",
    "School of Education",
    "School of Engineering",
    "School of Management",
    "School of Science",
  ];
  const department = {
    "School of Education": [
      "Continuing and Professional Education Program (CPEP)",
      "Department of Development Education",
      "Department of Educational Leadership",
      "Department of Language Education",
      "Department of STEAM Education",
      "Research and Innovation Center (RIC)",
      "Writing and Communication Center",
    ],

    "School of Arts": [
      "Department of Arts and Design",
      "Department of Development Studies",
      "Department of Languages and Mass Communication",
      "Department of Music",
    ],

    "School of Engineering": [
      "Department of Chemical Science and Engineering",
      "Department of Civil Engineering",
      "Department of Computer Science and Engineering",
      "Department of Electrical and Electronics Engineering",
      "Department of Geomatics Engineering",
      "Department of Mechanical Engineering",
    ],

    "School of Management": [
      "Department of Finance, Economics and Accounting",
      "Department of Human Resource and General Management",
      " Department of Management Informatics and Communication",
      "Department of Management Science and Information",
      "Department of Marketing and Entrepreneurship",
    ],

    "School of Science": [
      "Department of Biotechnology",
      "Department of Environmental Science and Engineering",
      "Department of Life Sciences",
      "Department of Mathematics",
      "Department of Pharmacy",
      "Department of Physics",
    ],
  };
  const [selectedschool, setSelectedschool] = useState("");
  const [selectedtopic, setSelectedtopic] = useState("");
  console.log(selectedschool);
  console.log(selectedtopic);

  const FeedbackInfo = async () => {
    let formField = new FormData();

    formField.append("topic", topic);
    formField.append("comment", comment);
    formField.append("department", department);
    formField.append("school", school);

    try {
      axios
        .post("http://127.0.0.1:8000/api/feedback/", formField, {
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
      <div class="form-group">
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
      </div>

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
          onClick={FeedbackInfo}
        />
      </div>
    </div>
  );
}

export default StudentFeedback;
