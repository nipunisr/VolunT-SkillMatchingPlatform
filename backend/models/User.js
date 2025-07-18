const { promisePool } = require('../config/db'); 

class User {
  static async create({ userName, email, password, phoneNumber, location, userType }) {
    const [result] = await promisePool.query(
      `INSERT INTO users 
       (userName, email, password, phoneNumber, location, userType) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, email, password, phoneNumber, location, userType]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await promisePool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async verifyEmail(userId) {
    await promisePool.query(
      'UPDATE users SET isVerified = TRUE WHERE id = ?',
      [userId]
    );
  }
}

module.exports = User;