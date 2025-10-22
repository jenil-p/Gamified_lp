const Course = require('../models/Course.model');
const pdfModule = require('../models/Pdf.model');

async function checkTutor(req, res, next) {
    try {
        const userId = req.userId;
        let courseId;

        if (req.body.course) {
            courseId = req.body.course;
        } else if (req.params.pdfId) {
            const pdf = pdfModule.findById(req.params.pdfId);
            if (!pdf) return res.status(404).json({ message: 'PDF not found' });
            courseId = pdf.course;
        } else if (req.body.pdf) {
            const pdf = pdfModule.findById(req.body.pdf);
            if (!pdf) return res.status(404).json({ message: 'PDF not found' });
            courseId = pdf.course;
        }

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID missing' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (String(course.tutor) !== String(userId)) {
            return res.status(403).json({ message: 'You are not the assigned tutor for this course' });
        }

        next();
    } catch (error) {
        console.error('Error in checkTutor middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { checkTutor };