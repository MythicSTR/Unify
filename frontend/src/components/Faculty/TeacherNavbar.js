import React from 'react';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">

          <li><Link to="/teacher/">Home</Link></li>
          <li><Link to="/teacher/routine">Routine</Link></li>
          <li><Link to="/teacher/events">Events</Link></li>
          <li><Link to="/teacher/feedback">Feedback</Link></li>
         
           
            </ul>
      <div className="navbar-profile">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </nav>
  );
}

export default Navbar;

