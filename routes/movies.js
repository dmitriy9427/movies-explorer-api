const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { parameterValid, createMovieValid } = require('../middlewares/joi');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, createMovieValid, createMovie);
router.delete('/movies/:_id', auth, parameterValid('_id'), deleteMovie);

module.exports = router;
