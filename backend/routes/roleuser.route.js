const { Router } = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin.middleware');

const { assignRoleToUser, takeRoleFromUser, findUsersRole } = require('../controllers/roleuser.controller');

const router = Router();

router.post('/' , checkAdmin , assignRoleToUser);
router.delete('/' , checkAdmin , takeRoleFromUser);
router.get('/' , findUsersRole);

module.exports = router;