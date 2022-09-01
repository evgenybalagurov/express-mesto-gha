const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const celebrateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    link: Joi.string().required(),
  }),
}), createCard);
router.delete('/:cardId', celebrateCardId, deleteCard);
router.put('/:cardId/likes', celebrateCardId, likeCard);
router.delete('/:cardId/likes', celebrateCardId, dislikeCard);

module.exports = router;
