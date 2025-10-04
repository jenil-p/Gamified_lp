const mongoose = require('mongoose');

const pdfModuleSchema = new mongoose.Schema({
    title : {type : String , required: true},
    classID : {type : String , required: true},
    subjectID: {type : String , required: true},
    path: {type : String , required: true},
    note: {type: String},
    uploadedBy: {type: mongoose.Schema.Types.ObjectId , ref: 'user' , required: true},
}, {timestamps: true});

const pdfModule = mongoose.model('pdfmodule' , pdfModuleSchema);

module.exports = pdfModule;