// const bcrypt = require('bcryptjs');
// const { promisePool } = require('../config/db');
// const jwt = require('jsonwebtoken');

// class Auth {
//   static async findByEmail(email) {
//     try {
//       const [rows] = await promisePool.query(
//         'SELECT userId, userName, email, password, userType, isVerified FROM users WHERE email = ?', 
//         [email]
//       );
//       return rows[0] || null;
//     } catch (error) {
//       console.error('Error in findByEmail:', error);
//       throw error;
//     }
//   }

//   static async comparePasswords(plainPassword, hashedPassword) {
//     try {
//       return await bcrypt.compare(plainPassword, hashedPassword);
//     } catch (error) {
//       console.error('Error comparing passwords:', error);
//       throw error;
//     }
//   }

//   static generateToken(user) {
//     return jwt.sign(
//       { userId: user.userId, userType: user.userType },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
//   }

//   static async verifyUser(user) {
//     if (!user) {
//       throw new Error('User not found');
//     }
    
//     if (user.isVerified === false) {
//       throw new Error('EMAIL_NOT_VERIFIED');
//     }
    
//     return true;
//   }
// }

// module.exports = Auth;




// services/Auth.js
//const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { query } = require('../config/db'); // import the promisified query

const LoginNow = async ({ email, password }) => {
  try {
    // Use the promisified query, which returns rows directly
    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Rows:', rows); // should be an array of row objects

    const user = rows && rows.length ? rows[0] : undefined;
    console.log('User:', user);

    if (!user) {
      return { success: false, msg: "Invalid email or password." };
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return { success: false, msg: "Invalid email or password." };
    }

    return {
      success: true,
      user: {
        userId: user.userId,
        userName: user.userName,
        userType: user.userType,
        email: user.email
      }
    };
  } catch (err) {
    console.error('Database error in LoginNow:', err.message);
    return { success: false, msg: "Server error." };
  }
};


module.exports = { LoginNow };

