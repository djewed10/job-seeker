const { StatusCodes } = require('http-status-codes');
const Custom = require('./custom-error');


class UnauthenticatedError extends Custom {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;