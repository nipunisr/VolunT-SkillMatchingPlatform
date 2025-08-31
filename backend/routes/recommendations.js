const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const recommendationsController = require('../controllers/recommendationsController');

router.post('/', authMiddleware, recommendationsController.createRecommendation);

router.get('/volunteer/:volunteerId', recommendationsController.getVolunteerRecommendations);

module.exports = router;