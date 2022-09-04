const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Logged out' });
});

router.use((req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
