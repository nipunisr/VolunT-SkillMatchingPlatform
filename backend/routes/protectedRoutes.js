const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');
const User = require('../models/User'); 

// Only logged-in users (any role) can access
// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Remove sensitive info like password before sending
//     const { password, ...safeUser } = user;
//     res.json(safeUser);

//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Only admin or organizer can access this route
// router.get('/admin/dashboard', authMiddleware, permit('admin', 'organizer'), (req, res) => {
//   res.json({ message: 'Welcome to admin dashboard' });
// });


const { pool } = require('../config/db');

router.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // assume authMiddleware sets req.user
    const [rows] = await pool.query('SELECT userId, userName, email, phoneNumber, location, userType, profilePicture, isVerified, createdAt, updatedAt FROM users WHERE userId = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
