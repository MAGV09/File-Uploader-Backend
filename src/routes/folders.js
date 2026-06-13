const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middleware/auth');
const {
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
} = require('../controllers/Folders.controller');
const filesRouter = require('./files');

router.use(requireAuth);
router.use('/:folderId/files', filesRouter);

router.get('/', getFolders);
router.get('/:folderId', getFolder);
router.post('/', createFolder);
router.delete('/:folderId', deleteFolder);
router.put('/:folderId', updateFolder);

module.exports = router;
