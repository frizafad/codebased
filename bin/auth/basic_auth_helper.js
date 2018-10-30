'use strict';

let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let User = require('./auth_repository');

passport.use(new BasicStrategy((username, password, cb) => {
  User.findByUsername(username, user => {
    if (!user) {
      return cb(null, false);
    } else if (!user.isValidPassword(password)) {
      return cb(null, false);
    } else {
      return cb(null, user);
    }
  });
}));

let isAuthenticated = passport.authenticate('basic', {session: false});
let init = () => passport.initialize();

module.exports = {
  isAuthenticated: isAuthenticated,
  init: init
};
