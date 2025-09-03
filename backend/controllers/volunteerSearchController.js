const db = require('../config/db');

exports.searchVolunteers = async (req, res) => {
  try {
    const { name, email, location, skills, volunteeringMode, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let baseQuery = `
      SELECT 
        u.userId, u.userName, u.email, u.phoneNumber, u.location,
        v.volunteeringMode, v.bio, v.socialFacebook, v.socialTwitter, v.socialLinkedin,
        v.availabilityStart, v.availabilityEnd,
        GROUP_CONCAT(DISTINCT s.name) as skillNames
      FROM users u
      LEFT JOIN volunteers v ON u.userId = v.userId
      LEFT JOIN volunteer_skills vs ON u.userId = vs.userId
      LEFT JOIN skills s ON vs.skillId = s.skillId
      WHERE u.userType = 'volunteer'
    `;
    
    let queryParams = [];
    let conditions = [];
    
    if (name) {
      conditions.push('u.userName LIKE ?');
      queryParams.push(`%${name}%`);
    }
    
    if (email) {
      conditions.push('u.email LIKE ?');
      queryParams.push(`%${email}%`);
    }
    
    if (location) {
      conditions.push('u.location LIKE ?');
      queryParams.push(`%${location}%`);
    }
    
    if (skills) {
      conditions.push('s.skillId IN (?)');
      queryParams.push(skills.split(','));
    }
    
    if (volunteeringMode) {
      conditions.push('v.volunteeringMode = ?');
      queryParams.push(volunteeringMode);
    }
    
    if (conditions.length > 0) {
      baseQuery += ' AND ' + conditions.join(' AND ');
    }
    
    baseQuery += ' GROUP BY u.userId ORDER BY u.userName LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));
    
    const volunteers = await db.query(baseQuery, queryParams);
    
    const volunteersWithParsedSkills = volunteers.map(volunteer => ({
      ...volunteer,
      skills: volunteer.skillNames ? volunteer.skillNames.split(',') : []
    }));
    
    let countQuery = `
      SELECT COUNT(DISTINCT u.userId) as total
      FROM users u
      LEFT JOIN volunteers v ON u.userId = v.userId
      LEFT JOIN volunteer_skills vs ON u.userId = vs.userId
      LEFT JOIN skills s ON vs.skillId = s.skillId
      WHERE u.userType = 'volunteer'
    `;
    
    let countParams = [];
    let countConditions = [];
    
    if (name) {
      countConditions.push('u.userName LIKE ?');
      countParams.push(`%${name}%`);
    }
    
    if (email) {
      countConditions.push('u.email LIKE ?');
      countParams.push(`%${email}%`);
    }
    
    if (location) {
      countConditions.push('u.location LIKE ?');
      countParams.push(`%${location}%`);
    }
    
    if (skills) {
      countConditions.push('s.skillId IN (?)');
      countParams.push(skills.split(','));
    }
    
    if (volunteeringMode) {
      countConditions.push('v.volunteeringMode = ?');
      countParams.push(volunteeringMode);
    }
    
    if (countConditions.length > 0) {
      countQuery += ' AND ' + countConditions.join(' AND ');
    }
    
    const totalResult = await db.query(countQuery, countParams);
    const total = totalResult[0].total;
    
    res.json({
      success: true,
      volunteers: volunteersWithParsedSkills,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Server error during search' });
  }
};

exports.getVolunteerDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const volunteerQuery = `
      SELECT 
        u.userId, u.userName, u.email, u.phoneNumber, u.location,
        v.volunteeringMode, v.bio, v.socialFacebook, v.socialTwitter, v.socialLinkedin,
        v.availabilityStart, v.availabilityEnd
      FROM users u
      LEFT JOIN volunteers v ON u.userId = v.userId
      WHERE u.userId = ? AND u.userType = 'volunteer'
    `;
    
    const volunteerResult = await db.query(volunteerQuery, [userId]);
    
    if (volunteerResult.length === 0) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }
    
    const volunteer = volunteerResult[0];
    
    const skillsQuery = `
      SELECT s.skillId, s.name as skillName
      FROM volunteer_skills vs
      JOIN skills s ON vs.skillId = s.skillId
      WHERE vs.userId = ?
    `;
    
    const skills = await db.query(skillsQuery, [userId]);
    
    const recommendationsQuery = `
      SELECT 
        r.*, 
        o.userName as organizationName,
        r.recommendation_text as content  -- Add this line to include the message content
      FROM recommendations r
      JOIN users o ON r.organizer_id = o.userId
      WHERE r.volunteer_id = ?
      ORDER BY r.created_at DESC
    `;
    
    const recommendations = await db.query(recommendationsQuery, [userId]);
    
    res.json({
      success: true,
      volunteer: {
        ...volunteer,
        skills,
        recommendations
      }
    });
  } catch (error) {
    console.error('Volunteer details error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};