const { Router } = require('express');
const router = Router();
const { getHomepage, getCurrentUser, handleUpload } = require('../controllers/Index.controller');
const { requireAuth } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get('/', requireAuth, getHomepage);
router.get('/users/me', requireAuth, getCurrentUser);
router.post(
  '/upload',
  requireAuth,
  upload.fields([
    { name: 'file', maxCount: 4 },
    { name: 'avatar', maxCount: 1 },
  ]),
  handleUpload,
);
module.exports = router;
