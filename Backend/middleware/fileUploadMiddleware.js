// middleware/fileUploadMiddleware.js
const path = require('path');  
const multer = require('multer');

// Define file storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save the files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp to avoid filename collisions
  },
});

// Create the multer upload middleware
const upload = multer({ storage });

module.exports = upload;
