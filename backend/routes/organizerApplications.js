const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const organizerApplicationsController = require('../controllers/orgApllicationController');


router.get('/events-applications', authMiddleware, organizerApplicationsController.getEventsWithApplications);
router.put('/update-application-status', authMiddleware, organizerApplicationsController.updateApplicationStatus);

module.exports = router;
