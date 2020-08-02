import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormErrors } from './FormError';
import "./Form.scss"

const SignupForm = (props) => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    is_student: false,
    is_trainer: false,
    formErrors: { email: '', password: '', username: '', fullname: '' },
    emailValid: false,
    passwordValid: false,
    usernameValid: false,
    fullnameValid: false,
    formValid: false
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "type") {
      if (value === "student") {
        name = "is_student";
        value = true;
      } else if (value === "trainer") {
        name = "is_trainer";
        value = true;
      }
    }

    validateField(name, value)
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function validateField(fieldName, value) {


    switch (fieldName) {
      case 'email':
        formdata.emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formdata.formErrors.email = formdata.emailValid ? '' : ' is invalid';
        break;
      case 'username':
        formdata.usernameValid = value.length > 0;
        formdata.formErrors.username = formdata.usernameValid ? '' : ' is required';
        break;
      case 'fullname':
        formdata.fullnameValid = value.length > 0;
        formdata.formErrors.fullname = formdata.fullnameValid ? '' : ' is required';
        break;
      case 'password':
        formdata.passwordValid = value.length >= 6;
        formdata.formErrors.password = formdata.passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    formdata.formValid = formdata.emailValid && formdata.passwordValid && formdata.usernameValid && formdata.fullnameValid;


  }
  // function validateForm() {
  //    formdata.formValid = formdata.emailValid && formdata.passwordValid && formdata.usernameValid && formdata.fullnameValid;
  // }

  function errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  return (
    <form className="form" onSubmit={(e) => props.handleSignup(e, formdata, props.history.push)}>

      <FormErrors formErrors={formdata.formErrors} />
      <div className={`form-group ${errorClass(formdata.formErrors.username)}`}>
      <label className="form--label" htmlFor="username">Username</label>
      <input
        className="form--input"
        type="text"
        name="username"
        value={formdata.username}
        onChange={handleChange}
      />
      </div>
      <div className={`form-group ${errorClass(formdata.formErrors.password)}`}>
        <label className="form--label" htmlFor="password">Password</label>
        <input
          className="form--input"
          type="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
        />
      </div>
      <div className={`form-group ${errorClass(formdata.formErrors.fullname)}`}>
        <label className="form--label" htmlFor="fullname">Fullname</label>
        <input
          className="form--input"
          type="text"
          name="fullname"
          value={formdata.fullname}
          onChange={handleChange}
        />
      </div>
  \
        <div className={`form-group ${errorClass(formdata.formErrors.email)}`}>
          <label className="form--label" htmlFor="email">Email</label>
          <input
            className="form--input"
            type="text"
            name="email"
            value={formdata.email}
            onChange={handleChange}
          />
        </div>

        <input
          className="form--input"
          id="type-student"
          type="radio"
          name="type"
          value="student"
          onChange={handleChange}
        />
        <label className="form--label" htmlFor="type-student">Student</label>
        <input
          className="form--input"
          id="type-trainer"
          type="radio"
          name="type"
          value="trainer"
          onChange={handleChange}
        />
        <label className="form--label" htmlFor="type-trainer">Trainer</label>
        <input disabled={!formdata.formValid} type="submit" />
    </form>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
