const multer = require("multer");
const path = require("path");

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads/" directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const uniqueName = `${Date.now()}_${file.fieldname}${ext}`; // Generate unique file name
    cb(null, uniqueName);
  },
});

// Filter files by MIME types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "audio/mpeg",
    "audio/wav",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and audio files are allowed"), false);
  }
};

// Create Multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
