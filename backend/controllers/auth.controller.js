const User = require('../models/User.model');

async function createUser(req, res) {
    const { fullname, instituteMail, password } = req.body;
    const findUser = await User.findOne({ instituteMail });
    if (findUser) {
        console.log(findUser);
        return res.status(409).json({ message: "User already exists on the system with this email" });
    }
    await User.create({
        fullname,
        instituteMail,
        password,
    });
    return res.status(200).json({ message: 'user created successfully !' });
};

async function validateUserLogin(req, res) {
    const { instituteMail, password } = req.body;
    try {
        const token = await User.matchPasswordAndCreateToken(instituteMail, password);
        res.cookie('token', token, { httpOnly: true }); // Keep for compatibility
        console.log('Login successful, token:', token); // Debug
        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        return res.status(400).json({ message: "incorrect email or password!" });
    }
}

async function logOutHelper(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout sucessfull !" });
}

module.exports = { createUser, validateUserLogin, logOutHelper };