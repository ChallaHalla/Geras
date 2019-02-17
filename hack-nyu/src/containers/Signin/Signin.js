import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
  }
  login() {
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'creator', pin: '1234' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <div className='hero is-fullheight has-background-grey-light'>
        <button
          onClick={() => {
            this.login();
          }}
        />
      </div>
    );
  }
}
export default Signin;
