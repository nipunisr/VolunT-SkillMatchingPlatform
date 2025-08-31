const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');
router.get('/', authMiddleware, (req, res, next) => {
  console.log('GET /api/profile route hit, user:', req.user);
  next();
}, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;

