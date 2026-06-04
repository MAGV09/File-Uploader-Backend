const prisma = require('../lib/prisma');
const createError = require('http-errors');

async function getAllFiles(fileId) {
  const files = await prisma.file.findMany({
    where: { fileId },
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
  const deletedfile = await prisma.file.delete({
    where: { id: fileId },
  });
}

async function createFile({ name, fileId }) {
  const file = await prisma.file.create({
    data: {
      name,
      fileId,
    },
  });
  return file;
}

async function updateFile({ fileId, name }) {
  const file = await prisma.file.update({
    where: { id: fileId },
    data: {
      ...(name !== undefined && { name }),
    },
  });
  return file;
}
module.exports = { getAllFiles, deleteFile, getFile, createFile, updateFile };
