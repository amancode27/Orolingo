import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./Form.scss"

const SignupForm = (props) => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form className="form" onSubmit={(e) => props.handleSignup(e, formdata)}>
      <label className="form--label" htmlFor="username">Username</label>
      <input
        className="form--input"
        type="text"
        name="username"
        value={formdata.username}
        onChange={handleChange}
      />
      <label className="form--label" htmlFor="password">Password</label>
      <input
        className="form--input"
        type="password"
        name="password"
        value={formdata.password}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
