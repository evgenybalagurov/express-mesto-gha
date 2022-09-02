const { ERROR_SERVER_CODE } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error has occurred on the server'
        : message,
    });

  next();
};

module.exports = errorHandler;
