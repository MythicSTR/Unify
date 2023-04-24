import React from "react";
import PropTypes from 'prop-types';
import "../styles/StudentEventCard.css"

const StudentEventCard = ({ title, date, location, image, description }) => {
    return (
        <div>

      <div className="event-card">
        <img src={image} alt="event" className="event-card__image" />
        <div className="event-card__content">
          <div className="event-card__title">{title}</div>
          <div className="event-card__date">{date}</div>
          <div className="event-card__location">{location}</div>
          <div className="event-card__description">{description}</div>
        </div>
      </div>
    </div>
    );
  };
  
  StudentEventCard.propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
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
