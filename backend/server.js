const express = require('express');
const session = require('express-session');
const db = require('./db');
const mongoose = require('mongoose');
const path = require('path');
const fn = path.join(__dirname, 'config.json');
const app = express();

const Community = mongoose.model('Community');
const Event = mongoose.model('Event');
const User = mongoose.model('User');

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'local session secret',
    resave: false,
    saveUninitialized: true,
  })
);

// get users
app.get('/api/user', (req, res) => {
  let query = {};
  User.find(query, (err, varToStoreResult, count) => {
    res.json(varToStoreResult);
  });
});
//create users
app.post('/api/user', (req, res) => {
  const user = new User({
    name: req.body.name,
    communities: [req.body.community],
    events: [],
  });
  user.save().then((user) => {
    req.session.userId = user._id;
    res.end();
  });
});

// get communities
app.get('/api/community', (req, res) => {
  let query = {};
  Community.find(query, (err, varToStoreResult, count) => {
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

// get events
app.get('/api/event', (req, res) => {
  let query = {};
  Event.find(query, (err, varToStoreResult, count) => {
    res.json(varToStoreResult);
  });
});

//create events
app.post('/api/events', (req, res) => {
  user = User.findOne(
    { _id: req.session.userId },
    (err, varToStoreResult, count) => {
      return varToStoreResult;
    }
  );
  event = new Event({
    name: req.body.name,
    descr: req.body.descr,
    creator: user,
    yesList: [],
    noList: [],
  });
  event.save(() => {
    res.end();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../hack-nyu/public/index.html'));
});

app.listen(3001);
