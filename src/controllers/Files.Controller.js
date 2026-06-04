const prisma = require('../lib/prisma');
async function handleUpload(req, res) {
  console.log(req.files);
  res.json({ message: 'sucessfully uploaded' });
}
module.exports = { handleUpload };
