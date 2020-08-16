import React from 'react';
import LoginForm from './LoginForm';

const Login = props => {
  return (
    <div>
      <h4>Log In</h4>
      <LoginForm {...props} />
    </div>
  )
}

export default Login
