const express = require('express');
const session = require('express-session');
const db = require('./db');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fn = path.join(__dirname, 'config.json');
const app = express();
const animals = require('./animals.json');

const Community = mongoose.model('Community');
const Event = mongoose.model('Event');
const User = mongoose.model('User');

// TEMPORARY - DEV ONLY
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// REMOVE LATER

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'local session secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// get users
app.get('/api/users', (req, res) => {
  let query = {};
  User.find()
    .populate('events')
    .populate('communities')
    .exec((err, varToStoreResult) => {
      res.json(varToStoreResult);
    });
});

//get user
app.get('/api/user', (req, res) => {
  if (req.query.userId !== undefined) {
    User.findOne({ _id: req.query.userId })
      .populate('events')
      .populate('communities')
      .exec((err, varToStoreResult) => {
        console.log(varToStoreResult);
        res.json(varToStoreResult);
      });
  }
});

//create users
app.post('/api/user', (req, res) => {
  console.log(req);
  const user = new User({
    name: req.body.username,
    communities: [req.body.community],
    events: [],
  });
  user.save().then((user) => {
    req.session.userId = user._id;
    req.session.communityId = req.body.community._id;
    res.json({ status: 'success' });
  });
});

app.get('/api/me', (req, res) => {
  res.json({
    id: req.session.userId,
  });
});

app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const pin = req.body.pin;

  User.findOne({ name: username, pin: pin }, (err, varToStoreResult) => {
    if (varToStoreResult !== null) {
      req.session.userId = varToStoreResult._id;
      console.log(req.session);
      varToStoreResult.status = 'success';
      console.log(varToStoreResult);
      res.json(varToStoreResult);
      // figure out what else to do
    } else {
      res.json({ status: 'error' });
    }
  });
});

app.get('/api/usernameSuggest', (req, res) => {
  console.log(req.query);
  const names = req.query.name.split(' ');
  let username = names[0];
  if (names[1] !== undefined) {
    username += '-' + names[1];
  }

  // console.log(name);
  const arr = new Array();
  for (let i = 0; i < 3; i++) {
    arr.push(
      username + '-' + animals[Math.floor(Math.random() * Math.floor(235))]
    );
  }
  console.log(names[0] + '-' + names[1]);
  User.find(
    { name: { $regex: username, $options: 'i' } },
    (err, varToStoreResult, count) => {
      const names = varToStoreResult.map((u) => {
        return u.name;
      });
      console.log(arr, names);
      arr.forEach((name, index) => {
        if (names.indexOf(name) !== -1) {
          arr[index] =
            username +
            '-' +
            animals[Math.floor(Math.random() * Math.floor(235))];
        }
      });
      res.json(arr);
    }
  );
});

// determine possible usernames based on full name
app.get('/api/usernameSimilar', (req, res) => {
  const names = req.query.name.split(' ');
  let username = names[0];
  if (names[1] !== undefined) {
    username += '-' + names[1];
  }
  User.find(
    { name: { $regex: username, $options: 'i' } },
    (err, varToStoreResult, count) => {
      const names = varToStoreResult.map((u) => {
        return u.name;
      });
      res.json(names);
    }
  );
});

// get communities
app.get('/api/community', (req, res) => {
  let query = {};
  Community.find(query, (err, varToStoreResult, count) => {
    console.log(varToStoreResult);
    res.json(varToStoreResult);
  });
});

//create communities
app.post('/api/community', (req, res) => {
  community = new Community({
    name: req.body.name,
    users: [],
    events: [],
  });
  community.save(() => {
    res.end();
  });
});

// add to community
app.post('/api/community/add', (req, res) => {
  Community.findOne(
    { _id: req.session.communityId },
    (err, varToStoreResult) => {
      let community = varToStoreResult;
      User.findOne({ _id: req.session.userId }, (err, varToStoreResult) => {
        let user = varToStoreResult;
        community.users.push(user);
        community.save(() => {
          res.end();
        });
      });
    }
  );
});

// get events
app.get('/api/events', (req, res) => {
  let query = {};
  Event.find()
    .populate('attendees')
    .populate('yesList')
    .populate('noList')
    .populate('creator')
    .exec((err, varToStoreResult) => {
      res.json(varToStoreResult);
    });
});

