const express = require('express');
const router = express.Router();
const { validateCreateUser, validateLoginUser } = require('./validation');
const { signup, login, logout, currentUser } = require('../../../controllers/users');
const { verify, verifyAgain } = require('../../../controllers/verify');
const updateAvatar = require('../../../controllers/updateAvatar');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');

router.post('/auth/signup', validateCreateUser, signup);

router.post('/login', validateLoginUser, login);

router.post('/logout', guard, logout);

router.get('/current', guard, currentUser);

router.patch('/avatars', guard, upload.single('avatar'), updateAvatar);

router.get('/verify/:verificationToken', verify);
router.post('/verify/', verifyAgain);

module.exports = router;