const rabbitPromise = require("./rabbit");
const config = require("../config");
const q = require("q");

function queueSetup(rabbit) {
  rabbit.queue("debug.log", { autoDelete: false }, function (q) {
    q.bind(config.rabbitMQ.exchange, "*.log");
    q.close();
  });
  rabbit.queue("error.log", { autoDelete: false }, function (q) {
    q.bind(config.rabbitMQ.exchange, "error.log");
    q.close();
  });
}
module.exports = q.Promise(function (resolve, reject, notify) {
  rabbitPromise.done((rabbit) => {
    rabbit.exchange(
      config.rabbitMQ.exchange,
      { type: "topic", autoDelete: false },
      (ex) => {
        queueSetup(rabbit);
        resolve(ex);
      }
    );
  });
});
