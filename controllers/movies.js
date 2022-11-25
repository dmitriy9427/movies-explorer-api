const Movies = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFound('Данные не найдены!');
      }
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const ownerId = req.user._id;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Данные не найдены');
      }
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest({ message: 'Переданы некорретные данные' }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params._id)
    .orFail(() => {
      throw new NotFound('Фильм не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужой фильм'));
      }
      return movie
        .remove()
        .then(() => res.send({ movie, message: 'Фильм успешно удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest({ message: 'Переданы некорректные данные' }));
      } else {
        next(err);
      }
    });
};
