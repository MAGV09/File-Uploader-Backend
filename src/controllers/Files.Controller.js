const FilesService = require('../services/Files.service');
const fs = require('node:fs/promises');
const path = require('node:path');
const { cloudinary } = require('../config/multer');
async function getFiles(req, res) {
  const folderId = parseInt(req.params.folderId);
  const files = await FilesService.getFiles(folderId);
  res.json({ files });
}

async function getFile(req, res) {
  const fileId = parseInt(req.params.fileId);
  const file = await FilesService.getFile(fileId);
  res.json({
    file,
  });
}

async function createFile(req, res) {
  const folderId = parseInt(req.params.folderId);

  try {
    console.log(req.file);
    await FilesService.createFile(req.file, folderId);
    res.status(201).json({ message: 'Created Successfully' });
  } catch (err) {
    if (req.file)
      await cloudinary.uploader.destroy(req.file.filename, {
        resource_type: req.file.resource_type,
      });
    throw err;
  }
}

async function updateFile(req, res) {
  const fileId = parseInt(req.params.fileId);
  await FilesService.updateFile(req.body, fileId);
  res.json({ message: 'Updated Successfully' });
}

async function deleteFile(req, res) {
  const fileId = parseInt(req.params.fileId);
  await FilesService.deleteFile(fileId);
  res.json({
    message: 'Deleted Successfully',
  });
}

async function downloadFile(req, res) {
  const fileId = parseInt(req.params.fileId);
  const file = await FilesService.getFile(fileId);
  res.json({ url: file.url });
}

async function deleteFiles(req, res) {
  const folderId = parseInt(req.params.folderId);
  await FilesService.deletedFiles(folderId);
  res.json({ message: 'Deleted All files Successfully' });
}
module.exports = {
  getFiles,
  getFile,
  createFile,
  updateFile,
  deleteFile,
  downloadFile,
  deleteFiles,
};
