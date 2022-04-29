const exchange = require("../queue");

function debug(message) {
  exchange.done((ex) => {
    ex.publish("debug.log", message);
  });
}

function error(message) {
  exchange.done((ex) => {
    ex.publish("error.log", message);
  });
}

exports.logger = (req, res, next) => {
  debug({ url: req.url, ts: Date.now() });
  next();
};

exports.debug = debug;
exports.error = error;
