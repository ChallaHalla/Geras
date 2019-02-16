import React from 'react';
import './EventWidget.css';

function EventWidget(props) {
  const e = props.event;

  return (
    <div className='eventWidget'>
      <h2 className='name'>{e.name}</h2>
      <p className='date'>{e.Date.getMonth + 1}/{e.Date.getDay}/{e.Date.getFullYear}</p>
      <p className='time'>{e.Date.getHour}:</p>
      <p className='location'>{e.location}</p>
      <p className='attendies'>{e.attendies[]} </p>
      {e.image && <img src={e.image} className='previewImage' />}
    </div>
  );
}

function timeReturn(props){
    const t = props.event.Date.getTime;
}

export default EventWidget;
