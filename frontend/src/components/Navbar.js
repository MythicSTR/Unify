import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
    background-color: #24252a;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
    padding: 2vh 2rem;
    font-family: sans-serif;
    font-size: 14px;
    text-decoration: none;
    color: #ffffff;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ffffff;
        color: #000000;
    }

    &.active {
      background-color: #3583dc;
      color: #ffffff;
    }
`;

const navigationItems = [
  {path: 'admin/', label: 'Dashboard', isAdmin:true},
  {path: 'admin/school/', label: 'School', isAdmin:true},
  {path: 'admin/department/', label: 'Department', isAdmin:true},
  {path: 'admin/faculty/', label: 'Faculty', isAdmin:true},
  {path: 'admin/course/', label: 'Course', isAdmin:true},
  {path: 'admin/student/', label: 'Student', isAdmin:true},
  {path: 'admin/room/', label: 'Room', isAdmin:true},
  {path: 'admin/enrollment/', label: 'Enrollment', isAdmin:true},
  {path: 'admin/event/', label: 'Event', isAdmin:true},
  {path: 'admin/coordinator', label: 'Coordinator', isAdmin:true},

  {path: 'faculty/', label: 'Dashboard', isFaculty:true},
  {path: 'faculty/attendance/', label: 'Attendance', isFaculty:true},
  {path: 'faculty/enroll/', label: 'Enroll', isFaculty:true},
  {path: 'faculty/events/', label: 'Events', isFaculty:true},
  {path: 'faculty/routine/', label: 'Routine', isFaculty:true},
  {path: 'faculty/report/', label: 'Report', isFaculty:true},
  {path: 'faculty/classroom/', label: 'Classroom', isFaculty:true},

  {path: 'student/', label: 'Dashboard', isStudent: true},
  {path: 'student/events/', label: 'Events', isStudent: true},
  {path: 'student/routine/', label: 'Routine', isStudent: true},
  {path: 'student/attendance/', label: 'Attendance', isStudent: true},
  {path: 'student/classroom/', label: 'Classroom', isStudent: true},
  {path: 'student/feedbacks/', label: 'Feedback', isStudent: true},
  {path: 'student/messages/', label: 'Message', isStudent: true},
]

const Navbar = ({ user }) => {
  const filteredNavigationItems = navigationItems.filter(
    item => (item.isAdmin && user.isAdmin) ||
            (item.isFaculty && user.isFaculty) ||
            (item.isStudent && user.isStudent)
  );

  return (
    <StyledNav>
      {filteredNavigationItems.map(item => (
        <StyledNavLink
          key={item.path}
          to={item.path}
          activeClassName="active"
        >
          {item.label}
        </StyledNavLink>
    ))}
    </StyledNav>
  )
}

export default Navbar