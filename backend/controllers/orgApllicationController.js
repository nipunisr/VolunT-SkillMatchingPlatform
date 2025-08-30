const { query } = require('../config/db');

exports.getEventsWithApplications = async (req, res) => {
  try {
    const organizerId = req.user?.userId;
    if (!organizerId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    // Get organizer's events with applications and volunteer details
    const sql = `
      SELECT ev.opportunityId as eventId, ev.title, ev.startDate, ev.endDate,
             vol.userId as volunteerId, vol.status, vol.message,
             usr.userId, usr.userName, usr.email, usr.phoneNumber
      FROM events ev
      LEFT JOIN event_volunteers vol ON ev.opportunityId = vol.eventId
      LEFT JOIN users usr ON vol.userId = usr.userId
      WHERE ev.userId = ?
      ORDER BY ev.startDate DESC, vol.createdAt DESC
    `;

    const rows = await query(sql, [organizerId]);

    // Group data event-wise:
    const events = {};

    rows.forEach(row => {
      if (!events[row.eventId]) {
        events[row.eventId] = {
          eventId: row.eventId,
          title: row.title,
          startDate: row.startDate,
          endDate: row.endDate,
          applications: []
        };
      }
      if (row.volunteerId) {
        events[row.eventId].applications.push({
          eventId: row.eventId,
          volunteerId: row.userId,
          status: row.status,
          message: row.message,
          user: {
            userId: row.userId,
            name: row.userName,
            email: row.email,
            phone: row.phoneNumber,
          }
        });
      }
    });

    res.json(Object.values(events));
  } catch(err) {
    console.error('Error fetching events/applications:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { eventId, userId, status } = req.body;

    if (!eventId || !userId || !status) {
      return res.status(400).json({ success: false, message: 'eventId, userId, and status are required' });
    }
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const sql = `
      UPDATE event_volunteers
      SET status = ?
      WHERE eventId = ? AND userId = ?
    `;

    const result = await query(sql, [status, eventId, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Application not found for given event/user' });
    }

    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