app.get('/api/events/published', (req, res) => {
  Event.find({ published: true })
    .ne('noList', req.session.userId)
    .populate('attendees')
    .populate('creator')
    .exec((err, varToStoreResult) => {
      res.json(varToStoreResult);
    });
});

app.get('/api/events/unpublished', (req, res) => {
  Event.find({ published: false })
    .ne('yesList', req.session.userId)
    .ne('noList', req.session.userId)
    .exec((err, varToStoreResult) => {
      res.json(varToStoreResult);
    });
});

// get events
app.get('/api/event', (req, res) => {
  let query = { _id: req.query.id };
  if (req.query.id !== undefined) {
    Event.findOne(query)
      .populate('attendees')
      .populate('yesList')
      .populate('noList')
      .exec((err, varToStoreResult) => {
        res.json(varToStoreResult);
      });
  }
});

//create events
app.post('/api/events', (req, res) => {
  Community.findOne({ _id: req.body.communityId }, (err, varToStoreResult) => {
    let community = varToStoreResult;
    User.findOne({ _id: req.session.userId }, (err, varToStoreResult) => {
      let user = varToStoreResult;
      event = new Event({
        name: req.body.name,
        desc: req.body.desc,
        published: false,
        creator: user,
        yesList: [],
        noList: [],
        attendees: [],
      });
      community.events.push(event);
      event.save(() => {
        res.end();
      });
    });
  });
});

//event vote
app.post('/api/vote', (req, res) => {
  let user;
  User.findOne({ _id: req.session.userId }, (err, user, count) => {
    Event.findOne({ _id: req.body.eventId }, (err, varToStoreResult) => {
      return varToStoreResult;
    })
      .then((event) => {
        // true is vote yes false is vote no
        if (req.body.vote) {
          event.yesList.push(user._id);
        } else {
          event.noList.push(user._id);
        }
        console.log(event);
        event.save(() => {
          res.end();
        });
      })
      .catch(console.log);
  });
});

// publish event
app.post('/api/publishEvent', (req, res) => {
  Event.findOne({ _id: req.body.eventId }, (err, varToStoreResult) => {
    let event = varToStoreResult;
    event.published = true;
    event.save(() => {
      req.end();
    });
  });
});

// add guest
app.post('/api/event/addGuest', (req, res) => {
  Event.findOne({ _id: req.body.eventId }, (err, varToStoreResult) => {
    let event = varToStoreResult;
    User.findOne({ _id: req.session.userId }, (err, varToStoreResult) => {
      let user = varToStoreResult;
      // perhaps check if user exists in array before pushing
      event.attendees.push(user._id);
      console.log(event);
      event.save(() => {
        console.log('guest added');
        res.end();
      });
    });
  });
});

// temporary route to create a cookie on the browser
app.get('/api/session', (req, res) => {
  console.log(req.session);
  res.json(req.session);
});

app.get('/api/session/:key/:val', (req, res) => {
  req.session[req.params.key] = req.params.val;
  res.json(req.session);
});

//get closest location
app.get('/api/locations', (req, res) => {
  console.log('req', req.query);
  const userLat = parseFloat(req.query.lat);
  const userLong = parseFloat(req.query.long);
  let distances;
  Community.find({}, (err, varToStoreResult) => {
    distances = varToStoreResult.map((c) => {
      return haversine(c.longitude, c.latitude, userLong, userLat);
    });
    const min = Math.max.apply(null, distances);
    const index = distances.indexOf(min);
    // console.log("lol",varToStoreResult[index]);
    return res.json(varToStoreResult[index]);
  });
});

// serve the react build as a static app
app.get('*', express.static('../hack-nyu/build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../hack-nyu/build/index.html'));
});

function haversine(long1, lati1, long2, lati2) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }
  var lon1 = parseFloat(long1);
  var lat1 = parseFloat(lati1);

  var lon2 = parseFloat(long2);
  var lat2 = parseFloat(lati2);

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  console.log('x', long2, lati2, long1, lat1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  d /= 1.60934;
  return d;
}

app.listen(3001);
