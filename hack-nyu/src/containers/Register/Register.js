import React, { Component } from 'react';
import SignUp from '../../components/SignUp/SignUp.js';
import NameList from '../../components/NameList/NameList';
import './Register.css';

class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      name: '',
      username: '',
      pin: '',
      communities: [],
      descriptions: [],
      usernames: [],
      ids: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  progressStage = () => {
    this.setState((prevState) => {
      return {
        stage: prevState.stage + 1,
      };
    });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        fetch(
          '/api/locations?long=' +
            pos.coords.longitude +
            '&lat=' +
            pos.coords.longitude,
          { credentials: 'include' }
        ).then((res) => {
          console.log(res);
          res.json().then((c) => {
            const communities = c.map((comm) => {
              return comm.community.name;
            });
            const descriptions = c.map((comm) => {
              return comm.community.desc;
            });
            const ids = c.map((comm) => {
              return comm.community._id;
            });
            console.log('communities', communities);
            this.setState({
              communities: communities,
              descriptions: descriptions,
              cIndex: 0,
              ids: ids,
            });
            this.progressStage();
          });
        });
      });
    }
  };

  nextCommunity = () => {
    this.setState({
      cIndex: (this.state.cIndex + 1) % this.state.communities.length,
    });
  };

  getNames = () => {
    console.log(this.state);
    fetch('/api/usernameSuggest?name=' + this.state.name, {
      credentials: 'include',
    }).then((res) => {
      res.json().then((names) => {
        console.log(names);
        this.setState({
          usernames: names,
        });
        this.progressStage();
      });
    });
  };

  createUser = () => {
    const body = JSON.stringify({
      username: this.state.username,
      community: this.state.ids[this.state.cIndex],
      pin: this.state.pin,
    });
    console.log('body', body);
    fetch('/api/user', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log('state', this.state);
        console.log('here', data);
      });
  };

  render() {
    if (this.state.stage === 1) {
      return (
        <div className='regContainer'>
          <SignUp
            name={this.state.name}
            pin={this.state.pin}
            handleChange={this.handleChange}
            progressStage={this.progressStage}
          />
        </div>
      );
    }
    if (this.state.stage === 2) {
      return (
        <div className='regContainer'>
          <h1 className='title is-1'>Choose a pin</h1>
          <input
            className='input is-large'
            type='password'
            placeholder='Enter Pin'
            value={this.state.pin}
            onChange={this.handleChange}
            name='pin'
          />
          <button
            className='button regButton greenHov'
            onClick={() => {
              this.getNames();
            }}
          >
            Next
          </button>
        </div>
      );
    }
    if (this.state.stage === 3) {
      return (
        <div className='regContainer'>
          <NameList
            names={this.state.usernames}
            progressStage={this.progressStage}
            handleChange={this.handleChange}
          />
        </div>
      );
    }
    if (this.state.stage === 4) {
      return (
        <div className='regContainer'>
          <button
            className='button is-large is-fullwidth greenHov'
            onClick={() => {
              this.getLocation();
            }}
          >
            Locate me!
          </button>
        </div>
      );
    }
    if (this.state.stage === 5) {
      return (
        <div className='regContainer'>
          <h1 className='title is-1'>
            {this.state.communities[this.state.cIndex]}!
          </h1>
          <h2 className='subtitle is-1'>
            {this.state.descriptions[this.state.cIndex]}
          </h2>
          <h2 className='subtitle is-1'>New York, NY 10012</h2>
          <button className='button greenHov' onClick={this.progressStage}>
            {' '}
            Yes{' '}
          </button>
          <button className='button greenHov' onClick={this.nextCommunity}>
            {' '}
            Find another community{' '}
          </button>
        </div>
      );
    }
    if (this.state.stage === 6) {
      return (
        <div className='regContainer'>
          <button
            className='button is-large creatAcct greenHov'
            onClick={() => {
              this.createUser();
              this.props.history.push('/vote');
            }}
          >
            Create account
          </button>
        </div>
      );
    } else {
      return <div>Done</div>;
    }
  }
}
export default SignInView;
