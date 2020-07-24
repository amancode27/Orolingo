import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const Login = props => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata(prev => {
      return {...prev,  [name]: value};
    });
  };

  return (
    <form onSubmit={e => props.handleLogin(e, formdata)}>
      <h4>Log In</h4>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={formdata.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formdata.password}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
}

Login.propTypes = {

}

export default Login
