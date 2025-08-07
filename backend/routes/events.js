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
const eventController = require('../controllers/eventsController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');

// Create a new event (already present)
router.post('/', authMiddleware, permit('organizer'), eventController.createEvent);

// Get all events for a specific organizer
router.get('/organizer/:organizerId', authMiddleware, permit('organizer'), eventController.getEventsByOrganizer);

// Optional: Add more CRUD routes like update, delete if needed
// Example: Update event
// router.put('/:eventId', authMiddleware, permit('organizer'), eventController.updateEvent);

// Example: Delete event
// router.delete('/:eventId', authMiddleware, permit('organizer'), eventController.deleteEvent);

module.exports = router;

