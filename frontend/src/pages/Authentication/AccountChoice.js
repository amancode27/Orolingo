import React from 'react';

const AccountChoice = (props) => {
  return (
    <div>
      <button onClick={() => props.handleSocialTrainerStudent(props.location.state.json, 'Student', props.history.push)}>Student</button>
      <button onClick={() => props.handleSocialTrainerStudent(props.location.state.json, 'Teacher', props.history.push)}>Teacher</button>
    </div>
  )
}

export default AccountChoice;
