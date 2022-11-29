require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQUEST,
  VALIDATION_ERROR_NAME,
  USER_NOT_FOUND,
  USER_FORBIDDEN_DATA,
  USER_CONFLICT_EMAIL,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (res, req, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findById(userId).then((user) => {
    if (userId.toString() !== user._id.toString()) {
      throw new ForbiddenError(USER_FORBIDDEN_DATA);
    }
    return User.findByIdAndUpdate(
      userId,
      { name, email },
      { runValidators: true, new: true },
    )
      .then((userData) => {
        if (!userData) {
          throw new (NotFoundError(USER_NOT_FOUND))();
        }
        return res.send(user);
      })
      .catch((err) => {
        if (err.name === VALIDATION_ERROR_NAME) {
          return next(new ConflictError(USER_CONFLICT_EMAIL));
        }
        return next(err);
      });
  });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
        return next(new BadRequestError(BAD_REQUEST));
      }
      if (err.code === 11000) {
        return next(new ConflictError(USER_CONFLICT_EMAIL));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
