import React, { Component } from 'react';
import SignUp from '../../components/SignUp/SignUp.js';
import NameList from '../../components/NameList/NameList';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      username: '',
      pin: '',
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
      navigator.geolocation.getCurrentPosition((pos)=>{
        fetch('http://localhost:3001/api/locations?long='+pos.coords.longitude+'&lat='+pos.coords.longitude).then((res) => {
          res.json().then((c)=>{
            this.setState({
              community: c,
            });
            this.progressStage();
          });
        });
      });
    }
  };

  getNames=()=>{
    fetch(
      'http://localhost:3001/api/usernameSimilar?name=' + this.state.name
    ).then((res) => {
      res.json().then((names) => {
        console.log(names);
        this.setState({
          usernames: names,
        });
        this.progressStage();
      });
    });
  }

  signin = () => {
    const body = JSON.stringify({
      "username": this.state.username,
      "pin": this.state.pin,
    });
    console.log('body', body);
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {res.json().then((data) => {
      console.log('state',this.state);
      if(data.status !== 'error'){
         this.props.history.push('/vote');
      }
    });})
  };

  render() {
    if (this.state.stage === 1) {
      return (
        <div className = "hero is-fullheight has-background-grey-light">
        <h1> Sign in </h1>
        <SignUp
          name={this.state.name}
          handleChange={this.handleChange}
          progressStage={this.progressStage}
        />
        </div>
      );
    }
    if(this.state.stage === 2){
      // get location
      return(
        <div className= "hero is-fullheight has-background-grey-light">
        <button onClick={()=>{this.getLocation();}}>Locate me!</button>
        </div>
      );
    }
    if (this.state.stage === 3) {
      return (
        <div className= "hero is-fullheight has-background-grey-light">
        <h1>{this.state.community.name}!</h1>
        <h2>New York, NY 10012</h2>
        <button onClick={()=>{

          this.getNames();
        }}> Yes </button>
        <button> Find another community </button>
        </div>
      );
    }
    if (this.state.stage === 4){
      return (
        <div className= "hero is-fullheight has-background-grey-light">
        <NameList
        names={this.state.usernames}
        progressStage={this.progressStage}
        handleChange={this.handleChange}/>
        </div>
      );
    }
    if (this.state.stage === 5){
      return (
        <div className= "hero is-fullheight has-background-grey-light">
        <h2>Pin:</h2>
        <input
          type='password'
          value={this.state.pin}
          onChange={this.handleChange}
          name='pin'
        />
        <button onClick={this.signin}>Sign in</button>
        </div>
      );
    }
    else{
      return (
        <div>
        Redirect to Somewhere
        </div>
      );
    }
  }
}
export default Signin;
