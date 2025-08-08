

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

exports.createEvent = async (req, res) => {
  try {
    // Use userId from authenticated token set by authMiddleware, NOT from client body
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: userId missing' });
    }

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
    } = req.body;

    console.log('Create Event received data:', req.body);

    // Basic validation of required fields
    if (!title || !description || !startDate || !endDate || !location || !maxVolunteers) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // Convert isRemote to 0 or 1 if boolean
    const isRemoteValue = isRemote ? 1 : 0;

    const sql = `
      INSERT INTO events 
      (title, description, requiredSkill, startDate, endDate, location, isRemote, maxVolunteers, status, userId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
      title.trim(),
      description.trim(),
      requiredSkill ? requiredSkill.trim() : null,
      startDate,
      endDate,
      location.trim(),
      isRemoteValue,
      maxVolunteers,
      status || 'active',
      userId,
    ];

    const result = await query(sql, values);

    return res.status(201).json({ 
      success: true, 
      event: { 
        eventId: result.insertId, 
        title, 
        description, 
        requiredSkill, 
        startDate, 
        endDate, 
        location, 
        isRemote: isRemoteValue, 
        maxVolunteers, 
        status: status || 'active', 
        userId 
      } 
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
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

