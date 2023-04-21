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
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  
  export default StudentEventCard;