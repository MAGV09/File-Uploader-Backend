const { Router } = require('express');
const router = Router();

router.post('/');
router.get('/:fileId');
router.delete('/:fileId');
router.put('/:fileId');

module.exports = router;
