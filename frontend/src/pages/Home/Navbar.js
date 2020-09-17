import React from "react";
import PropTypes from "prop-types";
import Navlink from "./Navlink";
import "../style/Navbar.scss";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <Navlink link="/" linktext="Home" />
      <Navlink link="/services" linktext="Services" />
      <Navlink link="/courses" linktext="Courses" />
      <Navlink link="/about" linktext="About us" />
      <Navlink link="/login" linktext="Log In" />
      {/* <Navlink link="/profile" linktext="Profile" /> */}
    </nav>
  );
};

export default Navbar;
