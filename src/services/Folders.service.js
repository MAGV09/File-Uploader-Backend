const prisma = require('../lib/prisma');
const createError = require('http-errors');

async function getAllFolders(userId) {
  const folders = await prisma.folder.findMany({
    where: { userId },
  });
  return folders;
}

async function getFolder(folderId) {
  const folder = await prisma.folder.findFirst({
    where: { id: folderId },
  });

  if (!folder) {
    throw createError(404, 'Folder not Found');
  }
  return folder;
}

async function deleteFolder(folderId) {
  const folder = await getFolder(folderId);
  const deletedFolder = await prisma.folder.delete({
    where: { id: folderId },
  });
}

async function createFolder({ name, userId }) {
  const folder = await prisma.folder.create({
    data: {
      name,
      userId,
    },
  });
  return folder;
}

async function updateFolder({ folderId, name }) {
  const folder = await prisma.folder.update({
    where: { id: folderId },
    data: {
      ...(name !== undefined && { name }),
    },
  });
  return folder;
}
module.exports = { getAllFolders, deleteFolder, getFolder, createFolder, updateFolder };
