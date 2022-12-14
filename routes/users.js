const userRouter = require('express').Router();

const { userValid } = require('../middlewares/joi');
const { updateProfile, getCurrentUser } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', userValid, updateProfile);

module.exports = userRouter;
