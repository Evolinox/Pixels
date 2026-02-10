const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig');
const { uploadPicture, getAllPictures, getLatestPictures, createComment} = require('../controllers/pictureController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/upload', authenticateToken, upload.single('picture'), uploadPicture);
router.post('/comment', authenticateToken, createComment);
router.get('/', getAllPictures);
router.get('/latest', getLatestPictures);

module.exports = router;