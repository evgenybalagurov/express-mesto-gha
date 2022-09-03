const { ERROR_CONFLICT_CODE } = require('../constants/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT_CODE;
  }
}

module.exports = { ConflictError };
