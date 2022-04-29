const logger = require("./logger");

exports.notFound = (req, res, next) => {
  res.status(404).send("Page not found");
  next();
};

exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  logger.error({ error: err.message, ts: Date.now() });
  res.status(500).send("Something broke. What did you do?");
};
