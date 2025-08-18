// const { promisePool } = require('../config/db'); 
const { query } = require('../config/db');


class User {
  static async create({ userName, email, password, phoneNumber, location, userType }) {
    const [result] = await query(
      `INSERT INTO users 
       (userName, email, password, phoneNumber, location, userType) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, email, password, phoneNumber, location, userType]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async verifyEmail(userId) {
    await query(
      'UPDATE users SET isVerified = TRUE WHERE id = ?',
      [userId]
    );
  }
  static async findById(userId) {
  const [rows] = await query(
    'SELECT userId, userName, email, phoneNumber, location, userType, isVerified FROM users WHERE userId = ?',
    [userId]
  );
  return rows[0];
}
}


module.exports = User;