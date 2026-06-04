const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const { handleUpload } = require('../controllers/Files.Controller');

router.post('/', requireAuth, upload.array('file', 5), handleUpload);
router.get('/:fileId');
router.delete('/:fileId');
router.put('/:fileId');
module.exports = router;
