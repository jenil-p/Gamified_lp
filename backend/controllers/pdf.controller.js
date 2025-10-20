const pdfModule = require('../models/Pdf.model');
const Course = require('../models/Course.model');
const User = require('../models/User.model');

async function uploadPdf(req, res) {
  const { title, classID, subjectID, user } = req.body;

  try {
    const uploadedbyUser = await User.findById(user);
    if (!req.file) return res.status(400).json({ message: 'No file provided' });
    if (!uploadedbyUser) return res.status(400).json({ message: 'Unauthorized user' });

    const course = await Course.findById(subjectID);
    if (!course) return res.status(404).json({ message: 'Invalid course' });

    if (String(course.tutor) !== String(user)) {
      return res.status(403).json({ message: 'You are not assigned to this course' });
    }

    const newPDF = await pdfModule.create({
      title,
      class: classID,
      course: subjectID,
      path: req.file.path,
      note: req.body.note || '',
    });

    return res.json({ message: "PDF uploaded successfully", pdf: newPDF });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deletePdf(req, res) {
  try {
    const pdfToBeDeleted = await pdfModule.findById(req.params.id).populate('course');
    if (!pdfToBeDeleted) return res.status(400).json({ message: "No such PDF" });

    if (String(pdfToBeDeleted.course.tutor) !== String(req.userId)) {
      return res.status(403).json({ message: 'You are not allowed to delete this PDF' });
    }

    await pdfModule.findByIdAndDelete(pdfToBeDeleted._id);
    return res.json({ message: "PDF deleted successfully", pdf: pdfToBeDeleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = { uploadPdf, deletePdf }