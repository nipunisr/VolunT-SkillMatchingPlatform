// // In your events controller or a new matching controller
// exports.getMatchingEvents = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     // Get volunteer profile with skills
//     const volunteerQuery = `
//       SELECT u.location, v.availabilityStart, v.availabilityEnd, 
//              GROUP_CONCAT(vs.skillId) as skillIds
//       FROM users u
//       JOIN volunteers v ON u.userId = v.userId
//       LEFT JOIN volunteer_skills vs ON u.userId = vs.userId
//       WHERE u.userId = ?
//       GROUP BY u.userId
//     `;
    
//     const [volunteer] = await db.query(volunteerQuery, [userId]);
    
//     if (!volunteer) {
//       return res.status(404).json({ success: false, message: 'Volunteer not found' });
//     }

//     // Query to find matching events
//     const eventsQuery = `
//       SELECT e.*, 
//              GROUP_CONCAT(es.skillId) as requiredSkillIds
//       FROM events e
//       LEFT JOIN event_skills es ON e.opportunityId = es.opportunityId
//       WHERE e.status = 'active'
//         AND (e.isRemote = true OR e.location = ?)
//         AND e.startDate >= ?
//         AND e.endDate <= ?
//       GROUP BY e.opportunityId
//       HAVING (requiredSkillIds IS NULL OR 
//               FIND_IN_SET(?, requiredSkillIds) > 0)
//     `;

//     const events = await db.query(eventsQuery, [
//       volunteer.location,
//       volunteer.availabilityStart,
//       volunteer.availabilityEnd,
//       volunteer.skillIds ? volunteer.skillIds.split(',')[0] : null
//     ]);

//     res.json({ success: true, events });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

