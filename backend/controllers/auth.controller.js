const { response } = require('express');
const User = require('../models/User.model');
const excel = require('../models/excel.model');

const csv = require('csvtojson');

async function createUser(req, res) {
    const { fullname, instituteMail, password } = req.body;
    const findUser = await User.findOne({ instituteMail });
    if (findUser) {
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
        return res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        return res.status(400).json({ message: "incorrect email or password!" });
    }
}

async function logOutHelper(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout sucessfull !" });
}

async function uploadExcel(req, res) {
    const { title, note } = req.body;
    try {
        var NoOfUsers;
        csv()
            .fromFile(req.file.path)
            .then( async (response) => {
                NoOfUsers = response.length;
                await User.insertMany(response);
            });
        return res.json({ message: 'Users added successfully ... ' , Noofusers : NoOfUsers});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = { createUser, validateUserLogin, logOutHelper, uploadExcel };