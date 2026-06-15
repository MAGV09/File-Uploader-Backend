const { Router } = require('express');
const router = Router({ mergeParams: true });
const { requireAuth } = require('../middleware/auth');
const { upload } = require('../config/multer');
const {
  getFiles,
  createFile,
  downloadFile,
  deleteFile,
  updateFile,
  deleteFiles,
} = require('../controllers/Files.Controller');

router.use(requireAuth);

router.get('/', getFiles);
router.post('/', upload.single('file'), createFile);

router.get('/:fileId/download', downloadFile);
router.delete('/:fileId', deleteFile);
router.delete('/', deleteFiles);
router.put('/:fileId', updateFile);
module.exports = router;
