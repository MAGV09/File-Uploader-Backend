const FilesService = require('../services/Files.service');
const fs = require('node:fs/promises');
const path = require('node:path');

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
    await FilesService.createFile(req.file, folderId);
    res.status(201).json({ message: 'Created Successfully' });
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path);
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
  const deletedFile = await FilesService.deleteFile(fileId);
  await fs.unlink(path.resolve(deletedFile.path));
  res.json({
    message: 'Deleted Successfully',
  });
}

async function downloadFile(req, res) {
  const fileId = parseInt(req.params.fileId);
  const file = await FilesService.getFile(fileId);
  res.download(path.resolve(file.path), file.name);
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
