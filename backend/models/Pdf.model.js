const mongoose = require('mongoose');

const pdfModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    path: { type: String, required: true },
    note: { type: String },
    summary: { type: String },
}, { timestamps: true });

const pdfModule = mongoose.model('pdfmodule', pdfModuleSchema);

module.exports = pdfModule;