

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
const { query } = require('../config/db');
const pool = require('../config/db').pool; 

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

exports.updateEventById = async (req, res) => {
  const { opportunityId } = req.params;
  const updates = req.body;

  // Check if event exists
  const rows = await query('SELECT * FROM events WHERE opportunityId = ?', [opportunityId]);
  if (!rows.length) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  // Build dynamic update
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map(f => `${f} = ?`).join(', ');
  values.push(opportunityId);

  await query(`UPDATE events SET ${setClause} WHERE opportunityId = ?`, values);

  const updatedEvent = await query('SELECT * FROM events WHERE opportunityId = ?', [opportunityId]);
  res.json(updatedEvent[0]);
};

exports.getEvents = async (req, res) => {
  const { location, keyword, eventType } = req.query; // accept eventType param
  let sql = 'SELECT * FROM events WHERE 1=1 ';
  const params = [];

  // Filter by location (partial match)
  if (location) {
    sql += 'AND location LIKE ? ';
    params.push(`%${location}%`);
  }

  // Filter by keyword in title or description (partial match)
  if (keyword) {
    sql += 'AND (title LIKE ? OR description LIKE ?) ';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  // Filter by event type: "online", "physical", or skip if not provided
  if (eventType === 'online') {
    sql += 'AND isRemote = 1 '; // online
  } else if (eventType === 'physical') {
    sql += 'AND isRemote = 0 '; // physical
  }

  sql += 'ORDER BY startDate ASC';

  try {
    const rows = await query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// In your eventController.js
exports.getMatchingEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get volunteer's profile
    const volunteerQuery = `
      SELECT u.location, v.availabilityStart, v.availabilityEnd
      FROM users u
      JOIN volunteers v ON u.userId = v.userId
      WHERE u.userId = ?
    `;
    
    const [volunteer] = await query(volunteerQuery, [userId]);
    
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    const { location, availabilityStart, availabilityEnd } = volunteer;
    
    // Query to find matching events
    const eventsQuery = `
      SELECT e.*
      FROM events e
      WHERE e.status = 'active'
        AND (e.isRemote = true OR e.location = ?)
        AND (e.startDate IS NULL OR e.startDate >= ?)
        AND (e.endDate IS NULL OR e.endDate <= ?)
      ORDER BY e.startDate ASC
    `;
    
    const events = await query(eventsQuery, [
      location || '', 
      availabilityStart || new Date().toISOString().split('T')[0],
      availabilityEnd || '2030-12-31'
    ]);
    
    res.json({ success: true, events });
  } catch (error) {
    console.error('Error fetching matching events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};