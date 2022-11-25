const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { parameterIdValid, createMovieValid } = require('../middlewares/joi');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, createMovieValid, createMovie);
router.delete('/movies/:_id', auth, parameterIdValid('_id'), deleteMovie);

module.exports = router;
