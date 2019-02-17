import React from 'react';

function EventRsvpButton(props) {
  const isAttending = props.event.attendees.some((e) => {
    return e._id === props.me;
  });
  return (
    <button
      className='button is-primary'
      disabled={isAttending}
      onClick={() => props.handleClick(props.event)}
    >
      {isAttending ? 'Attending' : 'RSVP'}
    </button>
  );
}

export default EventRsvpButton;
