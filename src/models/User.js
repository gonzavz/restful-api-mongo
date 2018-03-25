const mongoose = require('mongoose');
const urlValidator = require('../utils/validators/urlValidator');
const {Schema} = mongoose;


const User = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
  },
  avatar: {
    type: String,
    match: [urlValidator, 'User avatar must contain a valid url'],
  },
}, {
  timestamps: true,
});

User.index({name: 1});

module.exports = User;
