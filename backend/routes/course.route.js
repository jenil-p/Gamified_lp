const { Router } = require('express');
const { verifyToken } = require('../middlewares/authentication');
const { checkAdmin } = require('../middlewares/checkAdmin.middleware');
const { createCourse, assignTutorToCourse, getCoursesForTutor } = require('../controllers/course.controller');

const router = Router();

router.post('/', verifyToken, checkAdmin, createCourse);
router.put('/assign-tutor', verifyToken, checkAdmin, assignTutorToCourse);

router.get('/my-courses', verifyToken, getCoursesForTutor);

module.exports = router;
