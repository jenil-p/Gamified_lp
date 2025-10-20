const { Router } = require('express');

const { verifyToken } = require('../middlewares/authentication');

const { uploadPdf, deletePdf } = require('../controllers/pdf.controller');

const router = Router();


router.post('/upload', verifyToken, uploadPdf)
router.delete('/:id', verifyToken, deletePdf);

module.exports = router;