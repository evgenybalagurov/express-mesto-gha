const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/AuthorizationError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    return next(new AuthorizationError('Authorization required'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
