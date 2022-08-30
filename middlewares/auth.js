const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization || !autorization.startWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = autorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;

  next();
};
