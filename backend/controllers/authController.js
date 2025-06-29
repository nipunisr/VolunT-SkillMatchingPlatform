const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { sendVerificationEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  const { userName, email, password, phoneNumber, location, userType } = req.body;

  try {
    // Check if user exists
    const [existingUser] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Start transaction
    await pool.query('START TRANSACTION');

    // Create user
    const [userResult] = await pool.query(
      `INSERT INTO users 
      (userName, email, password, phoneNumber, location, userType) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [userName, email, hashedPassword, phoneNumber, location, userType]
    );

    const userId = userResult.insertId;

    // Create specific profile
    if (userType === 'volunteer') {
      await pool.query(
        'INSERT INTO volunteers (userId) VALUES (?)',
        [userId]
      );
    } else {
      await pool.query(
        'INSERT INTO organizers (userId, organizationName) VALUES (?, ?)',
        [userId, userName]
      );
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
    await pool.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};