/** Class representing a NotFoundError. */
class NotFounderror extends Error {
    /**
     * Create a CustomValidationErrro.
     * @param {string} message - The error message value.
     */
     constructor(message='Resource not found.') {
      super(message);
      this.name = 'NotFoundError';
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = NotFounderror;
