const { query } = require('../config/db');

exports.createVolunteerRequest = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { eventId, message } = req.body;
    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Event ID is required' });
    }

    const insertSql = `
  INSERT INTO event_volunteers (eventId, userId, message, status)
  VALUES (?, ?, ?, 'pending')
  `;
   await query(insertSql, [eventId, userId, message || null]);
    
    res.status(201).json({ success: true, message: 'Volunteer request submitted' });
  } catch (error) {
    console.error('Error saving volunteer request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
