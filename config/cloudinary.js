const cloudinary = require('cloudinary').v2;
require ('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUD.SECRET
});

module.exports = cloudinary;
