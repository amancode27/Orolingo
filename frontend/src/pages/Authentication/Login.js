import React from 'react';
import LoginForm from './LoginForm';

const Login = props => {
  const error=props.error;
  return (
    <div>
      <LoginForm {...props} error = {error} />
    </div>
  )
}

export default Login
