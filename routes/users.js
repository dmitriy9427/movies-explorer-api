const userRouter = require('express').Router();

const { validateId, userValid } = require('../middlewares/joi');
const { updateProfile, getCurrentUser } = require('../controllers/users');

userRouter.get('/users/me', validateId, getCurrentUser);
userRouter.patch('/users/me', userValid, updateProfile);

module.exports = userRouter;
