import React from 'react';



// Vote Display expects a prop called EventName, which displays the event at the top of the stack
function VoteDisplay(props) {
    const name = props.event.name;
    return <h1>{name}</h1>;
}


export default VoteDisplay;
