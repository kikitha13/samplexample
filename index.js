const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Upload folder inside container
const uploadFolder = '/app/uploads'; // Docker container path

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  }
});

// File validation (20MB max, common types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|docx|txt/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) cb(null, true);
  else cb('Error: Only images, PDFs, DOCX, or TXT files are allowed!');
};

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter
}).single('file');

// Root route → HTML upload form
app.get('/', (req, res) => {
  res.send(`
    <h2>Upload File to Downloads Folder</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
    </form>
    <p>After upload, access your file at /download/filename</p>
  `);
});

// Upload endpoint
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send(err);
    res.send(`File uploaded successfully: <a href="/download/${req.file.filename}">${req.file.filename}</a>`);
  });
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

