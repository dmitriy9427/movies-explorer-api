const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const validateUrl = (value, helpers) => {
  if (isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Ссылка не валидна');
};

const registerValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const userValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const parameterIdValid = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  registerValid,
  loginValid,
  createMovieValid,
  parameterIdValid,
  userValid,
};
