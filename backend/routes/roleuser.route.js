const { Router } = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin.middleware');

const { assignRoleToUser, takeRoleFromUser } = require('../controllers/roleuser.controller');

const router = Router();

router.post('/' , checkAdmin , assignRoleToUser);
router.delete('/' , checkAdmin , takeRoleFromUser);

module.exports = router;