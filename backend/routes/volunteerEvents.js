const express = require('express');
const router = express.Router();
const volunteersController = require('../controllers/volunteerEvents');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/request', authMiddleware, volunteersController.createVolunteerRequest);

module.exports = router;
