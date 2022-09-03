const { ERROR_UNAUTHORIZED_CODE } = require('../constants/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED_CODE;
  }
}

module.exports = { AuthorizationError };
