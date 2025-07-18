require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Database connection (Aiven-compatible)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());

// Registration endpoint (matches your table exactly)
app.post('/register', async (req, res) => {
  try {
    // Destructure all fields from request body
    const {
      fName,
      lName,
      userName,
      email,
      password,
      phoneNumber,
      location,
      userType,
      isVerified
    } = req.body;

    // Insert into database (all columns in exact order)
    const [result] = await pool.query(
      `INSERT INTO users 
       (fName, lName, userName, email, password, phoneNumber, location, userType, isVerified) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fName,
        lName,
        userName,
        email,
        password, // Storing plaintext (for testing only)
        phoneNumber || null, // Optional fields
        location || null,
        userType, // Must be 'volunteer' or 'organizer'
        isVerified ? 1 : 0 // Convert boolean to tinyint
      ]
    );

    // Success response
    res.status(201).json({
      success: true,
      message: "User registered with all fields",
      userId: result.insertId
    });

  } catch (error) {
    // Handle duplicate email error (UNIQUE constraint)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        error: "Email already exists" 
      });
    }
    
    console.error("Registration error:", error);
    res.status(500).json({ 
      error: "Registration failed",
      details: error.message 
    });
  }
});

const PORT = 5800;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));