import React from "react";
import "../styles/IndividualClassroom.css";

const IndividualClassroom = (props) => {
  return (
    <div className="individual-classroom-card-container">
      <div className="individual-classroom-card-inner">
        <p className="course-id">{props.course_code}</p>
        <hr/>
        <p className="program-id">{props.program_id}</p>
        <p className="batch">{props.batch}</p>
      </div>
    </div>
  );
};


  
export default IndividualClassroom;

