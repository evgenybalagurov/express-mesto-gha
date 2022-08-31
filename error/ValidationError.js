const { ERROR_DATA_CODE } = require('../constants/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_DATA_CODE;
  }
}

module.exports = { ValidationError };
