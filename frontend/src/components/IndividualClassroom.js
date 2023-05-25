import React from "react";
import "../styles/IndividualClassroom.css"
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const IndividualClassroom = (props) => {
  const token = localStorage.getItem("jwtToken");
  const user = jwt_decode(token);

  return (


    <div className="individual-classroom-card-container">
      <div className="individual-classroom-card-inner">
      <p className="course-id">{props.course_code}</p>
      <p className="program-id">{props.program_id}
      <p className="batch">{props.batch}</p></p>
      <hr/>
      <div className="link-decoration">

      <div>
        {user.isStudent && <Link to={`/student/classroom/${props.course_code}`}>Go to classroom
        </Link>}
        </div>
        <div onClick={sessionStorage.setItem("class_id",props.id)}>
        {!user.isStudent && <Link to={`/faculty/classroom/${props.course_code}`}>Go to classroom
        </Link>}
        </div>
        </div>
      </div>
    </div>
  );
};


  
export default IndividualClassroom;

