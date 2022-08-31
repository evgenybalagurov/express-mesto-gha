const { UNAUTHORIZED_CODE } = require('../constants/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

module.exports = { AuthorizationError };
