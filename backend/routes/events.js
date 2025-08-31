

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');
const {
  createEvent,
  getEventById,
  getEventsByOrganizer,
  getEventSkills,
  updateEventById,
  getEvents,
  getMatchingEvents,
} = require('../controllers/eventsController');


router.get('/', getEvents);
router.get('/matching', authMiddleware, getMatchingEvents);
router.post('/', authMiddleware, permit('organizer'),createEvent);
router.get('/:opportunityId', getEventById);
router.get('/:opportunityId/skills', getEventSkills);
router.put('/:opportunityId', authMiddleware, updateEventById);
router.get('/organizer/:organizerId', authMiddleware, permit('organizer'), getEventsByOrganizer);
module.exports = router;

