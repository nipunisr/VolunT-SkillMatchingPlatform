// const express = require('express');
// const router = express.Router();
// const { 
//   getEventsByOrganizer, 
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getEventById
// } = require('../controllers/eventsController');
// const authMiddleware = require('../middleware/auth');

// // GET all events for an organizer
// router.get('/organizer/:organizerId', authMiddleware, getEventsByOrganizer);

// // GET a single event by ID
// router.get('/:eventId', authMiddleware, getEventById);

// // POST create a new event
// router.post('/', authMiddleware, createEvent);

// // PUT update an existing event
// router.put('/:eventId', authMiddleware, updateEvent);

// // DELETE an event
// router.delete('/:eventId', authMiddleware, deleteEvent);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const eventController = require('../controllers/eventsController');

// router.post('/', eventController.createEvent);

// module.exports = router;



const express = require('express');
const router = express.Router();
//const eventsController = require('../controllers/eventsController');
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

// GET /api/events with optional filters: location, keyword
router.get('/', getEvents);
router.get('/matching', authMiddleware, getMatchingEvents);

router.post('/', authMiddleware, permit('organizer'),createEvent);
router.get('/:opportunityId', getEventById);
//router.put('/:opportunityId', authMiddleware, permit('organizer'), eventsController.updateEventById); 
router.get('/:opportunityId/skills', getEventSkills);
//router.put('/:opportunityId', authMiddleware, eventsController.updateEventById);
router.put('/:opportunityId', authMiddleware, updateEventById);
router.get('/organizer/:organizerId', authMiddleware, permit('organizer'), getEventsByOrganizer);




module.exports = router;

