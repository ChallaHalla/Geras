import React from 'react';
import EventRsvpButton from '../../components/EventRsvpButton/EventRsvpButton';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faUserCircle,
  faUser,
  faClock,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import './EventWidget.css';

library.add(faMapMarkerAlt);
library.add(faUserCircle);
library.add(faUser);
library.add(faClock);
library.add(faCalendarAlt);

function EventWidget(props) {
  const e = props.event;
  return (
    <div className='eventWidget card'>
      <header className='card-header'>
        <p className='card-header-title'>{e.name}</p>
      </header>
      <div className='content media-left'>
        <p className='description'>{e.desc}</p>
        <p className='date'>
          <FontAwesomeIcon icon={faCalendarAlt} /> {e.date.getMonth() + 1}/
          {e.date.getDay()}/{e.date.getFullYear()}
        </p>
        <p className='time'>
          <FontAwesomeIcon icon={faClock} /> {timeReturn(e).hours}:
          {timeReturn(e).mins}&nbsp;{timeReturn(e).m}
        </p>
        <p className='location'>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {e.location}
        </p>
        {e.creator && (
          <p className='creator'>
            <FontAwesomeIcon icon={faUserCircle} /> Hosted by {e.creator.name}
          </p>
        )}
        <p className='attendees level-left'>
          <FontAwesomeIcon icon={faUser} />
          &nbsp;{attendeeList(e)}
        </p>
        {/* <button
          onClick={() => {
            props.addGuest(props.event);
          }}
        >
          {' '}
          RSVP{' '}
        </button> */}
        <EventRsvpButton
          event={props.event}
          me={props.me}
          handleClick={props.addGuest}
        />
        {e.image && <img src={e.image} className='previewImage' alt='Event' />}
        {e.image && (
          <img
            src={e.image}
            className='previewImage image is-1by1'
            alt='Event'
          />
        )}
      </div>
    </div>
  );
}

function timeReturn(e) {
  let t = e.date.getHours();
  let m = 'AM';
  if (t >= 13) {
    t -= 12;
    m = 'PM';
  }
  const mins = e.date.getMinutes();
  const all = {
    hours: t,
    mins: mins,
    phase: m,
  };
  return all;
}
function attendeeList(e) {
  if (e.attendees.length > 3) {
    return null;
  } else if (e.attendees.length === 3) {
    return (
      e.attendees[0].name +
      ', ' +
      e.attendees[1].name +
      ', ' +
      e.attendees[2].name +
      ' are going!'
    );
  } else if (e.attendees.length === 2) {
    return e.attendees[0].name + ', ' + e.attendees[1].name + ' are going!';
  } else if (e.attendees.length === 1) {
    return e.attendees[0].name + ' is going';
  } else return 'Be the first to sign up!';
}

export default EventWidget;
