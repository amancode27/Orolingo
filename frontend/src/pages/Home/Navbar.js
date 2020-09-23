import React from "react";
import PropTypes from "prop-types";
import Navlink from "./Navlink";
import "../style/Navbar.scss";
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <nav className="navbar">
      <Navbar dark expand="md">
      <NavbarBrand className="mr-auto" >{''}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar style={{marginBottom: "-10px" }}>
            <NavItem>
              <Navlink link="/" linktext="Home" /> 
            </NavItem>
            <NavItem>
              <Navlink link="/services" linktext="Services" />
            </NavItem>
            <NavItem>
              <Navlink link="/courses" linktext="Courses" />
            </NavItem>
            <NavItem>
              <Navlink link="/about" linktext="About us" />
            </NavItem>
            <NavItem>
              <Navlink link="/login" linktext="Log In" />
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar>
      {/* <Navlink link="/profile" linktext="Profile" /> */}
    </nav>
  );
};

export default NavBar;
