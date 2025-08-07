// // controllers/eventsController.js
// const { query } = require('../config/db'); // Your DB query function
// const yup = require('yup');

// // Validation schema (similar to frontend)
// const eventSchema = yup.object().shape({
//   title: yup.string().required(),
//   description: yup.string().required(),
//   requiredSkill: yup.string().nullable(),
//   startDate: yup.date().required(),
//   endDate: yup.date().required(),
//   location: yup.string().required(),
//   isRemote: yup.boolean().required(),
//   maxVolunteers: yup.number().required().min(1).integer(),
//   status: yup.string().oneOf(['active', 'completed', 'cancelled']).required(),
//   userId: yup.number().required(),
// });

// exports.createEvent = async (req, res) => {
//   try {
//     const data = req.body;

//     // Validate input
//     await eventSchema.validate(data, { abortEarly: false });

//     const {
//       title,
//       description,
//       requiredSkill,
//       startDate,
//       endDate,
//       location,
//       isRemote,
//       maxVolunteers,
//       status,
//       userId
//     } = data;

//     const sql = `
//       INSERT INTO events
//       (title, description, requiredSkill, startDate, endDate, location, isRemote, maxVolunteers, status, userId)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     await query(sql, [
//       title,
//       description,
//       requiredSkill,
//       startDate,
//       endDate,
//       location,
//       isRemote,
//       maxVolunteers,
//       status,
//       userId
//     ]);

//     res.json({ success: true, message: 'Event created successfully' });
//   } catch (err) {
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({ success: false, errors: err.errors });
//     }
//     console.error('Create event error:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };




const { promisePool, query } = require('../config/db');

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkill,
      startDate,
      endDate,
      location,
      isRemote,
      maxVolunteers,
      status,
      userId
    } = req.body;

    console.log('Create Event received data:', req.body); 

    if (!userId) {
    return res.status(400).json({ success: false, message: 'userId is required' });
  }
    // Simple validation (optional)
    if (!title || !description || !startDate || !endDate || !location || !maxVolunteers || !userId) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const sql = `
      INSERT INTO events (title, description, requiredSkill, startDate, endDate, location, isRemote, maxVolunteers, status, userId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const values = [
      title,
      description,
      requiredSkill,
      startDate,
      endDate,
      location,
      isRemote,
      maxVolunteers,
      status,
      userId
    ];

    const result = await query(sql, values);

    // result.insertId will be the new event ID
    return res.status(201).json({ success: true, event: { eventId: result.insertId, ...req.body } });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
  
};

exports.getEventsByOrganizer = async (req, res) => {
  const organizerId = req.params.organizerId;

  try {
    // Query to fetch events by organizer ID (adjust table/column names accordingly)
    const [rows] = await promisePool.query(
      'SELECT * FROM events WHERE userId = ?',
      [organizerId]
    );

    res.json({ success: true, events: rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  // Your existing createEvent logic...
};

exports.updateEvent = async (req, res) => {
  // Implement update logic (find event by id, update fields)
};

exports.deleteEvent = async (req, res) => {
  // Implement delete logic (find event by id, delete it)
};

