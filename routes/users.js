const userRouter = require('express').Router();

const { validateId, userValid } = require('../middlewares/joi');
const { updateProfile, getCurrentUser } = require('../controllers/users');

userRouter.get('/me', validateId, getCurrentUser);
userRouter.patch('/me', userValid, updateProfile);

module.exports = userRouter;
