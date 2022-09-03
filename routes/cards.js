const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardById } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardById, deleteCard);
router.put('/:cardId/likes', validateCardById, likeCard);
router.delete('/:cardId/likes', validateCardById, dislikeCard);

module.exports = router;
