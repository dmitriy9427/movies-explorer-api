const router = require('express').Router();
const userRoute = require('./users');
const movieRouter = require('./movies');
const { registerValid, loginValid } = require('../middlewares/joi');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorRouter = require('./error');

router.post('/signin', loginValid, login);
router.post('/signup', registerValid, createUser);

router.use(auth);
router.use('/users', userRoute);
router.use('/movies', movieRouter);
router.use('*', errorRouter);

module.exports = router;
