const { Router } = require('express');
const { AddRole } = require('../controllers/role.controller');
const { checkAdmin } = require('../middlewares/checkAdmin.middleware');

const router = Router();

router.post('/' , checkAdmin , AddRole);

module.exports = router;