const pdfModule = require('../models/Pdf.model');
const Course = require('../models/Course.model');
const User = require('../models/User.model');
const Question = require('../models/question.model');

async function uploadPdf(req, res) {
    const { title, class: classID, course: courseID, summary, note } = req.body;

    try {
        const uploadedByUser = await User.findById(req.userId);
        if (!req.file) return res.status(400).json({ message: 'No file provided' });
        if (!uploadedByUser) return res.status(400).json({ message: 'Unauthorized user' });

        const course = await Course.findById(courseID);
        if (!course) return res.status(404).json({ message: 'Invalid course' });

        const newPDF = await pdfModule.create({
            title,
            class: classID,
            course: courseID,
            path: req.file.path,
            note: note || '',
            summary: summary || '',
            uploadedBy: req.userId,
        });

        return res.json({ message: 'PDF uploaded successfully', pdf: newPDF });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deletePdf(req, res) {
    try {
        const pdfToBeDeleted = await pdfModule.findById(req.params.id).populate('course');
        const questions = await Question.deleteMany({ pdf: pdfToBeDeleted._id });
        if (!pdfToBeDeleted) return res.status(400).json({ message: 'No such PDF' });

        await pdfModule.findByIdAndDelete(pdfToBeDeleted._id);
        
        return res.json({ message: 'PDF deleted successfully', pdf: pdfToBeDeleted});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updatePdfSummary(req, res) {
    try {
        const { summary } = req.body;

        if (!summary) return res.status(400).json({ message: 'Summary is required' });

        const pdf = await pdfModule.findById(req.params.id);
        if (!pdf) return res.status(404).json({ message: 'PDF not found' });

        pdf.summary = summary;
        await pdf.save();

        return res.json({ message: 'PDF summary updated successfully', pdf });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createQuestion(req, res) {
    try {
        const { pdf: pdfId, questionText, options, course } = req.body;

        if (!questionText || !options || options.length !== 4) {
            return res.status(400).json({ message: 'Question text and exactly 4 options are required' });
        }
        const correctOptions = options.filter((opt) => opt.isCorrect);
        if (correctOptions.length !== 1) {
            return res.status(400).json({ message: 'Exactly one option must be correct' });
        }

        const pdf = await pdfModule.findById(pdfId);
        if (!pdf) return res.status(404).json({ message: 'PDF not found' });

        const newQuestion = await Question.create({
            pdf: pdfId,
            questionText,
            options,
            course,
        });

        return res.json({ message: 'Question created successfully', question: newQuestion });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateQuestion(req, res) {
    try {
        const { questionText, options } = req.body;

        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (options) {
            if (options.length !== 4) {
                return res.status(400).json({ message: 'Exactly 4 options are required' });
            }
            const correctOptions = options.filter((opt) => opt.isCorrect);
            if (correctOptions.length !== 1) {
                return res.status(400).json({ message: 'Exactly one option must be correct' });
            }
            question.options = options;
        }

        if (questionText) {
            question.questionText = questionText;
        }

        await question.save();

        return res.json({ message: 'Question updated successfully', question });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteQuestion(req, res) {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        await Question.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Question deleted successfully', question });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getQuestionsByPdf(req, res) {
    try {
        const questions = await Question.find({ pdf: req.params.pdfId }).populate('course');
        return res.json({ questions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { uploadPdf, deletePdf, updatePdfSummary, createQuestion, updateQuestion, deleteQuestion, getQuestionsByPdf };