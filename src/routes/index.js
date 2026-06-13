const { Router } = require('express');
const router = Router();
const { getHomepage, getCurrentUser, handleUpload } = require('../controllers/Index.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, getHomepage);
router.get('/users/me', requireAuth, getCurrentUser);

module.exports = router;
