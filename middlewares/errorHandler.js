const {
  BAD_REQUEST,
  AN_ERROR_OCCURRED_ON_THE_SERVER,
  ERROR_KIND_OBJECT_ID,
} = require('../utils/constants');

// централизованный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === ERROR_KIND_OBJECT_ID) {
    res.status(400).send({ message: BAD_REQUEST });
  } else {
    res
      .status(statusCode)
      .send({ message: statusCode === 500 ? AN_ERROR_OCCURRED_ON_THE_SERVER : message });
  }
  if (next) {
    next();
  }
};

module.exports = errorHandler;
