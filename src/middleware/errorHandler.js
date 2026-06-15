const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const message = err.message;
  res.status(err.statusCode || 500).json({ message });
};

module.exports = errorHandler;
