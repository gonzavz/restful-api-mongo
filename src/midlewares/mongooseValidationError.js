const mongooseValidationError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.name === 'ValidationError') {
    const errors = {};
    Object.keys(err.errors).map((key) => errors[key] = err.errors[key].message);
    return res.status(422).json(errors);
  }
  next(err);
};

module.exports = mongooseValidationError;
