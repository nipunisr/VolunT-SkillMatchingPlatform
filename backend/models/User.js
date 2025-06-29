const { pool } = require('../config/database');

class User {
  static async create({ userName, email, password, userType, phoneNumber, location }) {
    const [result] = await pool.query(
      `INSERT INTO users 
       (userName, email, password, userType, phoneNumber, location) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, email, password, userType, phoneNumber, location]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;