const express = require('express');
const router = express.Router();
const { validateCreateUser, validateLoginUser } = require('./validation');
const { signup, login, logout, currentUser } = require('../../../controllers/users');
const guard = require('../../../helpers/guard');

router.post('/auth/signup', validateCreateUser, signup);

router.post('/login', validateLoginUser, login);

router.post('/logout', guard, logout);

router.get('/current', guard, currentUser);

module.exports = router;