const User = require('../models/User.model');
const UserRole = require('../models/userRole.model');

async function getAllStudents(req, res) {
    try {
        const students = await User.find({}).select('-password -salt');
        return res.json({ students });
    } catch (err) {
        console.error('Error in /user/students:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.userId).select('-password -salt');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ user });
    } catch (err) {
        console.error('Error in /user/me:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getRolesOfCurrentUser(req, res) {
    try {
        const userRoles = await UserRole.find({ user: req.userId }).populate('role');
        const roles = userRoles.map((userRole) => userRole.role);
        return res.json({ roles });
    } catch (err) {
        console.error('Error in /user/roles:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllStudents, getCurrentUser, getRolesOfCurrentUser }