const Card = require('../models/card');
const { ValidationError } = require('../errors/ValidationError');
const { CastError } = require('../errors/CastError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('likes');
    return res.status(200).send(cards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return next(new NotFoundError('This card does not exist'));
    }
    if (req.user._id !== card.owner.toString()) {
      return next(new ForbiddenError('This card is another user'));
    }
    await card.remove();
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('likes');
    if (!card) {
      return next(new NotFoundError('Card not found'));
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate('likes');
    if (!card) {
      return next(new NotFoundError('Card not found'));
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    return next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
