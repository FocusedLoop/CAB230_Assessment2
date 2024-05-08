import './App.css';
import { Alert, Nav, Navbar } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import {NavbarBrand, NavItem, NavLink } from 'reactstrap';
import React, { useState } from "react";


function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  const userLogin = () => {
    if (localStorage.getItem('token') != null) {
      window.location.reload();
      setLoggedIn(true);
    }
  };

  const userLogout = () => {
    window.location.reload();
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

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

export default App;