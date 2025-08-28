// const { pool } = require('../config/db');

// const getProfile = async (userId) => {
//   const [userRows] = await pool.query(
//     'SELECT userId, userName, email, phoneNumber, location, userType FROM users WHERE userId = ?',
//     [userId]
//   );

//   if (userRows.length === 0) throw new Error('User not found');

//   const user = userRows[0];

//   let extraData = {};
//   if (user.userType === 'volunteer') {
//     const [volRows] = await pool.query(
//       'SELECT skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability FROM volunteers WHERE userId = ?',
//       [userId]
//     );
//     extraData = volRows || {};
//   } else if (user.userType === 'organizer') {
//     const [orgRows] = await pool.query(
//       'SELECT organizationName, contactEmail, website, bio FROM organizers WHERE userId = ?',
//       [userId]
//     );
//     extraData = orgRows || {};
//   }

//   return { ...user, ...extraData };
// };

// const updateProfile = async (userId, data) => {
//   const { userName, phoneNumber, location, userType } = data;

//   // Update common user info
//   await pool.query(
//     'UPDATE users SET userName = ?, phoneNumber = ?, location = ?, updatedAt = NOW() WHERE userId = ?',
//     [userName, phoneNumber, location, userId]
//   );

//   if (userType === 'volunteer') {
//     const { skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability } = data;
//     // Check if volunteer row exists
//     const [volRows] = await pool.query('SELECT volunteerId FROM volunteers WHERE userId = ?', [userId]);
//     if (volRows.length > 0) {
//       await pool.query(
//         `UPDATE volunteers SET skills=?, volunteeringMode=?, socialFacebook=?, socialTwitter=?, socialLinkedin=?, bio=?, availability=?, updatedAt=NOW() WHERE userId=?`,
//         [skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability, userId]
//       );
//     } else {
//       await pool.query(
//         `INSERT INTO volunteers (userId, skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//         [userId, skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability]
//       );
//     }
//   } else if (userType === 'organizer') {
//     const { organizationName, contactEmail, website, bio } = data;
//     const [orgRows] = await pool.query('SELECT organizerId FROM organizers WHERE userId = ?', [userId]);
//     if (orgRows.length > 0) {
//       await pool.query(
//         `UPDATE organizers SET organizationName=?, contactEmail=?, website=?, bio=?, updatedAt=NOW() WHERE userId=?`,
//         [organizationName, contactEmail, website, bio, userId]
//       );
//     } else {
//       await pool.query(
//         `INSERT INTO organizers (userId, organizationName, contactEmail, website, bio, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
//         [userId, organizationName, contactEmail, website, bio]
//       );
//     }
//   } else {
//     throw new Error('Unsupported user type');
//   }
// };

// module.exports = { getProfile, updateProfile };




const db = require('../config/db');

const toMysqlDatetime = (date) => {
  if (!date) return null;
  const dt = new Date(date);
  const pad = (n) => (n < 10 ? '0' + n : n);
  return dt.getFullYear() + '-' +
         pad(dt.getMonth() + 1) + '-' +
         pad(dt.getDate()) + ' ' +
         pad(dt.getHours()) + ':' +
         pad(dt.getMinutes()) + ':' +
         pad(dt.getSeconds());
};


exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profileSql = `SELECT u.userId, u.userName, u.email, u.phoneNumber, u.location, u.userType,
                        v.volunteeringMode, v.bio, v.availabilityStart, v.availabilityEnd,
                        v.socialFacebook, v.socialTwitter, v.socialLinkedin
                        FROM users u
                        LEFT JOIN volunteers v ON u.userId = v.userId
                        WHERE u.userId = ? LIMIT 1`;
    const profileRows = await db.query(profileSql, [userId]);
    if (!profileRows.length) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    const profile = { ...profileRows[0] };

    // Get skills with categories for the user
    const skillsSql = `SELECT s.skillId, s.name AS skillName, c.categoryId, c.name AS categoryName
                       FROM volunteer_skills vs
                       JOIN skills s ON vs.skillId = s.skillId
                       JOIN categories c ON s.categoryId = c.categoryId
                       WHERE vs.userId = ?`;
    const skillsRows = await db.query(skillsSql, [userId]);

    // Group skills by category
    const skillsByCategory = {};
    for (const row of skillsRows) {
      if (!skillsByCategory[row.categoryId]) {
        skillsByCategory[row.categoryId] = {
          categoryId: row.categoryId,
          categoryName: row.categoryName,
          skills: []
        };
      }
      skillsByCategory[row.categoryId].skills.push({ skillId: row.skillId, name: row.skillName });
    }
    profile.skills = Object.values(skillsByCategory);

    res.json({ success: true, user: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      userName, phoneNumber, location,
      skills, volunteeringMode, bio,
      availabilityStart, availabilityEnd,
      socialFacebook, socialTwitter, socialLinkedin,
    } = req.body;

    const availabilityStartMysql = toMysqlDatetime(availabilityStart);
    const availabilityEndMysql = toMysqlDatetime(availabilityEnd);

    // Update user basic info
    await db.query(
      'UPDATE users SET userName = ?, phoneNumber = ?, location = ? WHERE userId = ?',
      [userName, phoneNumber, location, userId]
    );

    //const safeSkills = Array.isArray(skills) ? skills.join(',') : (skills || '');
      
    await db.query(
      `INSERT INTO volunteers 
       (userId, volunteeringMode, bio, availabilityStart, availabilityEnd, socialFacebook, socialTwitter, socialLinkedin)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         volunteeringMode=VALUES(volunteeringMode),
         bio=VALUES(bio),
         availabilityStart=VALUES(availabilityStart),
         availabilityEnd=VALUES(availabilityEnd),
         socialFacebook=VALUES(socialFacebook),
         socialTwitter=VALUES(socialTwitter),
         socialLinkedin=VALUES(socialLinkedin)`,
      [userId, volunteeringMode, bio, availabilityStartMysql, availabilityEndMysql, socialFacebook, socialTwitter, socialLinkedin]
    );

    await db.query('DELETE FROM volunteer_skills WHERE userId = ?', [userId]);

    if (Array.isArray(skills) && skills.length > 0) {
      const skillRows = skills.map(skillId => [userId, skillId]);
      await db.query('INSERT INTO volunteer_skills (userId, skillId) VALUES ?', [skillRows]);
    }

    const profileSql = `
      SELECT u.userId, u.userName, u.email, u.phoneNumber, u.location, u.userType,
             v.volunteeringMode, v.bio, v.availabilityStart, v.availabilityEnd,
             v.socialFacebook, v.socialTwitter, v.socialLinkedin
      FROM users u
      LEFT JOIN volunteers v ON u.userId = v.userId
      WHERE u.userId = ? LIMIT 1
    `;
    const profileRows = await db.query(profileSql, [userId]);
    const updatedProfile = { ...profileRows[0] };

    // Get skills with categories again
    const skillsSql = `
      SELECT s.skillId, s.name AS skillName, c.categoryId, c.name AS categoryName
      FROM volunteer_skills vs
      JOIN skills s ON vs.skillId = s.skillId
      JOIN categories c ON s.categoryId = c.categoryId
      WHERE vs.userId = ?
    `;
    const skillsRows = await db.query(skillsSql, [userId]);
    const skillsByCategory = {};
    for (const row of skillsRows) {
      if (!skillsByCategory[row.categoryId]) {
        skillsByCategory[row.categoryId] = {
          categoryId: row.categoryId,
          categoryName: row.categoryName,
          skills: []
        };
      }
      skillsByCategory[row.categoryId].skills.push({ skillId: row.skillId, name: row.skillName });
    }
    updatedProfile.skills = Object.values(skillsByCategory);

    delete updatedProfile.password;

    res.json({ success: true, user: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



