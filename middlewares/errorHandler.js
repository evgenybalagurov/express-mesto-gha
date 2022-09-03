const { ERROR_SERVER_CODE } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = ERROR_SERVER_CODE,
    message = 'An error has occurred on the server',
  } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
