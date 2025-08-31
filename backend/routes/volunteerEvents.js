const express = require('express');
const router = express.Router();
const volunteersController = require('../controllers/volunteerEvents');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/request', authMiddleware, volunteersController.createVolunteerRequest);
router.get('/my-events', authMiddleware, volunteersController.getMyRegisteredEvents);

module.exports = router;
