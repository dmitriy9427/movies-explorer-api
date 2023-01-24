const mongoose = require('mongoose');
const validator = require('validator');

const {
  INVALID_LINK,
  MOVIE_SCHEMA_REQUIRED_MESSAGES,
} = require('../utils/constants');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    // required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.COUNTRY],
  },
  director: {
    type: String,
    // required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DURATION],
  },
  year: {
    type: String,
    // required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.YEAR],
  },
  description: {
    type: String,
    // required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.IMAGE],
    validate: {
      validator: (v) => validator.isURL(v),
      message: INVALID_LINK,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.TRAILER_LINK],
    validate: {
      validator: (v) => validator.isURL(v),
      message: INVALID_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.THUMBNAIL],
    validate: {
      validator: (v) => validator.isURL(v),
      message: INVALID_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.OWNER],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.MOVIE_ID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.NAME_EN],
  },
});

module.exports = mongoose.model('movie', movieShema);
