const routerMovie = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateDeleteMovie, createMovieValid } = require('../middlewares/joi');

routerMovie.get('/movies', getMovies);
routerMovie.post('/movies', createMovieValid, createMovie);
routerMovie.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = routerMovie;
