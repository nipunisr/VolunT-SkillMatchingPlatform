
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
      requiredSkills, 
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

    const event = events[0]; 
    res.json({ success: true, event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getEventsByOrganizer = async (req, res) => {
  const organizerId = req.params.organizerId; 

  try {
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

 
  const rows = await query('SELECT * FROM events WHERE opportunityId = ?', [opportunityId]);
  if (!rows.length) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map(f => `${f} = ?`).join(', ');
  values.push(opportunityId);

  await query(`UPDATE events SET ${setClause} WHERE opportunityId = ?`, values);

  const updatedEvent = await query('SELECT * FROM events WHERE opportunityId = ?', [opportunityId]);
  res.json(updatedEvent[0]);
};

exports.getEvents = async (req, res) => {
  const { location, keyword, eventType } = req.query; 
  let sql = 'SELECT * FROM events WHERE 1=1 ';
  const params = [];

 
  if (location) {
    sql += 'AND location LIKE ? ';
    params.push(`%${location}%`);
  }

  
  if (keyword) {
    sql += 'AND (title LIKE ? OR description LIKE ?) ';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  
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


exports.getMatchingEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    
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