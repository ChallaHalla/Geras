import React, { Component } from 'react';
import VoteButton from '../../components/VoteButton/VoteButton';
import VoteDisplay from '../../components/VoteDisplay/VoteDisplay';
import VoteLoader from '../../components/VoteLoader/VoteLoader';

// DEV ONLY
const user3Id = '5c6830bcc3c6c6a7e794ad0b'; // this is the demo userid for the user 3

class VoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/events')
      .then((res) => res.json())
      .then((data) => {
        // data has been sucessfully fetched
        console.log(data);
        this.setState({
          currentEvent: data.pop(),
          events: data,
        });
      })
      .catch(console.log);
  }

  handleVote = (vote) => {
    console.log(`Someone voted for ${vote ? 'YES' : 'NO'}`);
    const data = {
      userId: user3Id, //temporary userid
      eventId: this.state.currentEvent._id,
      vote,
    };
    fetch('http://localhost:3001/api/vote', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  render() {
    return (
      <div>
        <VoteLoader />
        <VoteDisplay event={this.state.currentEvent} />
        <VoteButton type={false} handleClick={this.handleVote} />
        <VoteButton type={true} handleClick={this.handleVote} />
      </div>
    );
  }
}

export default VoteView;
