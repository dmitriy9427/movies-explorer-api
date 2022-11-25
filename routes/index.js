const router = require('express').Router();
const userRoute = require('./users');
const movieRoute = require('./movies');
const { registerValid, loginValid } = require('../middlewares/joi');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

router.post('/signin', loginValid, login);

router.post('/signup', registerValid, createUser);

router.use('/', userRoute);
router.use('/', movieRoute);

router.use(auth);
router.use('*', (req, res, next) => {
  next(new NotFound('Путь не найден'));
});

module.exports = router;
