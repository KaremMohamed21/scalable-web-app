const amqp = require("amqp");
const config = require("../config");
const q = require("q");

module.exports = q.Promise((resolve, reject, notify) => {
  const rabbit = amqp.createConnection(config.rabbitMQ.URL);
  rabbit.on("ready", () => {
    resolve(rabbit);
  });
});
