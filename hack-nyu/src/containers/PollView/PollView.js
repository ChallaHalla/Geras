import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import EventPoll from '../../components/EventPoll/EventPoll';

class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/events/unpublished', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.sort((a, b) => {
          if (a.yesList.length > b.yesList.length) {
            return -1;
          } else if (b.yesList.length > a.yesList.length) {
            return 1;
          }
          return 0;
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
        <EventPoll event={e} key={e._id} />
      ));
    }
    const display = (
      <div className='hero is-fullheight has-background-grey-light'>
        {events}
      </div>
    );
    return this.state.events ? display : <Loader />;
  }
}

export default PollView;
