const logger = require('../utils/logger');
const errorLogger = (err, req, res, next) => {
    // log all errors
    const errMessage = `${req.path} ${err.status}`;
    const errorPayload = {
      error: err.message,
      path: req.path,
      params: req.params,
      body: req.body,
      method: req.method,
    };
    logger.error(errMessage, errorPayload);
    next(err);
};

module.exports = errorLogger;
