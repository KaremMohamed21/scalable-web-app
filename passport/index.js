const passport = require("passport"),
  facebook = require("passport-facebook").Strategy,
  google = require("passport-google-oauth").OAuth2Strategy,
  local = require("passport-local").Strategy,
  User = require("./users"),
  config = require("../config"),
  logger = require("../middlewares/logger");

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new facebook(
    {
      clientID: config.facebook.appID,
      clientSecret: config.facebook.appSecret,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.use(
  new google(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.use(
  new local((username, password, done) => {
    User.findByUsername(username, (err, profile) => {
      if (profile && profile.password === password) {
        done(null, profile);
      } else {
        logger.error({
          message: "Wrong Username or Password",
          username: username,
        });
        done(null, false, { message: "Wrong Username or Password" });
      }
    });
  })
);

exports.passport = passport;
