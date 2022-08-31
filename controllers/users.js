const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ValidationError } = require('../error/ValidationError');
const { CastError } = require('../error/CastError');
const { NotFoundError } = require('../error/NotFoundError');
const { AuthorizationError } = require('../error/AuthorizationError');
const { ConflictError } = require('../error/AuthorizationError');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AuthorizationError('Incorrect email or password'));
    }

    const matchedPasswords = await bcrypt.compare(password, user.password);

    if (!matchedPasswords) {
      return next(new AuthorizationError('Incorrect email or password'));
    }

    return res.status(200).send({
      token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
    });
  } catch (err) {
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NotFoundError('This user does not exist'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(new NotFoundError('This user does not exist'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hashedPassword, name, about, avatar,
    });
    return res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Such an Email exists'));
    }
    return next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError('This user does not exist'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    return next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError('This user does not exist'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    return next(err);
  }
};

module.exports = {
  login,
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
