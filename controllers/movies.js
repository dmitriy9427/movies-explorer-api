const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  THERE_IS_NO_MOVIE_WITH_THIS_ID,
  FILM_INVALID_DATA,
  VALIDATION_ERROR_NAME,
  FILM_DELETE_SUCCESS,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
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

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
        return new BadRequestError(FILM_INVALID_DATA);
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movies.findById(movieId)
    .orFail(new NotFoundError(THERE_IS_NO_MOVIE_WITH_THIS_ID))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return new ForbiddenError(FORBIDDEN_DELETE_MOVIE_MESSAGE);
      }
      return movie
        .remove()
        .then(() => res.send({ message: FILM_DELETE_SUCCESS }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
