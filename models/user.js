const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail, isLength, isStrongPassword } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  USER_SCHEMA_REQUIRED_MESSAGES,
  USER_SCHEMA_VALIDATE_MESSAGES,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED_MESSAGES.NAME],
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 30 });
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VALIDATE_MESSAGES.NAME}`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VALIDATE_MESSAGES.EMAIL}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return isStrongPassword(v);
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VALIDATE_MESSAGES.PASSWORD}`,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
