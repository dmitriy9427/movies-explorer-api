const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  INVALID_EMAIL_FORMAT,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: INVALID_EMAIL_FORMAT,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD);
        }
        return user;
      });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
