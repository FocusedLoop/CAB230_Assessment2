import './App.css';
import { Alert, Nav, Navbar } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLogin from './containers/LoginPage';
import UserRegistration from './containers/RegisterPage';
import HomePage from './containers/HomePage';
import ListedVolcanoes from './containers/VolcanoList';
import { Routes, Route, Link } from "react-router-dom";
import {NavbarBrand, NavItem, NavLink } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">My App</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/volcanoes">Volcanoes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/register">Register</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default App;