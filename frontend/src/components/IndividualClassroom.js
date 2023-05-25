import React from "react";
import "../styles/IndividualClassroom.css"
import { Link } from "react-router-dom";
const IndividualClassroom = (props) => {
  return (


    <div className="individual-classroom-card-container">
      <div className="individual-classroom-card-inner">
        <p className="course-id">{props.course_code}</p>
        <p className="program-id">{props.program_id}
        <p className="batch">{props.batch}</p></p>
        <hr/>
        <Link to={`/student/classroom/${props.course_code}`}>View Details</Link>
      </div>
    </div>
  );
};


  
export default IndividualClassroom;

