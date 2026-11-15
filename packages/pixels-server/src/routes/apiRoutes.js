const express = require('express');
const router = express.Router();
const upload = require("../utils/multerConfig");
const authenticate = require("../middlewares/authMiddleware");
const {uploadPicture,getAllPictures,getPictureByCode} = require("../controllers/pictureController");
const {getCurrentUser} = require("../controllers/userController");
const {register, login, devResetPassword} = require("../controllers/authController");

router.get('/me', authenticate, getCurrentUser);
router.get('/img', authenticate, getAllPictures);
router.get('/img/:code', getPictureByCode);

router.post('/register', register);
router.post('/login', login);
router.post('/reset', devResetPassword);
router.post('/img/upload', authenticate, upload.single('picture'), uploadPicture);

module.exports = router;