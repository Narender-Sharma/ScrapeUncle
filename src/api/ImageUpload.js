const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs'); // Add this line to require the fs module
const app = express();
const port = 3002;

app.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/upload/'); // Specify the destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file
  },
});

const upload = multer({ storage: storage });

app.get('/working',(re,res)=>{console.log("ssssssssssssss"); return res.status(200).send("dsadsadsada")});

// POST endpoint for file upload
app.post('/api/v1/files/upload', upload.single('file'), (req, res) => {
  try {
    // Check if a file with the same name already exists
    const filePath = path.join(__dirname, '../../public/upload/', req.file.originalname);
    
    if (fs.existsSync(filePath)) {
      return res.status(400).send('File with the same name already exists');
    }
    // File upload successful
    return res.status(200).send('File uploaded successfully');
  } catch (error) {
    // Error handling 
    return res.status(500).send('Error uploading file');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
