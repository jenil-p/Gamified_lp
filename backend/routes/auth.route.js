const { Router } = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin.middleware');
const { verifyToken } = require('../middlewares/authentication');

const { createUser, validateUserLogin, logOutHelper, uploadExcel } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup' , createUser);
router.post('/login' , validateUserLogin);
router.get('/logout' , logOutHelper);

router.post('/MassAccountCreate' , checkAdmin ,uploadExcel);

module.exports = router;