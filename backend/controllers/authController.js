const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisePool } = require('../config/db');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Organizer = require('../models/Organizer');
const { sendVerificationEmail } = require('../services/emailService');

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

exports.verifyEmail = async (req, res) => {
  const { token } = req.body;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.verifyEmail(decoded.id);
    
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Verification link has expired'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Invalid verification token'
    });
  }
};