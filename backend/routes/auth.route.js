const { Router } = require('express');
const User = require('../models/User.model');

const { createUser, validateUserLogin, logOutHelper } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup' , createUser);
router.post('/login' , validateUserLogin);
router.get('/logout' , logOutHelper);

module.exports = router;