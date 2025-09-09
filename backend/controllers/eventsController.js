
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
  
  let sql = `SELECT * FROM events WHERE status NOT IN ('cancelled', 'completed') `;
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
    sql += 'AND isRemote = 1 '; 
  } else if (eventType === 'physical') {
    sql += 'AND isRemote = 0 '; 
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


// exports.getMatchingEvents = async (req, res) => {
//   try {
//     const userId = req.user.userId;
    
    
//     const volunteerQuery = `
//       SELECT u.location, v.availabilityStart, v.availabilityEnd
//       FROM users u
//       JOIN volunteers v ON u.userId = v.userId
//       WHERE u.userId = ?
//     `;
    
//     const [volunteer] = await query(volunteerQuery, [userId]);
    
//     if (!volunteer) {
//       return res.status(404).json({ success: false, message: 'Volunteer not found' });
//     }

//     const { location, availabilityStart, availabilityEnd } = volunteer;
    
   
//     const eventsQuery = `
//       SELECT e.*
//       FROM events e
//       WHERE e.status = 'active'
//         AND (e.isRemote = true OR e.location = ?)
//         AND (e.startDate IS NULL OR e.startDate >= ?)
//         AND (e.endDate IS NULL OR e.endDate <= ?)
//       ORDER BY e.startDate ASC
//     `;
    
//     const events = await query(eventsQuery, [
//       location || '', 
//       availabilityStart || new Date().toISOString().split('T')[0],
//       availabilityEnd || '2030-12-31'
//     ]);
    
//     res.json({ success: true, events });
//   } catch (error) {
//     console.error('Error fetching matching events:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


//skill
// exports.getMatchingEvents = async (req, res) => {
//   try {
//     const userId = req.user.userId;
    
//     // Get volunteer's profile including skills
//     const volunteerQuery = `
//       SELECT 
//         u.location, 
//         v.availabilityStart, 
//         v.availabilityEnd,
//         GROUP_CONCAT(DISTINCT vs.skillId) as skillIds
//       FROM users u
//       JOIN volunteers v ON u.userId = v.userId
//       LEFT JOIN volunteer_skills vs ON u.userId = vs.userId
//       WHERE u.userId = ?
//       GROUP BY u.userId
//     `;
    
//     const [volunteer] = await query(volunteerQuery, [userId]);
    
//     if (!volunteer) {
//       return res.status(404).json({ success: false, message: 'Volunteer not found' });
//     }

//     const { location, availabilityStart, availabilityEnd, skillIds } = volunteer;
    
//     // Convert skill IDs to array
//     const volunteerSkillIds = skillIds ? skillIds.split(',').map(id => parseInt(id)) : [];
    
//     // Get events that match location, availability, and skills
//     // FIXED: Changed es.eventId to es.opportunityId
//     const eventsQuery = `
//       SELECT 
//         e.*,
//         COUNT(DISTINCT es.skillId) as requiredSkillsCount,
//         SUM(CASE WHEN es.skillId IN (${volunteerSkillIds.length > 0 ? volunteerSkillIds.join(',') : 'NULL'}) THEN 1 ELSE 0 END) as matchedSkillsCount
//       FROM events e
//       LEFT JOIN event_skills es ON e.opportunityId = es.opportunityId
//       WHERE e.status = 'active'
//         AND (e.isRemote = true OR e.location = ?)
//         AND (e.startDate IS NULL OR e.startDate >= ?)
//         AND (e.endDate IS NULL OR e.endDate <= ?)
//       GROUP BY e.opportunityId
//       ORDER BY matchedSkillsCount DESC, requiredSkillsCount DESC, e.startDate ASC
//     `;
    
//     const events = await query(eventsQuery, [
//       location || '', 
//       availabilityStart || new Date().toISOString().split('T')[0],
//       availabilityEnd || '2030-12-31'
//     ]);
    
//     // Calculate match percentage for each event
//     const eventsWithMatchScore = events.map(event => {
//       const matchPercentage = event.requiredSkillsCount > 0 
//         ? (event.matchedSkillsCount / event.requiredSkillsCount) * 100 
//         : 100; // If no skills required, it's a perfect match
        
//       return {
//         ...event,
//         matchPercentage: Math.round(matchPercentage)
//       };
//     });
    
//     res.json({ 
//       success: true, 
//       events: eventsWithMatchScore
//     });
//   } catch (error) {
//     console.error('Error fetching matching events:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

exports.getMatchingEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const volunteerQuery = `
      SELECT 
        u.location, 
        v.availabilityStart, 
        v.availabilityEnd,
        v.volunteeringMode AS modePreference,
        GROUP_CONCAT(DISTINCT vs.skillId) as skillIds,
        GROUP_CONCAT(DISTINCT s.categoryId) as categoryIds
      FROM users u
      JOIN volunteers v ON u.userId = v.userId
      LEFT JOIN volunteer_skills vs ON u.userId = vs.userId
      LEFT JOIN skills s ON vs.skillId = s.skillId
      WHERE u.userId = ?
      GROUP BY u.userId
    `;
    
    const [volunteer] = await query(volunteerQuery, [userId]);
    
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    const { location, availabilityStart, availabilityEnd, modePreference, skillIds, categoryIds } = volunteer;
    
    const volunteerSkillIds = skillIds ? skillIds.split(',').map(id => parseInt(id)) : [];
    const volunteerCategoryIds = categoryIds ? categoryIds.split(',').map(id => parseInt(id)) : [];
    
    const eventsQuery = `
      SELECT 
        e.*,
        GROUP_CONCAT(DISTINCT es.skillId) as eventSkillIds,
        GROUP_CONCAT(DISTINCT s.categoryId) as eventCategoryIds
      FROM events e
      LEFT JOIN event_skills es ON e.opportunityId = es.opportunityId
      LEFT JOIN skills s ON es.skillId = s.skillId
      WHERE e.status = 'active'
      GROUP BY e.opportunityId
    `;
    
    const events = await query(eventsQuery);
    
    const eventsWithMatchScore = events.map(event => {
      const eventSkillIds = event.eventSkillIds ? event.eventSkillIds.split(',').map(id => parseInt(id)) : [];
      const eventCategoryIds = event.eventCategoryIds ? event.eventCategoryIds.split(',').map(id => parseInt(id)) : [];
      
      const locationMatch = event.isRemote || (location && event.location && 
        event.location.toLowerCase() === location.toLowerCase());
      
      const modeMatch = modePreference === 'both' || 
        (modePreference === 'online' && event.isRemote) ||
        (modePreference === 'physical' && !event.isRemote);
      
      const currentDate = new Date();
      const eventStartDate = event.startDate ? new Date(event.startDate) : null;
      const eventEndDate = event.endDate ? new Date(event.endDate) : null;
      const volunteerStartDate = availabilityStart ? new Date(availabilityStart) : null;
      const volunteerEndDate = availabilityEnd ? new Date(availabilityEnd) : null;
      
      let dateMatch = false;
      
      if (!eventStartDate && !eventEndDate) {
        // Event has no date restrictions
        dateMatch = true;
      } else if (volunteerStartDate && volunteerEndDate) {
        // Volunteer has specific availability
        if (eventStartDate && eventEndDate) {
          // Event has specific dates
          dateMatch = eventStartDate >= volunteerStartDate && eventEndDate <= volunteerEndDate;
        } else if (eventStartDate) {
          // Event has only start date
          dateMatch = eventStartDate >= volunteerStartDate && eventStartDate <= volunteerEndDate;
        } else if (eventEndDate) {
          // Event has only end date
          dateMatch = eventEndDate >= volunteerStartDate && eventEndDate <= volunteerEndDate;
        }
      } else {
        dateMatch = true;
      }
      
      // Check exact skills match
      const exactSkillsMatch = eventSkillIds.length > 0 && 
        eventSkillIds.every(skillId => volunteerSkillIds.includes(skillId));
      
      // Check category match
      const categoryMatch = eventCategoryIds.length > 0 && 
        eventCategoryIds.some(categoryId => volunteerCategoryIds.includes(categoryId));
      
      // Calculate match percentage based on tiered rules
      let matchPercentage = 0;
      let matchReason = "";
      let matchTier = "none";
      
      // Tier 1: 100% - Skills + Location + Dates
      if (exactSkillsMatch && locationMatch && dateMatch && modeMatch) {
        matchPercentage = 100;
        matchTier = "perfect";
        matchReason = "Perfect match! Your skills, location, and availability align perfectly with this event.";
      } 
      // Tier 2: 90% - Any two of Skills, Location, or Dates
      else if (
        (exactSkillsMatch && locationMatch && modeMatch) || // Skills + Location
        (exactSkillsMatch && dateMatch) ||                  // Skills + Dates
        (locationMatch && dateMatch && modeMatch)           // Location + Dates
      ) {
        matchPercentage = 90;
        matchTier = "excellent";
        
        if (exactSkillsMatch && locationMatch) {
          matchReason = "Excellent match! Your skills and location match this event.";
        } else if (exactSkillsMatch && dateMatch) {
          matchReason = "Excellent match! Your skills and availability match this event.";
        } else if (locationMatch && dateMatch) {
          matchReason = "Excellent match! Your location and availability match this event.";
        }
      }
      // Tier 3: 30% - Only one factor matches
      else if (exactSkillsMatch || locationMatch || dateMatch) {
        matchPercentage = 30;
        matchTier = "good";
        
        if (exactSkillsMatch) {
          matchReason = "Good match! Your skills match this event.";
        } else if (locationMatch) {
          matchReason = "Good match! Your location matches this event.";
        } else if (dateMatch) {
          matchReason = "Good match! Your availability matches this event.";
        }
      }
      // Tier 4: 10% - Category match only
      else if (categoryMatch) {
        matchPercentage = 10;
        matchTier = "fair";
        matchReason = "Fair match! This event matches your skill categories.";
      }
      
      return {
        ...event,
        matchPercentage,
        matchReason,
        matchTier,
        matchDetails: {
          location: locationMatch,
          dates: dateMatch,
          exactSkills: exactSkillsMatch,
          category: categoryMatch,
          mode: modeMatch,
          isRemote: event.isRemote
        }
      };
    });
    
    const filteredEvents = eventsWithMatchScore
      .filter(event => event.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    const tieredEvents = {
      perfect: filteredEvents.filter(event => event.matchTier === "perfect"),
      excellent: filteredEvents.filter(event => event.matchTier === "excellent"),
      good: filteredEvents.filter(event => event.matchTier === "good"),
      fair: filteredEvents.filter(event => event.matchTier === "fair")
    };
    
    res.json({ 
      success: true, 
      events: filteredEvents,
      tieredEvents,
      volunteerInfo: {
        location,
        availability: {
          start: availabilityStart,
          end: availabilityEnd
        },
        modePreference,
        skills: volunteerSkillIds,
        categories: volunteerCategoryIds
      }
    });
  } catch (error) {
    console.error('Error fetching matching events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};