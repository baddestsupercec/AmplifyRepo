import React from "react";
import styled from "styled-components";
import { Button } from "@aws-amplify/ui-react";
import "./NavBar.css";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color: #8fc583;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;
  display: inline;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;
    align-items: center;

    &:hover {
      text-decoration-line: underline;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavBar = (signOut) => {
  return (
    <Nav>
      <Logo>Nature Nanny</Logo>
      <ul>
        <NavItem>
          <a href="/">Home</a>
        </NavItem>
        <NavItem>
          <a href="/history">History</a>
        </NavItem>
        <NavItem>
          <a href="/settings">Settings</a>
        </NavItem>
      </ul>
    </Nav>
  );
};

export default NavBar;
