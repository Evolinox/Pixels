const express = require('express');
const { getCurrentUser, getUserByUsername, getUserById} = require('../controllers/userController');
const router = express.Router();

router.get('/me', getCurrentUser);
router.get('/:username', getUserByUsername);
router.get('/id/:id', getUserById);

module.exports = router;