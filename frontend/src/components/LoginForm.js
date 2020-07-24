import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Form.scss";

const LoginForm = (props) => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked((prev) => !prev);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form className="form" onSubmit={(e) => props.handleLogin(e, formdata)}>
      <label className="form--label" htmlFor="username">
        Enter your Username
      </label>
      <input
        className="form--input"
        type="text"
        name="username"
        value={formdata.username}
        onChange={handleChange}
      />
      <label className="form--label" htmlFor="password">
        Enter your Password
      </label>
      <input
        className="form--input"
        type="password"
        name="password"
        value={formdata.password}
        onChange={handleChange}
      />
      <input
        className="form--checkbox-input"
        type="checkbox"
        name="keepsignin"
        id="keepsignin"
      />
      <label
        className="form--label"
        htmlFor="keepsignin"
        onClick={handleCheckbox}
      >
        Keep me signed in
        <div className="form--checkbox-label"></div>
      </label>
      <span className="form--label">Or Sign in with</span>
      <div className="login-icons">
        <a href="#" className="login-icon">
          #
        </a>
        <a href="#" className="login-icon">
          #
        </a>
      </div>
      <input type="submit" />
      <a className="button-standard" href="#">
        Not a member? Sign up here
      </a>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
