const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  ERROR_SERVER_CODE,
  ERROR_DATA_CODE,
  NOT_FOUND_CODE,
} = require('../constants/constants');

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
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashedPassword,
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
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
