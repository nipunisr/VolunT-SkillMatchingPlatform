const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisePool,query } = require('../config/db');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Organizer = require('../models/Organizer');
//const { sendVerificationEmail } = require('../services/emailService');
const { LoginNow } = require("../models/Auth");


exports.register = async (req, res) => {
  const { userName, email, password, phoneNumber, location, userType } = req.body;
  
  try {
    // Check if email exists
    const user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Start transaction
    await promisePool.query('START TRANSACTION');

    // Create user
    const userId = await User.create({
      userName,
      email,
      password: hashedPassword,
      phoneNumber: userType === 'volunteer' ? phoneNumber : null,
      location: userType === 'volunteer' ? location : null,
      userType
    });

    // Create specific profile
    if (userType === 'volunteer') {
      await Volunteer.createProfile(userId);
    } else {
      await Organizer.createProfile(userId, userName);
    }

    // Generate verification token
    const verificationToken = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Commit transaction
    await promisePool.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    });

  } catch (error) {
    await promisePool.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginResult = await LoginNow({ email, password });

    if (!loginResult.success) {
      return res.status(401).json(loginResult); // Invalid credentials etc.
    }

    // Check if user email is verified if you track that (add verify check)

    // Generate JWT token with user ID and role
    const token = jwt.sign(
  { 
    userId: loginResult.user.userId, 
    userType: loginResult.user.userType,
    userName: loginResult.user.userName  // add userName here
  },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

    res.json({
      success: true,
      token,
      user: loginResult.user
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};





// exports.login = async (req, res) => {       // <-- original
//   const authCredentials = req.body;
//   console.log("line6");
//   console.log(authCredentials);
//   const loginSuccess = await LoginNow(authCredentials);
//   console.log("Login result:", loginSuccess);


//   // TODO: Typically check and handle "loginFailed" etc here
//   return res.json(loginSuccess);
// };

























// exports.verifyEmail = async (req, res) => {
//   const { token } = req.body;
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     await User.verifyEmail(decoded.id);
    
//     res.json({
//       success: true,
//       message: 'Email verified successfully'
//     });
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Verification link has expired'
//       });
//     }
//     res.status(400).json({
//       success: false,
//       message: 'Invalid verification token'
//     });
//   }
// };


// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (!rows.length) return res.status(400).json({ success: false, msg: 'Invalid credentials' });

//     const user = rows[0];
//     const matched = await bcrypt.compare(password, user.password);
//     if (!matched) return res.status(400).json({ success: false, msg: 'Invalid credentials' });

//     res.json({
//       success: true,
//       user: {
//         userId: user.userId,
//         userName: user.userName,
//         email: user.email,
//         userType: user.userType  // This is KEY for frontend
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, msg: 'Server error' });
//   }
// };




// exports.login = async ({ email, password }) => {
//   try {
//     // Use the promisified query, which returns rows directly
//     const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
//     console.log('Rows:', rows); // should be an array of row objects

//     const user = rows && rows.length ? rows[0] : undefined;
//     console.log('User:', user);

//     if (!user) {
//       return { success: false, msg: "Invalid email or password." };
//     }

//     const matched = await bcrypt.compare(password, user.password);
//     if (!matched) {
//       return { success: false, msg: "Invalid email or password." };
//     }

//     return {
//       success: true,
//       user: {
//         userId: user.userId,
//         userName: user.userName,
//         userType: user.userType,
//         email: user.email
//       }
//     };
//   } catch (err) {
//     console.error('Database error in LoginNow:', err.message);
//     return { success: false, msg: "Server error." };
//   }
// };



