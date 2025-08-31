
const bcrypt = require('bcrypt');
const { query } = require('../config/db'); 

const LoginNow = async ({ email, password }) => {
  try {
    
    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Rows:', rows); 

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

