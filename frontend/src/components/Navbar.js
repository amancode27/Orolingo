import React from "react";
import PropTypes from "prop-types";
import Link from "./Navlink";
import "./Navbar.scss";

const Navbar = (props) => {
  return (
    <nav class="navbar">
      <Link link="/" linktext="Home" />
      <Link link="/services" linktext="Services" />
      <Link link="/courses" linktext="Courses" />
      <Link link="/about" linktext="About us" />
      <Link link="/login" linktext="Login" />
    </nav>
  );
};

export default Navbar;
