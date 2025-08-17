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
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');
console.log('permit:', permit);
console.log('authMiddleware:', authMiddleware);
console.log('createEvent:', eventsController.createEvent);

router.get('/:opportunityId', eventsController.getEventById);
//router.put('/:opportunityId', authMiddleware, permit('organizer'), eventsController.updateEventById); 
router.get('/:opportunityId/skills', eventsController.getEventSkills);
router.put('/:opportunityId', authMiddleware, eventsController.updateEventById);

router.post('/', authMiddleware, permit('organizer'), eventsController.createEvent);

router.post('/organizer/:organizerId', authMiddleware, permit('organizer'), eventsController.getEventsByOrganizer);

module.exports = router;

