import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./Form.scss"

const SignupForm = (props) => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    is_student: false,
    is_trainer: false,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(name === "type") {
      if(value === "student") {
        name = "is_student";
        value = true;
      } else if(value === "teacher") {
        name = "is_trainer";
        value = true;
      }
    }
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form className="form" onSubmit={(e) => props.handleSignup(e, formdata, props.history.push)}>
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
      <label className="form--label" htmlFor="fullname">Fullname</label>
      <input
        className="form--input"
        type="text"
        name="fullname"
        value={formdata.fullname}
        onChange={handleChange}
      />
      <label className="form--label" htmlFor="email">Email</label>
      <input
        className="form--input"
        type="text"
        name="email"
        value={formdata.email}
        onChange={handleChange}
      />
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
      <input type="submit" />
    </form>
  );
};

SignupForm.propTypes = {};

export default SignupForm;
