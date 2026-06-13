const { Router } = require('express');
const router = Router({ mergeParams: true });
const { requireAuth } = require('../middleware/auth');
const upload = require('../config/multer');
const {
  getFiles,
  createFile,
  downloadFile,
  deleteFile,
  updateFile,
} = require('../controllers/Files.Controller');

router.get('/', getFiles);
router.post('/', requireAuth, upload.single('file'), createFile);
router.get('/:fileId/download', downloadFile);
router.delete('/:fileId', deleteFile);
router.put('/:fileId', updateFile);
module.exports = router;
