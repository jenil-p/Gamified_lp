const { Router } = require('express');
const { createClass, getAllClasses, deleteClass } = require('../controllers/class.controller');
const { checkAdmin } = require('../middlewares/checkAdmin.middleware');
const { verifyToken } = require('../middlewares/authentication');

const router = Router();

router.post('/', checkAdmin, createClass);
router.get('/', verifyToken, getAllClasses);
router.delete('/:id', verifyToken, checkAdmin, deleteClass);

module.exports = router;