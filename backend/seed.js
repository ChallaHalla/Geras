const db = require('./db');
const mongoose = require('mongoose');
const Community = mongoose.model('Community');
const Event = mongoose.model('Event');
const User = mongoose.model('User');

Community.remove({}, function(err) {
  console.log('community removed');
});
Event.remove({}, function(err) {
  console.log('events removed');
});
User.remove({}, function(err) {
  console.log('user removed');
});

const community = new Community({
  name: 'test community',
  desc: 'test community descr',
  users: [],
  events: [],
});
community.save(() => {
  const creator = new User({
    name: 'creator',
    communities: [community],
    events: [],
    pin: '1234',
  });

  creator.save(() => {
    const event = new Event({
      name: 'test event',
      desc: 'test desc',
      published: false,
      creator: creator,
      yesList: [],
      noList: [],
      attendees: [],
    });

    for (let i = 1; i <= 12; i++) {
      const e = new Event({
        name: `Test Event ${i}`,
        desc: 'This is a test event.',
        published: false,
        creator: creator,
        yesList: [],
        noList: [],
        attendees: [],
      });
      e.save();
    }

    for (let i = 1; i <= 5; i++) {
      const e = new Event({
        name: `Published Event ${i}`,
        desc: 'This is a published test event.',
        published: true,
        date: Date.now(),
        creator: creator,
        yesList: [],
        noList: [],
        attendees: [],
      });
      e.save();
    }

    event.save((err, evt) => {
      community.events.push(event);
      community.save((err) => {
        console.log(err);
        const users = [
          {
            name: 'user1',
            communities: [community._id],
            events: [evt._id],
            pin: '1234',
          },
          {
            name: 'user2',
            communities: [community._id],
            events: [evt._id],
            pin: '1234',
          },
          {
            name: 'user3',
            communities: [community._id],
            events: [evt._id],
            pin: '1234',
          },
          {
            name: 'user4',
            communities: [community._id],
            events: [evt._id],
            pin: '1234',
          },
        ];
        users.forEach((u) => {
          console.log(u);
          const user = new User(u);
          console.log(user);
          user.save((err) => {
            console.log(err);
          });
        });
      });
    });
  });
});
