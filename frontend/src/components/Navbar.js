import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
    background-color: #24252a;
    color: #ffffff;
`;

const StyledLink = styled(Link)`
    padding: 1rem 1rem;
    text-decoration: none;
    color: #ffffff;

    &:hover {
        background-color: #3583dc;
    }
`;

const Navbar = ({ user }) => {
  return (
    <StyledNav>
        {user.isAdmin && <StyledLink to>Dashboard</StyledLink>}
    </StyledNav>
  )
}

export default Navbar