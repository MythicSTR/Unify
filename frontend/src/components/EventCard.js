import React from "react";
import PropTypes from 'prop-types';
import "../styles/StudentEventCard.css"
import styled from 'styled-components';



const StudentEventCard = (props) => {
  const truncatedDescription = props.description.length > 90 
    ? props.description.slice(0, 90) + "..."
    : props.description;

    return (
          <div>
          <p className="title">{props.title}</p>
          <p className="date">{props.start_date} - {props.end_date}</p>
          <p>{truncatedDescription}</p>
          </div>
    );
  };
  
  StudentEventCard.propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    // location: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
  };
  
  export default StudentEventCard;


// import React from 'react';

// function StudentEventCard(props) {
//   const { heading, description, start_date, end_date } = props;

//   return (
//     <div>
//       <h2>{heading}</h2>
//       <p>{description}</p>
//       <p>Start date: {start_date}</p>
//       <p>End date: {end_date}</p>
//     </div>
//   );
// }

// export default StudentEventCard;
