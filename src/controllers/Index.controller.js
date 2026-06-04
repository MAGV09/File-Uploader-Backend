async function getHomepage(req, res) {
  res.json({
    message: 'Hello',
  });
}

async function getCurrentUser(req, res) {
  const { password, ...currentUser } = req.user;
  res.json(currentUser);
}

async function handleUpload(req, res) {
  console.log(req.files);
  res.json({ message: 'sucessfully uploaded' });
}
module.exports = { getHomepage, getCurrentUser, handleUpload };
