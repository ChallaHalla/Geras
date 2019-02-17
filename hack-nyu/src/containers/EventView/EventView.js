import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import EventWidget from '../../components/EventWidget/EventWidget';
import NavBar from '../../components/NavBar/NavBar';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  
    fetch('http://localhost:3001/api/events/published')
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
  }

  render() {
    let events = false;
    if (this.state.events) {
      events = this.state.events.map((e) => (
        <EventWidget event={e} key={e._id} />
      ));
    }
    const display = (
      <div>
        <NavBar />
        <h1>{events}</h1>
      </div>
    );
    return this.state.events ? display : <Loader />;
  }
}

export default EventView;
