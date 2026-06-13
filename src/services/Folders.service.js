const prisma = require('../lib/prisma');
const createError = require('http-errors');
const path = require('node:path');
const fs = require('node:fs/promises');
async function getFolders(userId) {
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
  const dirPath = path.resolve(`./public/uploads/${folder.userId}/${folderId}`);
  await fs.rm(dirPath, { recursive: true, force: true });
  return deletedFolder;
}

async function createFolder({ name }, userId) {
  const folder = await prisma.folder.create({
    data: {
      name,
      userId,
    },
  });
  return folder;
}

async function updateFolder({ name }, folderId) {
  const folder = await prisma.folder.update({
    where: { id: folderId },
    data: {
      ...(name !== undefined && { name }),
    },
  });
  return folder;
}
module.exports = { getFolders, deleteFolder, getFolder, createFolder, updateFolder };
