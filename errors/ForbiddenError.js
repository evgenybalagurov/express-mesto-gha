const { ERROR_FORBIDDEN_CODE } = require('../constants/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
