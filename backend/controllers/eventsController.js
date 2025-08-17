

// const { promisePool, query } = require('../config/db');

// exports.createEvent = async (req, res) => {
//   try {
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
//     } = req.body;

//     console.log('Create Event received data:', req.body); 

//     if (!userId) {
//     return res.status(400).json({ success: false, message: 'userId is required' });
//   }
//     // Simple validation (optional)
//     if (!title || !description || !startDate || !endDate || !location || !maxVolunteers || !userId) {
//       return res.status(400).json({ success: false, message: 'Missing required fields.' });
//     }

//     const sql = `
//       INSERT INTO events (title, description, requiredSkill, startDate, endDate, location, isRemote, maxVolunteers, status, userId, createdAt)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
//     `;
    
//     const values = [
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
//     ];

//     const result = await query(sql, values);

//     // result.insertId will be the new event ID
//     return res.status(201).json({ success: true, event: { eventId: result.insertId, ...req.body } });
//   } catch (error) {
//     console.error('Error creating event:', error);
//     return res.status(500).json({ success: false, message: 'Server error.' });
//   }
  
// };

// exports.getEventsByOrganizer = async (req, res) => {
//   const organizerId = req.params.organizerId;

//   try {
//     // Query to fetch events by organizer ID (adjust table/column names accordingly)
//     const [rows] = await promisePool.query(
//       'SELECT * FROM events WHERE userId = ?',
//       [organizerId]
//     );

//     res.json({ success: true, events: rows });
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.createEvent = async (req, res) => {
//   // Your existing createEvent logic...
// };

// exports.updateEvent = async (req, res) => {
//   // Implement update logic (find event by id, update fields)
// };

// exports.deleteEvent = async (req, res) => {
//   // Implement delete logic (find event by id, delete it)
// };




const { query } = require('../config/db');

// exports.createEvent = async (req, res) => {
//   try {
//     // Use userId from authenticated token set by authMiddleware, NOT from client body
//     const userId = req.user?.userId;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'Unauthorized: userId missing' });
//     }

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
//     } = req.body;

//     console.log('Create Event received data:', req.body);

//     // Basic validation of required fields
//     if (!title || !description || !startDate || !endDate || !location || !maxVolunteers) {
//       return res.status(400).json({ success: false, message: 'Missing required fields.' });
//     }

//     // Convert isRemote to 0 or 1 if boolean
//     const isRemoteValue = isRemote ? 1 : 0;

//     const sql = `
//       INSERT INTO events 
//       (title, description, requiredSkill, startDate, endDate, location, isRemote, maxVolunteers, status, userId, createdAt)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
//     `;

//     const values = [
//       title.trim(),
//       description.trim(),
//       requiredSkill ? requiredSkill.trim() : null,
//       startDate,
//       endDate,
//       location.trim(),
//       isRemoteValue,
//       maxVolunteers,
//       status || 'active',
//       userId,
//     ];

//     const result = await query(sql, values);

//     return res.status(201).json({ 
//       success: true, 
//       event: { 
//         eventId: result.insertId, 
//         title, 
//         description, 
//         requiredSkill, 
//         startDate, 
//         endDate, 
//         location, 
//         isRemote: isRemoteValue, 
//         maxVolunteers, 
//         status: status || 'active', 
//         userId 
//       } 
//     });
//   } catch (error) {
//     console.error('Error creating event:', error);
//     return res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };


exports.createEvent = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: userId missing' });
    }

    const {
      title,
      description,
      requiredSkills, // Array of skillIds [1, 2, 3]
      startDate,
      endDate,
      location,
      isRemote,
      maxVolunteers,
      status,
    } = req.body;

    if (!title || !description || !startDate || !endDate || !location || !maxVolunteers) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one skill must be selected' });
    }

    const isRemoteValue = isRemote ? 1 : 0;

    // Insert event
    const insertEventSql = `
      INSERT INTO events 
      (title, description, startDate, endDate, location, isRemote, maxVolunteers, status, userId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const result = await query(insertEventSql, [
      title.trim(),
      description.trim(),
      startDate,
      endDate,
      location.trim(),
      isRemoteValue,
      maxVolunteers,
      status || 'active',
      userId
    ]);

    const eventId = result.insertId;

    // Insert required skills for event
    const skillValues = requiredSkills.map(skillId => [eventId, skillId]);
    const insertSkillsSql = 'INSERT INTO event_skills (opportunityId, skillId) VALUES ?';
    await query(insertSkillsSql, [skillValues]);

    res.status(201).json({ success: true, eventId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getEventById = async (req, res) => {
  const eventId = req.params.opportunityId;
  try {
    const events = await query(
      'SELECT * FROM events WHERE opportunityId = ?',
      [eventId]
    );

    if (!events || events.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const event = events[0]; // Extract first event
    res.json({ success: true, event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.getEventsByOrganizer = async (req, res) => {
  const organizerId = req.params.organizerId; // fixed typo

  try {
    // Use your existing query function or the pool
    const rows = await query(
      'SELECT * FROM events WHERE userId = ?',
      [organizerId]
    );

    res.json({ success: true, events: rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// exports.getEventById = async (req, res) => {
//   try {
//     const eventId = req.params.id;

//     const eventSql = 'SELECT * FROM events WHERE opportunityId = ? LIMIT 1';
//     const [events] = await query(eventSql, [eventId]);

//     if (!events || events.length === 0) {
//       return res.status(404).json({ success: false, message: 'Event not found' });
//     }

//     const event = events[0];

//     res.json({ success: true, event });
//   } catch (error) {
//     console.error('Error fetching event:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

exports.updateEventById = async (req, res) => {
  try {
    const eventId = req.params.opportunityId;
    const userId = req.user?.userId;
    console.log('Auth user:', req.user);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Check ownership or allow admin
    const ownerCheckSql = 'SELECT userId FROM events WHERE opportunityId = ? LIMIT 1';
    const [rows] = await query(ownerCheckSql, [eventId]);
    if (!rows.length || (rows[0].userId !== userId && req.user.userType !== 'admin')) {
      return res.status(403).json({ success: false, message: 'Forbidden: Not event owner or admin' });
    }

    // Allowed fields for update
    const allowedFields = ['startDate', 'endDate', 'location', 'isRemote', 'maxVolunteers', 'status'];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const setClause = Object.keys(updates)
      .map(field => `${field} = ?`)
      .join(', ');
    const params = [...Object.values(updates), eventId];

    const updateSql = `UPDATE events SET ${setClause} WHERE opportunityId = ?`;
    await query(updateSql, params);

    const getUpdatedEventSql = 'SELECT * FROM events WHERE opportunityId = ? LIMIT 1';
    const [updatedRows] = await query(getUpdatedEventSql, [eventId]);

    if (!updatedRows.length) {
      return res.status(404).json({ success: false, message: 'Event not found after update' });
    }

    res.json({ success: true, event: updatedRows[0] });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// In your eventsController.js
exports.getEventSkills = async (req, res) => {
  const opportunityId = req.params.opportunityId;
  try {
    const sql = `
      SELECT s.skillId, s.name AS skillName, c.name AS categoryName
      FROM event_skills es
      JOIN skills s ON es.skillId = s.skillId
      JOIN categories c ON s.categoryId = c.categoryId
      WHERE es.opportunityId = ?
    `;
    const rows = await query(sql, [opportunityId]);
    res.json({ success: true, skills: rows });
  } catch (error) {
    console.error('Error fetching event skills:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

