const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflctError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  THERE_IS_NO_MOVIE_WITH_THIS_ID,
  VALIDATION_ERROR_NAME,
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
  Movies.create({ owner, ...req.body })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
        throw new BadRequestError(err.message);
      } else if (err.code === 11000) {
        throw new ConflictError(err.message);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movies.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(THERE_IS_NO_MOVIE_WITH_THIS_ID);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE_MESSAGE);
      } else {
        Movies.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.send({ data: deletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};
