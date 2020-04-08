"use strict";

var express = require('express');

var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://newparts:genova22@reacttemp-uxlne.gcp.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(function () {
  return console.log('DC connected');
})["catch"](function (err) {
  return console.error(err);
});
app.get('/', function (req, res) {
  res.send('Hello');
});
app.listen(5013);