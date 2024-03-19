const { StatusCodes } = require('http-status-codes');
const Custom = require('./custom-error');


class NotFoundError extends Custom {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;