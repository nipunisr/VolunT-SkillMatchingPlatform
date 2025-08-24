const { pool } = require('../config/db');

const getProfile = async (userId) => {
  const [userRows] = await pool.query(
    'SELECT userId, userName, email, phoneNumber, location, userType FROM users WHERE userId = ?',
    [userId]
  );

  if (userRows.length === 0) throw new Error('User not found');

  const user = userRows[0];

  let extraData = {};
  if (user.userType === 'volunteer') {
    const [volRows] = await pool.query(
      'SELECT skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability FROM volunteers WHERE userId = ?',
      [userId]
    );
    extraData = volRows || {};
  } else if (user.userType === 'organizer') {
    const [orgRows] = await pool.query(
      'SELECT organizationName, contactEmail, website, bio FROM organizers WHERE userId = ?',
      [userId]
    );
    extraData = orgRows || {};
  }

  return { ...user, ...extraData };
};

const updateProfile = async (userId, data) => {
  const { userName, phoneNumber, location, userType } = data;

  // Update common user info
  await pool.query(
    'UPDATE users SET userName = ?, phoneNumber = ?, location = ?, updatedAt = NOW() WHERE userId = ?',
    [userName, phoneNumber, location, userId]
  );

  if (userType === 'volunteer') {
    const { skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability } = data;
    // Check if volunteer row exists
    const [volRows] = await pool.query('SELECT volunteerId FROM volunteers WHERE userId = ?', [userId]);
    if (volRows.length > 0) {
      await pool.query(
        `UPDATE volunteers SET skills=?, volunteeringMode=?, socialFacebook=?, socialTwitter=?, socialLinkedin=?, bio=?, availability=?, updatedAt=NOW() WHERE userId=?`,
        [skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability, userId]
      );
    } else {
      await pool.query(
        `INSERT INTO volunteers (userId, skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [userId, skills, volunteeringMode, socialFacebook, socialTwitter, socialLinkedin, bio, availability]
      );
    }
  } else if (userType === 'organizer') {
    const { organizationName, contactEmail, website, bio } = data;
    const [orgRows] = await pool.query('SELECT organizerId FROM organizers WHERE userId = ?', [userId]);
    if (orgRows.length > 0) {
      await pool.query(
        `UPDATE organizers SET organizationName=?, contactEmail=?, website=?, bio=?, updatedAt=NOW() WHERE userId=?`,
        [organizationName, contactEmail, website, bio, userId]
      );
    } else {
      await pool.query(
        `INSERT INTO organizers (userId, organizationName, contactEmail, website, bio, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [userId, organizationName, contactEmail, website, bio]
      );
    }
  } else {
    throw new Error('Unsupported user type');
  }
};

module.exports = { getProfile, updateProfile };
