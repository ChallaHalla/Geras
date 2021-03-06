import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import EventWidget from '../../components/EventWidget/EventWidget';
import './EventView.css';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/events/published', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        // data has been sucessfully fetched
        // now we sort by closest upcoming event
        data = data
          .sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            } else if (b.date < a.date) {
              return 1;
            }
            return 0;
          })
          .map((e) => {
            e.date = new Date(e.date);
            return e;
          });
        console.log(data);
        this.setState({
          events: data,
        });
      })
      .catch(console.log);

    fetch('/api/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          me: data.id,
        });
      });
  }
  addGuest = (event) => {
    const body = JSON.stringify({ eventId: event._id });
    fetch('/api/event/addGuest', {
      method: 'POST',
      body: body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log('state', this.state);
        this.componentDidMount();
      });
    });
  };

  render() {
    let events = false;
    if (this.state.events) {
      events = this.state.events.map((e) => (
        <EventWidget
          event={e}
          key={e._id}
          addGuest={this.addGuest}
          me={this.state.me}
        />
      ));
    }
    const display = (
      <div className='hero is-fullheight has-background-grey-light eventContainer'>
        <h1>{events}</h1>
      </div>
    );
    return this.state.events ? display : <Loader />;
  }
}

export default EventView;
