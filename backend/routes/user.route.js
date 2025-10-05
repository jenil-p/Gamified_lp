const User = require('../models/User.model')
const { Router } = require('express');

router = Router();

router.get('/students' , getAllStudents)