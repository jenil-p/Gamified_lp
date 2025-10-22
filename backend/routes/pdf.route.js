const { Router } = require('express');

const { verifyToken } = require('../middlewares/authentication');
const { checkTutor } = require('../middlewares/checkTutor.middleware');

const { uploadPdf, deletePdf, createQuestion, updateQuestion, deleteQuestion, getQuestionsByPdf, updatePdfSummary } = require('../controllers/pdf.controller');

const router = Router();

router.post('/upload', verifyToken, checkTutor, uploadPdf);
router.delete('/:id', verifyToken, checkTutor, deletePdf);
router.put('/:id/summary', verifyToken, checkTutor, updatePdfSummary);
router.post('/questions', verifyToken, checkTutor, createQuestion);
router.put('/questions/:id', verifyToken, checkTutor, updateQuestion);
router.delete('/questions/:id', verifyToken, checkTutor, deleteQuestion);
router.get('/:pdfId/questions', verifyToken, getQuestionsByPdf);

module.exports = router;