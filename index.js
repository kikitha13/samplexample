const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const uploadFolder = '/app/uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|docx|txt/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) cb(null, true);
  else cb('Error: Only images, PDFs, DOCX, or TXT files are allowed!');
};

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter
}).single('file');

app.get('/', (req, res) => {
  res.send(`
    <h2>Upload File</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send(err);
    res.send(`File uploaded successfully: <a href="/download/${req.file.filename}">${req.file.filename}</a>`);
  });
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  if (fs.existsSync(filePath)) res.download(filePath);
  else res.status(404).send('File not found');
});

// Export the app for testing
module.exports = app;

// Only start the server if not testing
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}


