/** Class representing a CustomValidationError. */
class CustomValidationError extends Error {
  /**
   * Create a CustomValidationErrro.
   * @param {string} message - The error message value.
   * @param {object} errors - Object mapping path with erro message.
   */
   constructor(message, errors) {
    super(message);
    this.name = 'CustomValidationError';
    this.message = message;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomValidationError;
