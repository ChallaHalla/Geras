import React, { Component } from 'react';
import ChooseCommunity from '../../components/ChooseCommunity/ChooseCommunity';
import SignUp from '../../components/SignUp/SignUp.js';
import NameList from '../../components/NameList/NameList';

class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      name: '',
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

  render() {
    if (this.state.stage === 0) {
      return <ChooseCommunity />;
    }
    if (this.state.stage === 1) {
      return (
        <SignUp
          name={this.state.name}
          pin={this.state.pin}
          handleChange={this.handleChange}
          progressStage={this.progressStage}
        />
      );
    }
    if (this.state.stage === 2) {
      return <NameList />;
    }
  }
}
export default SignInView;
