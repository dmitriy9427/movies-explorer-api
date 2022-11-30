const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateDeleteMovie, createMovieValid } = require('../middlewares/joi');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValid, createMovie);
movieRouter.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
