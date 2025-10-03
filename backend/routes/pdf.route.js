const pdfModule = require('../models/Pdf');
const User = require('../models/User');
const { Router } = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload' , upload.single('pdf'),async(req , res)=>{
    const {title ,classID , subjectID, user} = req.body;
    try {
        const uploadedbyUser = await User.findById(user);
        if (!req.file) return res.status(400).json({ message: 'No file provided' });
        if(!uploadedbyUser)return res.status(400).json({message : 'Unauthorized user'});
        const newPDF = await pdfModule.create({
            title : title,
            classID : classID,
            subjectID : subjectID,
            uploadedBy : user,
            path: req.file.path,
        })
        return res.json({message : "pdf uploaded sucessfully..." , pdf : newPDF});
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:id' , async(req , res)=>{
    try{
        const pdfToBeDeleted = await pdfModule.findById(req.params.id);
        if(!pdfToBeDeleted)return res.status(400).json({message : "no such pdf"});
        const deletedPDF = await pdfModule.findByIdAndDelete(pdfToBeDeleted._id);
        return res.json({message : "pdf deleted sucessfully..." , pdf : pdfToBeDeleted});
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;