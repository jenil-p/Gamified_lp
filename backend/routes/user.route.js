// const User = require('../models/User.model')
// const { Router } = require('express');

// router = Router();

// router.get('/students' , getAllStudents)

const { Router } = require('express');
const User = require('../models/User.model');
const UserRole = require('../models/userRole.model');
const { verifyToken } = require('../middlewares/authentication');

// Initialize router
const router = Router();

// Get all students (placeholder implementation)
router.get('/students', verifyToken, async (req, res) => {
    try {
        // Assuming "students" are users with a specific role or criteria
        const students = await User.find({}).select('-password -salt'); // Exclude sensitive fields
        return res.json({ students });
    } catch (err) {
        console.error('Error in /user/students:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get current user details
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -salt'); // Exclude sensitive fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    } catch (err) {
        console.error('Error in /user/me:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user roles
router.get('/roles', verifyToken, async (req, res) => {
    try {
        const userRoles = await UserRole.find({ user: req.userId }).populate('role');
        const roles = userRoles.map((userRole) => userRole.role);
        return res.json({ roles });
    } catch (err) {
        console.error('Error in /user/roles:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;