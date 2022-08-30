const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_SERVER_CODE,
  ERROR_DATA_CODE,
  NOT_FOUND_CODE,
} = require('../constants/constants');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }

    const matchedPasswords = await bcrypt.compare(password, user.password);

    if (!matchedPasswords) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }

    return res.status(200).send({
      token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
    });
  } catch (err) {
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'This user does not exist' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Invalid user id' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const createUser = async (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    return res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Validation error. Incorrect data sent' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'This user does not exist' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Invalid user id' });
    }
    if (err.name === 'ValidationError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Validation error. Incorrect data sent' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: 'This user does not exist' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Invalid user id' });
    }
    if (err.name === 'ValidationError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Validation error. Incorrect data sent' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
