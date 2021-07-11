const mongoose = require('mongoose');

/**
 * This is the User's schema.
 * @class userSchema
 * @const
 * @namespace Mongoose
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  password: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  name: {
    type: String,
    unique: false,
    required: false,
  },
  access_token: {
    type: String,
    unique: false,
    required: false,
  },
  refresh_token: {
    type: String,
    unique: false,
    required: false,
  },
  hasSpotify: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

exports.UserSchema = mongoose.model('User', userSchema);