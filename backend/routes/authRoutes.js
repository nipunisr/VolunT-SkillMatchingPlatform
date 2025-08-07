// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const { validateRegister } = require('../middleware/validation');

// router.post('/register');
// router.post('/verify-email', authController.verifyEmail);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//onst login = require('../controllers/Auth'); 
const { validateRegister } = require('../middleware/validation');

// Registration Route
router.post('/register', validateRegister, authController.register);

// Login Route (this is missing in your code!)
router.post('/login', authController.login);

// Email Verification Route
//router.post('/verify-email', authController.verifyEmail);

module.exports = router;
