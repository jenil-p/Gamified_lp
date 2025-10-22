const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    pdf: { type: mongoose.Schema.Types.ObjectId, ref: 'pdfmodule', required: true },
    questionText: { type: String, required: true },
    options: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true, default: false },
        },
    ],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
}, { timestamps: true });

// validate that exactly one option is correct and there are exactly 4 options...
// this below pre check can be changed based on teacher's need ...
questionSchema.pre('save', function (next) {
    if (this.options.length !== 4) {
        return next(new Error('Exactly 4 options are required'));
    }
    const correctOptions = this.options.filter((option) => option.isCorrect);
    if (correctOptions.length !== 1) {
        return next(new Error('Exactly one option must be correct'));
    }
    next();
});

const Question = mongoose.model('question', questionSchema);

module.exports = Question;