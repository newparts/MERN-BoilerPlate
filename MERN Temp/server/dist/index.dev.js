"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var config = require("./config/key");

var _require = require("./models/user"),
    User = _require.User;

var _require2 = require("./middleware/auth"),
    auth = _require2.auth;

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true
}).then(function () {
  return console.log("DB connected");
})["catch"](function (err) {
  return console.error(err);
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/api/user/auth", auth, function (req, res) {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role
  });
});
app.post("/api/users/register", function (req, res) {
  var user = new User(req.body);
  user.save(function (err, userData) {
    if (err) return res.json({
      succes: false,
      err: err
    });
    return res.status(200).json({
      succes: true,
      userData: doc
    });
  });
});
app.post("/api/user/login", function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!user) return res.json({
      loginSuccess: false,
      message: "Autentificare esuata"
    });
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Parola gresita"
        });
      }
    });
    user.generateToken(function (err, user) {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true
      });
    });
  });
});
app.get("/api/user/logout", auth, function (req, res) {
  User.findOneAndUpdate({
    _id: req.user._id
  }, {
    token: ""
  }, function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).send({
      success: true
    });
  });
});
var port = process.env.PORT || 5013;
app.listen(port, function () {
  console.log("Server Running on ${port}");
});