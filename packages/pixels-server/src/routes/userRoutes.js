const express = require('express');
const { getCurrentUser, getUserByUsername } = require('../controllers/userController');
const router = express.Router();

router.get('/me', getCurrentUser);
router.get('/:username', getUserByUsername);

module.exports = router;