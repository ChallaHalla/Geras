import React from 'react';
import './VoteDisplay.css';

// Vote Display expects a prop called EventName, which displays the event at the top of the stack
function VoteDisplay(props) {
  return (
    <h1 className='EventVote title is-1 '>
      {props.event ? props.event.name : 'No more events'}
    </h1>
  );
}

export default VoteDisplay;
