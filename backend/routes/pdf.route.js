const { Router } = require('express');

const { verifyToken } = require('../middlewares/authentication');

const { uploadPdf, deletePdf, getListOfPdf } = require('../controllers/pdf.controller');

const router = Router();


router.post('/upload', verifyToken, uploadPdf)
router.delete('/:id', verifyToken, deletePdf);
router.get('/list', verifyToken, getListOfPdf);

module.exports = router;