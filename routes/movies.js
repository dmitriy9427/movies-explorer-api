const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateDeleteMovie, createMovieValid } = require('../middlewares/joi');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', createMovieValid, createMovie);
movieRouter.delete('/movies/:movieId', validateDeleteMovie('_id'), deleteMovie);

module.exports = movieRouter;
