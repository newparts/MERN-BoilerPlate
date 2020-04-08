"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 6
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    "default": 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});
var Use = mongoose.model('User', userSchema);
module["export"] = {
  User: User
};