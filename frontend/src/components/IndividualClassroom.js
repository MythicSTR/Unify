import React from "react";
import "../styles/IndividualClassroom.css";

const IndividualClassroom = (props) => {
  return (
    <div className="individual-classroom-card-container">
      <div className="individual-classroom-card-inner">
        <p className="course-id">{props.course_code}</p>
        <span className="program-id">{props.program_id} - <span className="batch">{props.batch}</span></span>
        
        <hr/>
      </div>
    </div>
  );
};


  
export default IndividualClassroom;

