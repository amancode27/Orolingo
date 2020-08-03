import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Form.scss";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import { FormErrors } from './FormError';

const LoginForm = (props) => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    passwordValid: false,
    usernameValid: false,
    formErrors: { password: '', username: ''},
    formValid: false
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
    validateField(name, value)
  };
  function validateField(fieldName, value) {


    switch (fieldName) {

      case 'username':
        formdata.usernameValid = value.length>0;
        formdata.formErrors.username = formdata.usernameValid ? '' : ' is required';
        break;

      case 'password':
        formdata.passwordValid = value.length > 0;
        formdata.formErrors.password = formdata.passwordValid ? '' : ' is required';
        break;
      default:
        break;
    }
    formdata.formValid = formdata.passwordValid && formdata.usernameValid;


  }
  function errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  return (
    <form className="form" onSubmit={(e) => props.handleLogin(e, formdata, props.history.push)}>
            <div id="login-form-error"></div>
            <FormErrors formErrors={formdata.formErrors} />
            <div className={`form-group ${errorClass(formdata.formErrors.username)}`}>
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
      </div>
      <div className={`form-group ${errorClass(formdata.formErrors.password)}`}>
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
      </div>
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
        <FacebookLogin
          appId="295694501865260"
          autoLoad={false}
          fields="name,email,picture"
          callback={(response) => props.handleSocialLogin(response, 'facebook', props.history.push)}
        />
        <GoogleLogin
          clientId="459086212681-76d4i3recuslqf1juh4vt86mbngqou6c.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response) => props.handleSocialLogin(response, 'google-oauth2', props.history.push)}
          onFailure={(response) => props.handleSocialLogin(response, 'google-oauth2', props.history.push)}
        />
      </div>
      <input disabled={!formdata.formValid} type="submit" />
      <Link to="/signup" className="button-standard">
        Not a member? Sign up here
      </Link>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
