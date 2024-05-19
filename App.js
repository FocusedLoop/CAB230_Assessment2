import './App.css';
import { Alert, Nav, Navbar } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import {NavbarBrand, NavItem, NavLink } from 'reactstrap';
import React, { useState } from "react";

// Base app that is run to load the site
// The base app contains the navbar that all pages have at the top
// The navbar allows for navigation across the site
// Reference - (React, 2024)
function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  // Check if the user is logged in by checking if the token is present
  // Refresh the page when the token is checked or removed
  const userLogin = () => {
    if (localStorage.getItem('token') != null) {
      window.location.reload();
      setLoggedIn(true);
    }
  };

  // Logout the user from the site and delete the current token
  const userLogout = () => {
    window.location.reload();
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  // Return a Navbar to allow for navigation on top of the other pages, navbar is stylised using from properties in App.css
  // Remove the registration option and swap login with logout when the user is logged in
  return (
    <div className="App">
      <Navbar color="dark" dark expand="md" fixed='top'>
        <NavbarBrand href="/">Find My Volcano</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/volcanoes">Volcanoes</NavLink>
          </NavItem>
          <NavItem>
            {loggedIn ? (
              <NavLink onClick={userLogout}>Logout</NavLink>
            ) : (
              <NavLink onClick={userLogin} tag={Link} to="/login">Login</NavLink>
            )}
          </NavItem>
          {!loggedIn && (
            <NavItem>
              <NavLink tag={Link} to="/register">Register</NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

// Allow the function to be imported by other files
export default App;