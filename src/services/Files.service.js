const prisma = require('../lib/prisma');
const createError = require('http-errors');
const FolderService = require('../services/Folders.service');
const path = require('node:path');

async function getFiles(folderId) {
  const files = await prisma.file.findMany({
    where: { folderId },
  });
  return files;
}

async function getFile(fileId) {
  const file = await prisma.file.findFirst({
    where: { id: fileId },
  });

  if (!file) {
    throw createError(404, 'file not Found');
  }
  return file;
}

async function deleteFile(fileId) {
  const file = await getFile(fileId);
  const deletedFile = await prisma.file.delete({
    where: { id: fileId },
  });
  return deletedFile;
}

async function createFile({ originalname, size, mimetype, path: filePath }, folderId) {
  const folder = await FolderService.getFolder(folderId);
  if (!folder) {
    throw createError(404, `Folder doesn't Exist.`);
  }
  const file = await prisma.file.create({
    data: {
      name: originalname,
      size,
      type: mimetype,
      format: path.extname(originalname),
      path: filePath,
      folderId,
    },
  });
  return file;
}

async function updateFile({ name }, fileId) {
  const file = await prisma.file.update({
    where: { id: fileId },
    data: {
      ...(name !== undefined && { name }),
    },
  });
  return file;
}
module.exports = { getFiles, deleteFile, getFile, createFile, updateFile };
