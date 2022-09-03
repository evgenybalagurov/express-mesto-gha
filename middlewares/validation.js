const { celebrate, Joi } = require('celebrate');
const { LINK_REGEX } = require('../constants/constants');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(LINK_REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(20),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(LINK_REGEX),
  }),
});

const validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(LINK_REGEX),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateCreateCard,
  validateCardById,
  validateUserById,
  validateUpdateProfile,
  validateUpdateAvatar,
};
