const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// const fs = require('node:fs/promises');

// const storage = multer.diskStorage({
//   destination: async function (req, file, cb) {
//     try {
//       const uploadPath = `./public/uploads/${req.user.id}/${req.params.folderId}`;
//       await fs.mkdir(uploadPath, { recursive: true });
//       cb(null, uploadPath);
//     } catch (err) {
//       cb(err);
//     }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname + '-' + uniqueSuffix);
//   },
// });

function fileFilter(req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
}
cloudinary.config({ secure: true });
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: `file-uploader/${req.user.id}/${req.params.folderId}`,
    public_id: `${Date.now()}-${file.originalname}`,
    resource_type: 'auto',
  }),
});

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { upload, cloudinary };
