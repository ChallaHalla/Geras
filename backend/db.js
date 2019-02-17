require('dotenv').config();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

let db;
let user;
let pass;

if (process.env.NODE_ENV === 'development') {
  db = 'mongodb://localhost/hackNYU';
  console.log('dev environment');
} else {
  user = process.env.DB_USER;
  pass = process.env.DB_PASS;
  db = `mongodb://${user}:${pass}@ds147985.mlab.com:47985/hacknyu19`;
}

const communitySchema = new mongoose.Schema({
  name: String,
  desc: String,
  latitude: Number,
  longitude: Number,
  users: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  events: [
    {
      type: ObjectId,
      ref: 'Event',
    },
  ],
});

const userSchema = new mongoose.Schema({
  name: String,
  pin: String,
  communities: [
    {
      type: ObjectId,
      ref: 'Community',
    },
  ],
  events: [
    {
      type: ObjectId,
      ref: 'Event',
    },
  ],
});

const eventSchema = new mongoose.Schema({
  name: String,
  desc: String,
  published: Boolean,
  creator: {
    type: ObjectId,
    ref: 'User',
  },
  date: Date,
  yesList: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  noList: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  attendees: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
});

mongoose.model('Community', communitySchema);
mongoose.model('User', userSchema);
mongoose.model('Event', eventSchema);

mongoose.connect(db, {
  useNewUrlParser: true,
});
