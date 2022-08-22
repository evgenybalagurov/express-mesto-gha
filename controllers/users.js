const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: 'This user does not exist' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Invalid user id' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Request error' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'This user does not exist' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Request error' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'This user does not exist' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Request error' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
