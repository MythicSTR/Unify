import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
      <li><Link to="/teacher/home">Home</Link></li>
      <li><Link to="/teacher/routine">Routine</Link></li>
      <li><Link to="/teacher/attendance">Attendance</Link></li>
      <li><Link to="/teacher/events">Events</Link></li>
      </ul>
      <div className="navbar-profile">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </nav>
  );
}

export default Navbar;
