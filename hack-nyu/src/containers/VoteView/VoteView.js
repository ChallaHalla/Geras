import React, { Component } from 'react';
import VoteButton from '../../components/VoteButton/VoteButton';
import VoteDisplay from '../../components/VoteDisplay/VoteDisplay';
import Loader from '../../components/Loader/Loader';
import './VoteView.css';

class VoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/events/unpublished', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        // data has been sucessfully fetched
        shuffle(data);
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
    if (!this.state.currentEvent) return;
    const data = {
      eventId: this.state.currentEvent._id,
      vote,
    };
    console.log(data);
    fetch('/api/vote', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(() => {
      console.log('vote registered!');
    });
    // setting state in the callback feels slow and unresponsive, so we do it here instead
    this.setState((prevState) => {
      return {
        currentEvent: prevState.events.pop(),
        events: prevState.events,
      };
    });
  };

  render() {
    const display = (
      <div className='hero is-fullheight has-background-grey-light'>
        <VoteDisplay className='event' event={this.state.currentEvent} />
        <VoteButton type={false} handleClick={this.handleVote} />
        <VoteButton type={true} handleClick={this.handleVote} />
      </div>
    );
    if (this.state.events === undefined) {
      return <Loader />;
    } else return display;
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default VoteView;
