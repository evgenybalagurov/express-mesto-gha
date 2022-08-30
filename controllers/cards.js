const Card = require('../models/card');
const {
  ERROR_SERVER_CODE,
  ERROR_DATA_CODE,
  NOT_FOUND_CODE,
} = require('../constants/constants');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('likes');
    return res.status(200).send(cards);
  } catch (err) {
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Validation error. Incorrect data sent' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(NOT_FOUND_CODE).send({ message: 'This card does not exist' });
    }
    if (req.user._id !== card.owner.toString()) {
      return res.status(401).send({ message: 'This card is another user' });
    }
    card.remove();
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Invalid card id' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('likes');
    if (!card) {
      return res.status(NOT_FOUND_CODE).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Invalid card id' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
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
      return res.status(NOT_FOUND_CODE).send({ message: 'Card not found' });
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(ERROR_DATA_CODE).send({ message: 'Invalid card id' });
    }
    return res.status(ERROR_SERVER_CODE).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
