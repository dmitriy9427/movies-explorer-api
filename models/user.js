const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlendth: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Unauthorized('Неверно указаны почта или пароль'),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Unauthorized('Неверно указаны почта или пароль'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
