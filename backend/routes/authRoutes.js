const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister } = require('../middleware/validation');

router.post('/register');
router.post('/verify-email', authController.verifyEmail);

module.exports = router;