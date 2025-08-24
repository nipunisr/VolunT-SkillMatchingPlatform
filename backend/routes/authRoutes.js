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
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});


// Email Verification Route
//router.post('/verify-email', authController.verifyEmail);

module.exports = router;
