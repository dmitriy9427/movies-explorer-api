const router = require('express').Router();
const userRoute = require('./users');
const routerMovie = require('./movies');
const { registerValid, loginValid } = require('../middlewares/joi');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

router.post('/signin', loginValid, login);
router.post('/signup', registerValid, createUser);

router.use(auth, userRoute);
router.use(auth, routerMovie);

router.use('/*', () => {
  throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
});

module.exports = router;
