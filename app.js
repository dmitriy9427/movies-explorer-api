require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { PORT_NUMBER, DB_ADRESS, ALLOWED_CORS } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('./middlewares/rateLimiter');
const router = require('./routes');

const app = express();

app.use(cors({
  origin: ALLOWED_CORS,
}));

const { PORT = PORT_NUMBER } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());

app.use(rateLimit);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(DB_ADRESS);

app.listen(PORT, () => {
  console.log(`Сервер запущен, использован порт: ${PORT}`);
});
