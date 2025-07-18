const { pool } = require('../config/db');

class Volunteer {
  static async createProfile(userId, { bio, availability }) {
    await pool.query(
      `INSERT INTO volunteers (userId, bio, availability) 
       VALUES (?, ?, ?)`,
      [userId, bio, availability]
    );
  }

  static async getById(userId) {
    const [rows] = await pool.query(
      `SELECT u.*, v.bio, v.availability 
       FROM users u
       JOIN volunteers v ON u.id = v.userId
       WHERE u.id = ?`,
      [userId]
    );
    return rows[0];
  }
}

module.exports = Volunteer;