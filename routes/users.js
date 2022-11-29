const routerUser = require('express').Router();

const { validateId, userValid } = require('../middlewares/joi');
const { updateProfile, getCurrentUser } = require('../controllers/users');

routerUser.get('/users/me', validateId, getCurrentUser);
routerUser.patch('/users/me', userValid, updateProfile);

module.exports = routerUser;
