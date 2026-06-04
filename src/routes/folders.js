const { Router } = require('express');
const router = Router();
const { reqAuth } = require('../middleware/auth');
const {
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
} = require('../controllers/Folders.controller');

router.use(reqAuth);
router.get('/:folderId', getFolder);
router.post('/', createFolder);
router.delete('/:folderId', deleteFolder);
router.put('/:folderId', updateFolder);
router.get('/:folderId/files');
router.delete('/:folderId/files');

module.exports = router;
