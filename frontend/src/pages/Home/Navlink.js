import React from "react";
import { Link } from "react-router-dom";

const Navlink = (props) => {
  return (
    <div>
    {props.link === "/login" || props.link === "/profile"? (
      <Link to={props.link} className="navbar--link navbar--btn">{props.linktext}</Link>
    ) : (
      <Link to={props.link} className="navbar--link">{props.linktext}</Link>
    )}
    </div>
  );
};

export default Navlink;
