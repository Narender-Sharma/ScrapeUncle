const express = require('express');
const multer = require('multer'); // Middleware for handling multipart/form-data
const path = require('path');
const app = express();
const port = 3001;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file
  },
});

const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    // File upload successful
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).send('Error uploading file');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});