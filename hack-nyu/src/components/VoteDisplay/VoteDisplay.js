import React from 'react';

// Vote Display expects a prop called EventName, which displays the event at the top of the stack
function VoteDisplay(props) {
  return <h1>{props.event ? props.event.name : 'No event...'}</h1>;
}

export default VoteDisplay;
