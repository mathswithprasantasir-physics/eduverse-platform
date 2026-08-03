const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const upload = require('../middleware/upload');

// Content routes
router.get('/:board/:subject/:type', contentController.getContent);
router.post('/:board/:subject/:type', contentController.saveContent);
router.delete('/:board/:subject/:type', contentController.deleteContent);
router.get('/all', contentController.getAllContent);
router.get('/search/:board/:subject/:type', contentController.searchContent);

// Image upload route
router.post('/upload/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    success: true,
    url: `/images/${req.file.filename}`,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

module.exports = router;