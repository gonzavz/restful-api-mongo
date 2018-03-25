const mongoose = require('mongoose');
const urlValidator = require('../utils/validators/urlValidator');
const {Schema} = mongoose;


const UserSchema = new Schema({
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

UserSchema.index({name: 1});

const User = mongoose.model('User', UserSchema);

module.exports = User;
