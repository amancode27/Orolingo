import React from "react";
import { Link } from "react-router-dom";

const Navlink = (props) => {
  return (
    props.link === "/login" ? (
      <Link to={props.link} className="navbar--link navbar--btn">Log in</Link>
    ) : (
      <Link to={props.link} className="navbar--link">{props.linktext}</Link>
    )
  );
};

export default Navlink;
