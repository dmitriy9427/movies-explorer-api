const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  THERE_IS_NO_MOVIE_WITH_THIS_ID,
  FILM_INVALID_DATA,
  VALIDATION_ERROR_NAME,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owners = req.user._id;

  Movie.find({ owners })
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

  Movie.create({ owner, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
        return new BadRequestError(FILM_INVALID_DATA);
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(THERE_IS_NO_MOVIE_WITH_THIS_ID);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE_MESSAGE);
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch(next);
};
