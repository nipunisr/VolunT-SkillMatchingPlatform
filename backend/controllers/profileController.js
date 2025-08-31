
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

    const skillsSql = `SELECT s.skillId, s.name AS skillName, c.categoryId, c.name AS categoryName
                       FROM volunteer_skills vs
                       JOIN skills s ON vs.skillId = s.skillId
                       JOIN categories c ON s.categoryId = c.categoryId
                       WHERE vs.userId = ?`;
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

    await db.query(
      'UPDATE users SET userName = ?, phoneNumber = ?, location = ? WHERE userId = ?',
      [userName, phoneNumber, location, userId]
    );
      
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



