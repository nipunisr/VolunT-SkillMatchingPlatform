// controllers/eventsController.js
const { query } = require('../config/db'); // Your DB query function
const yup = require('yup');

// Validation schema (similar to frontend)
const eventSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  requiredSkill: yup.string().nullable(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  location: yup.string().required(),
  isRemote: yup.boolean().required(),
  maxVolunteers: yup.number().required().min(1).integer(),
  status: yup.string().oneOf(['active', 'completed', 'cancelled']).required(),
  userId: yup.number().required(),
});

exports.createEvent = async (req, res) => {
  try {
    const data = req.body;

    // Validate input
    await eventSchema.validate(data, { abortEarly: false });

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
    } = data;

    const sql = `
      INSERT INTO events
      (title, description, requiredSkill, startDate, endDate, location, isRemote, maxVolunteers, status, userId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await query(sql, [
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
    ]);

    res.json({ success: true, message: 'Event created successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    console.error('Create event error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
