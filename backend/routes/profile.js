const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');
//router.get('/', authMiddleware, profileController.getProfile);
router.get('/', authMiddleware, (req, res, next) => {
  console.log('GET /api/profile route hit, user:', req.user);
  next();
}, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;

// router.get('/', authMiddleware, (req, res) => {
//   res.json({ success: true, user: req.user });
// });

// router.get('/api/profile', authMiddleware, async (req, res) => {
//   try {
//     const data = await getProfile(req.user.userId);
//     res.json(data);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// });

// router.put('/api/profile', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const profileData = { ...req.body, userType: req.user.userType };
//     await updateProfile(userId, profileData);
//     res.json({ message: 'Profile updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to update profile' });
//   }
// });


