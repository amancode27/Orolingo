import React from "react";
import { Link } from "react-router-dom";

const Navlink = (props) => {
  return (
    <Link to={props.link}>
      {props.link === "/login" ? (
        <div className="navbar--link navbar--btn">Login</div>
      ) : (
        <div className="navbar--link">{props.linktext}</div>
      )}
    </Link>
  );
};

export default Navlink;
