import React from 'react';
import "./EventWidget.css"

function EventWidget(props) {
  const e = props.event;

  return (
    <div className='eventWidget'>
      <h2 className='name'>{e.name}</h2>
      <p className='description'>{e.desc}</p>
      <p className='date'>
        {e.date.getMonth() + 1}/{e.date.getDay()}/{e.date.getFullYear()}
      </p>
      <p className='time'>
        {timeReturn(e).hours}:{timeReturn(e).mins}&nbsp;{timeReturn(e).m}
      </p>
      <p className='location'>{e.location}</p>
      <p className='creator'>Created by {e.creator.name}</p>
      <p className='attendees'>{attendeeList(e)}</p>
      {e.image && <img src={e.image} className='previewImage' />}
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
  }
  else if (e.attendees.length===3){
    return(
      e.attendees[0].name + ', ' + e.attendees[1].name + ', ' + e.attendees[2].name + " are going!"
    )
  }
  else if (e.attendees.length===2){
    return(
      e.attendees[0].name + ', ' + e.attendees[1].name + " are going!"
    )
  }
  else if (e.attendees.length===1){
    return(
      e.attendees[0].name + " is going"
    )
  }
  else return "Be the first to sign up!"
}

export default EventWidget;
