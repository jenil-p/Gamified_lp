const { verifyToken } = require('../middlewares/authentication');

const { Router } = require('express');

const { getAllStudents, getCurrentUser, getRolesOfCurrentUser } = require('../controllers/user.controller');

const router = Router();

router.get('/students', verifyToken, getAllStudents);
router.get('/me', verifyToken, getCurrentUser);
router.get('/roles', verifyToken, getRolesOfCurrentUser);

module.exports = router;