import React from 'react';

function SignUp(props) {
  return (
    <div className='signUpContainer'>
      <h2>Full Name:</h2>
      <input
        type='text'
        value={props.name}
        onChange={props.handleChange}
        name='name'
      />
      <h2>Pin:</h2>
      <input
        type='password'
        value={props.pin}
        onChange={props.handleChange}
        name='pin'
      />
      <br />
      <button type='button' onClick={props.progressStage}>
        Next
      </button>
    </div>
  );
}
export default SignUp;
