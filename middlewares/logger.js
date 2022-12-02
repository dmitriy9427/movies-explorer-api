const winston = require('winston');
const expressWinston = require('express-winston');
const {
  REQUEST_LOG_FILENAME,
  ERROR_LOG_FILENAME,
} = require('../utils/constants');

// логгер запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: REQUEST_LOG_FILENAME })],
  format: winston.format.json(),
});

// логгер ошиьбок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: ERROR_LOG_FILENAME })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
