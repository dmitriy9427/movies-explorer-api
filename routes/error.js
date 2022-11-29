const errorRouter = require('express').Router();
const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

errorRouter.all('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});

module.exports = errorRouter;
