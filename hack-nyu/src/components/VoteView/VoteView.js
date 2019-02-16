import React, { Component } from 'react';
import VoteButton from '../VoteButton/VoteButton';
import VoteDisplay from '../VoteDisplay/VoteDisplay';

class VoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/event')
      .then((res) => res.json())
      .then((data) => {
        // data has been sucessfully fetched
        console.log(data);
        this.setState({
          events: data,
        });
      })
      .catch(console.log);
  }

  handleVote = (vote) => {
    console.log(`Someone voted for ${vote ? 'YES' : 'NO'}`);
  };

  render() {
    return (
      <div>
        <VoteDisplay event={this.state.events[0]} />
        <VoteButton type={false} handleClick={this.handleVote} />
        <VoteButton type={true} handleClick={this.handleVote} />
      </div>
    );
  }
}

export default VoteView;
