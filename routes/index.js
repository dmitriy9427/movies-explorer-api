const router = require('express').Router();
const userRoute = require('./users');
const movieRouter = require('./movies');
const { registerValid, loginValid } = require('../middlewares/joi');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', loginValid, login);

router.post('/signup', registerValid, createUser);

router.use('/users', auth, userRoute);

router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница с таким URL не найдена'));
});

module.exports = router;
