const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.TCLOUDINARY_CLOUD_NAME,
  api_key: process.env.TCLOUDINARY_API_KEY,
  api_secret: process.env.TCLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
