import React from 'react';

function EventPoll({ event }) {
  const total = event.yesList.length + event.noList.length;
  const yes = event.yesList.length;
  const no = total - yes;

  let content = <p>Nobody has voted on this event proposal yet.</p>;

  if (total) {
    content = (
      <div>
        <p>
          {yes} {yes === 1 ? 'person' : 'people'} voted <strong>yes</strong>.{' '}
          {no} {no === 1 ? 'person' : 'people'} voted <strong>no</strong>.
          <progress className='progress is-success' value={yes} max={total} />
        </p>
      </div>
    );
  }

  return (
    <div className='box'>
      <strong>{event.name}!</strong>
      {content}
    </div>
  );
}

export default EventPoll;
