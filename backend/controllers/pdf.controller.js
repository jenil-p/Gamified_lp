const pdfModule = require('../models/Pdf.model');
const User = require('../models/User.model');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

async function uploadPdf(req, res) {
    // upload.single('pdf');
    const { title, classID, subjectID, user } = req.body;
    try {
        const uploadedbyUser = await User.findById(user);
        if (!req.file) return res.status(400).json({ message: 'No file provided' });
        if (!uploadedbyUser) return res.status(400).json({ message: 'Unauthorized user' });
        const newPDF = await pdfModule.create({
            title: title,
            classID: classID,
            subjectID: subjectID,
            uploadedBy: user,
            path: req.file.path,
        })
        return res.json({ message: "pdf uploaded sucessfully...", pdf: newPDF });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deletePdf(req, res) {
    try {
        const pdfToBeDeleted = await pdfModule.findById(req.params.id);
        if (!pdfToBeDeleted) return res.status(400).json({ message: "no such pdf" });
        const deletedPDF = await pdfModule.findByIdAndDelete(pdfToBeDeleted._id);
        return res.json({ message: "pdf deleted sucessfully...", pdf: pdfToBeDeleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getListOfPdf(req, res) {
    try {
        const pdfs = await pdfModule.find().populate('uploadedBy class course');
        return res.json({ pdfs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { uploadPdf, deletePdf, getListOfPdf }