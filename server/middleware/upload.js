const fileUpload = require("express-fileupload");

const uploadMiddleware = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  abortOnLimit: true,
});

module.exports = uploadMiddleware;