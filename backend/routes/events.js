const express = require('express');
const router = express.Router();
const { 
  getEventsByOrganizer, 
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById
} = require('../controllers/eventsController');
const authMiddleware = require('../middleware/auth');

// GET all events for an organizer
router.get('/organizer/:organizerId', authMiddleware, getEventsByOrganizer);

// GET a single event by ID
router.get('/:eventId', authMiddleware, getEventById);

// POST create a new event
router.post('/', authMiddleware, createEvent);

// PUT update an existing event
router.put('/:eventId', authMiddleware, updateEvent);

// DELETE an event
router.delete('/:eventId', authMiddleware, deleteEvent);

module.exports = router;