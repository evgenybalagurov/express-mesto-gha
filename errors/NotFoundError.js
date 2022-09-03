const { ERROR_NOT_FOUND_CODE } = require('../constants/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND_CODE;
  }
}

module.exports = { NotFoundError };
