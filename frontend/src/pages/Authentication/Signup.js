import React from 'react'
import SignupForm from './SignupForm'

const Signup = (props) => {
  return (
    <div>
      <h4>Sign Up</h4>
      <SignupForm {...props} />
    </div>
  )
}

export default Signup
