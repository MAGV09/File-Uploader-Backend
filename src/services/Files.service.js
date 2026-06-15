const prisma = require('../lib/prisma');
const createError = require('http-errors');
const FolderService = require('../services/Folders.service');
const path = require('node:path');
const { cloudinary } = require('../config/multer');

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
  await cloudinary.uploader.destroy(deletedFile.publicId, {
    resource_type: deletedFile.resourceType,
  });
  return deletedFile;
}

async function createFile(
  { originalname, size, mimetype, path: url, filename: publicId, resource_type: resourceType },
  folderId,
) {
  const folder = await FolderService.getFolder(folderId);
  if (!folder) {
    throw createError(404, `Folder doesn't Exist.`);
  }
  const file = await prisma.file.create({
    data: {
      name: originalname,
      size,
      type: mimetype,
      publicId,
      resourceType,
      format: path.extname(originalname),
      url,
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

async function deleteFiles(folderId) {
  const files = await prisma.file.findMany({
    where: { folderId },
    select: { publicId: true, resourceType: true },
  });

  if (!files.length) throw createError(404, 'This folder has no files to delete');

  await prisma.file.deleteMany({ where: { folderId } });

  for (const file of files) {
    await cloudinary.uploader.destroy(file.publicId, { resource_type: file.resourceType });
  }
}
module.exports = { getFiles, deleteFile, getFile, createFile, updateFile, deleteFiles };
