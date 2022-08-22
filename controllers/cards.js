const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('likes');
    return res.status(200).send(cards);
  } catch (err) {
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Request error' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      return res.status(404).send({ message: 'This card does not exist' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'This card does not exist' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    ).populate('likes');
    if (!card) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Invalid card id' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate('likes');
    if (!card) {
      return res.status(404).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Invalid card id' });
    }
    return res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
