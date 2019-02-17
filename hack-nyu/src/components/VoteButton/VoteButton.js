import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './VoteButton.css';

// register fontawesome icons with the library
library.add(faCheck);
library.add(faTimes);

// Vote Button expects a prop called type, which should be True for a yes vote and False for a no vote
function VoteButton(props) {
  const icon = props.type ? 'check' : 'times';



  return (
    <button id={icon} className="vote" type='button' onClick={() => props.handleClick(props.type)}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default VoteButton;
