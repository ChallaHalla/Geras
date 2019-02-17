import React from 'react';
import './SignUp.css'

function SignUp(props) {
  return (
    <div className='signUpContainer'>
      <h1 className="title is-1">Welcome!</h1>
      <input
        placeholder="Full name"
        className="input is-large"
        type='text'
        value={props.name}
        onChange={props.handleChange}
        name='name'
      />
      <br />
      <button className="button regButton" type='button' onClick={props.progressStage}>
        Next
      </button>
    </div>
  );
}
export default SignUp;
