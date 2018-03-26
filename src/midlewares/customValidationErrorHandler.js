const CustomValidationError = require('../utils/errors/CustomValidationError');

const customValidationError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof CustomValidationError) {
    return res.status(422).json(err.errors);
  }
  next(err);
};

module.exports = customValidationError;
