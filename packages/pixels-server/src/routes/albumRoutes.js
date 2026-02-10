const express = require('express');
const router = express.Router();
const { createAlbum, addPictureToAlbum, getAlbumWithPictures } = require('../controllers/albumController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, createAlbum);
router.post('/:albumId/pictures', authenticateToken, addPictureToAlbum);
router.get('/:albumId', getAlbumWithPictures);

module.exports = router;