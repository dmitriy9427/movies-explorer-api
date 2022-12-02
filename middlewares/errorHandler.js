const {
  AN_ERROR_OCCURRED_ON_THE_SERVER,
} = require('../utils/constants');

// централизованный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return next(res.status(500).send({ message: AN_ERROR_OCCURRED_ON_THE_SERVER }));
};

module.exports = errorHandler;
