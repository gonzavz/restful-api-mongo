const NotFoundError = require('../utils/errors/NotFoundError');

const notFoundError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({message: err.message});
  }
  next(err);
};

module.exports = notFoundError;
