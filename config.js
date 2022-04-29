module.exports = {
  port: 3000,
  secret: "secret",
  redisPort: 6379,
  redisHost: "localhost",
  routes: {
    login: "login",
    logout: "logout",
  },
  facebook: {
    appID: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  crypto: {
    workFactor: 5000,
    keylen: 32,
    randomSize: 256,
  },
  rabbitMQ: {
    URL: "amqp://guest:guest@localhost:5672",
    exchange: "packtchat.log",
  },
};
