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

    // Check if already registered
    const [existing] = await query('SELECT id FROM event_volunteers WHERE eventId = ? AND userId = ?', [eventId, userId]);
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already registered for this event' });
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

exports.getMyRegisteredEvents = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const sql = `
      SELECT ev.opportunityId AS eventId, ev.title, ev.startDate, ev.endDate, vol.status
      FROM event_volunteers vol
      INNER JOIN events ev ON vol.eventId = ev.opportunityId
      WHERE vol.userId = ?
      ORDER BY ev.startDate DESC
    `;

    const results = await query(sql, [userId]);

    res.json(results);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};