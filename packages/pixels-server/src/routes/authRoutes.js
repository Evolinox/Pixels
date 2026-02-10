const express = require('express');
const router = express.Router();
const { register, login, devResetPassword} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/reset', devResetPassword);

module.exports = router;