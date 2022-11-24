const router = require('express').Router();
const auth = require('../middlewares/auth');
const { userValid } = require('../middlewares/joi');
const { updateProfile, getCurrentUser } = require('../controllers/users');

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, userValid, updateProfile);

module.exports = router;
