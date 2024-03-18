import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: left;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavBar = () => {
  return (
    <Nav>
      <Logo>My Logo</Logo>
      <ul>
        <NavItem><a href="/">Home</a></NavItem>
        <NavItem><a href="/">About</a></NavItem>
        <NavItem><a href="/">Services</a></NavItem>
        <NavItem><a href="/">Contact</a></NavItem>
      </ul>
    </Nav>
  );
};

export default NavBar;