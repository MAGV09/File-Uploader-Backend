const { Router } = require('express');
const router = Router();

router.get('/:folderId');
router.post('/');
router.delete('/:folderId');
router.put('/:folderId');
router.get('/:folderId/files');
router.delete('/:folderId/files');

module.exports = router;
