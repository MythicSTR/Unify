import React, { useEffect, useState } from "react";
import SNavbar from "./Student/StudentNavbar";
import TNavbar from "./Faculty/FacultyNavbar";
import "../styles/Base.css";
import GetImage from "./GetImage";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Base(props) {
  const { course_code } = useParams();
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);
  const [inputData, setInputData] = useState("");
  const [notices, setNotices] = useState([]);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const DeleteClass = () => {
    const deleteClassroomData = {
      id:sessionStorage.getItem("class_id")
    }
    let decision = window.confirm("Are you sure you want to delete the classroom?");
    if(decision){
      fetch("http://localhost:8000/deleteclassroom/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deleteClassroomData)
      })
      
        .then(response => {
          if (response.status === 400) {
            window.alert("Class deleted successfully!");
            window.location.href = "/faculty/classroom";
          
          } else{
            window.alert("Sorry Couldn't delete the classroom");
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
      
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      notice: inputData,
      course_code: course_code,
      user_id: user.user_id
    };
    fetch("http://localhost:8000/addclassnotice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 400) {
          let foo = window.confirm("Notice added to the class!");
        if(foo){
            window.location.reload();
        }
        } else {
          console.error("Error:", response.statusText);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const idForTeacherNotices = {
    id: sessionStorage.getItem("class_id")
  };

  useEffect(() => {
    fetch("http://localhost:8000/gettnotices/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(idForTeacherNotices)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching notices.");
        }
      })
      .then(data => {
        setNotices(data);
        console.log(notices);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const dataForStudentNotice = {
    id: user.user_id,
    course_code:course_code
  };
  useEffect(() => {
    fetch("http://localhost:8000/getsnotices/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataForStudentNotice)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching notices.");
        }
      })
      .then(data => {
        setNotices(data);
        console.log(notices);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
        {user.isStudent && <SNavbar/>}
        {!user.isStudent && <TNavbar/>}
    <div className="main-base-container">
        <h4>Welcome to class {course_code}</h4>
        </div>
        <div className="image-class-delete-btn">
        <GetImage />
        <button className="dlt-btn" onClick={DeleteClass}>Delete Classroom</button>
        </div>
      <div>
      </div>
      <div className="base-notice-section">
        <h3>Notices</h3>
        {!user.isStudent && (
          <div>
           
            <div className="notice-blocks">
              {notices.map((notice, index) => (
                <div className="notice-block" key={index}>
                  {notice.notice}
                </div>
              ))}
            </div>
          </div>
        )}
                
        {user.isStudent && (
            <div>
           
            <div className="notice-blocks">
              {notices.map((notice, index) => (
                <div className="notice-block" key={index}>
                  {notice.notice}
                </div>
              ))}
            </div>
          </div>
        )}


        {!user.isStudent && (
          <div className="notice">
            <form onSubmit={handleSubmit}>
              <label htmlFor="inputData">Add a notice:</label>
              <input
                type="text"
                id="inputData"
                className="notice-input-field"
                name="inputData"
                value={inputData}
                onChange={handleInputChange}
                style={{ width: "50rem", height: "7rem" }}
              />
              <button type="submit" className="Submit-Button-Notice" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Base;
