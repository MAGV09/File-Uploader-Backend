const FilesService = require('../services/Files.service');

async function getFolders(req, res) {
  const userId = req.params.id;
  const folders = await FilesService.getFolders(userId);
  res.json({ folders });
}

async function getFolder(req, res) {
  const folderId = req.params.folderId;
  const folder = await FilesService.getFolder(folderId);
  res.json({
    folder,
  });
}

async function createFolder(req, res) {
  await FilesService.createFolder(req.body);
  res.json({ message: 'Created Successfully' });
}

async function updateFolder(req, res) {
  await FilesService.updateFolder(req.body);
  res.json({ message: 'Updated Successfully' });
}

async function deleteFolder(req, res) {
  const folderId = req.params.folderId;
  await FilesService.deleteFolder(folderId);
  res.json({
    message: 'Deleted Successfully',
  });
}

module.exports = { getFolders, getFolder, createFolder, updateFolder, deleteFolder };
