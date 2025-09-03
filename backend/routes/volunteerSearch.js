
const express = require('express');
const router = express.Router();
const { searchVolunteers, getVolunteerDetails } = require('../controllers/volunteerSearchController');
const auth = require('../middleware/authMiddleware');

router.get('/search', auth, searchVolunteers);
router.get('/:userId', auth, getVolunteerDetails);

module.exports = router;

