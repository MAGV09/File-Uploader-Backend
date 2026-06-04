const { Router } = require('express');
const router = Router();

router.delete('/:userId');
router.put('/:userId');
router.get('/:userId/files');
router.delete('/:userId/files');

module.exports = router;
