const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflct');
const NotFound = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (res, req, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        return next(new NotFound('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest(`Переданы некорректные данные при обновлении профиля - ${err.name}`));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорретные данные'));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
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

      res.send({ message: 'Регистрация прошла успешно!' });
    })
    .catch(next);
};
