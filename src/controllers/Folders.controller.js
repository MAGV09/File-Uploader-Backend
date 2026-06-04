const FolderService = require('../services/Folders.service');

async function getFolders(req, res) {
  const userId = req.params.id;
  const folders = await FolderService.getFolders(userId);
  res.json({ folders });
}

async function getFolder(req, res) {
  const folderId = req.params.folderId;
  const folder = await FolderService.getFolder(folderId);
  res.json({
    folder,
  });
}

async function createFolder(req, res) {
  await FolderService.createFolder(req.body);
  res.json({ message: 'Created Successfully' });
}

async function updateFolder(req, res) {
  await FolderService.updateFolder(req.body);
  res.json({ message: 'Updated Successfully' });
}

async function deleteFolder(req, res) {
  const folderId = req.params.folderId;
  await FolderService.deleteFolder(folderId);
  res.json({
    message: 'Deleted Successfully',
  });
}

module.exports = { getFolders, getFolder, createFolder, updateFolder, deleteFolder };
